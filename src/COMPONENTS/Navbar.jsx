// src/components/Navbar.jsx - Updated with real-time Google/Microsoft/Apple OAuth, password strength indicator, enhanced OAuth styling, full countries/languages from backend
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Navbar, Nav, Container, Button, Modal, Form, NavDropdown, Alert, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { FaBriefcase, FaNewspaper, FaBlog, FaVideo, FaBookOpen, FaLifeRing, FaBoxOpen, FaRoad, FaUsers, FaUserCircle, FaPhone, FaMusic, FaMicrophoneAlt, FaShoppingCart } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import { BsPeopleFill } from "react-icons/bs";
import Select from 'react-select';
import {Spinner} from 'react-bootstrap';
import './Navbar.css'; // Updated with OAuth styling + strength indicator
import { auth, db, sendEmailVerification, } from '../firebase'; //add later appleProvider, microsoftProvider
import MFAVerificationModal from '../COMPONENTS/MFA/MFAVerificationModal'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signInWithPopup, signOut,
  onAuthStateChanged, 
  updatePassword,
  GoogleAuthProvider, 
  
} from 'firebase/auth';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { FcAbout } from "react-icons/fc";
import TopHeader from './TOPHEADER/TopHeader';
import { ThemeContext } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';


const logoUrl = 'https://bestcoachmusic.netlify.app/IMAGES/2025-bc-logo.jpeg';

const AppNavbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const { isDark, setIsDark } = useContext(ThemeContext);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ email: '', country: null, language: null, password: '', confirmPassword: '' });
  const [forgotForm, setForgotForm] = useState({ email: '' });
  const [changePasswordForm, setChangePasswordForm] = useState({ newPassword: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });
  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [user, setUser] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState({ level: 'weak', color: 'red', width: '25%' });
  const [email, ] = useState('');
  //const [password,] = useState('');
  const [showMfaModal, setShowMfaModal] = useState(false);
  const [mfaResolver,] = useState(null);

  const openAuthModal = useCallback((mode = 'login') => {
    setShowForgot(false);
    setShowChangePassword(false);
    if (mode === 'signup') {
      setShowLogin(false);
      setShowSignup(true);
      return;
    }
    setShowSignup(false);
    setShowLogin(true);
  }, []);
  

  useEffect(() => {
    // Fetch countries data
    fetch('/countries.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load countries');
        return res.json();
      })
      .then(data => {
        setCountries(data);
      })
      .catch(err => {
        console.error('Error loading countries:', err);
        toast.error('Failed to load countries list');
      });

    // Fetch languages data
    fetch('/languages.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load languages');
        return res.json();
      })
      .then(data => {
        setLanguages(data);
      })
      .catch(err => {
        console.error('Error loading languages:', err);
        toast.error('Failed to load languages list');
      });
  }, []);

  // Real-time Firebase Auth Listener (replaces all token logic)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsLoggedIn(true);
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        setUserProfile(userDoc.exists() ? userDoc.data() : { email: currentUser.email });
      } else {
        setUser(null);
        setIsLoggedIn(false);
        setUserProfile({});
      }
    });
    return () => unsubscribe();
  }, []);


 // Extract FIRST NAME only
  const getFirstName = () => {
    if (!user) return '';
    if (user.displayName) return user.displayName.split(' ')[0]; // Google users
    return 'User'; // fallback
  };

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out successfully");
  };


  // Auto-open auth modal from URL query and cross-component events.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('signup') === 'true') {
      openAuthModal('signup');
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }
    if (params.get('login') === 'true') {
      openAuthModal('login');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [openAuthModal]);

  useEffect(() => {
    const handleOpenAuthModal = (event) => {
      const mode = event?.detail?.mode === 'signup' ? 'signup' : 'login';
      openAuthModal(mode);
    };
    window.addEventListener('open-auth-modal', handleOpenAuthModal);
    return () => window.removeEventListener('open-auth-modal', handleOpenAuthModal);
  }, [openAuthModal]);

  // Real-time password strength
  const calculateStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (password.length >= 12) score++;
    return score <= 2 ? { level: 'Weak', color: 'red', width: '25%' } :
           score === 3 ? { level: 'Medium', color: 'orange', width: '50%' } :
           { level: 'Strong', color: 'green', width: '100%' };
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target || { name: e.name, value: e.value };
    setSignupForm(prev => ({ ...prev, [name]: value }));
    if (name === 'password') setPasswordStrength(calculateStrength(value));
  };

  const handleForgotChange = (e) => {
    const { name, value } = e.target;
    setForgotForm(prev => ({ ...prev, [name]: value }));
  };

  const handleChangePasswordChange = (e) => {
    const { name, value } = e.target;
    setChangePasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
  
    
    // Validate passwords match
    if (changePasswordForm.newPassword !== changePasswordForm.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    setStatus({ loading: true, success: false, error: '' });
    try {
      await handlePasswordChange(changePasswordForm.newPassword);
      setChangePasswordForm({ newPassword: '', confirmPassword: '' });
      setStatus({ loading: false, success: true, error: 'Password changed successfully!' });
      setShowChangePassword(false);
    } catch (err) {
      setErrors({ password: err.message });
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

   const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
      const user = userCredential.user;
      // 2. Check verification status on every login
      if (!user.emailVerified) {
        await sendEmailVerification(user);
        toast.warning("Please verify your email. We just sent you a new link.");
        // Optional: auth.signOut(); // force re-verification
      } else {
        toast.success("Logged in successfully!");
      }

      setLoginForm({ email: '', password: '' }); // Clear form
      setShowLogin(false); // Close modal
      setStatus({ loading: false, success: true, error: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
      toast.error(err.message);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    let validationErrors = {};
    if (!signupForm.country) {
      validationErrors.country = 'Please select a country.';
    }
    if (!signupForm.language) {
      validationErrors.language = 'Please select a language.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus({ loading: true, success: false, error: '' });

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupForm.email, signupForm.password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: signupForm.email,
        country: signupForm.country?.label,
        language: signupForm.language?.label,
        createdAt: new Date().toISOString(),
        profilePicture: ''
      });

      // 1. Send verification email immediately
      await sendEmailVerification(userCredential.user);
      toast.success("Account created! Please check your email to verify.");

      setSignupForm({ email: '', country: null, language: null, password: '', confirmPassword: '' }); // Clear form
      setShowSignup(false); // Close modal
      setStatus({ loading: false, success: true, error: '' });
    } catch (err) {
      setErrors({ email: err.message });
      setStatus({ loading: false, success: false, error: err.message });
      toast.error(err.message);
    }
   };


  // 2. Forgot Password
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setStatus({ loading: true, success: false, error: '' });
    try {
      await sendPasswordResetEmail(auth, forgotForm.email);
      setStatus({ loading: false, success: true, error: '' });
      setShowForgot(false);
    } catch (err) {
      setErrors({ email: err.message });
      setStatus({ loading: false, success: false, error: err.message });
      toast.error(err.message);
    }
  };

  // Update password for currently logged-in user
  const handlePasswordChange = async (newPassword) => {
    if (!auth.currentUser) {
      setErrors({ password: 'No user logged in' });
      return;
    }
    try {
      await updatePassword(auth.currentUser, newPassword);
      setStatus({ loading: false, success: true, error: 'Password updated successfully!' });
      setErrors({});
      return true;
    } catch (err) {
      setErrors({ password: err.message });
      setStatus({ loading: false, success: false, error: err.message });
      return false;
    }
  };

 

  
  // OAuth handlers (Google, Apple, Microsoft) – also trigger verification if needed
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setShowLogin(false);
      if (!result.user.emailVerified) {
        await sendEmailVerification(result.user);
        toast.info("Verification email sent. Please check your inbox.");
      } else {
        toast.success("Logged in with Google!");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

// OAuth auto-close

// Inside your Navbar useEffect
useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((currentUser) => {
    if (!currentUser && auth.currentUser) {
      // Remove from onlineUsers when logged out
      deleteDoc(doc(db, 'onlineUsers', auth.currentUser.uid));
    }
  });
  return () => unsubscribe();
}, []);



//2MFA



  const handleMfaSuccess = () => {
    toast.success('✅ Welcome back to Bestcoach Music!');
    // Redirect to /community or dashboard
  };

  return (
    <React.Fragment>
      
      <TopHeader />
      <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm position-sticky modern-navbar" fixed="top"  data-aos="fade-down"  data-aos-duration="800">
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
          <Navbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#007bff' }}>
            <img src={logoUrl} alt="Bestcoach Music Logo" style={{ height: '40px', marginRight: '10px' }} className="img-fluid" />
            Bestcoach Music
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>
              <Nav.Link as={Link} to="/community" className="mx-2"><BsPeopleFill className="me-2 text-orange" />Community</Nav.Link>
              <NavDropdown title="Events" id="services-dropdown" className="mx-2">
                <NavDropdown.Item as={Link} to="/tss"><FaMicrophoneAlt className="me-2 text-orange" />The Singers Sanctuary</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/tmme"><FaMusic className="me-2 text-orange" />The Music Mentorship Experience</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Company" id="services-dropdown" className="mx-2">
                <NavDropdown.Item as={Link} to="/blog"><FaBlog className="me-2 text-orange" />Blog</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/about"><FcAbout className="me-2 text-orange" />About Us</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/press"><FaNewspaper className="me-2 text-orange" />Press</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/team"><FaPeopleGroup className="me-2 text-orange" />Team</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/contact"><FaPhone className="me-2 text-orange" />Contact Us</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/careers"><FaBriefcase className="me-2 text-orange" />Careers At Bestcoach</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Features" id="services-dropdown" className="mx-2">
                <NavDropdown.Item as={Link} to="/package"><FaBoxOpen className="me-2 text-orange" />Packages</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/coach"><FaUsers className="me-2 text-orange" />Coaches</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/method"><FaRoad className="me-2 text-orange" />Methods</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/shop" className="mx-2"><FaShoppingCart className="me-2 text-orange" />Shop</Nav.Link>
              <NavDropdown title="Resources" id="services-dropdown" className="mx-2">
                <NavDropdown.Item as={Link} to="/webinars"><FaVideo className="me-2 text-orange" />Webinars</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/help"><FaLifeRing className="me-2 text-orange" />Help Centre</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/studio-tutorials"><FaBookOpen className="me-2 text-orange" />Studio Tutorials</NavDropdown.Item>
              </NavDropdown>
            </Nav>
           {/* RIGHT SIDE - Logged-in State */}
          <Nav className="align-items-center">
            {isLoggedIn && user ? (
              <div className="d-flex align-items-center gap-3">
                {/* Profile Picture + First Name - Link to Profile */}
                <Nav.Link as={Link} to="/profile" className="d-flex align-items-center gap-2" style={{ textDecoration: 'none' }}>
                  <img
                    src={user.photoURL || userProfile.photoURL || '/default-avatar.png'}
                    alt="Profile"
                    width="36"
                    height="36"
                    className="rounded-circle border border-2 border-warning"
                    style={{ objectFit: 'cover' }}
                  />
                  <span className="text-white fw-bold">{getFirstName()}</span>
                </Nav.Link>

                {/* Dark Mode Toggle */}
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => setIsDark(!isDark)}
                  className="d-flex align-items-center"
                >
                  {isDark ? <FaSun /> : <FaMoon />}
                </Button>

                {/* Logout Button */}
                <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              /* Login / Signup Button (unchanged) */
              <Button variant="outline-primary"   className='login-btn'   onClick={() => setShowLogin(true)}>
                <FaUserCircle className="me-2 " /> Login  
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
          {/* Enhanced OAuth buttons */}
          <Button variant="outline-dark" className="w-100 mb-2 oauth-btn" onClick={handleGoogleLogin}><FcGoogle /> Sign in with Google</Button>

          <p className="text-center text-orange cursor-pointer" onClick={() => console.log('Get Support')}>Get Support</p>
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
              <Select options={countries} value={signupForm.country} onChange={(val) => handleSignupChange({ name: 'country', value: val })} />
              {errors.country && <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{errors.country}</div>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Language</Form.Label>
              <Select options={languages} value={signupForm.language} onChange={(val) => handleSignupChange({ name: 'language', value: val })} />
              {errors.language && <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{errors.language}</div>}
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
              {status.loading ? <Spinner animation="border" size="sm" className="me-2" /> : null}
              {status.loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </Form>
          {/* Enhanced OAuth buttons */}
          <Button variant="outline-dark" className="w-100 mb-2 oauth-btn" onClick={handleGoogleLogin}><FcGoogle /> Sign up with Google</Button>

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
              {status.loading ? <Spinner animation="border" size="sm" className="me-2" /> : null}
              {status.loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
            {status.success && <Spinner animation="border" size="sm" className="me-2" />}
          
            {status.error && <Spinner animation="border" size="sm" className="me-2" />}
          </Form>
          <p className="text-center mt-3">
            Back to <span className="text-orange cursor-pointer" onClick={() => { setShowForgot(false); setShowLogin(true); }}>Sign In</span>
          </p>
        </Modal.Body>
      </Modal>

      {/* Change Password Modal */}
      <Modal show={showChangePassword} onHide={() => setShowChangePassword(false)} centered>
        <Modal.Body>
          <Image src={logoUrl} alt="BCM Logo" className="d-block mx-auto mb-3" fluid />
          <h3 className="text-center mb-4">Change Password</h3>
          <p className="text-center mb-4">Enter your new password.</p>
          <Form onSubmit={handleChangePasswordSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" name="newPassword" value={changePasswordForm.newPassword} onChange={handleChangePasswordChange} required isInvalid={!!errors.newPassword} />
              <Form.Control.Feedback type="invalid">{errors.newPassword}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="confirmPassword" value={changePasswordForm.confirmPassword} onChange={handleChangePasswordChange} required isInvalid={!!errors.confirmPassword} />
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={status.loading} className="w-100 mb-3">
              {status.loading ? 'Updating...' : 'Update Password'}
            </Button>
            {status.success && <Alert variant="success">Password updated successfully!</Alert>}
            {status.error && <Alert variant="danger">{status.error}</Alert>}
          </Form>
          <p className="text-center mt-3">
            <span className="text-orange cursor-pointer" onClick={() => setShowChangePassword(false)}>Cancel</span>
          </p>
        </Modal.Body>
      </Modal>



     
    
      {/* 2MFA Modal with Email Fallback */}
      <MFAVerificationModal
        show={showMfaModal}
        onHide={() => setShowMfaModal(false)}
        mfaResolver={mfaResolver}
        email={email}                    // ← Passed for email fallback
        onSuccess={handleMfaSuccess}
      />

    </React.Fragment>
  );
};

export default AppNavbar;
