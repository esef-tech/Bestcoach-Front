import React, { useState } from 'react';
import { Modal, Form, Button, Spinner } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';
import { SiMicrosoft } from 'react-icons/si';
import { toast } from 'react-toastify';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './SignUpModal.css';

const SignupModal = ({ show, onHide }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const googleProvider = new GoogleAuthProvider();
  const microsoftProvider = new OAuthProvider('microsoft.com');

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        createdAt: new Date().toISOString(),
      });
      toast.success('Account created! Please check your email.');
      onHide();
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Signed up with Google!');
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
      toast.success('Signed up with Microsoft!');
      onHide();
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={onHide} centered className="auth-modal" size="md">
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="w-100 text-center fw-bold fs-3">Create Account</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 pb-4">
        <Form onSubmit={handleSignup}>
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
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-4 py-3"
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading} className="w-100 py-3 rounded-4 fw-semibold shadow-sm">
            {loading ? <Spinner animation="border" size="sm" /> : 'Create Account'}
          </Button>
        </Form>

        <div className="text-center my-4 text-muted small">— or sign up with —</div>

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
  );
};

export default SignupModal;