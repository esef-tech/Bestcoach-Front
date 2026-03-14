import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Modal, Form, NavDropdown, Alert, Image} from 'react-bootstrap';
import { Link } from 'react-router-dom'; // For smooth scrolling to sections
import { FcGoogle } from 'react-icons/fc'; // Icons for auth buttons
import { AiFillApple, AiFillFacebook } from 'react-icons/ai';
import {  FaBriefcase, FaNewspaper, FaBlog, FaVideo, FaBookOpen, FaLifeRing, FaBoxOpen, FaRoad, FaUsers, FaUserCircle, FaPhone,FaMusic, FaMicrophoneAlt, FaShoppingCart} from 'react-icons/fa';  //{/*Add_FaSchool, FaUserFriends, FaUserAlt, FaChurch,*/}
import {FaPeopleGroup} from 'react-icons/fa6';
import { BsPeopleFill } from "react-icons/bs";
import Select from 'react-select';
import axios from 'axios'
import AIAgent from './AIAgent'


import './Navbar.css'; // Custom styles for Navbar

const logoUrl = 'https://bestcoachmusic.netlify.app/IMAGES/2025-bc-logo.jpeg'

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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock logged-in state (use auth context in prod)




//




  // Fetch countries/languages dynamically (example from API)
  useEffect(() => {
    // Fetch countries (use restcountries API for all countries)
    axios.get('https://restcountries.com/v3.1/all').then(res => {
      setCountries(res.data.map(country => ({ value: country.cca2.toLowerCase(), label: country.name.common })));
    }).catch(() => setCountries([])); // Fallback

    // Languages (static list - expand as needed)
    setLanguages([
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Spanish' },
      { value: 'fr', label: 'French' },
      // Add all languages
    ]);
  }, []);

  // Real-time email validation (debounce for performance)
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

  // Similar for signup email (check if NOT exists)
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

  // Password validation
  const validatePassword = (password, confirm) => {
    if (password.length < 8) return 'At least 8 characters';
    if (!/[A-Z]/.test(password)) return 'Include uppercase';
    if (!/[0-9]/.test(password)) return 'Include number';
    if (confirm && password !== confirm) return 'Passwords do not match';
    return '';
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
    if (name === 'password') setErrors(prev => ({ ...prev, password: validatePassword(value) }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target || { name: e.name, value: e.value }; // For Select
    setSignupForm(prev => ({ ...prev, [name]: value }));
    if (name === 'password') setErrors(prev => ({ ...prev, password: validatePassword(value, signupForm.confirmPassword) }));
    if (name === 'confirmPassword') setErrors(prev => ({ ...prev, confirmPassword: validatePassword(signupForm.password, value) }));
  };

  const handleForgotChange = (e) => {
    const { name, value } = e.target;
    setForgotForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      const response = await axios.post('/api/login', loginForm, { withCredentials: true }); // Secure with cookies/JWT
      // Store auth token in localStorage
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      setStatus({ loading: false, success: true, error: '' });
      setIsLoggedIn(true); // Set logged in
      setLoginForm({ email: '', password: '' }); // Clear form
      setShowLogin(false);
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Login failed' });
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      const response = await axios.post('/api/signup', signupForm, { withCredentials: true }); // Secure with cookies/JWT
      // Store auth token in localStorage
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      setStatus({ loading: false, success: true, error: '' });
      setIsLoggedIn(true); // Set logged in
      setSignupForm({ email: '', country: null, language: null, password: '', confirmPassword: '' }); // Clear form
      setShowSignup(false);
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Signup failed' });
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      await axios.post('/api/forgot-password', forgotForm);
      setStatus({ loading: false, success: true, error: '' });
      setShowForgot(false);
      setShowLogin(true);
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Reset failed' });
    }
  };

  // Placeholder auth handlers - replace with real OAuth (e.g., Firebase/Google Auth)
  const handleGoogleLogin = () => {
    console.log('Login with Google');
    // e.g., signInWithPopup(auth, googleProvider);
    setShowLogin(false);
  };

  const handleAppleLogin = () => {
    console.log('Login with Apple');
    // Implement Apple OAuth
    setShowLogin(false);
  };

  const handleFacebookLogin = () => {
    console.log('Login with Facebook');
    // e.g., signInWithPopup(auth, facebookProvider);
    setShowLogin(false);
  };

  // Mock logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ email: '', password: '' });
    setStatus({ loading: false, success: false, error: '' });
    // Clear token from localStorage or cookies
    localStorage.removeItem('authToken');
    // Optional: Redirect to home
    window.location.href = '/';
  };

  // Check localStorage for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

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
              <Nav.Link as={Link} to="/community" smooth={true} duration={500} className="mx-2"><BsPeopleFill  className="me-2 text-orange" />Community & Forums</Nav.Link>
              {/*<Nav.Link as={Link} to="/loyal" smooth={true} duration={500} className="mx-2"><FaHourglassHalf className="me-2 text-orange" />Loyalty Project</Nav.Link>*/}


                                      {/* Events Dropdown */}
              <NavDropdown title="Events" id="services-dropdown" className="mx-2">
                <NavDropdown.Item as={Link} to="/tss" smooth={true} duration={500}><FaMicrophoneAlt className="me-2 text-orange" />The Singers Sanctuary</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/tmme" smooth={true} duration={500}><FaMusic className="me-2 text-orange" />The Music Mentorship Experience</NavDropdown.Item>
              </NavDropdown>

              {/* Company Dropdown */}
              
               <NavDropdown title="Company" id="services-dropdown" className="mx-2">
                <NavDropdown.Item as={Link} to="/blog" smooth={true} duration={500}><FaBlog className="me-2 text-orange" />Blog</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/about" smooth={true} duration={500}>About Us</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/press" smooth={true} duration={500}><FaNewspaper className="me-2 text-orange" />Press</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/team" smooth={true} duration={500}><FaPeopleGroup className="me-2 text-orange" />Team</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/contact" smooth={true} duration={500}><FaPhone className="me-2 text-orange" />Contact Us</NavDropdown.Item>
             <NavDropdown.Item as={Link} to="/careers" smooth={true} duration={500}><FaBriefcase className="me-2 text-orange" />Careers At Bestcoach</NavDropdown.Item>
              </NavDropdown>


              {/* Services Dropdown 
              <NavDropdown title="Modules" id="services-dropdown" className="mx-2">
                <NavDropdown.Item as={Link} to="/schools" smooth={true} duration={500}><FaSchool className="me-2 text-orange" />Schools</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/churches" smooth={true} duration={500}><FaChurch className="me-2 text-orange" />Churches</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/individuals" smooth={true} duration={500}><FaUserAlt className="me-2 text-orange" />Individuals</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/groups" smooth={true} duration={500}><FaUserFriends className="me-2 text-orange" />Groups</NavDropdown.Item>
              </NavDropdown> Add-Icons-For-Each-Item
              */}



              {/* Features Dropdown */}
              <NavDropdown title="Features" id="services-dropdown" className="mx-2">
                {/*<NavDropdown.Item as={Link} to="/loyalty" smooth={true} duration={500}><FaHourglassHalf className="me-2 text-orange" />Loyalty Ambassador  Program</NavDropdown.Item>*/}
                <NavDropdown.Item as={Link} to="/package" smooth={true} duration={500}><FaBoxOpen className="me-2 text-orange" />Packages</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/coach" smooth={true} duration={500}><FaUsers className="me-2 text-orange" />Coaches</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/method" smooth={true} duration={500}><FaRoad className="me-2 text-orange" />Methods</NavDropdown.Item>
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

            {/* Auth Buttons - Conditional Rendering */}
            <Nav>
              {isLoggedIn ? (
                <>
                  <Nav.Link as={Link} to="/profile" className="mx-2"><FaUserCircle className="me-2 text-orange" />Profile</Nav.Link>
                  <Button variant="danger" onClick={handleLogout} className="me-2">Logout</Button>
                </>
              ) : (
                <Button variant="outline-primary" onClick={() => setShowLogin(true)} className="me-2"> <FaUserCircle className="me-2 text-orange" />
                  Login / Signup
                </Button>
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
          <Button variant="outline-dark" className="w-100 mb-2" onClick={handleGoogleLogin}><FcGoogle /> Sign in with Google</Button>
          <Button variant="outline-dark" className="w-100 mb-2" onClick={handleAppleLogin}><AiFillApple /> Sign in with Apple</Button>
          <Button variant="outline-dark" className="w-100 mb-3" onClick={handleFacebookLogin}><AiFillFacebook /> Sign in with Facebook</Button>
          <p className="text-center text-orange cursor-pointer" onClick={() => console.log('Get Support')}>Get Support</p>
          {/* AI Chatbot Integration */}
          <AIAgent /> {/* Your chatbot component */}
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
          <Button variant="outline-dark" className="w-100 mb-2" onClick={handleGoogleLogin}><FcGoogle /> Sign up with Google</Button>
          <Button variant="outline-dark" className="w-100 mb-2" onClick={handleAppleLogin}><AiFillApple /> Sign up with Apple</Button>
          <Button variant="outline-dark" className="w-100 mb-3" onClick={handleFacebookLogin}><AiFillFacebook /> Sign up with Facebook</Button>
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
  )
}

export default AppNavbar
