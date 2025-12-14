'use client';

import { Card, Image, Badge } from 'react-bootstrap';
import Link from 'next/link';

type HomePostProps = {
  post: {
    id: number;
    content: string;
    tags: string[];
    user: {
      username: string;
      profileImage: string | null;
    };
    game: {
      title: string;
      image: string;
    };
  };
};

const HomePost = ({ post }: HomePostProps) => (
  <Card
    className="mb-3"
    style={{
      backgroundColor: '#1a1a1a',
      border: '2px solid #76b900',
      boxShadow: '0 8px 32px rgba(118,185,0,0.25)',
    }}
  >
    <Card.Header className="d-flex align-items-center gap-3">
      <Image
        src={post.user.profileImage || '/profile.png'}
        width={60}
        height={60}
        className="rounded-circle"
        alt="User image"
      />
      <div>
        <Card.Title className="m-0" style={{ color: '#76b900' }}>
          {post.user.username}
        </Card.Title>
      </div>
    </Card.Header>

    <Card.Body>
      <Card.Text style={{ color: 'white' }}>{post.content}</Card.Text>

      {/* Tags - neon green */}
      <div className="d-flex flex-wrap gap-2 mt-2">
        <Badge
          bg=""
          style={{
            backgroundColor: '#40ad94',
            color: '#1a1a1a',
            fontWeight: 'bold',
            textShadow: '0 0 5px rgba(0,0,0,0.5)',
          }}
        >
          {post.game.title}
        </Badge>
        {post.tags.map((tag) => (
          <Badge
            key={tag}
            bg=""
            style={{
              backgroundColor: '#76b900',
              color: '#1a1a1a',
              textShadow: '0 0 5px rgba(0,0,0,0.5)',
            }}
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Game badge - neon red, below tags */}
      <div className="mt-2" />
    </Card.Body>

    <Card.Footer>
      <Link
        href={`/post/${post.id}`}
        style={{ color: '#76b900', textDecoration: 'underline' }}
      >
        View Post
      </Link>
    </Card.Footer>
  </Card>
);

export default HomePost;
