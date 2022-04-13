import React from "react";
import "./navbar-view.scss";
import { Link } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Offcanvas,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";

export function NavbarView({ user }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  return (
    <Navbar variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">myFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Movie List</Nav.Link>
            <Nav.Link href="/users/:username">Profile</Nav.Link>
            <Button
              variant="link"
              onClick={() => {
                onLoggedOut();
              }}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarView;
