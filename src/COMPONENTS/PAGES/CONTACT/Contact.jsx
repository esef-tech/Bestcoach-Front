import React, {useState} from 'react'
import './Contact.css'
import { Container, Row, Col, Form, Button, Alert, Accordion,Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock, FaSearch, FaQuestionCircle, FaGlobe } from 'react-icons/fa';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Submission failed. Try again.' });
    }
  };

// Dynamic FAQs array (based on Musora - easy to update)
  const faqs = [
    { question: 'What different types of memberships are available?', answer: 'We offer free trials, monthly, and annual memberships for individuals, schools, and churches.' },
    { question: 'Do you have a specific lesson curriculum?', answer: 'Yes, our curriculum covers beginner to advanced levels for various instruments.' },
    { question: 'I ordered a product from you, how can I track my shipment?', answer: 'Use the tracking link sent to your email or contact support with your order ID.' },
    { question: 'What’s the difference between free and paid content?', answer: 'Free content includes basic tips; paid unlocks full lessons and resources.' },
    { question: 'What are the terms for your refund guarantee?', answer: 'Refunds within 30 days for unused services.' },
    { question: 'Does Bestcoach cover customs fees?', answer: 'No, customs fees are the responsibility of the customer.' },
  ];

  // Filter FAQs based on search
  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Dynamic urgent contacts array (easy to update)
  const urgentContacts = [
    { icon: <FaPhoneAlt />, label: 'Toll Free:', value: '+233-208-502-816' },
    { icon: <FaGlobe />, label: 'Direct/International:', value: '+233-593-088-047' },
    { icon: <FaClock />, label: 'Office Hours:', value: 'Monday - Friday, 8AM - 5PM ' },
  ];




  return (
    <React.Fragment>
      

<section className="contact-page">
      {/* Header */}
      <div className="header-contact bg-teal text-white text-center py-5 animate-fade-in">
        <h1 className="display-3 fw-bold">Contact Us</h1>
      </div>

      {/* Intro */}
      <Container className="py-5 text-center">
        <h3 className="mb-4 text-orange animate-slide-up">Advice and answers from the Bestcoach team</h3>
        <p className="lead mb-5 animate-slide-up">Find an answer on your own or get in touch with our support team.</p>
      </Container>

      {/* FAQs */}
      <Container className="py-5">
        <h3 className="mb-4 text-orange animate-slide-up">Frequently Asked Questions<FaQuestionCircle className="me-2" /> </h3>
        <Form className="mb-4 d-flex justify-content-center animate-fade-in">
          <Form.Control 
            type="text" 
            placeholder="Search FAQs..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="w-50 me-2"
          />
          <Button variant="orange"><FaSearch /></Button>
        </Form>
        <Accordion defaultActiveKey="0">
          {filteredFAQs.map((faq, idx) => (
            <Accordion.Item eventKey={idx.toString()} key={idx} className="animate-slide-up" style={{ animationDelay: `${0.2 * idx}s` }}>
              <Accordion.Header>{faq.question}</Accordion.Header>
              <Accordion.Body>{faq.answer}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>

      {/* Contact Form */}
      <Container className="py-5">
        <h3 className="mb-4 text-orange text-center animate-slide-up">Reach Out Directly <FaEnvelope className="me-2" /></h3>
        <p className="text-center mb-5 animate-slide-up">Get in touch with our support team!</p>
        <Row className="justify-content-center">
          <Col lg={7} className="animate-slide-left">
            <Card className="shadow p-4 bg-white rounded">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control name="email" type="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control name="subject" value={formData.subject} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={6} name="message" value={formData.message} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Do you have an account with BestCoach Music?</Form.Label>
                  <Form.Select name="hasAccount" value={formData.hasAccount} onChange={handleChange} required>
                    <option value="">Select Yes or No</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Attachment (optional)</Form.Label>
                  <Form.Control type="file" name="attachment" onChange={handleChange} />
                </Form.Group>
                <Button id="contact-button-submit-color" type="submit" disabled={status.loading} className="w-100 animate-bounce-in">
                  {status.loading ? 'Sending...' : 'Send Message'}
                </Button>
                {status.success && <Alert variant="success" className="mt-3">Message sent successfully!</Alert>}
                {status.error && <Alert variant="danger" className="mt-3">{status.error}</Alert>}
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Urgent Contact */}
           <Container className="py-5 text-center animate-fade-in">
        <h3 className="mb-4 text-dark">Have A More Urgent Request? Give Us A Shout. <FaMapMarkerAlt className="me-2" /></h3>
        <Row className="justify-content-center">
          {urgentContacts.map((contact, idx) => (
            <Col xs={12} md={4} key={idx} className="mb-3 animate-slide-up" style={{ animationDelay: `${0.2 * idx}s` }}>
              <Button variant="light" className="w-100 py-3 urgent-btn">
                {contact.icon} {contact.label} {contact.value}
              </Button>
            </Col>
          ))}
        </Row>
      </Container>
      {/* Breadcrumb or Back Link */}
      <div className="text-center mb-5">
        <Link to="/" className="text-orange">Back to Home</Link>
      </div>

    </section>

      </React.Fragment>
      
    
  )
}

export default Contact
