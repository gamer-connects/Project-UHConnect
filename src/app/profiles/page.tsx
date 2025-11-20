'use client';

import { Col, Container, Row, Card, Badge, Button } from 'react-bootstrap';
import Image from 'next/image';

/** The Profile page - displays user profile information */
const ProfilePage = () => (
  <main style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    paddingTop: '2rem',
    paddingBottom: '2rem',
  }}
  >
    <Container id="profile-page" className="py-4">
      {/* Profile Header Section */}
      <Row className="justify-content-center mb-4">
        <Col md={10} lg={8}>
          <Card style={{
            borderRadius: '15px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            border: 'none',
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
                      border: '4px solid #667eea',
                    }}
                  />
                </Col>
                <Col xs={12} md={9}>
                  <h2 style={{ color: '#333', fontWeight: 'bold' }}>JohnGamer123</h2>
                  <p className="text-muted mb-3">john.doe@example.com</p>
                  <div className="d-flex gap-4 mb-3">
                    <div style={{ fontSize: '1.1rem' }}>
                      <strong style={{ color: '#667eea' }}>42</strong>
                      {' '}
                      <span className="text-muted">Followers</span>
                    </div>
                    <div style={{ fontSize: '1.1rem' }}>
                      <strong style={{ color: '#667eea' }}>56</strong>
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

      {/* Biography Section */}
      <Row className="justify-content-center mb-4">
        <Col md={10} lg={8}>
          <Card style={{
            borderRadius: '15px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            border: 'none',
          }}
          >
            <Card.Body className="p-4">
              <h4 style={{ color: '#333', fontWeight: 'bold', marginBottom: '1rem' }}>About Me</h4>
              <p style={{ color: '#555', lineHeight: '1.6' }}>
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
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            border: 'none',
          }}
          >
            <Card.Body className="p-4">
              <h4 style={{ color: '#333', fontWeight: 'bold', marginBottom: '1rem' }}>Game Interests</h4>
              <div className="d-flex flex-wrap gap-2">
                <Badge
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    borderRadius: '20px',
                  }}
                >
                  Valorant
                </Badge>
                <Badge
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    borderRadius: '20px',
                  }}
                >
                  League of Legends
                </Badge>
                <Badge
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    borderRadius: '20px',
                  }}
                >
                  Elden Ring
                </Badge>
                <Badge
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    borderRadius: '20px',
                  }}
                >
                  Minecraft
                </Badge>
                <Badge
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    borderRadius: '20px',
                  }}
                >
                  Apex Legends
                </Badge>
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
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            border: 'none',
          }}
          >
            <Card.Body className="p-4">
              <h4 style={{ color: '#333', fontWeight: 'bold', marginBottom: '1rem' }}>Gaming Preferences</h4>
              <div className="d-flex flex-wrap gap-2">
                <Badge
                  bg="secondary"
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    borderRadius: '20px',
                    backgroundColor: '#6c757d',
                  }}
                >
                  FPS
                </Badge>
                <Badge
                  bg="secondary"
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    borderRadius: '20px',
                    backgroundColor: '#6c757d',
                  }}
                >
                  RPG
                </Badge>
                <Badge
                  bg="secondary"
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    borderRadius: '20px',
                    backgroundColor: '#6c757d',
                  }}
                >
                  Competitive
                </Badge>
                <Badge
                  bg="secondary"
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    borderRadius: '20px',
                    backgroundColor: '#6c757d',
                  }}
                >
                  Co-op
                </Badge>
                <Badge
                  bg="secondary"
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    borderRadius: '20px',
                    backgroundColor: '#6c757d',
                  }}
                >
                  Strategy
                </Badge>
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
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            border: 'none',
          }}
          >
            <Card.Body className="p-4">
              <h4 style={{ color: '#333', fontWeight: 'bold', marginBottom: '1rem' }}>Game Recommendations</h4>
              <p className="text-muted mb-3">Based on your interests, we suggest:</p>
              <ul style={{ color: '#555', lineHeight: '1.8' }}>
                <li>Counter-Strike 2 - Competitive FPS</li>
                <li>Baldur&apos;s Gate 3 - Story-rich RPG</li>
                <li>Deep Rock Galactic - Co-op Adventure</li>
              </ul>
              <Button
                variant="outline-primary"
                style={{
                  borderColor: '#667eea',
                  color: '#667eea',
                  padding: '0.5rem 1.5rem',
                  fontWeight: '500',
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
