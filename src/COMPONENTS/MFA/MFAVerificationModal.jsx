import React, { useState } from 'react';
import { Modal, Form, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { PhoneAuthProvider, PhoneMultiFactorGenerator } from 'firebase/auth';
import './MFAVerification.css';

const MFAVerificationModal = ({ show, onHide, mfaResolver, onSuccess }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!verificationCode || verificationCode.length < 6) {
      toast.error('Please enter the 6-digit code');
      return;
    }

    setLoading(true);
    try {
      const cred = PhoneAuthProvider.credential(mfaResolver.session, verificationCode);
      const assertion = PhoneMultiFactorGenerator.assertion(cred);
      await mfaResolver.resolveSignIn(assertion);

      toast.success('✅ Two-Factor Authentication Verified');
      onSuccess();
      onHide();
    } catch (err) {
      toast.error('Invalid code. Please try again.');
      setVerificationCode('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered className="auth-modal" size="md">
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="w-100 text-center fw-bold fs-3">Two-Factor Verification</Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 pb-4 text-center">
        <p className="text-muted mb-4">
          Enter the 6-digit code sent to your phone
        </p>

        <Form.Group className="mb-4">
          <Form.Control
            type="text"
            placeholder="123456"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="text-center fs-1 fw-semibold rounded-4 py-4"
            maxLength={6}
            style={{ letterSpacing: '8px' }}
          />
        </Form.Group>

        <Button
          variant="primary"
          onClick={handleVerify}
          disabled={loading || verificationCode.length < 6}
          className="w-100 py-3 rounded-4 fw-semibold shadow-sm"
        >
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            'Verify Code'
          )}
        </Button>

        <div className="mt-4">
          <small className="text-muted">
            Didn’t receive the code?{' '}
            <span className="text-primary cursor-pointer" onClick={() => toast.info('Resend code feature coming soon')}>
              Resend
            </span>
          </small>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MFAVerificationModal;