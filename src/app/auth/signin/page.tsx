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
        background: 'linear-gradient(135deg, #00C6FF, #7F00FF)',
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
                background: '#ffffff',
                border: 'none',
              }}
            >
              <h2
                className="text-center mb-3"
                style={{
                  fontWeight: 800,
                  color: '#7F00FF',
                }}
              >
                UHConnect Login
              </h2>

              <p className="text-center mb-3" style={{ color: '#555' }}>
                Connect with college gamers across UH 🎮
              </p>

              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="form-control"
                    />
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <input
                      name="password"
                      type="password"
                      required
                      className="form-control"
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="mt-4 w-100"
                    style={{
                      background: 'linear-gradient(135deg, #00C6FF, #7F00FF)',
                      border: 'none',
                      fontWeight: 700,
                    }}
                  >
                    Sign In
                  </Button>
                </Form>
              </Card.Body>

              <Card.Footer className="text-center">
                Don&apos;t have an account?
                {' '}
                <a
                  href="/auth/signup"
                  style={{ color: '#7F00FF', fontWeight: 600 }}
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
