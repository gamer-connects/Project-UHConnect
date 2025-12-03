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
        background: 'linear-gradient(135deg, #7F00FF, #00C6FF)',
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
                style={{ fontWeight: 800, color: '#00C6FF' }}
              >
                Join UHConnect
              </h2>

              <p className="text-center mb-3" style={{ color: '#555' }}>
                Build your gamer network across UH ✨
              </p>

              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <input
                      type="email"
                      {...register('email')}
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <input
                      type="password"
                      {...register('password')}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <input
                      type="password"
                      {...register('confirmPassword')}
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                  </Form.Group>

                  <Row className="mt-4">
                    <Col>
                      <Button
                        type="submit"
                        className="w-100"
                        style={{
                          background: 'linear-gradient(135deg, #00C6FF, #7F00FF)',
                          border: 'none',
                          fontWeight: 700,
                        }}
                      >
                        Create Account
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        className="w-100"
                        variant="secondary"
                        onClick={() => reset()}
                        style={{ fontWeight: 600 }}
                      >
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>

              <Card.Footer className="text-center">
                Already have an account?
                {' '}
                <a href="/auth/signin" style={{ color: '#7F00FF', fontWeight: 600 }}>
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
