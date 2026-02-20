import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';
import './Register.css';

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
  ].sort(); // alphabetical order

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatus({ ...status, error: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      await axios.post('http://localhost:5000/api/register', formData);
      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', service: '' });
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err.response?.data?.error || 'Something went wrong. Please try again.',
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
              <span className="pr-2">Bestcoach music</span>
            </p>
            <h1 className="mb-4 register-title">Register Now</h1>
            <p className="lead mb-4">
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
              id="primary-v" 
              size="lg" 
              className="mt-4 py-3 px-5"
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
                <h1 className="text-orange m-0">Special Request</h1>
              </Card.Header>
              <Card.Body className="form-body">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Select
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
                    className="btn-submit w-100"
                    disabled={status.loading}
                  >
                    {status.loading ? 'Sending...' : 'Join Now'}
                  </Button>

                  {status.success && (
                    <Alert variant="success" className="form-message mt-4">
                      Thank you! Your request has been sent successfully. 🎉
                    </Alert>
                  )}

                  {status.error && (
                    <Alert variant="danger" className="form-message mt-4">
                      {status.error}
                    </Alert>
                  )}
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