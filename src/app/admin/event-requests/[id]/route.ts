import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  // Check if user is admin
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { status, adminNotes } = await request.json();
    const id = parseInt(params.id, 10);

    const updatedRequest = await prisma.eventRequest.update({
      where: { id },
      data: {
        status,
        adminNotes,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error('Error updating event request:', error);
    return NextResponse.json({ error: 'Failed to update request' }, { status: 500 });
  }
}

// Mark request as PENDING when admin views it
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const id = parseInt(params.id, 10);

    const eventRequest = await prisma.eventRequest.findUnique({
      where: { id },
    });

    // Only update to PENDING if it's currently UNOPENED
    if (eventRequest?.status === 'UNOPENED') {
      const updatedRequest = await prisma.eventRequest.update({
        where: { id },
        data: {
          status: 'PENDING',
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(updatedRequest);
    }

    return NextResponse.json(eventRequest);
  } catch (error) {
    console.error('Error marking request as pending:', error);
    return NextResponse.json({ error: 'Failed to update request' }, { status: 500 });
  }
}
