import React, { useState } from 'react';
import { Modal, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';
import { SiMicrosoft } from 'react-icons/si';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, OAuthProvider, getMultiFactorResolver } from 'firebase/auth';
import MFAVerificationModal from './MFAVerificationModal';
import "./LoginModal.css";

const LoginModal = ({ show, onHide }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showMfa, setShowMfa] = useState(false);
  const [mfaResolver, setMfaResolver] = useState(null);

  const googleProvider = new GoogleAuthProvider();
  const microsoftProvider = new OAuthProvider('microsoft.com');

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

     try {
       await signInWithEmailAndPassword(auth, email, password);
       toast.success('Welcome back!');
       onHide();
     } catch (err) {
      if (err.code === 'auth/multi-factor-auth-required') {
        setMfaResolver(getMultiFactorResolver(auth, err));
        setShowMfa(true);
      } else {
        setError(err.message);
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Signed in with Google');
      onHide();
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  const handleMicrosoft = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, microsoftProvider);
      toast.success('Signed in with Microsoft');
      onHide();
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered className="auth-modal" size="md">
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="w-100 text-center fw-bold fs-3">Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 pb-4">
          <Form onSubmit={handleEmailLogin}>
            <Form.Group className="mb-4">
              <Form.Label className="text-muted small">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-4 py-3"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="text-muted small">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-4 py-3"
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading} className="w-100 py-3 rounded-4 fw-semibold shadow-sm">
              {loading ? <Spinner animation="border" size="sm" /> : 'Sign In'}
            </Button>
          </Form>

          {error && <Alert variant="danger" className="mt-3 rounded-4">{error}</Alert>}

          <div className="text-center my-4 text-muted small">— or continue with —</div>

          <div className="d-grid gap-2">
            <Button variant="outline-dark" className="py-3 rounded-4 d-flex align-items-center justify-content-center gap-2" onClick={handleGoogle}>
              <FcGoogle size={22} /> Google
            </Button>
            <Button variant="outline-dark" className="py-3 rounded-4 d-flex align-items-center justify-content-center gap-2" onClick={handleMicrosoft}>
              <SiMicrosoft size={22} /> Microsoft
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <MFAVerificationModal
        show={showMfa}
        onHide={() => setShowMfa(false)}
        mfaResolver={mfaResolver}
        onSuccess={() => {
          toast.success('2FA Verified – Welcome back!');
          onHide();
        }}
      />
    </>
  );
};

export default LoginModal;