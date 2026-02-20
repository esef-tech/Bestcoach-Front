import React, {useState} from 'react'
import './Footer.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp, FaFacebookF, FaTiktok, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaAngleRight, } from 'react-icons/fa';
import axios from 'axios';
import { Alert } from 'react-bootstrap';


const Footer = () => {

const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });
  const currentYear = new Date().getFullYear();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      await axios.post('http://localhost:5000/api/newsletter', formData);
      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Error subscribing. Try again.' });
    }
  };

   


  return (
    <>
     <footer className="footer-section">
      {/* Floating Notes for animation */}
      <div className="note-particle">♪</div>
      <div className="note-particle">♫</div>
      <div className="note-particle">♬</div>
      <div className="note-particle">♪</div>
      <div className="note-particle">♫</div>

      <Container>
        <Row className="pt-5">
          {/* Follow Us */}
          <Col lg={3} md={6} className="mb-5">
            <h1 className="footer-brand mb-4">Bestcoach</h1>
            <p className="footer-text">**Follow Us! 🎶** Stay updated with Bestcoach Music. Click the buttons below to follow us on social media for exclusive content and the latest news!</p>
            <div className="d-flex mt-4">
              <a href="https://wa.me/message/CJZ4XQCNRWWTB1" className="social-btn" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
              <a href="https://facebook.com/bestcoachmusic" className="social-btn" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a> {/* Add real FB URL */}
              <a href="https://vm.tiktok.com/ZMS68pSTC/" className="social-btn" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
              <a href="https://www.instagram.com/bestcoachmusic?igsh=YWhpbHMwc3UzNWth" className="social-btn" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
          </Col>

          {/* Get In Touch */}
          <Col lg={3} md={6} className="mb-5">
            <h3 className="text-color mb-4">Get In Touch</h3>
            <div className="d-flex mb-3">
              <FaMapMarkerAlt className="text-color me-3" size={24} />
              <div>
                <h5 className="text-white">Address</h5>
                <p>Dansoman Control-down, World Temple AG, Accra, Ghana</p>
              </div>
            </div>
            <div className="d-flex mb-3">
              <FaEnvelope className="text-color me-3" size={24} />
              <div>
                <h5 className="text-white">Email</h5>
                <p>bestcoachmusic@gmail.com</p>
              </div>
            </div>
            <div className="d-flex">
              <FaPhoneAlt className="text-color me-3" size={24} />
              <div>
                <h5 className="text-white">Phone</h5>
                <p>+233 5930 88047<br />+233 2085 02819</p>
              </div>
            </div>
          </Col>

          {/* Quick Links - Use RouterLink for internal navigation */}
          <Col lg={3} md={6} className="mb-5">
            <h3 className="text-color mb-4">Quick Links</h3>
            <div className="d-flex flex-column">
              <RouterLink to="/" className="footer-link mb-2"><FaAngleRight className="me-2" />Home</RouterLink>
              <RouterLink to="/about" className="footer-link mb-2"><FaAngleRight className="me-2" />About Us</RouterLink>
              <RouterLink to="/services" className="footer-link mb-2"><FaAngleRight className="me-2" />Our Services</RouterLink>
              <RouterLink to="/contact" className="footer-link mb-2"><FaAngleRight className="me-2" />Contact Us</RouterLink>
              <RouterLink to="/faq" className="footer-link"><FaAngleRight className="me-2" />FAQ's</RouterLink> {/* Assume /faqs page exists or add it */}
              <RouterLink to="/help" className='footer-link'><FaAngleRight className='me-2'/>Help!</RouterLink>         
            </div>
          </Col>

          {/* Newsletter */}
          <Col lg={3} md={6} className="mb-5">
            <h3 className="text-color mb-4">Newsletter</h3>
            <Form onSubmit={handleSubmit} className="newsletter-form">
              <Form.Group className="mb-3">
                <Form.Control type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
              </Form.Group>
              <Button type="submit" id="newsletter-color"
              className="newsletter-btn btn-block" disabled={status.loading}>
                {status.loading ? 'Submitting...' : 'Submit Now'}
              </Button>
              {status.success && <Alert variant="success" className="mt-2">Subscribed successfully!</Alert>}
              {status.error && <Alert variant="danger" className="mt-2">{status.error}</Alert>}
            </Form>
          </Col>
        </Row>
        <div className="pt-5 border-top border-light text-center">
          <p className="m-0">&copy; {currentYear} <a href="https://bestcoachmusic.netlify.app/" className="text-color font-weight-bold" target="_blank" rel="noopener noreferrer">Bestcoach</a>. All Rights Reserved. <a href="https://esef-tech.netlify.app/" className="text-color font-weight-bold" target="_blank" rel="noopener noreferrer">Bestcoach.Dev</a></p>
        </div>
      </Container>

      {/* Back to Top */}
    
        
    
    </footer>
    </>
  )
}

export default Footer
