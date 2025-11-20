import { Col, Container, Row } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-4 footer-custom">
    <Container>
      <Row>
        <Col className="text-center">
          <strong className="footer-title">UH Connect</strong>
          {' '}
          - Gaming Social Network
          <br />
          University of Hawaii at Manoa
          <br />
          <span className="footer-tagline">Connect • Game • Build Community</span>
          <br />
          <div className="mt-3 footer-links">
            <span className="me-3">About</span>
            <span className="text-muted">|</span>
            <span className="mx-3">Contact</span>
            <span className="text-muted">|</span>
            <span className="mx-3">Privacy</span>
            <span className="text-muted">|</span>
            <span className="ms-3">Terms</span>
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
