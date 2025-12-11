'use client';

import { Card, Badge } from 'react-bootstrap';
import { EventType } from '@/types/event';

export default function HomeEvent({ event }: { event: EventType }) {
  return (
    <Card
      className="mb-3"
      style={{
        backgroundColor: '#1a1a1a',
        border: '1px solid #76b900',
        boxShadow: '0 4px 16px rgba(118, 185, 0, 0.2)',
      }}
    >
      {/* Flyer image */}
      <div className="d-flex justify-content-center mt-2">
        <Card.Img
          variant="top"
          src={event.flyer}
          alt={event.title}
          style={{
            width: '200px',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '6px',
          }}
        />
      </div>

      <Card.Body>
        {/* Event Title */}
        <Card.Title
          style={{
            fontWeight: 'bold',
            color: '#76b900',
            textShadow: '0 0 8px rgba(118,185,0,0.4)',
          }}
        >
          {event.title}
        </Card.Title>

        {/* Date + Location */}
        <Card.Subtitle
          className="mb-2"
          style={{ color: '#b3b3b3', fontSize: '0.9rem' }}
        >
          {event.date}
          {' @ '}
          {event.location}
        </Card.Subtitle>

        {/* Description */}
        <Card.Text style={{ color: '#e6e6e6' }}>
          {event.description}
        </Card.Text>

        {/* Event Type Badge */}
        <Badge
          style={{
            background: 'linear-gradient(135deg, #76b900 0%, #39ff14 100%)',
            padding: '0.5rem 1rem',
            fontSize: '0.85rem',
            fontWeight: '600',
            color: '#0d0d0d',
            borderRadius: '20px',
            boxShadow: '0 2px 10px rgba(118,185,0,0.3)',
            border: 'none',
          }}
        >
          {event.type}
        </Badge>
      </Card.Body>
    </Card>
  );
}
