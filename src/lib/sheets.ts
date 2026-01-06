import { google } from 'googleapis';

export interface Registration {
  id: string;
  date: string;
  camp: string;
  campName: string;
  amount: string;
  camperName: string;
  camperEmail: string;
  position: string;
  graduationYear: string;
  school: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  status: string;
  paymentId: string;
}

const campSheetNames: Record<string, string> = {
  'test': 'Test',
  'summer': 'BLC26',
  'bulldog-120': 'B12026',
  'experience': 'BEx26',
  'clash': 'BClash26',
};

const campDisplayNames: Record<string, string> = {
  'Test': 'Test',
  'BLC26': 'Summer Camp',
  'B12026': 'Bulldog 120',
  'BEx26': 'Bulldog Experience',
  'BClash26': 'Bulldog Clash',
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

export async function getRegistrations(campFilter?: string): Promise<Registration[]> {
  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  const sheetNames = campFilter
    ? [campSheetNames[campFilter]].filter(Boolean)
    : Object.values(campSheetNames);

  const allRegistrations: Registration[] = [];

  for (const sheetName of sheetNames) {
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: `'${sheetName}'!A:M`,
      });

      const rows = response.data.values || [];

      // Skip header row if exists, start from row 1
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (!row[0] || row[0] === 'Date') continue; // Skip empty or header rows

        allRegistrations.push({
          id: `${sheetName}-${i}`,
          date: row[0] || '',
          camp: sheetName,
          campName: campDisplayNames[sheetName] || sheetName,
          amount: row[2] || '',
          camperName: row[3] || '',
          camperEmail: row[4] || '',
          position: row[5] || '',
          graduationYear: row[6] || '',
          school: row[7] || '',
          parentName: row[8] || '',
          parentEmail: row[9] || '',
          parentPhone: row[10] || '',
          status: row[11] || '',
          paymentId: row[12] || '',
        });
      }
    } catch (error) {
      console.error(`Error reading sheet ${sheetName}:`, error);
    }
  }

  // Sort by date descending (most recent first)
  allRegistrations.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return allRegistrations;
}

export { campSheetNames, campDisplayNames };
