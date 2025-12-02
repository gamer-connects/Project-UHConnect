'use client';

import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default function AdminPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #7b2cbf, #0066ff)',
        paddingTop: '100px', // SPACE BELOW HEADER
        paddingBottom: '100px', // SPACE ABOVE FOOTER
      }}
    >
      <div
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          background: 'white',
          padding: '35px',
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
        }}
      >
        <h2
          className="text-center"
          style={{ color: '#0066ff', marginBottom: '25px' }}
        >
          UHConnect Admin Panel
        </h2>

        {/* ADD GAME */}
        <section>
          <h4 style={{ color: '#7b2cbf' }}>Add New Game</h4>

          <Form className="mt-3">
            <Form.Group className="mb-3">
              <Form.Label>Game Name</Form.Label>
              <Form.Control type="text" placeholder="Example: Valorant" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Game Type</Form.Label>
              <Form.Select>
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
              <Form.Control type="text" placeholder="https://example.com/game.jpg" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Describe the game..." />
            </Form.Group>

            <Button
              style={{
                width: '100%',
                background: 'linear-gradient(90deg, #00c6ff, #7b2cbf)',
                border: 'none',
                fontWeight: 600,
              }}
            >
              Add Game
            </Button>
          </Form>
        </section>

        <hr className="my-4" />

        {/* CREATE EVENT */}
        <section>
          <h4 style={{ color: '#7b2cbf' }}>Create Gaming Event</h4>

          <Form className="mt-3">
            <Form.Group className="mb-3">
              <Form.Label>Event Title</Form.Label>
              <Form.Control type="text" placeholder="UH Smash Tournament" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Event Image URL</Form.Label>
              <Form.Control type="text" placeholder="https://example.com/event.jpg" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Event details..." />
            </Form.Group>

            <Button
              style={{
                width: '100%',
                background: 'linear-gradient(90deg, #00c6ff, #7b2cbf)',
                border: 'none',
                fontWeight: 600,
              }}
            >
              Create Event
            </Button>
          </Form>
        </section>
      </div>
    </main>
  );
}
