import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { getRegistrations } from '@/lib/sheets';

export async function GET(request: NextRequest) {
  const isAuthenticated = await verifySession();
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const camp = searchParams.get('camp') || undefined;

  try {
    const registrations = await getRegistrations(camp);
    return NextResponse.json({ registrations });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 });
  }
}
