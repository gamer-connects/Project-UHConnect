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

  if (!session) return <p>Please log in to create a post.</p>;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const userID = Number(session.user.id); // Make sure your session has user.id

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

    // Remove message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
      {message && <p className="text-success">{message}</p>}
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="form-control"
        required
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="form-control"
      />
      <select
        value={gameID}
        onChange={(e) => setGameID(Number(e.target.value))}
        className="form-select"
      >
        {gameOptions.map((g) => (
          <option key={g.id} value={g.id}>
            {g.title}
          </option>
        ))}
      </select>
      <button type="submit" className="btn btn-success">
        Post
      </button>
    </form>
  );
}
