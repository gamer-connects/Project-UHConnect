'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import {
  Button, Col, Row, Card,
} from 'react-bootstrap';

const SignOut: React.FC = () => (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{
      height: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #7b2cbf, #ab47ff, #ff89e5)',
      backgroundSize: '300% 300%',
      animation: 'uhcGradient 10s ease infinite',
      padding: '20px',
    }}
  >
    <style>
      {`
        @keyframes uhcGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}
    </style>

    <Card
      className="p-4 shadow-lg border-0"
      style={{
        maxWidth: '420px',
        width: '95%',
        borderRadius: '20px',
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
      }}
    >
      <Card.Body className="text-center">
        <h2 className="fw-bold mb-3" style={{ color: '#7b2cbf' }}>
          Sign Out
        </h2>

        <p className="text-dark mb-4 fw-semibold">
          Are you sure you want to sign out of
          {' '}
          <span style={{ color: '#7b2cbf' }}>UHConnect</span>
          ?
        </p>

        <Row className="gy-3">
          <Col xs={12}>
            <Button
              variant="danger"
              className="w-100 fw-bold py-2"
              style={{ borderRadius: '12px' }}
              onClick={() => signOut({ callbackUrl: '/', redirect: true })}
            >
              Confirm Sign Out
            </Button>
          </Col>

          <Col xs={12}>
            <Button
              variant="secondary"
              href="/"
              className="w-100 fw-bold py-2"
              style={{ borderRadius: '12px' }}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </div>
);

export default SignOut;
