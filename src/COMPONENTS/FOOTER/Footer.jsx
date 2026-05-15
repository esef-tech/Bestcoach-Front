import React, { useState } from 'react';
import './Footer.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link as RouterLink } from 'react-router-dom';
import {
  FaWhatsapp,
  FaFacebookF,
  FaTiktok,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaAngleRight
} from 'react-icons/fa';
import { db } from '../../firebase';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });
  const currentYear = new Date().getFullYear();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) return;

    setStatus({ loading: true, success: false, error: '' });

    try {
      const q = query(collection(db, 'newsletter'), where('email', '==', formData.email));
      const existing = await getDocs(q);

      if (!existing.empty) {
        toast.info("You're already subscribed!");
        setStatus({ loading: false, success: false, error: '' });
        return;
      }

      await addDoc(collection(db, 'newsletter'), {
        name: formData.name || 'Anonymous',
        email: formData.email,
        timestamp: serverTimestamp(),
        subscribedAt: new Date().toISOString()
      });

      toast.success("Subscribed successfully! 🎉");
      setFormData({ name: '', email: '' });
      setStatus({ loading: false, success: true, error: '' });
    } catch (err) {
      console.error("Newsletter error:", err);
      toast.error("Failed to subscribe. Please try again.");
      setStatus({ loading: false, success: false, error: 'Subscription failed.' });
    }
  };

  return (
    <>
      <footer className="footer-section-footer" role="contentinfo">
        {/* Floating Notes */}
        <div className="note-particle-footer">♪</div>
        <div className="note-particle-footer">♫</div>
        <div className="note-particle-footer">♬</div>
        <div className="note-particle-footer">♪</div>
        <div className="note-particle-footer">♫</div>

        <Container>
          <Row className="pt-5">
            {/* Follow Us */}
            <Col lg={3} md={6} className="mb-5">
              <h1 className="footer-brand-footer mb-4 text-color-footer">Bestcoach</h1>
              <p className="footer-text-footer">
                Follow Us! 🎶 Stay updated with Bestcoach Music for exclusive content and the latest news.
              </p>
              <nav className="social-links-footer" aria-label="Social Media Links">
                <a href="https://wa.me/message/CJZ4XQCNRWWTB1" className="social-btn-footer-social" target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
                  <FaWhatsapp aria-hidden="true" />
                </a>
                <a href="https://facebook.com/bestcoachmusic" className="social-btn-footer-social" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page">
                  <FaFacebookF aria-hidden="true" />
                </a>
                <a href="https://vm.tiktok.com/ZMS68pSTC/" className="social-btn-footer-social" target="_blank" rel="noopener noreferrer" aria-label="Follow us on TikTok">
                  <FaTiktok aria-hidden="true" />
                </a>
                <a href="https://www.instagram.com/bestcoachmusic?igsh=YWhpbHMwc3UzNWth" className="social-btn-footer-social" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
                  <FaInstagram aria-hidden="true" />
                </a>
              </nav>
            </Col>

            {/* Get In Touch - Proper Heading Hierarchy */}
            <Col lg={3} md={6} className="mb-5">
              <h3 className="text-color-footer mb-4">Get In Touch</h3>
              
              <div className="contact-item mb-3">
                <FaMapMarkerAlt className="text-color-footer me-3" size={24} aria-hidden="true" />
                <div>
                  <h4 className="contact-heading">Address</h4>
                  <p>Dansoman Control-down, World Temple AG, Accra, Ghana</p>
                </div>
              </div>

              <div className="contact-item mb-3">
                <FaEnvelope className="text-color-footer me-3" size={24} aria-hidden="true" />
                <div>
                  <h4 className="contact-heading">Email</h4>
                  <p>bestcoachmusic@gmail.com</p>
                </div>
              </div>

              <div className="contact-item">
                <FaPhoneAlt className="text-color-footer me-3" size={24} aria-hidden="true" />
                <div>
                  <h4 className="contact-heading">Phone</h4>
                  <p>+233 5930 88047<br />+233 2085 02819</p>
                </div>
              </div>
            </Col>

            {/* Quick Links */}
            <Col lg={3} md={6} className="mb-5">
              <h3 className="text-color-footer mb-4">Quick Links</h3>
              <nav className="quick-links-footer" aria-label="Quick Navigation Links">
                <RouterLink to="/" className="footer-link-footer mb-2"><FaAngleRight className="me-2" aria-hidden="true" />Home</RouterLink>
                <RouterLink to="/about" className="footer-link-footer mb-2"><FaAngleRight className="me-2" aria-hidden="true" />About Us</RouterLink>
                <RouterLink to="/services" className="footer-link-footer mb-2"><FaAngleRight className="me-2" aria-hidden="true" />Our Services</RouterLink>
                <RouterLink to="/contact" className="footer-link-footer mb-2"><FaAngleRight className="me-2" aria-hidden="true" />Contact Us</RouterLink>
                <RouterLink to="/faq" className="footer-link-footer mb-2"><FaAngleRight className="me-2" aria-hidden="true" />FAQ's</RouterLink>
                <RouterLink to="/help" className="footer-link-footer mb-2"><FaAngleRight className="me-2" aria-hidden="true" />Help</RouterLink>
                <RouterLink to="/terms" className="footer-link-footer mb-2"><FaAngleRight className="me-2" aria-hidden="true" />Terms of Use</RouterLink>
                <RouterLink to="/privacy" className="footer-link-footer"><FaAngleRight className="me-2" aria-hidden="true" />Privacy Policy</RouterLink>
              </nav>
            </Col>

            {/* Newsletter */}
            <Col lg={3} md={6} className="mb-5">
              <h3 className="text-color-footer mb-4">Newsletter</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="footer-name">Your Name</Form.Label>
                  <Form.Control id="footer-name" type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="footer-email">Email Address</Form.Label>
                  <Form.Control id="footer-email" type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                </Form.Group>
                <Button type="submit" className="newsletter-footer btn-block w-100 text-white" disabled={status.loading} style={{ backgroundColor: '#00394f' }}>
                  {status.loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Submitting...
                    </>
                  ) : 'Subscribe Now'}
                </Button>
              </Form>
            </Col>
          </Row>

          {/* Bottom Copyright */}
          <div className="footer-bottom">
            <p className="m-0 text-center">
              &copy; {currentYear} Bestcoach Music. All Rights Reserved.{' '}
              <a href="https://bestcoachmusic.netlify.app/" target="_blank" rel="noopener noreferrer">Bestcoach</a> •{' '}
              <a href="https://esef-tech.netlify.app/" target="_blank" rel="noopener noreferrer">Bestcoach.Dev</a>
            </p>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;