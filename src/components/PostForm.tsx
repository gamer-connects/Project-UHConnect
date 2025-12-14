'use client';

import { useState, FormEvent } from 'react';
import { createPost } from '@/lib/dbActions';
import { useSession } from 'next-auth/react';

type PostFormProps = {
  gameOptions: { id: number; title: string }[];
};

export default function PostForm({ gameOptions }: PostFormProps) {
  const { data: session } = useSession();
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [gameID, setGameID] = useState<number>(gameOptions[0]?.id ?? 0);
  const [message, setMessage] = useState<string | null>(null);

  if (!session) {
    return (
      <p className="text-center text-light">
        Please log in to create a post.
      </p>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const userID = Number(session.user.id);

    try {
      await createPost({
        content,
        tags: tags.split(',').map((t) => t.trim()),
        gameID,
        userID,
      });

      setContent('');
      setTags('');
      setMessage('Post created successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Error creating post.');
    }

    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
      {message && (
        <div
          className={`text-center fw-semibold ${
            message.includes('Error') ? 'text-danger' : 'text-success'
          }`}
        >
          {message}
        </div>
      )}

      {/* Content */}
      <div>
        <label className="form-label text-light fw-semibold">
          Post Content
        </label>
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-control"
          rows={4}
          style={{
            backgroundColor: '#0d0d0d',
            color: '#fff',
            border: '1px solid #333',
          }}
          required
        />
      </div>

      {/* Tags */}
      <div>
        <label className="form-label text-light fw-semibold">
          Tags
        </label>
        <input
          type="text"
          placeholder="e.g. multiplayer, tips, review"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="form-control"
          style={{
            backgroundColor: '#0d0d0d',
            color: '#fff',
            border: '1px solid #333',
          }}
        />
        <small className="text-muted">
          Separate tags with commas
        </small>
      </div>

      {/* Game Select */}
      <div>
        <label className="form-label text-light fw-semibold">
          Select Game
        </label>
        <select
          value={gameID}
          onChange={(e) => setGameID(Number(e.target.value))}
          className="form-select"
          style={{
            backgroundColor: '#0d0d0d',
            color: '#fff',
            border: '1px solid #333',
          }}
        >
          {gameOptions.map((g) => (
            <option key={g.id} value={g.id}>
              {g.title}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="btn fw-bold py-2"
        style={{
          backgroundColor: '#76b900',
          color: '#0d0d0d',
          border: 'none',
        }}
      >
        Create Post
      </button>
    </form>
  );
}
