'use client';

import { useState, useEffect } from 'react';
import './usersearch.css';
import {
  Col,
  Container,
  Row,
  Form,
  InputGroup,
  Button,
  Card,
  Badge,
  Spinner,
} from 'react-bootstrap';
import { searchUsers } from '@/lib/dbActions';
import Link from 'next/link';
import { useSession } from 'next-auth/react'; // ADD THIS IMPORT

type User = {
  id: number;
  email: string;
  username: string;
  bio: string | null;
  profileImage: string | null;
  gameInterestIds: number[];
  gameTags: string[];
  followers: number;
  following: number;
  role: string;
};

type Game = {
  id: number;
  title: string;
  type: string;
  image: string;
};

export default function UserSearch() {
  const { data: session } = useSession(); // ADD THIS LINE
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const [selectedGameTitle, setSelectedGameTitle] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('/api/games');
        if (response.ok) {
          const gamesData: Game[] = await response.json();
          setAllGames(gamesData);
        }
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };
    fetchGames();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await searchUsers(searchQuery, selectedGameId);
      setUsers(results);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGameId]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleGameClick = (game: Game) => {
    if (selectedGameId === game.id) {
      setSelectedGameId(null);
      setSelectedGameTitle(null);
    } else {
      setSelectedGameId(game.id);
      setSelectedGameTitle(game.title);
    }
  };

  const getGameTitles = (gameIds: number[]): string[] => gameIds
    .map((id) => allGames.find((game) => game.id === id)?.title)
    .filter(Boolean) as string[];

  const getResultsTitle = () => {
    if (selectedGameTitle && searchQuery) {
      return `"${searchQuery}" in ${selectedGameTitle}`;
    }
    if (selectedGameTitle) {
      return `Players in ${selectedGameTitle}`;
    }
    if (searchQuery) {
      return `Results for "${searchQuery}"`;
    }
    return 'All Users';
  };

  // ADD THIS HELPER FUNCTION
  const getProfileLink = (userId: number) => {
    const currentUserId = session?.user?.id ? parseInt(session.user.id, 10) : null;
    // If viewing own profile, redirect to /profiles instead of /profiles/[id]
    return currentUserId === userId ? '/profiles' : `/profiles/${userId}`;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center mt-5">
          <Spinner animation="border" style={{ color: '#76b900' }} />
          <p className="mt-3" style={{ color: '#b3b3b3' }}>Loading users...</p>
        </div>
      );
    }
    if (users.length === 0) {
      return (
        <div className="text-center mt-5">
          <p className="lead" style={{ color: '#b3b3b3' }}>No users found</p>
        </div>
      );
    }

    return (
      <Row className="g-4">
        {users.map((user) => {
          const userGameTitles = getGameTitles(user.gameInterestIds);
          const currentUserId = session?.user?.id ? parseInt(session.user.id, 10) : null;
          const isOwnProfile = currentUserId === user.id;

          return (
            <Col key={user.id} md={6} lg={12} xl={6}>
              <Card
                style={{
                  backgroundColor: '#1a1a1a',
                  border: isOwnProfile ? '2px solid #39ff14' : '2px solid #76b900', // Highlight own profile
                  boxShadow: '0 4px 16px rgba(118, 185, 0, 0.2)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(118, 185, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(118, 185, 0, 0.2)';
                }}
              >
                <Card.Body>
                  <div className="d-flex align-items-start mb-3">
                    <img
                      src={user.profileImage || '/profile.png'}
                      alt={user.username}
                      width={60}
                      height={60}
                      className="rounded-circle"
                      style={{
                        objectFit: 'cover',
                        border: '3px solid #76b900',
                        marginRight: '1rem',
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <Card.Title
                        className="mb-1"
                        style={{
                          color: '#76b900',
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                        }}
                      >
                        {user.username}
                        {isOwnProfile && (
                          <Badge
                            style={{
                              marginLeft: '0.5rem',
                              background: 'linear-gradient(135deg, #39ff14 0%, #76b900 100%)',
                              color: '#0d0d0d',
                              fontSize: '0.7rem',
                            }}
                          >
                            YOU
                          </Badge>
                        )}
                      </Card.Title>
                      <Card.Text style={{ color: '#b3b3b3', fontSize: '0.85rem' }}>
                        {user.email}
                      </Card.Text>
                      <div className="d-flex gap-3 mb-2">
                        <span style={{ color: '#b3b3b3', fontSize: '0.9rem' }}>
                          <strong style={{ color: '#76b900' }}>{user.followers}</strong>
                          {' '}
                          Followers
                        </span>
                        <span style={{ color: '#b3b3b3', fontSize: '0.9rem' }}>
                          <strong style={{ color: '#76b900' }}>{user.following}</strong>
                          {' '}
                          Following
                        </span>
                      </div>
                    </div>
                  </div>

                  {user.bio && (
                    <Card.Text
                      className="mb-3"
                      style={{
                        color: '#b3b3b3',
                        fontSize: '0.9rem',
                        lineHeight: '1.5',
                      }}
                    >
                      {user.bio.length > 100 ? `${user.bio.substring(0, 100)}...` : user.bio}
                    </Card.Text>
                  )}

                  {userGameTitles.length > 0 && (
                    <div className="mb-3">
                      <div className="d-flex flex-wrap gap-2">
                        {userGameTitles.slice(0, 3).map((game) => (
                          <Badge
                            key={game}
                            style={{
                              background: 'linear-gradient(135deg, #76b900 0%, #39ff14 100%)',
                              color: '#0d0d0d',
                              padding: '0.3rem 0.6rem',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                            }}
                          >
                            {game}
                          </Badge>
                        ))}
                        {userGameTitles.length > 3 && (
                          <Badge
                            style={{
                              backgroundColor: '#2d2d2d',
                              color: '#76b900',
                              padding: '0.3rem 0.6rem',
                              fontSize: '0.75rem',
                            }}
                          >
                            +
                            {userGameTitles.length - 3}
                            more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {user.gameTags.length > 0 && (
                    <div className="mb-3">
                      <div className="d-flex flex-wrap gap-2">
                        {user.gameTags.slice(0, 4).map((tag) => (
                          <Badge
                            key={tag}
                            style={{
                              backgroundColor: '#2d2d2d',
                              color: '#76b900',
                              border: '1px solid #76b900',
                              padding: '0.3rem 0.6rem',
                              fontSize: '0.75rem',
                            }}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="d-flex justify-content-between align-items-center">
                    <Badge
                      style={{
                        backgroundColor: user.role === 'ADMIN' ? '#ff6b6b' : '#2d2d2d',
                        color: user.role === 'ADMIN' ? '#fff' : '#76b900',
                        border: user.role === 'ADMIN' ? 'none' : '1px solid #76b900',
                        padding: '0.4rem 0.8rem',
                      }}
                    >
                      {user.role}
                    </Badge>

                    {/* UPDATED: Use dynamic link based on whether it's own profile */}
                    <Link href={getProfileLink(user.id)}>
                      <Button
                        size="sm"
                        style={{
                          background: isOwnProfile
                            ? 'linear-gradient(135deg, #39ff14 0%, #76b900 100%)'
                            : 'linear-gradient(135deg, #76b900 0%, #39ff14 100%)',
                          border: 'none',
                          color: '#0d0d0d',
                          fontWeight: '600',
                        }}
                      >
                        {isOwnProfile ? 'View My Profile' : 'View Profile'}
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  };

  return (
    <div className="user-search-landing">
      <Container fluid className="py-5">
        <Row>
          <Col lg={5} xl={4} className="left-sidebar pe-lg-4">
            <div className="text-center text-lg-start mb-5">
              <h1 className="display-5 fw-bold">User Search</h1>
              <p className="lead opacity-90">Find gamers across the network</p>
            </div>

            <div className="search-card mb-4">
              <InputGroup size="lg">
                <Form.Control
                  type="text"
                  placeholder="Username or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="border-0 py-3 shadow-none"
                />
                <Button variant="success" onClick={handleSearch} disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : 'Search'}
                </Button>
              </InputGroup>
            </div>

            {selectedGameTitle && (
              <div className="mb-3">
                <Badge
                  style={{
                    background: 'linear-gradient(135deg, #76b900 0%, #39ff14 100%)',
                    color: '#0d0d0d',
                    padding: '0.5rem 1rem',
                    fontSize: '1rem',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setSelectedGameId(null);
                    setSelectedGameTitle(null);
                  }}
                >
                  {selectedGameTitle}
                  ✕
                </Badge>
              </div>
            )}

            <h4 className="mb-4 game-filter-title">Filter by Game</h4>
            <div className="game-grid-sidebar">
              {allGames.map((game) => (
                <div
                  key={game.id}
                  role="button"
                  tabIndex={0}
                  className={`game-card-sidebar ${selectedGameId === game.id ? 'active' : ''}`}
                  onClick={() => handleGameClick(game)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGameClick(game)}
                >
                  <img src={game.image} alt={game.title} />
                  <div className="game-name-overlay">{game.title}</div>
                </div>
              ))}
            </div>
          </Col>

          <Col lg={7} xl={8} className="ps-lg-5">
            <div className="results-area">
              <h2 className="mb-4">{getResultsTitle()}</h2>
              {renderContent()}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
