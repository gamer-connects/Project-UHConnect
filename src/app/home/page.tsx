import HomeEvent from '@/components/HomeEvent';
import HomePost from '@/components/HomePost';
import { Col, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
      game: true,
    },
  });

  // Hardcoded events
  const sampleEvent = {
    id: 1,
    title: 'Smash Bros Tournament',
    date: 'Nov 30, 2025',
    location: 'Online Server',
    description: 'Join our epic Smash Bros tournament and win prizes!',
    flyer:
      'https://www.sandiego.edu/uploads/8ea582779838a6e4477062c65d71c12d.png',
    type: 'Tournament',
  };

  const sampleEvent2 = {
    id: 1,
    title: 'Minecraft Survival LAN Party',
    date: 'Nov 30, 2025',
    location: 'UH iLab',
    description: 'Have fun with others in a minecraft survival LAN party!',
    flyer: 'https://m.media-amazon.com/images/I/71Vnfqb54GL.jpg',
    type: 'LAN Party',
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1E90FF 0%, #8A2BE2 100%)',
        width: '100%',
      }}
    >
      <main className="container mt-4">
        <h1 className="mb-4 text-center text-white">Home🏠</h1>

        <Row className="mt-3">
          {/* POSTS */}
          <Col
            style={{
              backgroundColor: 'rgba(108, 117, 125, 0.7)',
            }}
            className="p-3 rounded me-3 mb-4"
          >
            <h2 className="text-center mb-3 text-white">Browse Posts</h2>

            {posts.map((post) => (
              <HomePost
                key={post.id}
                post={{
                  id: post.id,
                  content: post.content,
                  createdAt: post.createdAt.toISOString(),
                  tags: post.tags,
                  user: {
                    username: post.user.username,
                    profileImage: post.user.profileImage,
                  },
                  game: {
                    name: post.game.name,
                    picture: post.game.picture,
                  },
                }}
              />
            ))}
          </Col>

          {/* EVENTS (unchanged) */}
          <Col
            style={{
              backgroundColor: 'rgba(108, 117, 125, 0.7)',
            }}
            className="p-3 rounded ms-3 mb-4"
          >
            <h2 className="text-center mb-3 text-white">Events</h2>
            <HomeEvent event={sampleEvent} />
            <HomeEvent event={sampleEvent2} />
          </Col>
        </Row>
      </main>
    </div>
  );
}
