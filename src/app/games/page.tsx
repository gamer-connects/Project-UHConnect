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
        background: 'linear-gradient(135deg, #1E90FF 0%, #8A2BE2 100%)',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <Container className="py-5">
        <h1 className="text-center mb-4 pb-4 fw-bold text-white">Games</h1>

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
