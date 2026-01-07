import React, {useState, useEffect} from 'react'
import './Footer.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-scroll';
import { FaWhatsapp, FaFacebookF, FaTiktok, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaAngleRight, FaAngleDoubleUp } from 'react-icons/fa';
import axios from 'axios';


const Footer = () => {

const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });
  const [showBackToTop, setShowBackToTop] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <>
      <footer className="footer-section">
      {/* Floating Notes */}
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
              <a href="https://wa.me/message/CJZ4XQCNRWWTB1" className="social-btn"><FaWhatsapp /></a>
              <a href="#" className="social-btn"><FaFacebookF /></a>
              <a href="https://vm.tiktok.com/ZMS68pSTC/" className="social-btn"><FaTiktok /></a>
              <a href="https://www.instagram.com/bestcoachmusic?igsh=YWhpbHMwc3UzNWth" className="social-btn"><FaInstagram /></a>
            </div>
          </Col>

          {/* Get In Touch */}
          <Col lg={3} md={6} className="mb-5">
            <h3 className="text-primary mb-4">Get In Touch</h3>
            <div className="d-flex mb-3">
              <FaMapMarkerAlt className="text-primary mr-3" size={24} />
              <div>
                <h5 className="text-white">Address</h5>
                <p>Dansoman Control-down, World Temple AG, Accra, Ghana</p>
              </div>
            </div>
            <div className="d-flex mb-3">
              <FaEnvelope className="text-primary mr-3" size={24} />
              <div>
                <h5 className="text-white">Email</h5>
                <p>bestcoachmusic@gmail.com</p>
              </div>
            </div>
            <div className="d-flex">
              <FaPhoneAlt className="text-primary mr-3" size={24} />
              <div>
                <h5 className="text-white">Phone</h5>
                <p>+233 5930 88047<br />+233 2085 02819</p>
              </div>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={3} md={6} className="mb-5">
            <h3 className="text-primary mb-4">Quick Links</h3>
            <div className="d-flex flex-column">
              <Link to="home" smooth={true} className="footer-link mb-2"><FaAngleRight className="mr-2" />Home</Link>
              <Link to="about" smooth={true} className="footer-link mb-2"><FaAngleRight className="mr-2" />About Us</Link>
              <Link to="services" smooth={true} className="footer-link mb-2"><FaAngleRight className="mr-2" />Our Services</Link>
              <Link to="contact" smooth={true} className="footer-link mb-2"><FaAngleRight className="mr-2" />Contact Us</Link>
              <Link to="#" smooth={true} className="footer-link"><FaAngleRight className="mr-2" />FAQ's</Link>
            </div>
          </Col>

          {/* Newsletter */}
          <Col lg={3} md={6} className="mb-5">
            <h3 className="text-primary mb-4">Newsletter</h3>
            <Form onSubmit={handleSubmit} className="newsletter-form">
              <Form.Group className="mb-3">
                <Form.Control type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
              </Form.Group>
              <Button type="submit" className="newsletter-btn btn-block" disabled={status.loading}>
                {status.loading ? 'Submitting...' : 'Submit Now'}
              </Button>
              {status.success && <p className="text-success mt-2">Subscribed successfully!</p>}
              {status.error && <p className="text-danger mt-2">{status.error}</p>}
            </Form>
          </Col>
        </Row>
        <div className="pt-5 border-top border-light text-center">
          <p className="m-0">&copy; {currentYear} <a href="https://bestcoachmusic.netlify.app/home" className="text-primary font-weight-bold">Bestcoach</a>. All Rights Reserved. <a href="https://esef-tech.netlify.app/" className="text-primary font-weight-bold">Bestcoach.Dev</a></p>
        </div>
      </Container>

      {/* Back to Top */}
      <Button 
        className={`back-to-top ${showBackToTop ? 'show' : ''}`} 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <FaAngleDoubleUp />
      </Button>
    </footer>
    </>
  )
}

export default Footer
