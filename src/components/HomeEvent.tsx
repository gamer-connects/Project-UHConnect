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
  <Card className="mb-3">
    <div className="d-flex justify-content-center mt-2">
      <Card.Img
        variant="top"
        src={event.flyer}
        alt={event.title}
        style={{ width: '200px', height: 'auto', objectFit: 'cover' }}
      />
    </div>
    <Card.Body>
      <Card.Title style={{ fontWeight: 'bold', color: '#1E90FF' }}>
        {event.title}
      </Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        {event.date}
        {' '}
        @
        {' '}
        {event.location}
      </Card.Subtitle>
      <Card.Text>{event.description}</Card.Text>
      <Badge bg="primary">{event.type}</Badge>
    </Card.Body>
  </Card>
);

export default HomeEvent;
