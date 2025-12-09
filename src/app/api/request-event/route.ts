// src/app/api/request-event/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 },
      );
    }

    // Get user from database to ensure they exist
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, email: true, username: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 },
      );
    }

    // Parse request body
    const body = await request.json();
    const {
      eventName,
      eventType,
      gameTitle,
      description,
      suggestedDate,
      suggestedTime,
      estimatedPlayers,
      location,
      additionalNotes,
    } = body;

    // Validate required fields
    if (!eventName || !eventType || !gameTitle || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    // Create event request in database
    const eventRequest = await prisma.eventRequest.create({
      data: {
        userId: user.id,
        userEmail: user.email,
        username: user.username,
        eventName: eventName.trim(),
        eventType,
        gameTitle: gameTitle.trim(),
        description: description.trim(),
        suggestedDate: suggestedDate ? new Date(suggestedDate) : null,
        suggestedTime: suggestedTime || null,
        estimatedPlayers: estimatedPlayers ? parseInt(estimatedPlayers, 10) : null,
        location: location?.trim() || null,
        additionalNotes: additionalNotes?.trim() || null,
        status: 'PENDING',
      },
    });

    return NextResponse.json(
      {
        message: 'Event request submitted successfully',
        request: eventRequest,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating event request:', error);
    return NextResponse.json(
      { error: 'Failed to submit event request' },
      { status: 500 },
    );
  }
}

// Optional: GET endpoint to fetch user's own requests
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 },
      );
    }

    // Get all event requests from this user
    const requests = await prisma.eventRequest.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ requests }, { status: 200 });
  } catch (error) {
    console.error('Error fetching event requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event requests' },
      { status: 500 },
    );
  }
}
