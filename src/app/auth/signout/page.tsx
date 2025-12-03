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
      background: 'linear-gradient(135deg, #8a00ff, #0066ff)',
      padding: '20px',
    }}
  >
    <Card
      className="p-5 shadow-lg border-0"
      style={{
        maxWidth: '480px',
        width: '100%',
        borderRadius: '20px',
      }}
    >
      <Card.Body className="text-center">

        {/* Title */}
        <h2
          className="fw-bold mb-2"
          style={{ color: '#00aaff', fontSize: '28px' }}
        >
          Sign Out
        </h2>

        {/* Subtitle */}
        <p className="text-muted mb-4" style={{ fontSize: '15px' }}>
          You&apos;re about to leave
          {' '}
          <strong>UHConnect</strong>
          .
        </p>

        <p className="fw-semibold mb-4" style={{ fontSize: '16px' }}>
          Are you sure you want to sign out?
        </p>

        {/* Buttons */}
        <Row className="gy-3 mt-2 px-1">
          <Col xs={12}>
            <Button
              className="w-100 fw-bold py-2"
              style={{
                background: 'linear-gradient(to right, #00aaff, #8a00ff)',
                border: 'none',
                borderRadius: '10px',
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
              }}
              href="/"
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
