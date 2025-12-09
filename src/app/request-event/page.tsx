// src/app/request-event/page.tsx

'use client';

import { useState } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function RequestEventPage() {
  const { status } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  if (status === 'loading') {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      eventName: formData.get('eventName') as string,
      eventType: formData.get('eventType') as string,
      gameTitle: formData.get('gameTitle') as string,
      description: formData.get('description') as string,
      suggestedDate: formData.get('suggestedDate') as string,
      suggestedTime: formData.get('suggestedTime') as string,
      estimatedPlayers: formData.get('estimatedPlayers') as string,
      location: formData.get('location') as string,
      additionalNotes: formData.get('additionalNotes') as string,
    };

    try {
      const response = await fetch('/api/request-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit request');
      }

      setSuccess(true);
      // Reset form
      e.currentTarget.reset();

      // Optionally redirect after success
      setTimeout(() => {
        router.push('/home');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '600px',
      height: 'calc(100vh - 250px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 0',
    }}
    >
      <Container style={{ maxWidth: '900px' }}>
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card
              className="shadow-lg border-0"
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #76b900',
                maxHeight: 'calc(100vh - 300px)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Card.Body
                className="p-4"
                style={{
                  overflowY: 'auto',
                  overflowX: 'hidden',
                }}
              >
                <h1 className="text-center mb-4" style={{ color: '#76b900' }}>
                  Request an Event
                </h1>
                <p className="text-center text-light mb-4">
                  Submit your gaming event idea and our admins will review it!
                </p>

                {error && (
                  <Alert variant="danger" onClose={() => setError('')} dismissible>
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
                    Event request submitted successfully! Redirecting to home...
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  {/* Event Name */}
                  <Form.Group className="mb-3">
                    <Form.Label className="text-light">Event Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="eventName"
                      required
                      placeholder="e.g., Valorant Championship Spring 2024"
                      style={{
                        backgroundColor: '#0d0d0d',
                        border: '1px solid #76b900',
                        color: '#fff',
                      }}
                    />
                  </Form.Group>

                  {/* Event Type */}
                  <Form.Group className="mb-3">
                    <Form.Label className="text-light">Event Type *</Form.Label>
                    <Form.Select
                      name="eventType"
                      required
                      style={{
                        backgroundColor: '#0d0d0d',
                        border: '1px solid #76b900',
                        color: '#fff',
                      }}
                    >
                      <option value="">Select event type...</option>
                      <option value="Tournament">Tournament</option>
                      <option value="Casual">Casual Gaming Session</option>
                      <option value="LAN Party">LAN Party</option>
                      <option value="Watch Party">Watch Party</option>
                      <option value="Practice Session">Practice Session</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>

                  {/* Game Title */}
                  <Form.Group className="mb-3">
                    <Form.Label className="text-light">Game Title *</Form.Label>
                    <Form.Control
                      type="text"
                      name="gameTitle"
                      required
                      placeholder="e.g., Valorant, League of Legends, Overwatch"
                      style={{
                        backgroundColor: '#0d0d0d',
                        border: '1px solid #76b900',
                        color: '#fff',
                      }}
                    />
                  </Form.Group>

                  {/* Description */}
                  <Form.Group className="mb-3">
                    <Form.Label className="text-light">Description *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="description"
                      required
                      placeholder="Describe your event idea..."
                      style={{
                        backgroundColor: '#0d0d0d',
                        border: '1px solid #76b900',
                        color: '#fff',
                      }}
                    />
                  </Form.Group>

                  <Row>
                    {/* Suggested Date */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-light">Suggested Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="suggestedDate"
                          style={{
                            backgroundColor: '#0d0d0d',
                            border: '1px solid #76b900',
                            color: '#fff',
                          }}
                        />
                      </Form.Group>
                    </Col>

                    {/* Suggested Time */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-light">Suggested Time</Form.Label>
                        <Form.Control
                          type="time"
                          name="suggestedTime"
                          style={{
                            backgroundColor: '#0d0d0d',
                            border: '1px solid #76b900',
                            color: '#fff',
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    {/* Estimated Players */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-light">Estimated Players</Form.Label>
                        <Form.Control
                          type="number"
                          name="estimatedPlayers"
                          min="1"
                          placeholder="How many players?"
                          style={{
                            backgroundColor: '#0d0d0d',
                            border: '1px solid #76b900',
                            color: '#fff',
                          }}
                        />
                      </Form.Group>
                    </Col>

                    {/* Location */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-light">Location</Form.Label>
                        <Form.Control
                          type="text"
                          name="location"
                          placeholder="Online or physical location"
                          style={{
                            backgroundColor: '#0d0d0d',
                            border: '1px solid #76b900',
                            color: '#fff',
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Additional Notes */}
                  <Form.Group className="mb-4">
                    <Form.Label className="text-light">Additional Notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="additionalNotes"
                      placeholder="Any other details..."
                      style={{
                        backgroundColor: '#0d0d0d',
                        border: '1px solid #76b900',
                        color: '#fff',
                      }}
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        backgroundColor: '#76b900',
                        border: 'none',
                        padding: '12px',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Event Request'
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline-secondary"
                      onClick={() => router.push('/home')}
                      style={{
                        borderColor: '#76b900',
                        color: '#76b900',
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
    </div>
  );
}
