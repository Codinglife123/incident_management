
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Position from 'rsuite/esm/internals/Overlay/Position';

function Snav(props) {
  let x = localStorage.getItem('Auth');
  let z = localStorage.getItem('name');
  let y = false;
  if (x === 'true') {
    y = true;
  }
  function Auth(){
    localStorage.removeItem('Auth');
    localStorage.removeItem('id');

  }

  return (


<Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" style={styles.navbar}>
  <Container>
    <Navbar.Brand href="/" style={styles.brand}>Incident Management</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" style={styles.toggle} />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        <Link to="/MyComplain" style={styles.link}>Complains</Link>
        <Link to="#pricing" style={styles.link}>{z}</Link>
      </Nav>
      <Nav>
        {!y ? (
          <>
            <Link to="/login" style={styles.link}>Log In</Link>
            <Link to="/register" style={styles.link}>Sign Up</Link>
          </>
        ) : (
          <Link onClick={Auth} to="/login" style={styles.link}>Log Out</Link>
        )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  )};
const styles = {
  navbar: {
    background: 'linear-gradient(90deg, #141E30, #243B55)',
    padding: '10px 20px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    borderBottom: '2px solid #1F487E',
  },
  brand: {
    fontSize: '2.5em',
    fontWeight: 'bold',
    color: '#FFFFFF',
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  toggle: {
    borderColor: '#FFFFFF',
  },
  link: {
    margin: '10px 10px',
    color: '#FFFFFF',
    textDecoration: 'none',
    fontSize: '1.2em',
    fontWeight: '600',
    textTransform: 'uppercase',
    transition: 'color 0.3s ease',
  },
  dropdown: {
    color: '#FFFFFF',
    fontSize: '1em',
  },
  dropdownItem: {
    color: '#FFFFFF',
    fontSize: '1em',
  },
};

// Add this to ensure links have a hover effect
styles.link[':hover'] = {
  color: '#1F487E',
};


export default Snav;