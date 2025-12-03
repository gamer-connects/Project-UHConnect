'use client';

import { Card, Badge } from 'react-bootstrap';

type EventProps = {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  flyer: string; // URL to flyer image
  type: string; // e.g., "Tournament", "Meetup"
};

const HomeEvent = ({ event }: { event: EventProps }) => (
  <Card
    className="mb-3"
    style={{
      backgroundColor: '#1a1a1a',
      border: '1px solid #76b900',
      boxShadow: '0 4px 16px rgba(118, 185, 0, 0.2)',
    }}
  >
    <div className="d-flex justify-content-center mt-2">
      <Card.Img
        variant="top"
        src={event.flyer}
        alt={event.title}
        style={{ width: '200px', height: 'auto', objectFit: 'cover' }}
      />
    </div>
    <Card.Body>
      <Card.Title style={{ fontWeight: 'bold', color: '#76b900' }}>
        {event.title}
      </Card.Title>
      <Card.Subtitle className="mb-2" style={{ color: '#b3b3b3' }}>
        {event.date}
        {' '}
        @
        {' '}
        {event.location}
      </Card.Subtitle>
      <Card.Text style={{ color: '#ffffff' }}>{event.description}</Card.Text>
      <Badge
        style={{
          background: 'linear-gradient(135deg, #76b900 0%, #39ff14 100%)',
          padding: '0.5rem 1rem',
          fontSize: '0.9rem',
          fontWeight: '600',
          borderRadius: '20px',
          color: '#0d0d0d',
          boxShadow: '0 2px 10px rgba(118, 185, 0, 0.3)',
          border: 'none',
        }}
      >
        {event.type}
      </Badge>
    </Card.Body>
  </Card>
);

export default HomeEvent;
