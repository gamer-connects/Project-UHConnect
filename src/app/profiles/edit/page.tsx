'use client';

import { useSession } from 'next-auth/react';
import { Container, Spinner, Form, Button, Alert, Row, Col, Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Game {
  id: number;
  title: string;
  type: string;
  image: string;
  name?: string;
}

const GAMING_TAGS = [
  'Competitive', 'Casual', 'Team Player', 'Solo Player', 'Strategy', 'Action',
  'RPG Fan', 'FPS Enthusiast', 'MOBA Player', 'Battle Royale', 'Co-op', 'PvP',
  'PvE', 'Speedrunner', 'Achievement Hunter', 'Story-Driven', 'Multiplayer',
  'Single Player', 'Streamer', 'Content Creator',
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const EditProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    gameInterestIds: [] as number[],
    gameTags: [] as string[],
  });

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

  const [availableGames, setAvailableGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingProfile, setFetchingProfile] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (status === 'loading') return;
      if (!session?.user?.id) {
        setFetchingProfile(false);
        return;
      }

      try {
        const gamesResponse = await fetch('/api/games');
        if (gamesResponse.ok) {
          const games = await gamesResponse.json();
          setAvailableGames(games);
        }

        const profileResponse = await fetch(`/api/profile/${session.user.id}`);
        if (!profileResponse.ok) throw new Error('Failed to fetch profile');
        const data = await profileResponse.json();

        setFormData({
          username: data.username || '',
          bio: data.bio || '',
          gameInterestIds: data.gameInterestIds || [],
          gameTags: data.gameTags || [],
        });

        // Set current profile image preview
        if (data.profileImage) {
          setProfileImagePreview(data.profileImage);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load profile data');
      } finally {
        setFetchingProfile(false);
      }
    };

    fetchData();
  }, [session, status]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Please upload a valid image (JPEG, PNG, or WebP)');
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError('Image must be smaller than 5MB');
      return;
    }

    setProfileImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setError(null);
  };

  const handleGameToggle = (gameId: number) => {
    setFormData(prev => ({
      ...prev,
      gameInterestIds: prev.gameInterestIds.includes(gameId)
        ? prev.gameInterestIds.filter(id => id !== gameId)
        : [...prev.gameInterestIds, gameId],
    }));
  };

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      gameTags: prev.gameTags.includes(tag)
        ? prev.gameTags.filter(t => t !== tag)
        : [...prev.gameTags, tag],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      setError('User ID not found');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let finalImageUrl = profileImagePreview; // Start with current (could be old URL or data URL)

      // If user selected a new file, upload it and get the real URL
      if (profileImageFile) {
        const formDataUpload = new FormData();
        formDataUpload.append('file', profileImageFile);

        const uploadResponse = await fetch('/api/upload/profile-picture', {
          method: 'POST',
          body: formDataUpload,
        });

        if (!uploadResponse.ok) {
          const errData = await uploadResponse.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to upload image');
        }

        const uploadData = await uploadResponse.json();
        finalImageUrl = uploadData.url; // ← This is the real public URL
      }

      // Now update the profile — always send the final correct URL
      const response = await fetch(`/api/profile/${session.user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          bio: formData.bio,
          gameInterestIds: formData.gameInterestIds,
          gameTags: formData.gameTags,
          profileImage: finalImageUrl || null, // ← Use finalImageUrl here!
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        let errorMessage = 'Failed to update profile';
        try {
          const data = JSON.parse(text);
          errorMessage = data.error || errorMessage;
        } catch {
          errorMessage = `Server error (${response.status})`;
        }
        throw new Error(errorMessage);
      }

      router.refresh();
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
    <Container className="py-5" style={{ maxWidth: '800px' }}>
      <h2 className="mb-4">Edit Profile</h2>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {/* Profile Picture */}
        <Form.Group className="mb-4 text-center">
          <Form.Label><strong>Profile Picture</strong></Form.Label>
          <div className="my-3">
            <Image
              src={profileImagePreview || '/profile.png'}
              alt="Profile preview"
              width={150}
              height={150}
              className="rounded-circle"
              style={{
                objectFit: 'cover',
                border: '4px solid #76b900',
                boxShadow: '0 0 20px rgba(118, 185, 0, 0.3)',
              }}
            />
          </div>
          <Form.Control
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            disabled={loading}
          />
          <Form.Text className="text-muted">
            JPG, PNG, or WebP • Max 5MB • Square recommended
          </Form.Text>
        </Form.Group>

        {/* Username */}
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            disabled={loading}
            required
          />
        </Form.Group>

        {/* Bio */}
        <Form.Group className="mb-4">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            disabled={loading}
            placeholder="Tell us about yourself..."
          />
        </Form.Group>

        {/* Game Interests */}
        <Form.Group className="mb-4">
          <Form.Label className="mb-3">
            <strong>Game Interests</strong>
            (select all that apply)
          </Form.Label>
          <Row>
            {availableGames.map((game) => (
              <Col xs={6} md={4} key={game.id} className="mb-2">
                <Form.Check
                  type="checkbox"
                  id={`game-${game.id}`}
                  label={game.title || game.name || `Game ${game.id}`}
                  checked={formData.gameInterestIds.includes(game.id)}
                  onChange={() => handleGameToggle(game.id)}
                  disabled={loading}
                />
              </Col>
            ))}
          </Row>
          {availableGames.length === 0 && (
            <p className="text-muted">No games available.</p>
          )}
        </Form.Group>

        {/* Gaming Preferences */}
        <Form.Group className="mb-4">
          <Form.Label className="mb-3"><strong>Gaming Preferences</strong></Form.Label>
          <Row>
            {GAMING_TAGS.map((tag) => (
              <Col xs={6} md={4} key={tag} className="mb-2">
                <Form.Check
                  type="checkbox"
                  id={`tag-${tag}`}
                  label={tag}
                  checked={formData.gameTags.includes(tag)}
                  onChange={() => handleTagToggle(tag)}
                  disabled={loading}
                />
              </Col>
            ))}
          </Row>
        </Form.Group>

        {/* Submit Buttons */}
        <div className="d-flex gap-3">
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
