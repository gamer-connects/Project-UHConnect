'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import HomePost from '@/components/HomePost';
import { Container } from 'react-bootstrap';

interface Post {
  id: number;
  content: string;
  tags: string[];
  user: { username: string; profileImage: string | null };
  game: { title: string; image: string };
}

export default function GamePage() {
  const params = useParams();

  const gameId = Array.isArray(params?.gameId) ? params.gameId[0] : params?.gameId;

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gameId) return;

    const gameID = parseInt(gameId, 10);
    if (Number.isNaN(gameID)) return;

    async function loadPosts() {
      try {
        const res = await fetch(`/api/posts/${gameID}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [gameId]);

  if (loading) return <p style={{ color: '#aaa', textAlign: 'center' }}>Loading posts...</p>;

  return (
    <div style={{ background: '#0d0d0d', minHeight: '100vh', padding: '3rem 0' }}>
      <Container>
        <h1 style={{ color: '#76b900', textAlign: 'center', marginBottom: '2rem' }}>
          {/* You can later replace this with the dynamic game title */}
          Game Posts
        </h1>

        {posts.length === 0 && <p style={{ color: '#aaa', textAlign: 'center' }}>No posts yet.</p>}

        {posts.map((post) => <HomePost key={post.id} post={post} />)}
      </Container>
    </div>
  );
}
