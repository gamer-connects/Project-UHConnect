'use client';

import { Card, Image, Badge } from 'react-bootstrap';
import Link from 'next/link';

type HomePostProps = {
  post: {
    id: number;
    username: string;
    content: string;
    image: string;
    tags: string[];
  };
};

const HomePost = ({ post }: HomePostProps) => (
  <Card className="mb-3">
    <Card.Header className="d-flex align-items-center gap-3">
      <Image
        src={post.image}
        width={60}
        height={60}
        className="rounded-circle"
        alt="User image"
      />

      <div>
        <Card.Title className="m-0">{post.username}</Card.Title>
        <Card.Subtitle className="text-muted">
          @
          {post.username}
        </Card.Subtitle>
      </div>
    </Card.Header>

    <Card.Body>
      <Card.Text>{post.content}</Card.Text>

      {/* Tags */}
      <div className="d-flex flex-wrap gap-2 mt-2">
        {post.tags.map((tag) => (
          <Badge bg="secondary" key={tag}>
            {tag}
          </Badge>
        ))}
      </div>
    </Card.Body>

    <Card.Footer>
      <Link href={`/post/${post.id}`}>View Post</Link>
    </Card.Footer>
  </Card>
);

export default HomePost;
