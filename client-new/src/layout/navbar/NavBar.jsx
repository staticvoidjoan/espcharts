import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router-dom";

import logo from "../../assets/espchlogo.png";
import './NavBar.css';

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary d-flex justify-content-between" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to={"/"}><img src={logo} alt="logo" className="rounded float-left img-custom-style" />ESPCharts</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Tournaments</Nav.Link>
            <NavDropdown title="Charts" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to={"/players"}>Players</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/teams"}>
                Teams
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Matches</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to={"/contact"}>Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;