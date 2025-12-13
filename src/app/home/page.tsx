'use client';

import { useEffect, useState } from 'react';
import HomeEvent from '@/components/HomeEvent';
import HomePost from '@/components/HomePost';
import { Col, Row } from 'react-bootstrap';
import { EventType } from '@/types/event';

export default function HomePage() {
  // ===============================
  // STATE FOR EVENTS
  // ===============================
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  // ===============================
  // FETCH EVENTS FROM API (NO CACHE)
  // ===============================
  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch('/api/events', {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  // ===============================
  // SAMPLE POSTS (STATIC FOR NOW)
  // ===============================
  const samplePost = {
    id: 1,
    username: 'andrew123',
    content: 'This is my first post! My favorite game is Minecraft!',
    image: 'https://avatars.githubusercontent.com/u/229228841?v=4',
    tags: ['minecraft', 'server', 'survival'],
  };

  const samplePost2 = {
    id: 2,
    username: 'FunHaverBob',
    content: 'I love playing Valorant with friends! Anyone up for a match?',
    image: 'https://i.etsystatic.com/49980402/r/il/a4db6e/5759608293/il_570xN.5759608293_p54b.jpg',
    tags: ['valorant', 'LFG'],
  };

  return (
    <main
      className="page-content"
      style={{
        paddingTop: '120px',
        paddingBottom: '120px',
        position: 'relative',
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 30% 20%, rgba(118,185,0,0.08) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(57,255,20,0,0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h1
          className="text-center mb-5"
          style={{
            color: '#76b900',
            fontWeight: 'bold',
            textShadow: '0 0 20px rgba(118,185,0,0.5)',
            fontSize: '3rem',
          }}
        >
          Home
        </h1>

        <Row className="g-4">
          {/* ============================ */}
          {/* POSTS SECTION */}
          {/* ============================ */}
          <Col md={6}>
            <div
              style={{
                backgroundColor: '#1a1a1a',
                border: '2px solid #76b900',
                boxShadow: '0 8px 32px rgba(118,185,0,0.25)',
              }}
              className="p-3 rounded"
            >
              <h2
                className="text-center mb-3"
                style={{
                  color: '#76b900',
                  fontWeight: 'bold',
                  textShadow: '0 0 10px rgba(118,185,0,0.3)',
                }}
              >
                Browse Posts
              </h2>

              <HomePost post={samplePost} />
              <HomePost post={samplePost2} />
            </div>
          </Col>

          {/* ============================ */}
          {/* EVENTS SECTION */}
          {/* ============================ */}
          <Col md={6}>
            <div
              style={{
                backgroundColor: '#1a1a1a',
                border: '2px solid #76b900',
                boxShadow: '0 8px 32px rgba(118,185,0,0.25)',
              }}
              className="p-3 rounded"
            >
              <h2
                className="text-center mb-3"
                style={{
                  color: '#76b900',
                  fontWeight: 'bold',
                  textShadow: '0 0 10px rgba(118,185,0,0.3)',
                }}
              >
                Events
              </h2>

              {loading && (
                <p className="text-center" style={{ color: '#aaa' }}>
                  Loading events...
                </p>
              )}

              {!loading && events.length === 0 && (
                <p className="text-center" style={{ color: '#aaa' }}>
                  No events yet.
                </p>
              )}

              {events.map((event) => (
                <HomeEvent key={event.id} event={event} />
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </main>
  );
}
