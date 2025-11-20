'use client';

import { Col, Container, Row, Card, Badge, Button } from 'react-bootstrap';
import Image from 'next/image';

/** The Profile page - displays user profile information */
const ProfilePage = () => (
  <main>
    <Container id="profile-page" className="py-4">
      {/* Profile Header Section */}
      <Row className="justify-content-center mb-4">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Row className="align-items-center">
                <Col xs={12} md={3} className="text-center mb-3 mb-md-0">
                  <Image
                    src="/profile.png"
                    alt="Profile"
                    width={150}
                    height={150}
                    className="rounded-circle"
                    style={{ objectFit: 'cover' }}
                  />
                </Col>
                <Col xs={12} md={9}>
                  <h2>JohnGamer123</h2>
                  <p className="text-muted">john.doe@example.com</p>
                  <div className="d-flex gap-3 mb-3">
                    <div>
                      <strong>42</strong>
                      {' '}
                      Followers
                    </div>
                    <div>
                      <strong>56</strong>
                      {' '}
                      Following
                    </div>
                  </div>
                  <Button variant="primary" size="sm">Edit Profile</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Biography Section */}
      <Row className="justify-content-center mb-4">
        <Col md={8}>
          <Card>
            <Card.Body>
              <h4>About Me</h4>
              <p>
                Casual gamer looking to connect with others who enjoy competitive FPS games and RPGs.
                Always down for a good co-op session! Been gaming since 2010 and love discovering new indie titles.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Game Interests Section */}
      <Row className="justify-content-center mb-4">
        <Col md={8}>
          <Card>
            <Card.Body>
              <h4>Game Interests</h4>
              <div className="d-flex flex-wrap gap-2 mb-3">
                <Badge bg="primary" className="p-2">Valorant</Badge>
                <Badge bg="primary" className="p-2">League of Legends</Badge>
                <Badge bg="primary" className="p-2">Elden Ring</Badge>
                <Badge bg="primary" className="p-2">Minecraft</Badge>
                <Badge bg="primary" className="p-2">Apex Legends</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Game Tags Section */}
      <Row className="justify-content-center mb-4">
        <Col md={8}>
          <Card>
            <Card.Body>
              <h4>Gaming Preferences</h4>
              <div className="d-flex flex-wrap gap-2">
                <Badge bg="secondary" className="p-2">FPS</Badge>
                <Badge bg="secondary" className="p-2">RPG</Badge>
                <Badge bg="secondary" className="p-2">Competitive</Badge>
                <Badge bg="secondary" className="p-2">Co-op</Badge>
                <Badge bg="secondary" className="p-2">Strategy</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Game Suggestion Survey Section */}
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <h4>Game Recommendations</h4>
              <p className="text-muted">Based on your interests, we suggest:</p>
              <ul>
                <li>Counter-Strike 2 - Competitive FPS</li>
                <li>Baldur&apos;s Gate 3 - Story-rich RPG</li>
                <li>Deep Rock Galactic - Co-op Adventure</li>
              </ul>
              <Button variant="outline-primary" size="sm">Take Survey</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </main>
);

export default ProfilePage;
