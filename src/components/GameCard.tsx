import React from 'react';
import Link from 'next/link';
import { Card } from 'react-bootstrap';

interface GameCardProps {
  title: string;
  image: string;
  href: string;
}

const GameCard: React.FC<GameCardProps> = ({ title, image, href }) => (
  <Link href={href} style={{ textDecoration: 'none' }}>
    <Card
      className="shadow-sm"
      style={{
        width: '280px',
        borderRadius: '16px',
        overflow: 'hidden',
        background: '#1a1a1a',
        border: '2px solid #76b900',
        boxShadow: '0 8px 32px rgba(118, 185, 0, 0.2)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(118, 185, 0, 0.4)';
        e.currentTarget.style.borderColor = '#39ff14';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(118, 185, 0, 0.2)';
        e.currentTarget.style.borderColor = '#76b900';
      }}
    >
      {/* ================= IMAGE ================= */}
      <div
        style={{
          width: '100%',
          height: '360px',
          background: '#0d0d0d',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
          onError={(e) => {
            // fallback icon if image fails
            e.currentTarget.src =
              'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
          }}
        />
      </div>

      {/* ================= TITLE ================= */}
      <Card.Body className="text-center" style={{ backgroundColor: '#1a1a1a' }}>
        <Card.Title
          className="fw-bold fs-5"
          style={{
            color: '#76b900',
            textShadow: '0 0 10px rgba(118, 185, 0, 0.3)',
          }}
        >
          {title}
        </Card.Title>
      </Card.Body>
    </Card>
  </Link>
);

export default GameCard;
