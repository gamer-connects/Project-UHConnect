import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
        background: 'rgba(200, 200, 200, 0.25)', // uniform transparent gray
        backdropFilter: 'blur(4px)', // smooth blur
      }}
    >
      <div
        style={{
          width: '100%',
          height: '360px',
          position: 'relative',
          background: 'transparent', // ensure uniform card background
        }}
      >
        <Image
          src={image}
          alt={title}
          fill
          style={{
            objectFit: 'contain',
          }}
        />
      </div>

      <Card.Body className="text-center">
        <Card.Title className="fw-bold text-light fs-5">{title}</Card.Title>
      </Card.Body>
    </Card>
  </Link>
);

export default GameCard;
