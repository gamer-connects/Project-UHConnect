'use client';

import { useState } from 'react';
import './usersearch.css';
import {
  Col,
  Container,
  Row,
  Form,
  InputGroup,
  Button,
} from 'react-bootstrap';

const games = [
  { name: 'Valorant', cover: '/covers/valorant.jpg' },
  { name: 'League of Legends', cover: '/covers/lol.jpg' },
  { name: 'Fortnite', cover: '/covers/fortnite.jpg' },
  { name: 'Overwatch 2', cover: '/covers/overwatch.jpg' },
  { name: 'Minecraft', cover: '/covers/minecraft.jpg' },
  { name: 'Apex Legends', cover: '/covers/apex.jpg' },
  { name: 'CS2', cover: '/covers/cs2.jpg' },
  { name: 'Genshin Impact', cover: '/covers/genshin.jpg' },
  { name: 'Rocket League', cover: '/covers/rocketleague.jpg' },
  { name: 'Dota 2', cover: '/covers/dota2.jpg' },
] as const;

export default function UserSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const handleGameClick = (gameName: string) => {
    setSelectedGame(selectedGame === gameName ? null : gameName);
  };

  return (
    <div className="user-search-landing">
      <Container fluid className="py-5">
        <Row>
          {/* ─────── LEFT SIDEBAR ─────── */}
          <Col lg={5} xl={4} className="left-sidebar pe-lg-4">
            {/* Hero */}
            <div className="text-center text-lg-start mb-5">
              <h1 className="display-5 fw-bold">User Search</h1>
              <p className="lead opacity-90">Find gamers across the network</p>
            </div>

            {/* Search Bar */}
            <div className="search-card mb-4">
              <InputGroup size="lg">
                <Form.Control
                  type="text"
                  placeholder="Username, email, or tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 py-3 shadow-none"
                />
                <Button variant="success">Search</Button>
              </InputGroup>
            </div>

            {/* Game Filter Grid */}
            <h4 className="mb-4 game-filter-title">Filter by Game</h4>
            <div className="game-grid-sidebar">
              {games.map((game) => (
                <div
                  key={game.name}
                  role="button"
                  tabIndex={0}
                  className={`game-card-sidebar ${selectedGame === game.name ? 'active' : ''}`}
                  onClick={() => handleGameClick(game.name)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGameClick(game.name)}
                >
                  <img src={game.cover} alt={game.name} />
                  <div className="game-name-overlay">{game.name}</div>
                </div>
              ))}
            </div>
          </Col>

          {/* ─────── RIGHT RESULTS AREA ─────── */}
          <Col lg={7} xl={8} className="ps-lg-5">
            <div className="results-area">
              <h2 className="mb-4">
                {(() => {
                  if (selectedGame) return `Players in ${selectedGame}`;
                  if (searchQuery) return `Results for "${searchQuery}"`;
                  return 'Search for players or pick a game';
                })()}
              </h2>

              <div className="placeholder-glow">
                <p className="lead text-center mt-5">
                  {selectedGame || searchQuery
                    ? 'Results will appear here instantly...'
                    : 'Start typing or select a game to see players'}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
