// src/pages/Auth/SignUp.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Image, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './SignUp.css';
import logoUrl from "../../Images/bestcoach-pictures/edited/2025-bc-logo.webp";


const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ level: 'weak', color: '#dc3545', width: '25%' });

  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score <= 2 ? { level: 'Weak', color: '#dc3545', width: '25%' } :
           score === 3 ? { level: 'Medium', color: '#fd7e14', width: '60%' } :
           { level: 'Strong', color: '#28a745', width: '100%' };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === 'password') setPasswordStrength(calculateStrength(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return setError('Passwords do not match');
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: form.email,
        createdAt: new Date(),
        role: 'user'
      });
      toast.success('Account created! Welcome to Bestcoach Music 🎉');
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page signup-page">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="glass-card shadow border-0">
              <Card.Body className="p-5">
                <Image src={logoUrl} alt="Bestcoach Music" className="d-block mx-auto mb-4" style={{ height: '60px' }} />
                <h2 className="text-center mb-4">Create Account</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={form.password} onChange={handleChange} required />
                    <div className="strength-bar mt-2" style={{ backgroundColor: passwordStrength.color, width: passwordStrength.width, height: '8px', borderRadius: '4px' }}></div>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100 py-3" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Create Account'}
                  </Button>
                </Form>
                <p className="text-center mt-4">
                  Already have an account?{' '}
                  <Link to="/signin" className="text-orange fw-bold">Sign in</Link>
                </p>
                <p className="text-center text-muted p-mouse">
            By continuing you agree to Bestcoach Music's <span className="text-orange cursor-pointer" onClick={() => window.location.href = '/terms'}>Terms of use</span> and <span className="text-orange cursor-pointer" onClick={() => window.location.href = '/privacy'}>Privacy Policy</span>
          </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SignUp;