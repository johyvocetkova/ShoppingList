import React,  { useContext } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext, getUsers } from '../UserContext';

const Home = () => 
{
  const { selectedUser, updateUser } = useContext(UserContext);

  const handleUserChange = (event) => {
    let user= event.target.value;
    console.log("User: " + user);
    updateUser(user);
  };

  return (
      <Container>
        
        <Row>
          First verion of the Shopping App.
        </Row>

        <Row className="mt-3">
          <Col>Choose the user:</Col>
          <Col>
            <Form.Select value={selectedUser} onChange={handleUserChange} className="ml-2">
              {getUsers().map((user, index) => (
                <option key={index} value={user}>
                  {user}
                </option>
              ))}
            </Form.Select>
          </Col>
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