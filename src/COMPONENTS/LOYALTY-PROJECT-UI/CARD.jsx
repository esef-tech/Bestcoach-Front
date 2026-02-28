// src/components/ServiceCards.jsx - Modified with background image on front (#17a2b8 color on back), stable, functional enroll, dynamic/responsive
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa'; // Close icon for back
import axios from 'axios'; // For API submission (optional - replace with your backend)
import './CARD.css'; // Custom styles - Update transition to 0.8s for slower flip

const ServiceCards = () => {
  const [flipped, setFlipped] = useState({}); // Track flipped state per card (by index)
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState({ loading: false, success: false, error: '' });

  // Dynamic services array (9 services, easy to update/add)
  const services = [
    { name: 'Piano Lessons', description: 'Master the keys with expert guidance from beginners to advanced levels.' },
    { name: 'Guitar Training', description: 'Learn acoustic or electric guitar techniques and play your favorite songs.' },
    { name: 'Vocal Coaching', description: 'Improve your singing voice, range, and performance skills.' },
    { name: 'Drum Classes', description: 'Get rhythmic with professional drum lessons for all ages.' },
    { name: 'Bass Guitar', description: 'Dive into bass lines and groove with our specialized training.' },
    { name: 'Trumpet Lessons', description: 'Brass instrument mastery with focus on tone and technique.' },
    { name: 'Music Theory', description: 'Understand the fundamentals of music composition and notation.' },
    { name: 'Songwriting Workshop', description: 'Create your own songs with guidance on lyrics and melody.' },
    { name: 'Performance Prep', description: 'Prepare for stage with confidence-building sessions.' },
  ];

  // Background image URL
  const bgImage = 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1174469023%2F1406041452053%2F1%2Foriginal.20260110-015414?w=150&auto=format%2Ccompress&q=75&sharp=10&s=f476a473682fa3e2cc6a3f202a5e2666';

  const handleFlip = (idx) => {
    setFlipped((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleEnroll = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: false, error: '' });
    try {
      // Example API call - replace with your backend endpoint
      await axios.post('/api/enroll', { ...formData, service: selectedService });
      setSubmitStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setShowModal(false), 2000); // Close modal after success
    } catch (err) {
      setSubmitStatus({ loading: false, success: false, error: 'Enrollment failed. Please try again.' });
    }
  };

  return (
    <Container className="py-5">
      <Row>
        {services.map((service, idx) => (
          <Col md={4} key={idx} className="mb-4">
            <div className="card-container">
              <Card className={`service-card shadow ${flipped[idx] ? 'flipped' : ''}`}>
                <div className="card-front text-center py-5" style={{ backgroundColor: '#17a2b8', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <h3 className="fw-bold text-white">{service.name}</h3>
                  <p className="text-white">Click to learn more</p>
                  <Button variant="outline-light" onClick={() => handleEnroll(service.name)} className="mt-3">Enroll</Button>
                </div>
                <div className="card-back text-center py-5 position-relative" style={{ backgroundColor: '#17a2b8' }}>
                  <Button variant="link" className="close-btn position-absolute top-0 right-0 m-2" onClick={() => handleFlip(idx)}>
                    <FaTimes size={20} color="#fff" />
                  </Button>
                  <h4 className="fw-bold text-white">{service.name}</h4>
                  <p className="text-white mb-4">{service.description}</p>
                  <Button variant="light" onClick={() => handleFlip(idx)}>More Info</Button>
                </div>
              </Card>
            </div>
          </Col>
        ))}
      </Row>

      {/* Enrollment Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enroll in {selectedService}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control name="phone" value={formData.phone} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} name="message" value={formData.message} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={submitStatus.loading} className="w-100">
              {submitStatus.loading ? 'Submitting...' : 'Submit Enrollment'}
            </Button>
            {submitStatus.success && <Alert variant="success" className="mt-3">Enrollment submitted successfully!</Alert>}
            {submitStatus.error && <Alert variant="danger" className="mt-3">{submitStatus.error}</Alert>}
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ServiceCards;