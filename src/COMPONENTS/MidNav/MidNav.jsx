import React, { useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaGlobe } from 'react-icons/fa6';
import { LanguageContext } from '../../context/LanguageContext';
import './MidNav.css';

const MidNav = () => {
  const { language, setLanguage, languages } = useContext(LanguageContext);

  return (
    <Navbar bg="light" expand="lg" className="mid-nav shadow-sm sticky-top" style={{ zIndex: 1030 }}>
  <Container fluid className="px-4"> {/* fluid ensures it can reach the far edges */}
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto align-items-center custom-nav-gap">
        {/* Language Dropdown */}
        <NavDropdown
          title={<span className="d-flex align-items-center">{language}<FaGlobe className="ms-1" /></span>}
          id="language-dropdown"
        >
          {languages.map((lang) => (
            <NavDropdown.Item key={lang.code} onClick={() => setLanguage(lang.label)}>
              {lang.label} {language === lang.label && <span className="text-success ms-2">✓</span>}
            </NavDropdown.Item>
          ))}
        </NavDropdown>

        {/* Support Dropdown */}
        <NavDropdown title="Support" id="support-dropdown">
          <NavDropdown.Item href="/help">Help Centre</NavDropdown.Item>
          <NavDropdown.Item>Support Plans</NavDropdown.Item>
          <NavDropdown.Item>Partner Solutions</NavDropdown.Item>
        </NavDropdown>

        {/* Login Dropdown */}
        <NavDropdown title="Login" id="login-dropdown" align="end">
         <NavDropdown.Item
              onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { mode: 'login' } }))}
            >
            <img src="https://bestcoachmusic.netlify.app/IMAGES/2025-bc-logo.jpeg" alt="Logo" width="24" height="24" className="me-2 rounded-circle" />
            Login as a member
          </NavDropdown.Item>
          {/* ... other items */}
          <NavDropdown.Item  onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { mode: 'login' } }))}>Login as a BCM Executive</NavDropdown.Item>
            <NavDropdown.Item onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { mode: 'login' } }))}>Login to access Music resources,<br /> Bestcoach Music Community &  <br />Threads Platform, <br /> Shop Bestcoach Music, <br /> Access Bestcoach Music Services</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
};

export default MidNav;