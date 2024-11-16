import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => 
{
  return (
      <Container>
        
        <Row claass="fs-1">
          First verion of the Shopping App.
        </Row>

        <Row className="mt-3">
          <Link to="/shopping-list">
            Go to Shopping List
           </Link>
        </Row>

      </Container>
  );
}

export default Home;