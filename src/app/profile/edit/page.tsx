'use client';

import { Col, Container, Row, Card, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

/** The Edit Profile page - allows users to edit their profile information (MOCKUP) */
const EditProfilePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    displayName: 'JohnGamer123',
    email: 'john.doe@example.com',
    biography: 'Casual gamer looking to connect with others who enjoy competitive FPS games and RPGs',
    gameInterests: ['Valorant', 'League of Legends', 'Elden Ring', 'Minecraft', 'Apex Legends'],
    gameTags: ['FPS', 'RPG', 'Competitive', 'Co-op', 'Strategy'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Just log for mockup - no database save
    console.log('Saving profile:', formData);
    alert('Profile saved! (This is a mockup - not actually saving to database)');
    // Redirect back to profile page
    router.push('/profile');
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      paddingTop: '2rem',
      paddingBottom: '2rem',
    }}
    >
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card style={{
              borderRadius: '15px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              border: 'none',
            }}
            >
              <Card.Body className="p-4">
                <h2 style={{ color: '#333', fontWeight: 'bold', marginBottom: '2rem' }}>
                  Edit Profile
                </h2>

                <Form onSubmit={handleSubmit}>
                  {/* Display Name */}
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: '600', color: '#333' }}>
                      Display Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.displayName}
                      onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                      style={{ padding: '0.75rem' }}
                    />
                  </Form.Group>

                  {/* Email */}
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: '600', color: '#333' }}>
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ padding: '0.75rem' }}
                      disabled
                    />
                    <Form.Text className="text-muted">
                      Email cannot be changed
                    </Form.Text>
                  </Form.Group>

                  {/* Biography */}
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: '600', color: '#333' }}>
                      About Me
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={formData.biography}
                      onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                      style={{ padding: '0.75rem' }}
                      placeholder="Tell others about your gaming interests..."
                    />
                  </Form.Group>

                  {/* Game Interests */}
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: '600', color: '#333' }}>
                      Game Interests
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.gameInterests.join(', ')}
                      onChange={(e) => setFormData({
                        ...formData,
                        gameInterests: e.target.value.split(',').map(g => g.trim()),
                      })}
                      style={{ padding: '0.75rem' }}
                      placeholder="Valorant, League of Legends, Elden Ring..."
                    />
                    <Form.Text className="text-muted">
                      Separate games with commas
                    </Form.Text>
                  </Form.Group>

                  {/* Gaming Preferences/Tags */}
                  <Form.Group className="mb-4">
                    <Form.Label style={{ fontWeight: '600', color: '#333' }}>
                      Gaming Preferences
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.gameTags.join(', ')}
                      onChange={(e) => setFormData({
                        ...formData,
                        gameTags: e.target.value.split(',').map(t => t.trim()),
                      })}
                      style={{ padding: '0.75rem' }}
                      placeholder="FPS, RPG, Competitive, Co-op..."
                    />
                    <Form.Text className="text-muted">
                      Separate tags with commas
                    </Form.Text>
                  </Form.Group>

                  {/* Profile Picture Upload */}
                  <Form.Group className="mb-4">
                    <Form.Label style={{ fontWeight: '600', color: '#333' }}>
                      Profile Picture
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      style={{ padding: '0.75rem' }}
                    />
                    <Form.Text className="text-muted">
                      Upload a new profile picture (optional)
                    </Form.Text>
                  </Form.Group>

                  {/* Action Buttons */}
                  <div className="d-flex gap-3">
                    <Button
                      type="submit"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        padding: '0.75rem 2rem',
                        fontWeight: '500',
                      }}
                    >
                      Save Changes
                    </Button>
                    <Button
                      type="button"
                      variant="outline-secondary"
                      onClick={handleCancel}
                      style={{
                        padding: '0.75rem 2rem',
                        fontWeight: '500',
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default EditProfilePage;
