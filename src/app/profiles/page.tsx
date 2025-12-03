'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  Col, Container, Row, Card, Badge, Button, Spinner,
} from 'react-bootstrap';
import Image from 'next/image';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  bio: string | null;
  profileImage: string | null;
  followers: number;
  following: number;
  gameInterests: string[];
  gameTags: string[];
}

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      // Wait for session to load
      if (status === 'loading') return;

      // Check if user is logged in and has an ID
      if (!session?.user?.id) {
        setError('Please log in to view your profile');
        setLoading(false);
        return;
      }

      try {
        // Fetch user by ID from session
        const res = await fetch(`/api/profile/${session.user.id}`);
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data: UserProfile = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session, status]);

  if (loading || status === 'loading') {
    return (
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Spinner animation="border" variant="light" />
      </main>
    );
  }

  if (error || !profile) {
    return (
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div className="text-center">
          <p className="text-white">{error || 'Profile not found'}</p>
          {!session && (
            <Button
              href="/auth/signin"
              style={{
                marginTop: '1rem',
                background: 'white',
                color: '#667eea',
              }}
            >
              Sign In
            </Button>
          )}
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '2rem 0',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container id="profile-page" className="py-4">
        {/* Profile Header */}
        <Row className="justify-content-center mb-4">
          <Col md={10} lg={8}>
            <Card
              style={{
                borderRadius: '15px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                border: 'none',
              }}
            >
              <Card.Body className="p-4">
                <Row className="align-items-center">
                  <Col xs={12} md={3} className="text-center mb-3 mb-md-0">
                    <Image
                      src={profile.profileImage || '/profile.png'}
                      alt="Profile"
                      width={150}
                      height={150}
                      className="rounded-circle"
                      style={{ objectFit: 'cover', border: '4px solid #667eea' }}
                    />
                  </Col>
                  <Col xs={12} md={9}>
                    <h2 style={{ color: '#333', fontWeight: 'bold' }}>
                      {profile.username}
                    </h2>
                    <p className="text-muted mb-3">{profile.email}</p>
                    <div className="d-flex gap-4 mb-3">
                      <div style={{ fontSize: '1.1rem' }}>
                        <strong style={{ color: '#667eea' }}>
                          {profile.followers}
                        </strong>
                        {' '}
                        <span className="text-muted">Followers</span>
                      </div>
                      <div style={{ fontSize: '1.1rem' }}>
                        <strong style={{ color: '#667eea' }}>
                          {profile.following}
                        </strong>
                        {' '}
                        <span className="text-muted">Following</span>
                      </div>
                    </div>
                    <Button
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        padding: '0.5rem 1.5rem',
                        fontWeight: '500',
                      }}
                    >
                      Edit Profile
                    </Button>
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
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                border: 'none',
              }}
            >
              <Card.Body className="p-4">
                <h4
                  style={{
                    color: '#333',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                  }}
                >
                  About Me
                </h4>
                <p style={{ color: '#555', lineHeight: '1.6' }}>
                  {profile.bio || 'No bio yet. Click Edit Profile to add one!'}
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
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                border: 'none',
              }}
            >
              <Card.Body className="p-4">
                <h4
                  style={{
                    color: '#333',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                  }}
                >
                  Game Interests
                </h4>
                <div className="d-flex flex-wrap gap-2">
                  {profile.gameInterests.length ? (
                    profile.gameInterests.map((game) => (
                      <Badge
                        key={game}
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          padding: '0.5rem 1rem',
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          borderRadius: '20px',
                        }}
                      >
                        {game}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-muted">No game interests added yet</p>
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
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                border: 'none',
              }}
            >
              <Card.Body className="p-4">
                <h4
                  style={{
                    color: '#333',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                  }}
                >
                  Gaming Preferences
                </h4>
                <div className="d-flex flex-wrap gap-2">
                  {profile.gameTags.length ? (
                    profile.gameTags.map((tag) => (
                      <Badge
                        key={tag}
                        style={{
                          padding: '0.5rem 1rem',
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          borderRadius: '20px',
                          backgroundColor: '#6c757d',
                        }}
                      >
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-muted">No gaming preferences added yet</p>
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

export default ProfilePage;
