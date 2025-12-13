'use client';

import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import swal from 'sweetalert';

export default function AdminPage() {
  // GAME STATE
  const [game, setGame] = useState({
    title: '',
    type: '',
    image: '',
    description: '',
  });

  // EVENT STATE
  const [event, setEvent] = useState({
    title: '',
    flyer: '',
    date: '',
    location: '',
    type: '',
    description: '',
  });

  // SUBMIT GAME
  const submitGame = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/admin/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game),
    });

    const data = await res.json();

    if (res.ok) {
      swal('Success', 'Game added successfully!', 'success');
      setGame({ title: '', type: '', image: '', description: '' });
    } else {
      swal('Error', data.error || 'Failed to add game', 'error');
    }
  };

  // SUBMIT EVENT
  const submitEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/admin/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });

    const data = await res.json();

    if (res.ok) {
      swal('Success', 'Event created successfully!', 'success');
      setEvent({
        title: '',
        flyer: '',
        date: '',
        location: '',
        type: '',
        description: '',
      });
    } else {
      swal('Error', data.error || 'Failed to create event', 'error');
    }
  };

  return (
    <main className="page-content" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div style={{ maxWidth: '750px', margin: '0 auto' }}>
        <Card
          style={{
            backgroundColor: '#111',
            border: '2px solid #76b900',
            borderRadius: '16px',
            padding: '30px',
            color: '#ffffff',
            boxShadow: '0 0 25px rgba(118,185,0,0.35)',
          }}
        >
          <h2
            className="text-center"
            style={{
              color: '#76b900',
              fontWeight: 700,
              marginBottom: '30px',
              textShadow: '0 0 12px rgba(118,185,0,0.6)',
            }}
          >
            UH Connect Admin Panel
          </h2>

          {/* ADD GAME */}
          <section>
            <h4 style={{ color: '#76b900', fontWeight: 600 }}>Add New Game</h4>

            <Form className="mt-3" onSubmit={submitGame}>
              <Form.Group className="mb-3">
                <Form.Label>Game Title</Form.Label>
                <Form.Control
                  type="text"
                  value={game.title}
                  onChange={(e) => setGame({ ...game, title: e.target.value })}
                  required
                  style={{ background: '#1a1a1a', color: '#fff' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Game Type</Form.Label>
                <Form.Select
                  value={game.type}
                  onChange={(e) => setGame({ ...game, type: e.target.value })}
                  required
                  style={{ background: '#1a1a1a', color: '#fff' }}
                >
                  <option value="">Select type</option>
                  <option value="FPS">FPS</option>
                  <option value="MOBA">MOBA</option>
                  <option value="RPG">RPG</option>
                  <option value="Fighting">Fighting</option>
                  <option value="Sports">Sports</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Game Image URL</Form.Label>
                <Form.Control
                  type="text"
                  value={game.image}
                  onChange={(e) => setGame({ ...game, image: e.target.value })}
                  required
                  style={{ background: '#1a1a1a', color: '#fff' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={game.description}
                  onChange={(e) => setGame({ ...game, description: e.target.value })}
                  style={{ background: '#1a1a1a', color: '#fff' }}
                />
              </Form.Group>

              <Button type="submit" className="w-100 btn-primary fw-bold">
                Add Game
              </Button>
            </Form>
          </section>

          <hr style={{ borderColor: '#2d2d2d', margin: '35px 0' }} />

          {/* CREATE EVENT */}
          <section>
            <h4 style={{ color: '#76b900', fontWeight: 600 }}>Create Gaming Event</h4>

            <Form className="mt-3" onSubmit={submitEvent}>
              <Form.Group className="mb-3">
                <Form.Label>Event Title</Form.Label>
                <Form.Control
                  type="text"
                  value={event.title}
                  onChange={(e) => setEvent({ ...event, title: e.target.value })}
                  required
                  style={{ background: '#1a1a1a', color: '#fff' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Flyer Image URL</Form.Label>
                <Form.Control
                  type="text"
                  value={event.flyer}
                  onChange={(e) => setEvent({ ...event, flyer: e.target.value })}
                  required
                  style={{ background: '#1a1a1a', color: '#fff' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={event.date}
                  onChange={(e) => setEvent({ ...event, date: e.target.value })}
                  required
                  style={{ background: '#1a1a1a', color: '#fff' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  value={event.location}
                  onChange={(e) => setEvent({ ...event, location: e.target.value })}
                  placeholder="UH iLab, Online Server, Campus Center…"
                  required
                  style={{ background: '#1a1a1a', color: '#fff' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event Type</Form.Label>
                <Form.Select
                  value={event.type}
                  onChange={(e) => setEvent({ ...event, type: e.target.value })}
                  required
                  style={{ background: '#1a1a1a', color: '#fff' }}
                >
                  <option value="">Select Type</option>
                  <option value="Tournament">Tournament</option>
                  <option value="LAN Party">LAN Party</option>
                  <option value="Meetup">Meetup</option>
                  <option value="Online Event">Online Event</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={event.description}
                  onChange={(e) => setEvent({ ...event, description: e.target.value })}
                  style={{ background: '#1a1a1a', color: '#fff' }}
                />
              </Form.Group>

              <Button type="submit" className="w-100 btn-primary fw-bold">
                Create Event
              </Button>
            </Form>
          </section>
        </Card>
      </div>
    </main>
  );
}
