// src/components/Navbar.jsx - Updated with real-time Google/Microsoft/Apple OAuth, password strength indicator, enhanced OAuth styling, full countries/languages from backend
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Modal, Form, NavDropdown, Alert, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple, AiFillFacebook } from 'react-icons/ai';
import { FaBriefcase, FaNewspaper, FaBlog, FaVideo, FaBookOpen, FaLifeRing, FaBoxOpen, FaRoad, FaUsers, FaUserCircle, FaPhone, FaMusic, FaMicrophoneAlt, FaShoppingCart } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import { BsPeopleFill } from "react-icons/bs";
import Select from 'react-select';
import axios from 'axios';
import AIAgent from './AIAgent';
import './Navbar.css'; // Updated with OAuth styling + strength indicator

const logoUrl = 'https://bestcoachmusic.netlify.app/IMAGES/2025-bc-logo.jpeg';

const AppNavbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ email: '', country: null, language: null, password: '', confirmPassword: '' });
  const [forgotForm, setForgotForm] = useState({ email: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });
  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({ level: 'weak', color: 'red', width: '25%' }); // Real-time strength

  // 13. Fetch ALL countries and languages from backend in real-time
  useEffect(() => {
    axios.get('/api/countries').then(res => setCountries(res.data)).catch(() => setCountries([]));
    axios.get('/api/languages').then(res => setLanguages(res.data)).catch(() => setLanguages([]));
  }, []);

  // Real-time email validation (debounce)
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (loginForm.email) {
        try {
          const res = await axios.get(`/api/check-email?email=${loginForm.email}`);
          setErrors(prev => ({ ...prev, email: res.data.exists ? '' : 'Email not found' }));
        } catch {
          setErrors(prev => ({ ...prev, email: 'Validation error' }));
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [loginForm.email]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (signupForm.email) {
        try {
          const res = await axios.get(`/api/check-email?email=${signupForm.email}`);
          setErrors(prev => ({ ...prev, email: res.data.exists ? 'Email already in use' : '' }));
        } catch {
          setErrors(prev => ({ ...prev, email: 'Validation error' }));
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [signupForm.email]);

  // 3 & 8. Real-time password strength indicator + validation
  const validatePassword = (password, confirm) => {
    if (password.length < 8) return 'At least 8 characters';
    if (!/[A-Z]/.test(password)) return 'Include uppercase';
    if (!/[0-9]/.test(password)) return 'Include number';
    if (confirm && password !== confirm) return 'Passwords do not match';
    return '';
  };

  const calculateStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    if (password.length >= 12) score += 1;

    if (score <= 2) return { level: 'Weak', color: 'red', width: '25%' };
    if (score === 3) return { level: 'Medium', color: 'orange', width: '50%' };
    return { level: 'Strong', color: 'green', width: '100%' };
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
    if (name === 'password') setErrors(prev => ({ ...prev, password: validatePassword(value) }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target || { name: e.name, value: e.value };
    setSignupForm(prev => ({ ...prev, [name]: value }));
    if (name === 'password') {
      setErrors(prev => ({ ...prev, password: validatePassword(value, signupForm.confirmPassword) }));
      setPasswordStrength(calculateStrength(value)); // Real-time strength
    }
    if (name === 'confirmPassword') setErrors(prev => ({ ...prev, confirmPassword: validatePassword(signupForm.password, value) }));
  };

  const handleForgotChange = (e) => {
    const { name, value } = e.target;
    setForgotForm(prev => ({ ...prev, [name]: value }));
  };

  // 1. Login with Email/Password (real backend)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      const response = await axios.post('/api/login', loginForm, { withCredentials: true });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        setIsLoggedIn(true);
        const profileRes = await axios.get('/api/profile', { headers: { Authorization: `Bearer ${response.data.token}` } });
        setUserProfile(profileRes.data);
      }
      setStatus({ loading: false, success: true, error: '' });
      setShowLogin(false);
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.response?.data?.error || 'Login failed' });
    }
  };

  // 7. Signup with Email, Country, Language, Password
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      const response = await axios.post('/api/signup', signupForm, { withCredentials: true });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        setIsLoggedIn(true);
        const profileRes = await axios.get('/api/profile', { headers: { Authorization: `Bearer ${response.data.token}` } });
        setUserProfile(profileRes.data);
      }
      setStatus({ loading: false, success: true, error: '' });
      setShowSignup(false);
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.response?.data?.error || 'Signup failed' });
    }
  };

  // 2. Password Reset
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      await axios.post('/api/forgot-password', forgotForm);
      setStatus({ loading: false, success: true, error: '' });
      setShowForgot(false);
      setShowLogin(true);
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.response?.data?.error || 'Reset failed' });
    }
  };

  // 4,5,6,9,10,11. Real OAuth (backend redirects)
  const handleGoogleLogin = () => { window.location.href = '/api/auth/google'; };
  const handleAppleLogin = () => { window.location.href = '/api/auth/apple'; };
  const handleFacebookLogin = () => { window.location.href = '/api/auth/facebook'; };
  const handleMicrosoftLogin = () => { window.location.href = '/api/auth/microsoft'; };

  // Mock logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUserProfile({});
    window.location.href = '/';
  };

  // Handle OAuth callback with token in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('authToken', token);
      setIsLoggedIn(true);
      axios.get('/api/profile', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setUserProfile(res.data))
        .catch(() => setIsLoggedIn(false));
      window.history.replaceState({}, document.title, window.location.pathname); // Clean URL
    }
  }, []);

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      axios.get('/api/profile', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setUserProfile(res.data))
        .catch(() => setIsLoggedIn(false));
    }
  }, []);

  return (
    <>
      <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm position-relative">
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
            <img src={logoUrl} alt="Bestcoach Music Logo" style={{ height: '40px', marginRight: '10px' }} className="img-fluid" />
            Bestcoach Music
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" smooth={true} duration={500} className="mx-2">Home</Nav.Link>
              <Nav.Link as={Link} to="/community" smooth={true} duration={500} className="mx-2"><BsPeopleFill className="me-2 text-orange" />Community & Forums</Nav.Link>
              <NavDropdown title="Events" id="services-dropdown" className="mx-2">
                <NavDropdown.Item as={Link} to="/tss" smooth={true} duration={500}><FaMicrophoneAlt className="me-2 text-orange" />The Singers Sanctuary</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/tmme" smooth={true} duration={500}><FaMusic className="me-2 text-orange" />The Music Mentorship Experience</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Company" id="services-dropdown" className="mx-2">
                <NavDropdown.Item as={Link} to="/blog" smooth={true} duration={500}><FaBlog className="me-2 text-orange" />Blog</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/about" smooth={true} duration={500}>About Us</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/press" smooth={true} duration={500}><FaNewspaper className="me-2 text-orange" />Press</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/team" smooth={true} duration={500}><FaPeopleGroup className="me-2 text-orange" />Team</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/contact" smooth={true} duration={500}><FaPhone className="me-2 text-orange" />Contact Us</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/careers" smooth={true} duration={500}><FaBriefcase className="me-2 text-orange" />Careers At Bestcoach</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Features" id="services-dropdown" className="mx-2">
                <NavDropdown.Item as={Link} to="/package" smooth={true} duration={500}><FaBoxOpen className="me-2 text-orange" />Packages</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/coach" smooth={true} duration={500}><FaUsers className="me-2 text-orange" />Coaches</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/method" smooth={true} duration={500}><FaRoad className="me-2 text-orange" />Methods</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/shop" smooth={true} duration={500} className="mx-2"><FaShoppingCart className="me-2 text-orange" />Shop</Nav.Link>
              <NavDropdown title="Resources" id="services-dropdown" className="mx-2">
                <NavDropdown.Item as={Link} to="/webinars" smooth={true} duration={500}><FaVideo className="me-2 text-orange" />Webinars</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/help" smooth={true} duration={500}><FaLifeRing className="me-2 text-orange" />Help Centre</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/studio-tutorials" smooth={true} duration={500}><FaBookOpen className="me-2 text-orange" />Studio Tutorials</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              {isLoggedIn ? (
                <>
                  <Nav.Link className="mx-2" title={userProfile.email}>
                    <FaUserCircle className="me-2 text-orange" />
                    {userProfile.email ? userProfile.email.split('@')[0] : 'Profile'}
                  </Nav.Link>
                  <Nav.Link as={Link} to="/profile" className="mx-2">View Full Profile</Nav.Link>
                  <Button variant="danger" onClick={handleLogout} className="me-2">Logout</Button>
                </>
              ) : (
                <Button variant="outline-primary" onClick={() => setShowLogin(true)} className="me-2"> <FaUserCircle className="me-2 text-orange" /> Login / Signup</Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login Modal */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
        <Modal.Body>
          <Image src={logoUrl} alt="BCM Logo" className="d-block mx-auto mb-3" fluid />
          <h3 className="text-center mb-4">Sign In</h3>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" value={loginForm.email} onChange={handleLoginChange} required isInvalid={!!errors.email} />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={loginForm.password} onChange={handleLoginChange} required isInvalid={!!errors.password} />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
            <p className="text-end text-orange cursor-pointer mb-3" onClick={() => { setShowLogin(false); setShowForgot(true); }}>Forgot password?</p>
            <Button variant="primary" type="submit" disabled={status.loading} className="w-100 mb-3">
              {status.loading ? 'Signing In...' : 'Sign In'}
            </Button>
            {status.success && <Alert variant="success">Logged in successfully!</Alert>}
            {status.error && <Alert variant="danger">{status.error}</Alert>}
          </Form>
          <p className="text-center mb-3">
            Not a member? <span className="text-orange cursor-pointer" onClick={() => { setShowLogin(false); setShowSignup(true); }}>Sign up here!</span>
          </p>
          {/* Enhanced OAuth buttons */}
          <Button variant="outline-dark" className="w-100 mb-2 oauth-btn" onClick={handleGoogleLogin}><FcGoogle /> Sign in with Google</Button>
          <Button variant="outline-dark" className="w-100 mb-2 oauth-btn" onClick={handleMicrosoftLogin}><span style={{color: '#0078D4'}}>⊞</span> Sign in with Microsoft</Button>
          <Button variant="outline-dark" className="w-100 mb-2 oauth-btn" onClick={handleAppleLogin}><AiFillApple /> Sign in with Apple</Button>
          <Button variant="outline-dark" className="w-100 mb-3 oauth-btn" onClick={handleFacebookLogin}><AiFillFacebook /> Sign in with Facebook</Button>
          <p className="text-center text-orange cursor-pointer" onClick={() => console.log('Get Support')}>Get Support</p>
          <AIAgent />
        </Modal.Body>
      </Modal>

      {/* Signup Modal */}
      <Modal show={showSignup} onHide={() => setShowSignup(false)} centered>
        <Modal.Body>
          <Image src={logoUrl} alt="BCM Logo" className="d-block mx-auto mb-3" fluid />
          <h3 className="text-center mb-2">Excited to Join Bestcoach Music!</h3>
          <p className="text-center mb-4">Enter your email to create your account. You'll log in with this email to access bestcoach music.</p>
          <Form onSubmit={handleSignupSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" value={signupForm.email} onChange={handleSignupChange} required isInvalid={!!errors.email} />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Select options={countries} value={signupForm.country} onChange={(val) => handleSignupChange({ name: 'country', value: val })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Language</Form.Label>
              <Select options={languages} value={signupForm.language} onChange={(val) => handleSignupChange({ name: 'language', value: val })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={signupForm.password} onChange={handleSignupChange} required isInvalid={!!errors.password} />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              {/* 3 & 8. Real-time Password Strength Indicator */}
              <div className="strength-bar mt-2" style={{ backgroundColor: passwordStrength.color, width: passwordStrength.width, height: '6px', borderRadius: '4px' }}></div>
              <small className="text-muted">Strength: <span style={{ color: passwordStrength.color }}>{passwordStrength.level}</span></small>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="confirmPassword" value={signupForm.confirmPassword} onChange={handleSignupChange} required isInvalid={!!errors.confirmPassword} />
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={status.loading} className="w-100 mb-3">
              {status.loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
            {status.success && <Alert variant="success">Signed up successfully!</Alert>}
            {status.error && <Alert variant="danger">{status.error}</Alert>}
          </Form>
          {/* Enhanced OAuth buttons */}
          <Button variant="outline-dark" className="w-100 mb-2 oauth-btn" onClick={handleGoogleLogin}><FcGoogle /> Sign up with Google</Button>
          <Button variant="outline-dark" className="w-100 mb-2 oauth-btn" onClick={handleMicrosoftLogin}><span style={{color: '#0078D4'}}>⊞</span> Sign up with Microsoft</Button>
          <Button variant="outline-dark" className="w-100 mb-2 oauth-btn" onClick={handleAppleLogin}><AiFillApple /> Sign up with Apple</Button>
          <Button variant="outline-dark" className="w-100 mb-3 oauth-btn" onClick={handleFacebookLogin}><AiFillFacebook /> Sign up with Facebook</Button>
          <p className="text-center mb-2">
            Already have an account? <span className="text-orange cursor-pointer" onClick={() => { setShowSignup(false); setShowLogin(true); }}>Sign in</span>
          </p>
          <p className="text-center text-muted">
            By continuing you agree to Bestcoach Music's <span className="text-orange cursor-pointer" onClick={() => window.location.href = '/terms'}>Terms of use</span> and <span className="text-orange cursor-pointer" onClick={() => window.location.href = '/privacy'}>Privacy Policy</span>
          </p>
        </Modal.Body>
      </Modal>

      {/* Forgot Password Modal */}
      <Modal show={showForgot} onHide={() => setShowForgot(false)} centered>
        <Modal.Body>
          <Image src={logoUrl} alt="BCM Logo" className="d-block mx-auto mb-3" fluid />
          <h3 className="text-center mb-4">Forgot Password</h3>
          <p className="text-center mb-4">Enter your email to reset your password.</p>
          <Form onSubmit={handleForgotSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" value={forgotForm.email} onChange={handleForgotChange} required isInvalid={!!errors.email} />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={status.loading} className="w-100 mb-3">
              {status.loading ? 'Sending...' : 'Reset Password'}
            </Button>
            {status.success && <Alert variant="success">Reset link sent! Check your email.</Alert>}
            {status.error && <Alert variant="danger">{status.error}</Alert>}
          </Form>
          <p className="text-center mt-3">
            Back to <span className="text-orange cursor-pointer" onClick={() => { setShowForgot(false); setShowLogin(true); }}>Sign In</span>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AppNavbar;