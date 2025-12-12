import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { PeopleFill, CalendarEvent, ChatHeartFill } from 'react-bootstrap-icons';
import Image from 'next/image';
import { authOptions } from '@/lib/authOptions';
import './landing.css';

/** The Home/Landing page. Redirects logged-in users to /home */
const Home = async () => {
  // Check if user is logged in
  const session = await getServerSession(authOptions);

  // If logged in, redirect to home feed
  if (session) {
    redirect('/home');
  }

  // If not logged in, show landing page
  return (
    <main className="landing-page">
      <Container fluid className="py-5 pb-5 mb-5">
        <Row className="align-items-center min-vh-100 pb-5">
          {/* Left side - Hero content */}
          <Col lg={6} className="hero-content">
            <h1 className="display-3 fw-bold mb-4">Your place to talk</h1>
            <p className="lead mb-4">
              Connect with fellow UH students who share your passion for gaming.
              Build friendships, find teammates, and join a community of gamers
              right here on campus.
            </p>
            <div className="cta-buttons">
              <Link href="/auth/signin" passHref legacyBehavior>
                <Button variant="primary" size="lg" className="me-3 px-4">
                  Log in
                </Button>
              </Link>
              <Link href="/auth/signup" passHref legacyBehavior>
                <Button variant="outline-primary" size="lg" className="px-4">
                  Register
                </Button>
              </Link>
            </div>
          </Col>

          {/* Right side - Feature showcase */}
          <Col lg={6} className="feature-showcase">
            <div className="main-feature-card mb-4">
              <Image
                src="/Lading_Page_Big_Picture.jpg"
                alt="Gaming Community"
                width={800}
                height={450}
                className="feature-image"
                priority
              />
            </div>

            <Row className="g-3">
              <Col md={4}>
                <div className="small-feature-card">
                  <div className="feature-icon-container">
                    <PeopleFill className="feature-icon-svg" size={32} />
                  </div>
                  <div className="feature-text-content">
                    <h6 className="feature-title">Find Gamers</h6>
                    <p className="feature-description">Connect with players</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="small-feature-card">
                  <div className="feature-icon-container">
                    <CalendarEvent className="feature-icon-svg" size={32} />
                  </div>
                  <div className="feature-text-content">
                    <h6 className="feature-title">Join Events</h6>
                    <p className="feature-description">Attend tournaments</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="small-feature-card">
                  <div className="feature-icon-container">
                    <ChatHeartFill className="feature-icon-svg" size={32} />
                  </div>
                  <div className="feature-text-content">
                    <h6 className="feature-title">Build Community</h6>
                    <p className="feature-description">Grow your network</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Home;
