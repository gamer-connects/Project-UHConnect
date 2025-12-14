'use client';

import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  Col,
  Container,
  Row,
  Card,
  Badge,
  Button,
  Spinner,
} from 'react-bootstrap';
import Link from 'next/link';

interface Game {
  id: number;
  title: string;
  name?: string;
}

interface UserProfile {
  id: number;
  username: string;
  email: string;
  bio: string | null;
  profileImage: string | null;
  followers: number;
  following: number;
  gameInterestIds: number[];
  gameTags: string[];
}

const PublicProfilePage = () => {
  const { id } = useParams();
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        const profileRes = await fetch(`/api/profile/${userId}`);
        if (!profileRes.ok) {
          if (profileRes.status === 404) {
            setError('User not found');
          } else {
            setError('Failed to load profile');
          }
          return;
        }

        const profileData: UserProfile = await profileRes.json();

        const gamesRes = await fetch('/api/games');
        if (gamesRes.ok) {
          const gamesData: Game[] = await gamesRes.json();
          setGames(gamesData);
        }

        setProfile(profileData);
      } catch (err) {
        console.error(err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const getGameTitle = (gameId: number) => {
    const game = games.find((g) => g.id === gameId);
    return game?.title || game?.name || `Game #${gameId}`;
  };

  const isOwnProfile = session?.user?.id && parseInt(session.user.id, 10) === profile?.id;

  if (loading) {
    return (
      <main
        style={{
          minHeight: '100vh',
          background: '#0d0d0d',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spinner animation="border" style={{ color: '#76b900' }} />
      </main>
    );
  }

  if (error || !profile) {
    return (
      <main
        style={{
          minHeight: '100vh',
          background: '#0d0d0d',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p style={{ color: '#b3b3b3', fontSize: '1.5rem' }}>
          {error || 'Profile not found'}
        </p>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)',
        padding: '2rem 0',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 20% 30%, rgba(118, 185, 0, 0.1) 0%, transparent 50%), '
            + 'radial-gradient(circle at 80% 70%, rgba(57, 255, 20, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      <Container className="py-4" style={{ position: 'relative', zIndex: 1 }}>
        <Row className="justify-content-center mb-4">
          <Col md={10} lg={8}>
            <Card
              style={{
                borderRadius: '15px',
                boxShadow: '0 8px 32px rgba(118, 185, 0, 0.3)',
                border: '2px solid #76b900',
                backgroundColor: '#1a1a1a',
              }}
            >
              <Card.Body className="p-4">
                <Row className="align-items-center">
                  <Col xs={12} md={3} className="text-center mb-3 mb-md-0">
                    {/* FIXED: Changed from Image to img */}
                    <img
                      src={profile.profileImage || '/profile.png'}
                      alt={profile.username}
                      width={150}
                      height={150}
                      className="rounded-circle"
                      style={{
                        objectFit: 'cover',
                        border: '4px solid #76b900',
                        boxShadow: '0 0 20px rgba(118, 185, 0, 0.5)',
                      }}
                    />
                  </Col>
                  <Col xs={12} md={9}>
                    <h2
                      style={{
                        color: '#76b900',
                        fontWeight: 'bold',
                        textShadow: '0 0 10px rgba(118, 185, 0, 0.5)',
                      }}
                    >
                      {profile.username}
                    </h2>
                    <p style={{ color: '#b3b3b3' }} className="mb-3">
                      {profile.email}
                    </p>
                    <div className="d-flex gap-4 mb-3">
                      <div style={{ fontSize: '1.1rem' }}>
                        <strong style={{ color: '#76b900' }}>
                          {profile.followers}
                        </strong>
                        {' '}
                        <span style={{ color: '#b3b3b3' }}>Followers</span>
                      </div>
                      <div style={{ fontSize: '1.1rem' }}>
                        <strong style={{ color: '#76b900' }}>
                          {profile.following}
                        </strong>
                        {' '}
                        <span style={{ color: '#b3b3b3' }}>Following</span>
                      </div>
                    </div>

                    {isOwnProfile && (
                      <Link href="/profiles/edit">
                        <Button
                          style={{
                            background:
                              'linear-gradient(135deg, #76b900 0%, #39ff14 100%)',
                            border: 'none',
                            padding: '0.5rem 1.5rem',
                            fontWeight: '700',
                            color: '#0d0d0d',
                            boxShadow: '0 4px 15px rgba(118, 185, 0, 0.4)',
                          }}
                        >
                          Edit Profile
                        </Button>
                      </Link>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* About Me */}
        <Row className="justify-content-center mb-4">
          <Col md={10} lg={8}>
            <Card
              style={{
                borderRadius: '15px',
                boxShadow: '0 8px 32px rgba(118, 185, 0, 0.2)',
                border: '1px solid #76b900',
                backgroundColor: '#1a1a1a',
              }}
            >
              <Card.Body className="p-4">
                <h4
                  style={{
                    color: '#76b900',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                  }}
                >
                  About Me
                </h4>
                <p style={{ color: '#b3b3b3', lineHeight: '1.6' }}>
                  {profile.bio || 'No bio yet.'}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Game Interests */}
        <Row className="justify-content-center mb-4">
          <Col md={10} lg={8}>
            <Card
              style={{
                borderRadius: '15px',
                boxShadow: '0 8px 32px rgba(118, 185, 0, 0.2)',
                border: '1px solid #76b900',
                backgroundColor: '#1a1a1a',
              }}
            >
              <Card.Body className="p-4">
                <h4
                  style={{
                    color: '#76b900',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                  }}
                >
                  Game Interests
                </h4>
                <div className="d-flex flex-wrap gap-2">
                  {profile.gameInterestIds.length > 0 ? (
                    profile.gameInterestIds.map((gameId) => (
                      <Badge
                        key={gameId}
                        style={{
                          background:
                            'linear-gradient(135deg, #76b900 0%, #39ff14 100%)',
                          padding: '0.5rem 1rem',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          borderRadius: '20px',
                          color: '#0d0d0d',
                          boxShadow: '0 2px 10px rgba(118, 185, 0, 0.3)',
                        }}
                      >
                        {getGameTitle(gameId)}
                      </Badge>
                    ))
                  ) : (
                    <p style={{ color: '#666' }}>No game interests added yet</p>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Gaming Preferences */}
        <Row className="justify-content-center mb-4">
          <Col md={10} lg={8}>
            <Card
              style={{
                borderRadius: '15px',
                boxShadow: '0 8px 32px rgba(118, 185, 0, 0.2)',
                border: '1px solid #76b900',
                backgroundColor: '#1a1a1a',
              }}
            >
              <Card.Body className="p-4">
                <h4
                  style={{
                    color: '#76b900',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                  }}
                >
                  Gaming Preferences
                </h4>
                <div className="d-flex flex-wrap gap-2">
                  {profile.gameTags.length > 0 ? (
                    profile.gameTags.map((tag) => (
                      <Badge
                        key={tag}
                        style={{
                          background:
                            'linear-gradient(135deg, #76b900 0%, #39ff14 100%)',
                          padding: '0.5rem 1rem',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          borderRadius: '20px',
                          color: '#0d0d0d',
                          boxShadow: '0 2px 10px rgba(118, 185, 0, 0.3)',
                        }}
                      >
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <p style={{ color: '#666' }}>
                      No gaming preferences added yet
                    </p>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default PublicProfilePage;
