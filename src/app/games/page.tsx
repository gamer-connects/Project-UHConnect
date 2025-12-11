'use client';

import React, { useEffect, useState } from 'react';
import GameCard from '@/components/GameCard';
import { Container, Row, Col } from 'react-bootstrap';

interface Game {
  id: number;
  title: string;
  image: string;
}

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/games')
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center text-light py-5">
        Loading games...
      </div>
    );
  }

  return (
    <div
      style={{
        background:
          'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)',
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <Container className="py-5">
        <h1
          className="text-center mb-4 fw-bold"
          style={{ color: '#76b900' }}
        >
          Games
        </h1>

        <Row className="g-4" xs={1} sm={2} md={3} lg={4}>
          {games.map((game) => (
            <Col key={game.id} className="d-flex justify-content-center">
              <GameCard
                title={game.title}
                image={game.image}
                href={`/games/${game.title.toLowerCase()}`}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
