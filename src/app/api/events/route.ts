import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: 'asc',
      },
    });

    return NextResponse.json(events, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('GET EVENTS ERROR:', error);
    return NextResponse.json(
      { error: 'Failed to load events' },
      { status: 500 }
    );
  }
}
