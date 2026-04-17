// src/components/Navbar.jsx - FINAL (links to dedicated auth pages)
import React, { useState, useEffect, useContext } from 'react';
import { Navbar, Nav, Container, Button, Image, NavDropdown } from 'react-bootstrap';  
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FaUserCircle, FaHome, FaMusic, FaMicrophoneAlt, FaBriefcase } from 'react-icons/fa';
import { FaPeopleGroup, FaPhone } from 'react-icons/fa6';
import { BsPeopleFill } from "react-icons/bs";
import { FcAbout } from "react-icons/fc";
import TopHeader from './TOPHEADER/TopHeader';
import { ThemeContext } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const logoUrl = 'https://bestcoachmusic.netlify.app/IMAGES/2025-bc-logo.jpeg';

const AppNavbar = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true);
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        setUserProfile(userDoc.exists() ? userDoc.data() : {});
      } else {
        setIsLoggedIn(false);
        setUserProfile({});
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out successfully");
  };

  const getFirstName = () => userProfile?.displayName?.split(' ')[0] || 'User';

  return (
    <>
     <TopHeader />
      <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm modern-navbar glass-navbar" fixed="top">
        {/* Music Bubbles - Full coverage */}
        <div className="animation-container">
          {[...Array(12)].map((_, i) => (
            <span key={i} className="music-symbol" style={{ left: `${5 + i * 7}%`, animationDelay: `${i * 0.3}s` }}>♪</span>
          ))}
        </div>

        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center text-primary">
            <img src={logoUrl} alt="Bestcoach Music Logo" style={{ height: '40px', marginRight: '10px' }} />
            Bestcoach Music
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto nav-links">
              <Nav.Link as={Link} to="/"><FaHome className="me-2 text-orange" />Home</Nav.Link>
              <Nav.Link as={Link} to="/community"><BsPeopleFill className="me-2 text-orange" />Community</Nav.Link>
              <NavDropdown title="Events" className="mx-2">
                <NavDropdown.Item as={Link} to="/tss"><FaMicrophoneAlt className="me-2 text-orange" />Singers Sanctuary</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/tmme"><FaMusic className="me-2 text-orange" />Music Mentorship</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Company" className="mx-2">
                <NavDropdown.Item as={Link} to="/about"><FcAbout className="me-2 text-orange" />About Us</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/team"><FaPeopleGroup className="me-2 text-orange" />Team</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/contact"><FaPhone className="me-2 text-orange" />Contact Us</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/careers"><FaBriefcase className="me-2 text-orange" />  Careers</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Nav className="align-items-center">
              {isLoggedIn ? (
                <div className="d-flex align-items-center gap-3">
                  <Link to="/profile" className="d-flex align-items-center gap-2 text-decoration-none">
                    <Image src={userProfile.photoURL || '/default-avatar.png'} width="36" height="36" roundedCircle />
                    <span>{getFirstName()}</span>
                  </Link>
                  <Button variant="outline-light" size="sm" onClick={() => setIsDark(!isDark)}>
                    {isDark ? <FaSun /> : <FaMoon />}
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={handleLogout}>Logout</Button>
                </div>
              ) : (
                <>
                  <Button variant="outline-primary" className="me-2 login-btn" as={Link} to="/signin"> <FaUserCircle className="me-1" />
                    Sign In
                  </Button>
                  <Button variant="primary" as={Link} to="/signup"> <FaUserCircle className="me-1" />
                    Sign Up
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;