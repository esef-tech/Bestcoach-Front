// src/components/MFAVerificationModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Spinner, Row, Col } from 'react-bootstrap';
import {  PhoneAuthProvider } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const MFAVerificationModal = ({ show, onHide, mfaResolver, email, onSuccess }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [method, setMethod] = useState('sms'); // 'sms' or 'email'

  // Send Email OTP
  const sendEmailOTP = async () => {
    setLoading(true);
    setError('');

    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpRef = doc(db, 'emailOTPs', auth.currentUser?.uid || 'temp');

      await setDoc(otpRef, {
        otp,
        email,
        expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
      });

      toast.success(`✅ 6-digit code sent to ${email}`);
      setMethod('email');
    } catch (err) {
      setError('Failed to send email code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Verify SMS or Email OTP
  const handleVerify = async () => {
    if (code.length !== 6) return;
    setLoading(true);
    setError('');

    try {
      if (method === 'sms' && mfaResolver) {
        // SMS verification (Firebase MFA)
        const credential = PhoneAuthProvider.credential(mfaResolver.session.phoneNumber, code);
        await mfaResolver.resolveSignIn(credential);
      } else {
        // Email OTP verification
        const otpRef = doc(db, 'emailOTPs', auth.currentUser?.uid || 'temp');
        const otpSnap = await getDoc(otpRef);

        if (!otpSnap.exists() || otpSnap.data().otp !== code) {
          throw new Error('Invalid code');
        }
        if (otpSnap.data().expiresAt < Date.now()) {
          throw new Error('Code expired');
        }

        await deleteDoc(otpRef); // Clean up
      }

      toast.success('✅ 2FA verification successful');
      onSuccess();
      onHide();
    } catch (err) {
      setError(err.message || 'Invalid or expired code. Try again.');
      toast.error('Invalid code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Two-Factor Authentication (2MFA)</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-center mb-3">
          Choose how to receive your verification code
        </p>

        <Row className="mb-4">
          <Col>
            <Button
              variant={method === 'sms' ? 'primary' : 'outline-primary'}
              className="w-100"
              onClick={() => setMethod('sms')}
            >
              📱 Send via SMS
            </Button>
          </Col>
          <Col>
            <Button
              variant={method === 'email' ? 'primary' : 'outline-primary'}
              className="w-100"
              onClick={sendEmailOTP}
            >
              ✉️ Send via Email
            </Button>
          </Col>
        </Row>

        {error && <Alert variant="danger" className="text-center">{error}</Alert>}

        <Form.Control
          type="text"
          placeholder="Enter 6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
          maxLength={6}
          className="text-center fs-4 mb-3"
          autoFocus
        />

        <small className="text-muted d-block text-center">
          {method === 'sms'
            ? 'Code sent to your registered phone number'
            : `Code sent to ${email}`}
        </small>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="success"
          onClick={handleVerify}
          disabled={loading || code.length !== 6}
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Verifying...
            </>
          ) : (
            'Verify Code'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MFAVerificationModal;