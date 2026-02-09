import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Modal, Form, NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom'; // For smooth scrolling to sections
import { FcGoogle } from 'react-icons/fc'; // Icons for auth buttons
import { AiFillApple, AiFillFacebook } from 'react-icons/ai';
import { FaInfoCircle, FaBriefcase, FaNewspaper, FaBlog, FaVideo, FaBookOpen, FaLifeRing, FaBoxOpen, FaRoad, FaUsers, FaUserCircle, FaPhone,FaMusic, FaMicrophoneAlt, FaSchool, FaUserFriends, FaUserAlt, FaChurch, FaShoppingCart} from 'react-icons/fa'; 
import {FaPeopleGroup} from 'react-icons/fa6';

import './Navbar.css'; // Custom styles for Navbar

const logoUrl = 'https://bestcoachmusic.netlify.app/IMAGES/2025-bc-logo.jpeg'

const AppNavbar = () => {

const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Placeholder auth handlers - replace with real OAuth (e.g., Firebase)
  const handleGoogleLogin = () => {
    console.log('Login with Google');
    // e.g., signInWithPopup(auth, googleProvider);
    handleClose();
  };

  const handleAppleLogin = () => {
    console.log('Login with Apple');
    // Implement Apple OAuth
    handleClose();
  };

  const handleFacebookLogin = () => {
    console.log('Login with Facebook');
    // e.g., signInWithPopup(auth, facebookProvider);
    handleClose();
  };


  return (
    <>
     <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm position-relative"> {/* position-relative for animation container */}
        {/* Animation Background */}
        <div className="animation-container">
       <span className="music-symbol">♪</span>
    <span className="music-symbol">♫</span>
    <span className="music-symbol">♬</span>
    <span className="music-symbol">♪</span>
    <span className="music-symbol">♫</span>
    <span className="music-symbol">♬</span>
    <span className="music-symbol">♪</span>
    <span className="music-symbol">♫</span>
        </div>

        <Container>
          <Navbar.Brand href="https://bestcoach-front.vercel.app/" style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#007bff' }}>
            <img 
              src={logoUrl} 
              alt="Bestcoach Music Logo" 
              style={{ height: '40px', marginRight: '10px', maxHeight: '40px' }} // Responsive height
              className="img-fluid" // Bootstrap responsive image
            />
            Bestcoach Music
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" smooth={true} duration={500} className="mx-2">Home</Nav.Link>
              
              {/* Services Dropdown */}
              <NavDropdown title="Modules" id="services-dropdown" className="mx-2">
                <NavDropdown.Item as={Link} to="/schools" smooth={true} duration={500}><FaSchool className="me-2 text-orange" />Schools</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/churches" smooth={true} duration={500}><FaChurch className="me-2 text-orange" />Churches</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/individuals" smooth={true} duration={500}><FaUserAlt className="me-2 text-orange" />Individuals</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/groups" smooth={true} duration={500}><FaUserFriends className="me-2 text-orange" />Groups</NavDropdown.Item>
              </NavDropdown>
              {/* Features Dropdown */}
              <NavDropdown title="Features" id="services-dropdown" className="mx-2">
                <NavDropdown.Item as={Link} to="/package" smooth={true} duration={500}><FaBoxOpen className="me-2 text-orange" />Packages</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/coach" smooth={true} duration={500}><FaUsers className="me-2 text-orange" />Coaches</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/method" smooth={true} duration={500}><FaRoad className="me-2 text-orange" />Methods</NavDropdown.Item>
                </NavDropdown>

          {/* Company Dropdown */}
              
               <NavDropdown title="Company" id="services-dropdown" className="mx-2">
                <NavDropdown.Item as={Link} to="/blog" smooth={true} duration={500}><FaBlog className="me-2 text-orange" />Blog</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/about" smooth={true} duration={500}><FaInfoCircle className="me-2 text-orange" />About Us</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/press" smooth={true} duration={500}><FaNewspaper className="me-2 text-orange" />Press</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/team" smooth={true} duration={500}><FaPeopleGroup className="me-2 text-orange" />Team</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/contact" smooth={true} duration={500}><FaPhone className="me-2 text-orange" />Contact Us</NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/careers" smooth={true} duration={500}><FaBriefcase className="me-2 text-orange" />Careers At Bestcoach</NavDropdown.Item>
              </NavDropdown>

                        {/* Events Dropdown */}
              <NavDropdown title="Events" id="services-dropdown" className="mx-2">
                <NavDropdown.Item as={Link} to="/tss" smooth={true} duration={500}><FaMicrophoneAlt className="me-2 text-orange" />The Singers Sanctuary</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/tmme" smooth={true} duration={500}><FaMusic className="me-2 text-orange" />The Music Mentorship Experience</NavDropdown.Item>
              </NavDropdown>

              {/* Bestcoach Music Shopping page */}
            <Nav.Link as={Link} to="/shop" smooth={true} duration={500} className="mx-2"><FaShoppingCart className="me-2 text-orange" />Shop</Nav.Link>

        
        {/* Resources Dropdown */}
               <NavDropdown title="Resources" id="services-dropdown" className="mx-2">
                <NavDropdown.Item as={Link} to="/webinars" smooth={true} duration={500}><FaVideo className="me-2 text-orange" />Webinars</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/help" smooth={true} duration={500}><FaLifeRing className="me-2 text-orange" />Help Centre</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/studio-tutorials" smooth={true} duration={500}><FaBookOpen className="me-2 text-orange" />Studio Tutorials</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {/* Sign/Signup Modal */}
            <Nav>
              <Button variant="outline-primary" onClick={handleShow} className="me-2"> <FaUserCircle className="me-2 text-orange" />
                Login / Signup
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Auth Modal (unchanged) */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login or Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <p className="text-center">Choose a provider to continue:</p>
            <Button variant="outline-secondary" className="d-block w-100 mb-3" onClick={handleGoogleLogin}>
              <FcGoogle size={24} className="me-2" /> Continue with Google
            </Button>
            <Button variant="outline-secondary" className="d-block w-100 mb-3" onClick={handleAppleLogin}>
              <AiFillApple size={24} className="me-2" /> Continue with Apple
            </Button>
            <Button variant="outline-secondary" className="d-block w-100" onClick={handleFacebookLogin}>
              <AiFillFacebook size={24} className="me-2" /> Continue with Facebook
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AppNavbar
