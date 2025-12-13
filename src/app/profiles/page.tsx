'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  Col, Container, Row, Card, Badge, Button, Spinner,
} from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';

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
      if (status === 'loading') return;

      if (!session?.user?.id) {
        setError('Please log in to view your profile');
        setLoading(false);
        return;
      }

      try {
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

  // Loading State
  if (loading || status === 'loading') {
    return (
      <main
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spinner animation="border" style={{ color: '#76b900' }} />
      </main>
    );
  }

  // Error / Not Logged In
  if (error || !profile) {
    return (
      <main
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(118, 185, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(57, 255, 20, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
        />
        <div className="text-center" style={{ zIndex: 1 }}>
          <p style={{ color: '#b3b3b3', fontSize: '1.2rem' }}>
            {error || 'Profile not found'}
          </p>
          {!session && (
            <Button
              href="/auth/signin"
              style={{
                background: 'linear-gradient(135deg, #76b900 0%, #39ff14 100%)',
                border: 'none',
                padding: '0.7rem 2rem',
                fontWeight: '700',
                color: '#0d0d0d',
                boxShadow: '0 4px 15px rgba(118, 185, 0, 0.4)',
                marginTop: '1.5rem',
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
        background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)',
        padding: '2rem 0',
        position: 'relative',
      }}
    >
      {/* Subtle glowing background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(118, 185, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(57, 255, 20, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />

      <Container id="profile-page" className="py-4" style={{ position: 'relative', zIndex: 1 }}>
        {/* Profile Header */}
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
                    <Image
                      src={profile.profileImage || '/profile.png'}
                      alt="Profile"
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
                        <strong style={{ color: '#76b900' }}>{profile.followers}</strong>
                        {' '}
                        <span style={{ color: '#b3b3b3' }}>Followers</span>
                      </div>
                      <div style={{ fontSize: '1.1rem' }}>
                        <strong style={{ color: '#76b900' }}>{profile.following}</strong>
                        {' '}
                        <span style={{ color: '#b3b3b3' }}>Following</span>
                      </div>
                    </div>
                    <Link href="/profiles/edit">
                      <Button
                        style={{
                          background: 'linear-gradient(135deg, #76b900 0%, #39ff14 100%)',
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
                <h4 style={{ color: '#76b900', fontWeight: 'bold', marginBottom: '1rem' }}>
                  About Me
                </h4>
                <p style={{ color: '#b3b3b3', lineHeight: '1.6' }}>
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
                boxShadow: '0 8px 32px rgba(118, 185, 0, 0.2)',
                border: '1px solid #76b900',
                backgroundColor: '#1a1a1a',
              }}
            >
              <Card.Body className="p-4">
                <h4 style={{ color: '#76b900', fontWeight: 'bold', marginBottom: '1rem' }}>
                  Game Interests
                </h4>
                <div className="d-flex flex-wrap gap-2">
                  {profile.gameInterests.length > 0 ? (
                    profile.gameInterests.map((game) => (
                      <Badge
                        key={game}
                        style={{
                          background: 'linear-gradient(135deg, #76b900 0%, #39ff14 100%)',
                          padding: '0.5rem 1rem',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          borderRadius: '20px',
                          color: '#0d0d0d',
                          boxShadow: '0 2px 10px rgba(118, 185, 0, 0.3)',
                          border: 'none',
                        }}
                      >
                        {game}
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
                <h4 style={{ color: '#76b900', fontWeight: 'bold', marginBottom: '1rem' }}>
                  Gaming Preferences
                </h4>
                <div className="d-flex flex-wrap gap-2">
                  {profile.gameTags.length > 0 ? (
                    profile.gameTags.map((tag) => (
                      <Badge
                        key={tag}
                        style={{
                          background: 'linear-gradient(135deg, #76b900 0%, #39ff14 100%)',
                          padding: '0.5rem 1rem',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          borderRadius: '20px',
                          color: '#0d0d0d',
                          boxShadow: '0 2px 10px rgba(118, 185, 0, 0.3)',
                          border: 'none',
                        }}
                      >
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <p style={{ color: '#666' }}>No gaming preferences added yet</p>
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
