'use client';

import { Col, Container, Row, Card, Badge, Button } from 'react-bootstrap';
import Image from 'next/image';

/** The Profile page - displays user profile information */
const ProfilePage = () => (
  <main style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)',
    paddingTop: '2rem',
    paddingBottom: '2rem',
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
        radial-gradient(circle at 20% 30%, rgba(118, 185, 0, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(57, 255, 20, 0.05) 0%, transparent 50%)
      `,
      pointerEvents: 'none',
    }}
    />

    <Container id="profile-page" className="py-4" style={{ position: 'relative', zIndex: 1 }}>
      {/* Profile Header Section */}
      <Row className="justify-content-center mb-4">
        <Col md={10} lg={8}>
          <Card style={{
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
                    src="/profile.png"
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
                  <h2 style={{ color: '#76b900', fontWeight: 'bold', textShadow: '0 0 10px rgba(118, 185, 0, 0.5)' }}>
                    JohnGamer123
                  </h2>
                  <p style={{ color: '#b3b3b3' }} className="mb-3">john.doe@example.com</p>
                  <div className="d-flex gap-4 mb-3">
                    <div style={{ fontSize: '1.1rem' }}>
                      <strong style={{ color: '#76b900' }}>42</strong>
                      {' '}
                      <span style={{ color: '#b3b3b3' }}>Followers</span>
                    </div>
                    <div style={{ fontSize: '1.1rem' }}>
                      <strong style={{ color: '#76b900' }}>56</strong>
                      {' '}
                      <span style={{ color: '#b3b3b3' }}>Following</span>
                    </div>
                  </div>
                  <Button
                    style={{
                      background: 'linear-gradient(135deg, #76b900 0%, #39ff14 100%)',
                      border: 'none',
                      padding: '0.5rem 1.5rem',
                      fontWeight: '700',
                      color: '#0d0d0d',
                      boxShadow: '0 4px 15px rgba(118, 185, 0, 0.4)',
                      transition: 'all 0.3s ease',
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

      {/* Biography Section */}
      <Row className="justify-content-center mb-4">
        <Col md={10} lg={8}>
          <Card style={{
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(118, 185, 0, 0.2)',
            border: '1px solid #76b900',
            backgroundColor: '#1a1a1a',
          }}
          >
            <Card.Body className="p-4">
              <h4 style={{ color: '#76b900', fontWeight: 'bold', marginBottom: '1rem' }}>About Me</h4>
              <p style={{ color: '#b3b3b3', lineHeight: '1.6' }}>
                Casual gamer looking to connect with others who enjoy competitive FPS games and RPGs.
                Always down for a good co-op session! Been gaming since 2010 and love discovering new indie titles.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Game Interests Section */}
      <Row className="justify-content-center mb-4">
        <Col md={10} lg={8}>
          <Card style={{
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(118, 185, 0, 0.2)',
            border: '1px solid #76b900',
            backgroundColor: '#1a1a1a',
          }}
          >
            <Card.Body className="p-4">
              <h4 style={{ color: '#76b900', fontWeight: 'bold', marginBottom: '1rem' }}>Game Interests</h4>
              <div className="d-flex flex-wrap gap-2">
                {['Valorant', 'League of Legends', 'Elden Ring', 'Minecraft', 'Apex Legends'].map((game) => (
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
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Game Tags Section */}
      <Row className="justify-content-center mb-4">
        <Col md={10} lg={8}>
          <Card style={{
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(118, 185, 0, 0.2)',
            border: '1px solid #76b900',
            backgroundColor: '#1a1a1a',
          }}
          >
            <Card.Body className="p-4">
              <h4 style={{ color: '#76b900', fontWeight: 'bold', marginBottom: '1rem' }}>Gaming Preferences</h4>
              <div className="d-flex flex-wrap gap-2">
                {['FPS', 'RPG', 'Competitive', 'Co-op', 'Strategy'].map((tag) => (
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
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Game Suggestion Survey Section */}
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card style={{
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(118, 185, 0, 0.2)',
            border: '1px solid #76b900',
            backgroundColor: '#1a1a1a',
          }}
          >
            <Card.Body className="p-4">
              <h4 style={{ color: '#76b900', fontWeight: 'bold', marginBottom: '1rem' }}>Game Recommendations</h4>
              <p style={{ color: '#b3b3b3' }} className="mb-3">Based on your interests, we suggest:</p>
              <ul style={{ color: '#b3b3b3', lineHeight: '1.8' }}>
                <li>Counter-Strike 2 - Competitive FPS</li>
                <li>Baldur&apos;s Gate 3 - Story-rich RPG</li>
                <li>Deep Rock Galactic - Co-op Adventure</li>
              </ul>
              <Button
                style={{
                  background: 'linear-gradient(135deg, #76b900 0%, #39ff14 100%)',
                  border: 'none',
                  padding: '0.5rem 1.5rem',
                  fontWeight: '700',
                  color: '#0d0d0d',
                  boxShadow: '0 4px 15px rgba(118, 185, 0, 0.4)',
                  transition: 'all 0.3s ease',
                }}
              >
                Take Survey
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </main>
);

export default ProfilePage;
