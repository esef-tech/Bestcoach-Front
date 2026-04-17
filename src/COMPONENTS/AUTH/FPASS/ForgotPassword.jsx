// src/pages/Auth/ForgotPassword.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Image, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import './ForgotPassword.css';
import logoUrl from "../../Images/bestcoach-pictures/edited/2025-bc-logo.webp"; 


const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      toast.success('Password reset link sent to your email!');
      setTimeout(() => navigate('/signin'), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page forgot-page">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="glass-card shadow border-0">
              <Card.Body className="p-5">
                <Image src={logoUrl} alt="Bestcoach Music" className="d-block mx-auto mb-4" style={{ height: '60px' }} />
                <h2 className="text-center mb-4">Forgot Password</h2>
                <p className="text-center text-muted mb-4">Enter your email and we'll send you a reset link.</p>

                {success && (
                  <Alert variant="success" className="mb-4">
                    Reset link sent! Check your inbox.
                  </Alert>
                )}
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 py-3 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Sending...
                      </>
                    ) : (
                      'Send Reset Link'
                    )}
                  </Button>
                </Form>

                <p className="text-center mt-3">
                  Remember your password?{' '}
                  <Link to="/signin" className="text-orange fw-bold">Sign In</Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ForgotPassword;