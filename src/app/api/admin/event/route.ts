import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // BASIC VALIDATION
    if (!body.title || !body.date || !body.location || !body.flyer || !body.type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title: body.title,
        date: new Date(body.date),
        location: body.location,
        description: body.description || '',
        flyer: body.flyer,
        type: body.type,
      },
    });

    return NextResponse.json(event);
  } catch (err) {
    console.error('ADD_EVENT_ERROR:', err);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
