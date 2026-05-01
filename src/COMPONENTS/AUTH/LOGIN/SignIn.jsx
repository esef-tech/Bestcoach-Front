// src/COMPONENTS/PAGES/AUTH/SignIn.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Image, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db } from "../../../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  sendEmailVerification,
  RecaptchaVerifier,
  getMultiFactorResolver,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import './SignIn.css';

import logoUrl from "../../Images/bestcoach-pictures/edited/2025-bc-logo.webp";
import { FcGoogle } from "react-icons/fc";
import { BsMicrosoft } from "react-icons/bs";

const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // MFA States
  const [mfaResolver, setMfaResolver] = useState(null);
  const [mfaPhone, setMfaPhone] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [mfaError, setMfaError] = useState('');
  const [mfaLoading, setMfaLoading] = useState(false);
  const [verificationId, setVerificationId] = useState('');
  const recaptchaRef = useRef(null);

  useEffect(() => {
    setMfaResolver(null);
    setMfaPhone('');
    setMfaCode('');
    setMfaError('');
    setVerificationId('');
  }, [form.email, form.password]);

  useEffect(() => {
    if (mfaResolver && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        { size: 'invisible' },
        auth
      );
    }
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, [mfaResolver]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);

      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: userCredential.user.email,
          createdAt: new Date(),
          role: 'user'
        });
      }

      toast.success('Signed in successfully!');
      navigate('/');

    } catch (err) {
      if (err.code === 'auth/multi-factor-auth-required') {
        const resolver = getMultiFactorResolver(auth, err);
        setMfaResolver(resolver);
        setMfaPhone(resolver.hints[0].phoneNumber);
        toast.info('2FA required – enter the code sent to your phone.');

        const phoneInfoOptions = {
          multiFactorHint: resolver.hints[0],
          session: resolver.session,
        };

        PhoneAuthProvider.verifyPhoneNumber(
          phoneInfoOptions,
          window.recaptchaVerifier
        ).then((vid) => setVerificationId(vid))
         .catch((mfaErr) => setMfaError(mfaErr.message));
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMfaSubmit = async (e) => {
    e.preventDefault();
    setMfaLoading(true);
    setMfaError('');

    try {
      const cred = PhoneAuthProvider.credential(verificationId, mfaCode);
      const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
      await mfaResolver.resolveSignIn(multiFactorAssertion);
      toast.success('MFA verification successful!');
      navigate('/');
    } catch (err) {
      setMfaError(err.message);
    } finally {
      setMfaLoading(false);
    }
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success('Signed in with Google!');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  // FIXED Microsoft Handler - Stable Popup Flow
  const handleMicrosoft = async () => {
    const provider = new OAuthProvider('microsoft.com');

    provider.setCustomParameters({
      prompt: 'select_account',   // Better than 'consent' for most cases
      tenant: 'common',
    });

    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user.email && !user.emailVerified) {
        await sendEmailVerification(user);
        toast.info("Verification email sent. Please check your inbox.");
      } else {
        toast.success("Signed in with Microsoft successfully!");
      }
      navigate('/');

    } catch (err) {
      console.error("Microsoft login error:", err);
      if (err.code === 'auth/popup-closed-by-user') {
        toast.info("Login cancelled.");
      } else {
        setError(err.message || "Microsoft login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const renderCodeInputs = () => (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
      {[...Array(6)].map((_, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          maxLength={1}
          style={{
            width: 40,
            height: 50,
            borderRadius: 12,
            border: '1px solid #ccc',
            textAlign: 'center',
            fontSize: 28,
            background: 'rgba(255,255,255,0.8)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            outline: 'none',
            marginRight: idx < 5 ? 8 : 0,
          }}
          value={mfaCode[idx] || ''}
          onChange={e => {
            const nextValue = e.target.value.replace(/[^0-9]/g, '');
            const codeArr = mfaCode.split('');
            codeArr[idx] = nextValue;
            setMfaCode(codeArr.join('').slice(0, 6));
            if (nextValue && idx < 5) {
              document.getElementById(`code-input-${idx + 1}`)?.focus();
            }
          }}
          id={`code-input-${idx}`}
          autoFocus={idx === 0}
        />
      ))}
    </div>
  );

  return (
    <section className="auth-page signin-page">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="glass-card shadow border-0">
              <Card.Body className="p-5">
                <Image src={logoUrl} alt="Bestcoach Music" className="d-block mx-auto mb-4" style={{ height: '60px' }} />
                <h2 className="text-center mb-4">Sign In</h2>

                {error && <Alert variant="danger">{error}</Alert>}

                {!mfaResolver ? (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" name="password" value={form.password} onChange={handleChange} required />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 mb-3 py-3" disabled={loading}>
                      {loading ? <Spinner animation="border" size="sm" /> : 'Sign In'}
                    </Button>
                  </Form>
                ) : (
                  <Card className="shadow border-0 mb-3" style={{ background: 'rgba(245,245,250,0.95)', borderRadius: 24 }}>
                    <Card.Body>
                      <div className="text-center mb-3">
                        <span style={{ fontSize: 40, color: '#007aff' }}>🔒</span>
                        <h5 className="mt-2 mb-1" style={{ fontWeight: 600 }}>Two-Factor Authentication</h5>
                        <div style={{ color: '#888', fontSize: 15 }}>Enter the 6-digit code sent to</div>
                        <div style={{ fontWeight: 500, fontSize: 16, marginBottom: 10 }}>{mfaPhone}</div>
                      </div>
                      <Form onSubmit={handleMfaSubmit}>
                        {renderCodeInputs()}
                        <Button variant="primary" type="submit" className="w-100 mb-2 py-2" disabled={mfaLoading || mfaCode.length !== 6}>
                          {mfaLoading ? <Spinner animation="border" size="sm" /> : 'Verify'}
                        </Button>
                        {mfaError && <Alert variant="danger" className="mt-2">{mfaError}</Alert>}
                      </Form>
                    </Card.Body>
                  </Card>
                )}

                <div className="text-center mb-4">
                  <Link to="/forgot-password" className="text-orange">Forgot password?</Link>
                </div>

                <Button variant="outline-dark" className="w-100 mb-2 text-orange" onClick={handleGoogle}>
                  <span className="me-2 text-orange"><FcGoogle /></span> Continue with Google
                </Button>

                <Button variant="outline-dark" className="w-100 mb-4 text-orange" onClick={handleMicrosoft}>
                  <span className="me-2"><BsMicrosoft /></span> Continue with Microsoft
                </Button>

                <p className="text-center">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-orange fw-bold">Sign up here</Link>
                </p>

                <div id="recaptcha-container" ref={recaptchaRef} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SignIn;