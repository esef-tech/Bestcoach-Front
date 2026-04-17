import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { PhoneAuthProvider, PhoneMultiFactorGenerator } from 'firebase/auth';
import { auth } from "../../../firebase";
import './MFAVerificationPage.css';

const MFAVerificationPage = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get resolver, verificationId, and phoneNumber from location.state
  const { mfaResolver, verificationId, phoneNumber } = location.state || {};

  const handleVerify = async () => {
  if (code.length < 6) return toast.error('Enter 6-digit code');
  if (!mfaResolver || !verificationId) {
    toast.error('MFA session expired. Please sign in again.');
    await auth.signOut(); // <-- Use auth to sign out the user
    navigate('/signin');
    return;
  }
  setLoading(true);
  try {
    // Create credential and assertion
    const cred = PhoneAuthProvider.credential(verificationId, code);
    const assertion = PhoneMultiFactorGenerator.assertion(cred);
    // Complete MFA sign-in
    await mfaResolver.resolveSignIn(assertion);
    toast.success('2FA Verified! Redirecting...');
    navigate('/');
  } catch (err) {
    toast.error(err.message || 'Invalid code');
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="auth-page mfa-page">
      <Container className="py-5">
        <Card className="glass-card mx-auto" style={{ maxWidth: '420px' }}>
          <Card.Body className="p-5 text-center">
            <h3 className="mb-4">Two-Factor Verification</h3>
            <p className="text-muted mb-2">Enter the 6-digit code sent to your phone</p>
            {phoneNumber && (
              <div className="mb-3" style={{ fontWeight: 500, fontSize: 16 }}>{phoneNumber}</div>
            )}
            <Form.Control
              type="text"
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="text-center fs-1 fw-semibold mb-4"
              maxLength={6}
              style={{ letterSpacing: '12px' }}
            />
            <Button variant="primary" onClick={handleVerify} disabled={loading || code.length < 6} className="w-100 py-3">
              {loading ? <Spinner animation="border" size="sm" /> : 'Verify Code'}
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default MFAVerificationPage;