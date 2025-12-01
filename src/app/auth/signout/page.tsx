'use client';

import { signOut } from 'next-auth/react';
import {
  Button, Col, Row, Card,
} from 'react-bootstrap';
import React from 'react';

const SignOut: React.FC = () => (
  <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
    <Card className="p-4 shadow-lg border-0" style={{ maxWidth: '420px', width: '100%' }}>
      <Card.Body className="text-center">
        <h2 className="fw-bold mb-3" style={{ color: '#7b2cbf' }}>Sign Out</h2>
        <p className="text-muted mb-4">
          Are you sure you want to sign out of
          {' '}
          <strong>UHConnect</strong>
          ?
        </p>

        <Row className="gy-3">
          <Col xs={12}>
            <Button
              variant="danger"
              className="w-100 fw-bold"
              onClick={() => signOut({ callbackUrl: '/', redirect: true })}
            >
              Confirm Sign Out
            </Button>
          </Col>

          <Col xs={12}>
            <Button
              variant="secondary"
              href="/"
              className="w-100 fw-bold"
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
