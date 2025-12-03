import HomeEvent from '@/components/HomeEvent';
import HomePost from '@/components/HomePost';
import { Col, Row } from 'react-bootstrap';

export default function HomePage() {
  const samplePost = {
    id: 1,
    username: 'andrew123',
    content: 'This is my first post! My favorite game is Minecraft!',
    image: 'https://avatars.githubusercontent.com/u/229228841?v=4',
    tags: ['minecraft', 'server', 'survival'],
  };
  const samplePost2 = {
    id: 1,
    username: 'FunHaverBob',
    content: 'I love playing valorant with friends! Anyone up for a match?',
    image: 'https://i.etsystatic.com/49980402/r/il/a4db6e/5759608293/il_570xN.5759608293_p54b.jpg',
    tags: ['valorant', 'LFG'],
  };
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
        background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)',
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Background glow effects */}
      <div style={{
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

      <main className="container mt-4" style={{ position: 'relative', zIndex: 1 }}>
        <h1
          className="mb-4 text-center"
          style={{
            color: '#76b900',
            fontWeight: 'bold',
            textShadow: '0 0 20px rgba(118, 185, 0, 0.5)',
            fontSize: '3rem',
          }}
        >
          Home 🏠
        </h1>
        <Row className="mt-3">
          <Col
            style={{
              backgroundColor: '#1a1a1a',
              border: '2px solid #76b900',
              boxShadow: '0 8px 32px rgba(118, 185, 0, 0.2)',
            }}
            className="p-3 rounded me-3 mb-4"
          >
            <h2
              className="text-center mb-3"
              style={{
                color: '#76b900',
                fontWeight: 'bold',
                textShadow: '0 0 10px rgba(118, 185, 0, 0.3)',
              }}
            >
              Browse Posts
            </h2>
            <HomePost post={samplePost} />
            <HomePost post={samplePost2} />
          </Col>
          <Col
            style={{
              backgroundColor: '#1a1a1a',
              border: '2px solid #76b900',
              boxShadow: '0 8px 32px rgba(118, 185, 0, 0.2)',
            }}
            className="p-3 rounded ms-3 mb-4"
          >
            <h2
              className="text-center mb-3"
              style={{
                color: '#76b900',
                fontWeight: 'bold',
                textShadow: '0 0 10px rgba(118, 185, 0, 0.3)',
              }}
            >
              Events
            </h2>
            <HomeEvent event={sampleEvent} />
            <HomeEvent event={sampleEvent2} />
          </Col>
        </Row>
      </main>
    </div>
  );
}
