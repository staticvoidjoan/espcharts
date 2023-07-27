import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import the custom CSS file

function NavBar() {
  return (
    <Navbar expand="lg" className="nav-color">
      <Container>
        <Navbar.Brand as={Link} to={"/"} className="nav-text-color">ESPCharts</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/tournament"} className="nav-text-color">Tournaments</Nav.Link>
            <NavDropdown title="Charts" id="basic-nav-dropdown" className="nav-text-color">
              <NavDropdown.Item as={Link} to={"/player"}>Players</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/team"}>
                Teams
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Matches</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to={"/contact"} className="nav-text-color">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
