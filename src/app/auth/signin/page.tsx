'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import {
  Button, Card, Col, Container, Form, Row,
} from 'react-bootstrap';

const SignInPage: React.FC = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget as typeof e.currentTarget & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    await signIn('credentials', {
      callbackUrl: '/home',
      email,
      password,
    });
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)',
        display: 'flex',
        alignItems: 'center',
        padding: '40px 0',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={5}>
            <Card
              className="p-4 shadow-lg"
              style={{
                borderRadius: '18px',
                background: '#1a1a1a',
                border: '2px solid #76b900',
                boxShadow: '0 0 30px rgba(118, 185, 0, 0.3)',
              }}
            >
              <h2
                className="text-center mb-3"
                style={{
                  fontWeight: 800,
                  color: '#76b900',
                  textShadow: '0 0 20px rgba(118, 185, 0, 0.5)',
                }}
              >
                UH Connect Login
              </h2>

              <p className="text-center mb-3" style={{ color: '#b3b3b3' }}>
                Connect with college gamers across UH 🎮
              </p>

              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label style={{ color: '#b3b3b3', fontWeight: 600 }}>Email</Form.Label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="form-control"
                      style={{
                        backgroundColor: '#0d0d0d',
                        border: '1px solid #2d2d2d',
                        color: '#ffffff',
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label style={{ color: '#b3b3b3', fontWeight: 600 }}>Password</Form.Label>
                    <input
                      name="password"
                      type="password"
                      required
                      className="form-control"
                      style={{
                        backgroundColor: '#0d0d0d',
                        border: '1px solid #2d2d2d',
                        color: '#ffffff',
                      }}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="mt-4 w-100"
                    style={{
                      background: 'linear-gradient(135deg, #76b900 0%, #39ff14 100%)',
                      border: 'none',
                      fontWeight: 700,
                      color: '#0d0d0d',
                      boxShadow: '0 4px 15px rgba(118, 185, 0, 0.4)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(57, 255, 20, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(118, 185, 0, 0.4)';
                    }}
                  >
                    Sign In
                  </Button>
                </Form>
              </Card.Body>

              <Card.Footer
                className="text-center"
                style={{
                  backgroundColor: '#151515',
                  borderTop: '1px solid #2d2d2d',
                  color: '#b3b3b3',
                }}
              >
                Don&apos;t have an account?
                {' '}
                <a
                  href="/auth/signup"
                  style={{
                    color: '#76b900',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Sign Up
                </a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignInPage;
