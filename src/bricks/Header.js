import React, { useContext } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { UserContext } from '../UserContext';

const Header = () => {
    const { selectedUser } = useContext(UserContext);

    return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/"><h1>Shopping App</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Text className="ms-auto">
            Signed in as: {selectedUser}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;