import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { getEmailStats } from '@/lib/emailStats';

export async function GET() {
  const isAuthenticated = await verifySession();
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const stats = await getEmailStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching email stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
