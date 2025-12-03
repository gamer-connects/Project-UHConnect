'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import {
  Button, Col, Row, Card,
} from 'react-bootstrap';

const SignOut: React.FC = () => (
  <main
    className="d-flex justify-content-center align-items-center"
    style={{
      minHeight: '100vh',
      paddingTop: '120px',
      paddingBottom: '120px',
    }}
  >
    <Card
      className="p-5 shadow-lg"
      style={{
        maxWidth: '480px',
        width: '100%',
        backgroundColor: '#111',
        border: '2px solid #76b900', // NEON GREEN BORDER
        borderRadius: '18px',
        color: '#ffffff',
        boxShadow: '0 0 25px rgba(118,185,0,0.35)', // GREEN GLOW
      }}
    >
      <Card.Body className="text-center">

        <h2
          className="fw-bold mb-3"
          style={{
            color: '#76b900',
            textShadow: '0 0 10px rgba(118,185,0,0.6)',
            fontSize: '28px',
          }}
        >
          Sign Out
        </h2>

        <p style={{ color: '#cccccc', fontSize: '15px' }}>
          You&apos;re about to leave
          {' '}
          <strong>UH Connect</strong>
          .
        </p>

        <p
          className="fw-semibold mb-4"
          style={{ fontSize: '16px', color: '#ffffff' }}
        >
          Are you sure you want to sign out?
        </p>

        <Row className="gy-3 mt-2 px-1">
          <Col xs={12}>
            <Button
              className="w-100 fw-bold py-2 btn-primary"
              style={{
                borderRadius: '10px',
                fontWeight: 700,
              }}
              onClick={() => signOut({ callbackUrl: '/', redirect: true })}
            >
              Sign Out
            </Button>
          </Col>

          <Col xs={12}>
            <Button
              variant="secondary"
              className="w-100 fw-bold py-2"
              style={{
                borderRadius: '10px',
                fontWeight: 700,
              }}
              href="/"
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </main>
);

export default SignOut;
