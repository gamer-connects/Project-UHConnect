'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  Button, Card, Col, Container, Form, Row,
} from 'react-bootstrap';
import { signIn } from 'next-auth/react';
import { createUser } from '@/lib/dbActions';

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpPage: React.FC = () => {
  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid email'),
    password: Yup.string().required('Password required').min(6).max(40),
    confirmPassword: Yup.string()
      .required('Confirm Password required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    await createUser(data);
    await signIn('credentials', {
      callbackUrl: '/home',
      email: data.email,
      password: data.password,
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
                Join UH Connect
              </h2>

              <p className="text-center mb-3" style={{ color: '#b3b3b3' }}>
                Build your gamer network across UH ✨
              </p>

              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group>
                    <Form.Label style={{ color: '#b3b3b3', fontWeight: 600 }}>Email</Form.Label>
                    <input
                      type="email"
                      {...register('email')}
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      style={{
                        backgroundColor: '#0d0d0d',
                        border: '1px solid #2d2d2d',
                        color: '#ffffff',
                      }}
                    />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label style={{ color: '#b3b3b3', fontWeight: 600 }}>Password</Form.Label>
                    <input
                      type="password"
                      {...register('password')}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      style={{
                        backgroundColor: '#0d0d0d',
                        border: '1px solid #2d2d2d',
                        color: '#ffffff',
                      }}
                    />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label style={{ color: '#b3b3b3', fontWeight: 600 }}>
                      Confirm Password
                    </Form.Label>
                    <input
                      type="password"
                      {...register('confirmPassword')}
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      style={{
                        backgroundColor: '#0d0d0d',
                        border: '1px solid #2d2d2d',
                        color: '#ffffff',
                      }}
                    />
                    <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                  </Form.Group>

                  <Row className="mt-4">
                    <Col>
                      <Button
                        type="submit"
                        className="w-100"
                        style={{
                          background: 'linear-gradient(135deg, #76b900 0%, #39ff14 100%)',
                          border: 'none',
                          fontWeight: 700,
                          color: '#0d0d0d',
                          boxShadow: '0 4px 15px rgba(118, 185, 0, 0.4)',
                        }}
                      >
                        Create Account
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        className="w-100"
                        onClick={() => reset()}
                        style={{
                          background: 'linear-gradient(135deg, #76b900 0%, #39ff14 100%)',
                          border: 'none',
                          fontWeight: 700,
                          color: '#0d0d0d',
                          boxShadow: '0 4px 15px rgba(118, 185, 0, 0.4)',
                        }}
                      >
                        Reset
                      </Button>
                    </Col>
                  </Row>
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
                Already have an account?
                {' '}
                <a
                  href="/auth/signin"
                  style={{
                    color: '#76b900',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Sign In
                </a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignUpPage;
