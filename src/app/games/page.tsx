'use client';

import React from 'react';
import GameCard from '@/components/GameCard';
import { Container, Row, Col } from 'react-bootstrap';

const games = [
  {
    title: 'Minecraft',
    image: '/games/minecraft.jpg',
    href: '/games/minecraft',
  },
  {
    title: 'Valorant',
    image: '/games/valorant.jpg',
    href: '/games/valorant',
  },
];

export default function GamesPage() {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)',
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Background glow effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 30% 20%, rgba(118, 185, 0, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 70% 80%, rgba(57, 255, 20, 0.05) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
      }}
      />

      <Container className="py-5" style={{ position: 'relative', zIndex: 1 }}>
        <h1
          className="text-center mb-4 pb-4 fw-bold"
          style={{
            color: '#76b900',
            textShadow: '0 0 20px rgba(118, 185, 0, 0.5)',
            fontSize: '3rem',
          }}
        >
          Games
        </h1>

        <Row className="g-4" xs={1} sm={2} md={3} lg={4}>
          {games.map((game) => (
            <Col key={game.title} className="d-flex justify-content-center">
              <GameCard
                title={game.title}
                image={game.image}
                href={game.href}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
