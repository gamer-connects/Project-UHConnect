'use client';

import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';

export default function AdminPage() {
  return (
    <main className="page-content" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div
        style={{
          maxWidth: '750px',
          margin: '0 auto',
        }}
      >
        <Card
          style={{
            backgroundColor: '#111',
            border: '2px solid #76b900', // GREEN BORDER
            borderRadius: '16px',
            padding: '30px',
            color: '#ffffff', // TEXT VISIBLE
            boxShadow: '0 0 25px rgba(118,185,0,0.35)', // GLOW EFFECT
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

            <Form className="mt-3">
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#ffffff' }}>Game Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Example: Valorant"
                  style={{ background: '#1a1a1a', color: '#fff' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#ffffff' }}>Game Type</Form.Label>
                <Form.Select style={{ background: '#1a1a1a', color: '#ffffff' }}>
                  <option value="">Select type</option>
                  <option value="FPS">FPS</option>
                  <option value="MOBA">MOBA</option>
                  <option value="RPG">RPG</option>
                  <option value="Fighting">Fighting</option>
                  <option value="Sports">Sports</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#ffffff' }}>Game Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="https://example.com/game.jpg"
                  style={{ background: '#1a1a1a', color: '#ffffff' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#ffffff' }}>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Describe the game..."
                  style={{ background: '#1a1a1a', color: '#ffffff' }}
                />
              </Form.Group>

              <Button className="w-100 btn-primary" style={{ fontWeight: 700 }}>
                Add Game
              </Button>
            </Form>
          </section>

          <hr style={{ borderColor: '#2d2d2d', margin: '35px 0' }} />

          {/* CREATE EVENT */}
          <section>
            <h4 style={{ color: '#76b900', fontWeight: 600 }}>Create Gaming Event</h4>

            <Form className="mt-3">
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#ffffff' }}>Event Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="UH Smash Tournament"
                  style={{ background: '#1a1a1a', color: '#ffffff' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#ffffff' }}>Event Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="https://example.com/event.jpg"
                  style={{ background: '#1a1a1a', color: '#ffffff' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#ffffff' }}>Date</Form.Label>
                <Form.Control
                  type="date"
                  style={{ background: '#1a1a1a', color: '#ffffff' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#ffffff' }}>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Event details..."
                  style={{ background: '#1a1a1a', color: '#ffffff' }}
                />
              </Form.Group>

              <Button className="w-100 btn-primary" style={{ fontWeight: 700 }}>
                Create Event
              </Button>
            </Form>
          </section>
        </Card>
      </div>
    </main>
  );
}
