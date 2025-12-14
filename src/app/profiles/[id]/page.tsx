'use client';

import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  Col,
  Container,
  Row,
  Card,
  Badge,
  Button,
  Spinner,
  Modal,
  ListGroup,
} from 'react-bootstrap';
import Link from 'next/link';

interface Game {
  id: number;
  title: string;
  name?: string;
}

interface UserProfile {
  id: number;
  username: string;
  email: string;
  bio: string | null;
  profileImage: string | null;
  followers: number;
  following: number;
  gameInterestIds: number[];
  gameTags: string[];
}

interface FollowUser {
  id: number;
  username: string;
  email: string;
  profileImage: string | null;
  bio: string | null;
  followers: number;
  following: number;
}

const PublicProfilePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  // Modal states
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [followersList, setFollowersList] = useState<FollowUser[]>([]);
  const [followingList, setFollowingList] = useState<FollowUser[]>([]);
  const [modalLoading, setModalLoading] = useState(false);

  const userId = Array.isArray(id) ? id[0] : id;
  const followButtonText = isFollowing ? 'Unfollow' : 'Follow';

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        const profileRes = await fetch(`/api/profile/${userId}`);
        if (!profileRes.ok) {
          if (profileRes.status === 404) {
            setError('User not found');
          } else {
            setError('Failed to load profile');
          }
          return;
        }

        const profileData: UserProfile = await profileRes.json();

        const gamesRes = await fetch('/api/games');
        if (gamesRes.ok) {
          const gamesData: Game[] = await gamesRes.json();
          setGames(gamesData);
        }

        setProfile(profileData);

        // Check follow status if logged in and not own profile
        if (session?.user?.id && parseInt(session.user.id, 10) !== profileData.id) {
          const statusRes = await fetch(`/api/follow/status?targetUserId=${profileData.id}`);
          if (statusRes.ok) {
            const { isFollowing: following } = await statusRes.json();
            setIsFollowing(following);
          }
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, session]);

  const getGameTitle = (gameId: number) => {
    const game = games.find((g) => g.id === gameId);
    return game?.title || game?.name || `Game #${gameId}`;
  };

  const isOwnProfile = session?.user?.id && parseInt(session.user.id, 10) === profile?.id;

  const handleFollow = async () => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    setFollowLoading(true);
    try {
      if (isFollowing) {
        const res = await fetch(`/api/follow?targetUserId=${profile?.id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setIsFollowing(false);
          setProfile(prev => {
            if (!prev) return null;
            return { ...prev, followers: prev.followers - 1 };
          });
        }
      } else {
        const res = await fetch('/api/follow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ targetUserId: profile?.id }),
        });
        if (res.ok) {
          setIsFollowing(true);
          setProfile(prev => {
            if (!prev) return null;
            return { ...prev, followers: prev.followers + 1 };
          });
        }
      }
    } catch (err) {
      console.error('Error toggling follow:', err);
    } finally {
      setFollowLoading(false);
    }
  };

  const fetchFollowers = async () => {
    if (!profile) return;
    setModalLoading(true);
    try {
      const res = await fetch(`/api/users/${profile.id}/followers`);
      if (res.ok) {
        const data = await res.json();
        setFollowersList(data);
      }
    } catch (err) {
      console.error('Error fetching followers:', error);
    } finally {
      setModalLoading(false);
    }
  };

  const fetchFollowing = async () => {
    if (!profile) return;
    setModalLoading(true);
    try {
      const res = await fetch(`/api/users/${profile.id}/following`);
      if (res.ok) {
        const data = await res.json();
        setFollowingList(data);
      }
    } catch (err) {
      console.error('Error fetching following:', error);
    } finally {
      setModalLoading(false);
    }
  };

  const handleShowFollowers = () => {
    setShowFollowersModal(true);
    fetchFollowers();
  };

  const handleShowFollowing = () => {
    setShowFollowingModal(true);
    fetchFollowing();
  };

  if (loading) {
    return (
      <main
        style={{
          minHeight: '100vh',
          background: '#0d0d0d',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spinner animation="border" style={{ color: '#76b900' }} />
      </main>
    );
  }

  if (error || !profile) {
    return (
      <main
        style={{
          minHeight: '100vh',
          background: '#0d0d0d',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p style={{ color: '#b3b3b3', fontSize: '1.5rem' }}>
          {error || 'Profile not found'}
        </p>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)',
        padding: '2rem 0',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 20% 30%, rgba(118, 185, 0, 0.1) 0%, transparent 50%), '
            + 'radial-gradient(circle at 80% 70%, rgba(57, 255, 20, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      <Container className="py-4" style={{ position: 'relative', zIndex: 1 }}>
        <Row className="justify-content-center mb-4">
          <Col md={10} lg={8}>
            <Card
              style={{
                borderRadius: '15px',
                boxShadow: '0 8px 32px rgba(118, 185, 0, 0.3)',
                border: '2px solid #76b900',
                backgroundColor: '#1a1a1a',
              }}
            >
              <Card.Body className="p-4">
                <Row className="align-items-center">
                  <Col xs={12} md={3} className="text-center mb-3 mb-md-0">
                    <img
                      src={profile.profileImage || '/profile.png'}
                      alt={profile.username}
                      width={150}
                      height={150}
                      className="rounded-circle"
                      style={{
                        objectFit: 'cover',
                        border: '4px solid #76b900',
                        boxShadow: '0 0 20px rgba(118, 185, 0, 0.5)',
                      }}
                    />
                  </Col>
                  <Col xs={12} md={9}>
                    <h2
                      style={{
                        color: '#76b900',
                        fontWeight: 'bold',
                        textShadow: '0 0 10px rgba(118, 185, 0, 0.5)',
                      }}
                    >
                      {profile.username}
                    </h2>
                    <p style={{ color: '#b3b3b3' }} className="mb-3">
                      {profile.email}
                    </p>
                    <div className="d-flex gap-4 mb-3">
                      <button
                        type="button"
                        onClick={handleShowFollowers}
                        style={{
                          fontSize: '1.1rem',
                          cursor: 'pointer',
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          color: 'inherit',
                          textAlign: 'left',
                        }}
                      >
                        <strong style={{ color: '#76b900' }}>{profile.followers}</strong>
                        {' '}
                        <span style={{ color: '#b3b3b3', textDecoration: 'underline' }}>
                          Followers
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={handleShowFollowing}
                        style={{
                          fontSize: '1.1rem',
                          cursor: 'pointer',
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          color: 'inherit',
                          textAlign: 'left',
                        }}
                      >
                        <strong style={{ color: '#76b900' }}>{profile.following}</strong>
                        {' '}
                        <span style={{ color: '#b3b3b3', textDecoration: 'underline' }}>
                          Following
                        </span>
                      </button>
                    </div>

                    <div className="d-flex gap-2">
                      {isOwnProfile ? (
                        <Link href="/profiles/edit">
                          <Button
                            style={{
                              background:
                                'linear-gradient(135deg, #76b900 0%, #39ff14 100%)',
                              border: 'none',
                              padding: '0.5rem 1.5rem',
                              fontWeight: '700',
                              color: '#0d0d0d',
                              boxShadow: '0 4px 15px rgba(118, 185, 0, 0.4)',
                            }}
                          >
                            Edit Profile
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          type="button"
                          onClick={handleFollow}
                          disabled={followLoading}
                          style={{
                            background: isFollowing
                              ? '#2d2d2d'
                              : 'linear-gradient(135deg, #76b900 0%, #39ff14 100%)',
                            border: isFollowing ? '2px solid #76b900' : 'none',
                            padding: '0.5rem 1.5rem',
                            fontWeight: '700',
                            color: isFollowing ? '#76b900' : '#0d0d0d',
                            boxShadow: '0 4px 15px rgba(118, 185, 0, 0.4)',
                          }}
                        >
                          {followLoading ? <Spinner animation="border" size="sm" /> : followButtonText}
                        </Button>
                      )}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* About Me */}
        <Row className="justify-content-center mb-4">
          <Col md={10} lg={8}>
            <Card
              style={{
                borderRadius: '15px',
                boxShadow: '0 8px 32px rgba(118, 185, 0, 0.2)',
                border: '1px solid #76b900',
                backgroundColor: '#1a1a1a',
              }}
            >
              <Card.Body className="p-4">
                <h4
                  style={{
                    color: '#76b900',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                  }}
                >
                  About Me
                </h4>
                <p style={{ color: '#b3b3b3', lineHeight: '1.6' }}>
                  {profile.bio || 'No bio yet.'}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Game Interests */}
        <Row className="justify-content-center mb-4">
          <Col md={10} lg={8}>
            <Card
              style={{
                borderRadius: '15px',
                boxShadow: '0 8px 32px rgba(118, 185, 0, 0.2)',
                border: '1px solid #76b900',
                backgroundColor: '#1a1a1a',
              }}
            >
              <Card.Body className="p-4">
                <h4
                  style={{
                    color: '#76b900',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                  }}
                >
                  Game Interests
                </h4>
                <div className="d-flex flex-wrap gap-2">
                  {profile.gameInterestIds.length > 0 ? (
                    profile.gameInterestIds.map((gameId) => (
                      <Badge
                        key={gameId}
                        style={{
                          background:
                            'linear-gradient(135deg, #76b900 0%, #39ff14 100%)',
                          padding: '0.5rem 1rem',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          borderRadius: '20px',
                          color: '#0d0d0d',
                          boxShadow: '0 2px 10px rgba(118, 185, 0, 0.3)',
                        }}
                      >
                        {getGameTitle(gameId)}
                      </Badge>
                    ))
                  ) : (
                    <p style={{ color: '#666' }}>No game interests added yet</p>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Gaming Preferences */}
        <Row className="justify-content-center mb-4">
          <Col md={10} lg={8}>
            <Card
              style={{
                borderRadius: '15px',
                boxShadow: '0 8px 32px rgba(118, 185, 0, 0.2)',
                border: '1px solid #76b900',
                backgroundColor: '#1a1a1a',
              }}
            >
              <Card.Body className="p-4">
                <h4
                  style={{
                    color: '#76b900',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                  }}
                >
                  Gaming Preferences
                </h4>
                <div className="d-flex flex-wrap gap-2">
                  {profile.gameTags.length > 0 ? (
                    profile.gameTags.map((tag) => (
                      <Badge
                        key={tag}
                        style={{
                          background:
                            'linear-gradient(135deg, #76b900 0%, #39ff14 100%)',
                          padding: '0.5rem 1rem',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          borderRadius: '20px',
                          color: '#0d0d0d',
                          boxShadow: '0 2px 10px rgba(118, 185, 0, 0.3)',
                        }}
                      >
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <p style={{ color: '#666' }}>
                      No gaming preferences added yet
                    </p>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Followers Modal */}
      <Modal
        show={showFollowersModal}
        onHide={() => setShowFollowersModal(false)}
        centered
        contentClassName="bg-dark"
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: '#1a1a1a', borderBottom: '2px solid #76b900' }}
        >
          <Modal.Title style={{ color: '#76b900' }}>
            Followers (
            {profile.followers}
            )
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#1a1a1a', maxHeight: '400px', overflowY: 'auto' }}>
          {(() => {
            if (modalLoading) {
              return (
                <div className="text-center py-4">
                  <Spinner animation="border" style={{ color: '#76b900' }} />
                </div>
              );
            }

            if (followersList.length === 0) {
              return <p style={{ color: '#b3b3b3', textAlign: 'center' }}>No followers yet</p>;
            }

            return (
              <ListGroup variant="flush">
                {followersList.map((user) => (
                  <ListGroup.Item
                    key={user.id}
                    style={{
                      backgroundColor: '#0d0d0d',
                      border: '1px solid #2d2d2d',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <Link
                      href={`/profiles/${user.id}`}
                      style={{ textDecoration: 'none' }}
                      onClick={() => setShowFollowersModal(false)}
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={user.profileImage || '/profile.png'}
                          alt={user.username}
                          width={50}
                          height={50}
                          className="rounded-circle"
                          style={{
                            objectFit: 'cover',
                            border: '2px solid #76b900',
                            marginRight: '1rem',
                          }}
                        />
                        <div>
                          <div style={{ color: '#76b900', fontWeight: 'bold' }}>
                            {user.username}
                          </div>
                          <div style={{ color: '#b3b3b3', fontSize: '0.85rem' }}>
                            {user.followers}
                            {' '}
                            followers
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            );
          })()}
        </Modal.Body>
      </Modal>

      {/* Following Modal */}
      <Modal
        show={showFollowingModal}
        onHide={() => setShowFollowingModal(false)}
        centered
        contentClassName="bg-dark"
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: '#1a1a1a', borderBottom: '2px solid #76b900' }}
        >
          <Modal.Title style={{ color: '#76b900' }}>
            Following (
            {profile.following}
            )
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#1a1a1a', maxHeight: '400px', overflowY: 'auto' }}>
          {(() => {
            if (modalLoading) {
              return (
                <div className="text-center py-4">
                  <Spinner animation="border" style={{ color: '#76b900' }} />
                </div>
              );
            }

            if (followingList.length === 0) {
              return (
                <p style={{ color: '#b3b3b3', textAlign: 'center' }}>
                  Not following anyone yet
                </p>
              );
            }

            return (
              <ListGroup variant="flush">
                {followingList.map((user) => (
                  <ListGroup.Item
                    key={user.id}
                    style={{
                      backgroundColor: '#0d0d0d',
                      border: '1px solid #2d2d2d',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <Link
                      href={`/profiles/${user.id}`}
                      style={{ textDecoration: 'none' }}
                      onClick={() => setShowFollowingModal(false)}
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={user.profileImage || '/profile.png'}
                          alt={user.username}
                          width={50}
                          height={50}
                          className="rounded-circle"
                          style={{
                            objectFit: 'cover',
                            border: '2px solid #76b900',
                            marginRight: '1rem',
                          }}
                        />
                        <div>
                          <div style={{ color: '#76b900', fontWeight: 'bold' }}>
                            {user.username}
                          </div>
                          <div style={{ color: '#b3b3b3', fontSize: '0.85rem' }}>
                            {user.followers}
                            {' '}
                            followers
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            );
          })()}
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default PublicProfilePage;
