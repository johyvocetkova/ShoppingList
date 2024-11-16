import React, { useContext } from 'react';
import { Navbar, Container, Form, Row, Col } from 'react-bootstrap';
import { UserContext, getUsers } from '../UserContext';

const Header = () => 
{
  const { selectedUser, updateUser } = useContext(UserContext);

  const handleUserChange = (event) => {
    updateUser(event.target.value);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/"><h1>Shopping App</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Text className="ms-auto">
            <Row>
              <Col>
                <b>Signed in as:</b>
              </Col> 
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
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;