'use client';

import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import HomePost from '@/components/HomePost';
import { PostType } from '@/types/post'; // make sure this matches your post type

export default function MinecraftPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        // fetch posts for Minecraft specifically
        const res = await fetch('/api/posts/game/1', { cache: 'no-store' }); // replace 1 with Minecraft's gameID
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)',
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <div
        style={{
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
          style={{ color: '#76b900', textShadow: '0 0 20px rgba(118, 185, 0, 0.5)' }}
        >
          Minecraft
        </h1>

        {loading && <p style={{ color: '#aaa' }}>Loading posts...</p>}
        {!loading && posts.length === 0 && <p style={{ color: '#aaa' }}>No posts yet.</p>}

        {!loading
          && posts.map((post) => <HomePost key={post.id} post={post} />)}
      </Container>
    </div>
  );
}
