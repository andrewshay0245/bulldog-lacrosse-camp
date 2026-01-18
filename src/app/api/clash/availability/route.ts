import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// Position limits for Bulldog Clash
export const CLASH_POSITION_LIMITS: Record<string, number> = {
  'Attack': 40,
  'Midfield': 50,
  'Defense': 40,
  'Goalie': 10,
  'LSM': 15,
  'Face Off': 10,
};

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
}

export async function GET() {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "'BClash26'!A:M",
    });

    const rows = response.data.values || [];

    // Count registrations by position (position is in column F, index 5)
    const positionCounts: Record<string, number> = {
      'Attack': 0,
      'Midfield': 0,
      'Defense': 0,
      'Goalie': 0,
      'LSM': 0,
      'Face Off': 0,
    };

    for (const row of rows) {
      // Skip header row
      if (!row[0] || row[0] === 'Date') continue;

      const position = row[5]?.trim();
      if (position && positionCounts[position] !== undefined) {
        positionCounts[position]++;
      }
    }

    // Calculate availability
    const availability: Record<string, { registered: number; limit: number; available: number; isFull: boolean }> = {};

    for (const [position, limit] of Object.entries(CLASH_POSITION_LIMITS)) {
      const registered = positionCounts[position] || 0;
      const available = Math.max(0, limit - registered);
      availability[position] = {
        registered,
        limit,
        available,
        isFull: available === 0,
      };
    }

    return NextResponse.json({
      availability,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching Clash availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}
