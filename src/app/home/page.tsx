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
  const sampleEvent = {
    id: 1,
    title: 'Smash Bros Tournament',
    date: 'Nov 30, 2025',
    location: 'Online Server',
    description: 'Join our epic Smash Bros tournament and win prizes!',
    flyer: 'https://www.sandiego.edu/uploads/8ea582779838a6e4477062c65d71c12d.png',
    type: 'Tournament',
  };

  const sampleEvent2 = {
    id: 2,
    title: 'Minecraft Survival LAN Party',
    date: 'Nov 30, 2025',
    location: 'UH iLab',
    description: 'Have fun with others at the Minecraft LAN survival party!',
    flyer: 'https://m.media-amazon.com/images/I/71Vnfqb54GL.jpg',
    type: 'LAN Party',
  };

  return (
    <main
      className="page-content"
      style={{
        paddingTop: '120px',
        paddingBottom: '120px',
        position: 'relative',
      }}
    >
      {/* Neon Glow Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 30% 20%, rgba(118,185,0,0.08) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(57,255,20,0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h1
          className="text-center mb-5"
          style={{
            color: '#76b900',
            fontWeight: 'bold',
            textShadow: '0 0 20px rgba(118,185,0,0.5)',
            fontSize: '3rem',
          }}
        >
          Home
        </h1>

        <Row className="g-4">
          {/* POSTS SECTION */}
          <Col md={6}>
            <div
              style={{
                backgroundColor: '#1a1a1a',
                border: '2px solid #76b900',
                boxShadow: '0 8px 32px rgba(118,185,0,0.25)',
              }}
              className="p-3 rounded"
            >
              <h2
                className="text-center mb-3"
                style={{
                  color: '#76b900',
                  fontWeight: 'bold',
                  textShadow: '0 0 10px rgba(118,185,0,0.3)',
                }}
              >
                Browse Posts
              </h2>

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
            </div>
          </Col>

          {/* EVENTS SECTION */}
          <Col md={6}>
            <div
              style={{
                backgroundColor: '#1a1a1a',
                border: '2px solid #76b900',
                boxShadow: '0 8px 32px rgba(118,185,0,0.25)',
              }}
              className="p-3 rounded"
            >
              <h2
                className="text-center mb-3"
                style={{
                  color: '#76b900',
                  fontWeight: 'bold',
                  textShadow: '0 0 10px rgba(118,185,0,0.3)',
                }}
              >
                Events
              </h2>

              <HomeEvent event={sampleEvent} />
              <HomeEvent event={sampleEvent2} />
            </div>
          </Col>
        </Row>
      </div>
    </main>
  );
}
