import React, {useState} from 'react'
import './Contact.css'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // For breadcrumb
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock } from 'react-icons/fa';
import axios from 'axios';

const Contact = () => {
  
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', subject: '', message: '' });
      // Output response data to user (e.g., confirmation ID if backend provides)
      alert(`Message sent successfully! Confirmation: ${response.data.message}`);
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.response?.data?.error || 'Submission failed. Try again.' });
    }
  };


  return (
    <>
      <section className="contact-page">
      {/* Header */}
      <div className="header bg-primary text-white text-center py-5 animate-fade-in">
        <h1 className="display-3 fw-bold">Contact Us</h1>
        <div className="d-inline-flex breadcrumb">
          <p className="m-0"><Link to="/https://bestcoach-front.vercel.app/" className="text-white">Home</Link></p>
          <p className="m-0 px-2">/</p>
          <p className="m-0">Contact Us</p>
        </div>
      </div>

      {/* Contact Section */}
      <Container className="pt-5">
        <div className="text-center pb-2 animate-slide-up">
          <p className="section-title px-5"><span className="px-2">Get In Touch</span></p>
          <h1 className="mb-4">Contact Us For Any Query</h1>
        </div>
        <Row>
          <Col lg={7} className="mb-5 animate-slide-left">
            <div className="contact-form shadow-lg p-4 bg-white rounded">
              <Form onSubmit={handleSubmit} noValidate>
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
                  <Form.Control 
                    type="text" 
                    name="subject" 
                    placeholder="Subject" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Control 
                    as="textarea" 
                    rows={6} 
                    name="message" 
                    placeholder="Message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={status.loading} 
                  className="py-2 px-4 animate-bounce-in"
                >
                  {status.loading ? 'Sending...' : 'Send Message'}
                </Button>
                {status.success && <Alert variant="success" className="mt-3">Message sent successfully!</Alert>}
                {status.error && <Alert variant="danger" className="mt-3">{status.error}</Alert>}
              </Form>
            </div>
          </Col>
          <Col lg={5} className="mb-5 animate-slide-right">
            <p className="lead mb-4">Have any questions or need assistance? We're here to help! Reach out to us today and let us know how we can support you. Whether it's a query about our services, feedback, or just a friendly hello, we look forward to hearing from you. Contact us now and let's start a conversation!</p>
            <div className="d-flex mb-4 align-items-center animate-fade-in">
              <FaMapMarkerAlt className="bg-primary text-secondary rounded-circle p-2 me-3" style={{ width: '45px', height: '45px' }} />
              <div>
                <h5>Address</h5>
                <p>Dansoman Control-down, World Temple AG, Accra, Ghana</p>
              </div>
            </div>
            <div className="d-flex mb-4 align-items-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <FaEnvelope className="bg-primary text-secondary rounded-circle p-2 me-3" style={{ width: '45px', height: '45px' }} />
              <div>
                <h5>Email</h5>
                <p>bestcoachmusic@gmail.com</p>
              </div>
            </div>
            <div className="d-flex mb-4 align-items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <FaPhoneAlt className="bg-primary text-secondary rounded-circle p-2 me-3" style={{ width: '45px', height: '45px' }} />
              <div>
                <h5>Phone</h5>
                <p>+233 5930 88047<br />+233 2085 02819</p>
              </div>
            </div>
            <div className="d-flex align-items-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <FaClock className="bg-primary text-secondary rounded-circle p-2 me-3" style={{ width: '45px', height: '45px' }} />
              <div>
                <h5>Opening Hours</h5>
                <strong>Sunday - Friday:</strong>
                <p className="m-0">08:00 AM - 05:00 PM</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  )
}

export default Contact
