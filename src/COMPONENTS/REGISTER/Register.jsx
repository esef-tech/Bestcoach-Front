import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import './Register.css';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const services = [
    'Piano Lessons',
    'Drum Lessons',
    'Lead & Acoustic Guitar Lessons',
    'Trumpet Lessons',
    'Clarinet Lessons',
    'Music Theory',
    'Sound Engineering Services',
    'Sound Production for events',
    'Musical Instruments Rentals',
    'Musical Instruments Repairs',
    'Musical Instruments Purchase',
    'Workshops',
    'Instrumentation Services',
  ].sort();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatus({ ...status, error: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      await addDoc(collection(db, 'special-requests'), {
        name: formData.name,
        email: formData.email,
        service: formData.service,
        timestamp: serverTimestamp(),
      });

      toast.success("Request sent successfully! 🎉");
      setFormData({ name: '', email: '', service: '' });
      
      setStatus({ loading: false, success: true, error: '' });

      // Auto-hide success message after 4 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 4000);
    } catch (err) {
      console.error(err);
      setStatus({
        loading: false,
        success: false,
        error: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <section id="register" className="register-section">
      <Container>
        <Row className="align-items-center">
          {/* Left side - Text & Benefits */}
          <Col lg={7} className="mb-5 mb-lg-0 fade-in">
            <p className="section-title pr-5">
              <span className="pr-2 text-orange">Bestcoach music</span>
            </p>
            <h1 className="mb-4 register-title">Register Now</h1>
            <p className="mb-4 register-p text-dark">
              Ready to take your musical journey to the next level? Register now and become a part of our vibrant community!
              Fill out the form and let's make some beautiful music together. 🎸🎤
            </p>
            <ul className="list-inline m-0 check-list">
              <li className="py-2">
                <FaCheckCircle className="check-icon" />
                Best Coach Music excels in music education. 🎵
              </li>
              <li className="py-2">
                <FaCheckCircle className="check-icon" />
                Bestcoach Music nurtures musicians. 🎵
              </li>
              <li className="py-2">
                <FaCheckCircle className="check-icon" />
                Bestcoach Music, a BCSE-CENTRE subsidiary 🎵
              </li>
            </ul>
            <Button
              id="register-enroll-btn"
              size="lg"
              className="mt-4 py-3 px-5 register-enroll-btn"
              href="https://form.jotform.com/252515722619559"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enroll Now
            </Button>
          </Col>

          {/* Right side - Form */}
          <Col lg={5}>
            <Card className="form-card fade-in">
              <Card.Header className="form-header">
                <h1 className="text-orange-register m-0">Special Request</h1>
              </Card.Header>
              <Card.Body className="form-body">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label htmlFor="name" className='text-white'>Full Name</Form.Label>
                    <Form.Control
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label htmlFor="email" className='text-white'>Email Address</Form.Label>
                    <Form.Control
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label htmlFor="service" className='text-white'>Course or Service Requested</Form.Label>
                    <Form.Select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Course or Service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  {/* Hidden anti-bot field */}
                  <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

                  <Button
                    type="submit"
                    variant="dark"
                    size="lg"
                    className="btn-submit-register w-100"
                    disabled={status.loading}
                  >
                    {status.loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;