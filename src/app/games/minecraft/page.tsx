'use client';

import React from 'react';
import { Container } from 'react-bootstrap';

export default function GamePage() {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)',
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Background glow effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 30% 20%, rgba(118, 185, 0, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 70% 80%, rgba(57, 255, 20, 0.05) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
      }}
      />

      <Container className="text-center py-5" style={{ position: 'relative', zIndex: 1 }}>
        <h1
          className="fw-bold mb-3"
          style={{
            color: '#76b900',
            textShadow: '0 0 20px rgba(118, 185, 0, 0.5)',
          }}
        >
          Game Placeholder
        </h1>
        <p style={{ color: '#b3b3b3' }}>Content coming soon...</p>
      </Container>
    </div>
  );
}
