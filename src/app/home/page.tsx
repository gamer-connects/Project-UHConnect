'use client';

import { useEffect, useState } from 'react';
import HomeEvent from '@/components/HomeEvent';
import HomePost from '@/components/HomePost';
import { Col, Row } from 'react-bootstrap';
import { EventType } from '@/types/event';
import { PostType } from '@/types/post'; // create this type if you don't have it yet

export default function HomePage() {
  // ===============================
  // STATE
  // ===============================
  const [events, setEvents] = useState<EventType[]>([]);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // ===============================
  // FETCH EVENTS
  // ===============================
  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch('/api/events', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch events');
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setLoadingEvents(false);
      }
    }
    loadEvents();
  }, []);

  // ===============================
  // FETCH POSTS
  // ===============================
  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch('/api/posts', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setLoadingPosts(false);
      }
    }
    loadPosts();
  }, []);

  return (
    <main className="page-content" style={{ paddingTop: '120px', paddingBottom: '120px', position: 'relative' }}>
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
          {/* POSTS SECTION */}
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

              {loadingPosts && (
                <p className="text-center" style={{ color: '#aaa' }}>
                  Loading posts...
                </p>
              )}

              {!loadingPosts && posts.length === 0 && (
                <p className="text-center" style={{ color: '#aaa' }}>
                  No posts yet.
                </p>
              )}

              {!loadingPosts
                && posts.map((post) => (
                  <HomePost key={post.id} post={post} />
                ))}
            </div>
          </Col>

          {/* EVENTS SECTION */}
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

              {loadingEvents && (
                <p className="text-center" style={{ color: '#aaa' }}>
                  Loading events...
                </p>
              )}

              {!loadingEvents && events.length === 0 && (
                <p className="text-center" style={{ color: '#aaa' }}>
                  No events yet.
                </p>
              )}

              {!loadingEvents
                && events.map((event) => <HomeEvent key={event.id} event={event} />)}
            </div>
          </Col>
        </Row>
      </div>
    </main>
  );
}
