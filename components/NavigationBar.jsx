import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav, NavDropdown } from 'react-bootstrap'

const NavigationBar = () => (
  <Navbar className="bg-brown-400 shadow-sm" expand="lg">
    <Container>
      <Navbar.Brand href="#home">
        <a className="navbar-brand" href="#">
          <img
            src="/bild_logga.png"
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt=""
          />
        </a>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link href="/" passHref>
            <Nav.Link>Idag</Nav.Link>
          </Link>
          <Link href="/about" passHref>
            <Nav.Link>Om expeditionen</Nav.Link>
          </Link>
          {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)

export default NavigationBar
