'use client';

import { useSession } from 'next-auth/react';
import { Container, Spinner, Form, Button, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const EditProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    gameInterests: '',
    gameTags: '',
  });
  const [loading, setLoading] = useState(false);
  const [fetchingProfile, setFetchingProfile] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch current profile data when page loads
  useEffect(() => {
    const fetchProfileData = async () => {
      if (status === 'loading') return;
      if (!session?.user?.id) {
        setFetchingProfile(false);
        return;
      }

      try {
        const response = await fetch(`/api/profile/${session.user.id}`);
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setFormData({
          username: data.username || '',
          bio: data.bio || '',
          gameInterests: (data.gameInterests || []).join(', '),
          gameTags: (data.gameTags || []).join(', '),
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data');
      } finally {
        setFetchingProfile(false);
      }
    };

    fetchProfileData();
  }, [session, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      setError('User ID not found');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Sending PUT request to:', `/api/profile/${session.user.id}`);
      console.log('With data:', {
        username: formData.username,
        bio: formData.bio,
        gameInterests: formData.gameInterests.split(',').map((s) => s.trim()).filter((s) => s.length > 0),
        gameTags: formData.gameTags.split(',').map((s) => s.trim()).filter((s) => s.length > 0),
      });

      const response = await fetch(`/api/profile/${session.user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          bio: formData.bio,
          gameInterests: formData.gameInterests
            .split(',')
            .map((s) => s.trim())
            .filter((s) => s.length > 0),
          gameTags: formData.gameTags
            .split(',')
            .map((s) => s.trim())
            .filter((s) => s.length > 0),
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response OK:', response.ok);

      if (!response.ok) {
        // Get the response as text first
        const text = await response.text();
        console.error('Error response text:', text);
        // Try to parse as JSON, fallback to plain text error
        let errorMessage = 'Failed to update profile';
        try {
          const data = JSON.parse(text);
          errorMessage = data.error || errorMessage;
        } catch (parseError) {
          // If it's a 404, the API route doesn't exist
          if (response.status === 404) {
            errorMessage = 'API route not found. Make sure /api/profile/[id]/route.ts exists';
          } else {
            errorMessage = `Server error (${response.status})`;
          }
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('Update successful:', result);

      // Redirect to profile page
      router.push('/profiles');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || fetchingProfile) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-3">Loading profile...</p>
      </Container>
    );
  }

  if (!session) {
    return (
      <Container className="text-center py-5">
        <p>You must be logged in to edit your profile.</p>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Edit Profile</h2>
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            disabled={loading}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            disabled={loading}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Game Interests (comma separated)</Form.Label>
          <Form.Control
            value={formData.gameInterests}
            onChange={(e) => setFormData({ ...formData, gameInterests: e.target.value })}
            disabled={loading}
            placeholder="e.g., Valorant, League of Legends, Overwatch"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Gaming Preferences (comma separated)</Form.Label>
          <Form.Control
            value={formData.gameTags}
            onChange={(e) => setFormData({ ...formData, gameTags: e.target.value })}
            disabled={loading}
            placeholder="e.g., Competitive, Casual, Team Player"
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push('/profiles')}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditProfilePage;
