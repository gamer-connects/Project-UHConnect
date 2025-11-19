// src/app/user-search/page.tsx
import { Col, Container, Row } from 'react-bootstrap';

/** The User Search page. */
const UserSearch = () => (
  <main>
    <Container id="user-search-page" fluid className="py-5">
      <Row className="text-center mb-5">
        <Col>
          <h1>User Search</h1>
          <p className="lead">Search for users here.</p>
        </Col>
      </Row>

      <Row className="text-center">
        <Col>
          <p>User search functionality will go here.</p>
        </Col>
      </Row>
    </Container>
  </main>
);

export default UserSearch;
