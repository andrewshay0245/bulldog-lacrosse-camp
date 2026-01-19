import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getPositionLimits, getSheetName, hasPositionLimits } from '@/lib/camp-config';

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ campId: string }> }
) {
  const { campId } = await params;

  // Check if this camp has position limits
  if (!hasPositionLimits(campId)) {
    return NextResponse.json({
      hasLimits: false,
      message: 'This camp does not have position limits',
    });
  }

  const positionLimits = getPositionLimits(campId);
  if (!positionLimits) {
    return NextResponse.json({ error: 'Invalid camp' }, { status: 400 });
  }

  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    const sheetName = getSheetName(campId);

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `'${sheetName}'!A:M`,
    });

    const rows = response.data.values || [];

    // Count registrations by position (position is in column F, index 5)
    const positionCounts: Record<string, number> = {};
    for (const position of Object.keys(positionLimits)) {
      positionCounts[position] = 0;
    }

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

    for (const [position, limit] of Object.entries(positionLimits)) {
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
      hasLimits: true,
      campId,
      availability,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`Error fetching ${campId} availability:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}
