import { google } from 'googleapis';

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

export async function logEmailSend(count: number, subject: string) {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `'EmailLog'!A:D`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
          count,
          subject,
          'Sent'
        ]],
      },
    });
  } catch (error) {
    console.error('Failed to log email send:', error);
  }
}

export async function getEmailStats(): Promise<{ today: number; thisMonth: number; total: number }> {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `'EmailLog'!A:B`,
    });

    const rows = response.data.values || [];
    const now = new Date();
    const todayStr = now.toLocaleDateString('en-US', { timeZone: 'America/New_York' });
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let today = 0;
    let thisMonth = 0;
    let total = 0;

    for (const row of rows) {
      if (!row[0] || row[0] === 'Date') continue;

      const count = parseInt(row[1]) || 0;
      total += count;

      const rowDate = new Date(row[0]);
      const rowDateStr = rowDate.toLocaleDateString('en-US', { timeZone: 'America/New_York' });

      if (rowDateStr === todayStr) {
        today += count;
      }

      if (rowDate.getMonth() === currentMonth && rowDate.getFullYear() === currentYear) {
        thisMonth += count;
      }
    }

    return { today, thisMonth, total };
  } catch (error) {
    console.error('Failed to get email stats:', error);
    return { today: 0, thisMonth: 0, total: 0 };
  }
}
