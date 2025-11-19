import { Col, Container, Row } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-5">
      <Row className="text-center mb-5">
        <Col>
          <h1>UH Connect</h1>
          <p className="lead">This is a placeholder landing page.</p>
        </Col>
      </Row>

      <Row className="text-center">
        <Col>
          <p>Replace this content with your actual landing page.</p>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;