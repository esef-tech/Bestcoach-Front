import React, {useState} from 'react'
import './Footer.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp, FaFacebookF, FaTiktok, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaAngleRight, } from 'react-icons/fa';
import { db } from '../../firebase'; // ← Import Firebase
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';



const Footer = () => {

  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });
  const currentYear = new Date().getFullYear();


 
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const token = await executeRecaptcha('newsletter_footer');
    if (!formData.email) return;

    setStatus({ loading: true, success: false, error: '' });
    setStatus({ loading: false, success: true, error: '' });
    toast.success("Subscribed successfully! Check your email 🎉");
      setFormData({ name: '', email: '' });

      
// Auto-hide success message after 3 seconds
setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 3000);

    try {

      /*if (!executeRecaptcha) {
        toast.error("reCAPTCHA not loaded. Please refresh.");
        return;
      }*/
      
      // Duplicate check
      const q = query(collection(db, 'newsletter'), where('email', '==', formData.email));
      const existing = await getDocs(q);

      if (!existing.empty) {
        setStatus({ loading: false, success: false, error: 'You are already subscribed!' });
        return;
      }


     
      await addDoc(collection(db, 'newsletter'), {
        name: formData.name || 'Anonymous',
        email: formData.email,
        //recaptchaToken: token,
        timestamp: serverTimestamp(),
        subscribedAt: new Date().toISOString()
      });

      
      setStatus({ loading: false, success: true, error: '' });
      

    } catch (err) {
      console.error("Newsletter error:", err);
      
      // Better error messages
      let errorMsg = 'Failed to subscribe. Please try again later.';
      if (err.code === 'permission-denied') {
        errorMsg = 'Permission denied. Please check Firestore security rules.';
      } else if (err.code === 'not-found') {
        errorMsg = 'Database not found. Please contact support.';
      } else if (err.message) {
        errorMsg = err.message;
      }
      
      setStatus({ loading: false, success: false, error: errorMsg });
    }
  };


      


  return (
    <>
     <footer className="footer-section-footer">
      {/* Floating Notes for animation */}
      <div className="note-particle-footer">♪</div>
      <div className="note-particle-footer">♫</div>
      <div className="note-particle-footer">♬</div>
      <div className="note-particle-footer">♪</div>
      <div className="note-particle-footer">♫</div>
      <Container>
        <Row className="pt-5">
          {/* Follow Us */}
          <Col lg={3} md={6} className="mb-5">
            <h1 className="footer-brand-footer mb-4">Bestcoach</h1>
            <p className="footer-text-footer">**Follow Us! 🎶** Stay updated with Bestcoach Music. Click the buttons below to follow us on social media for exclusive content and the latest news!</p>
            <div className="d-flex mt-4">
              <a href="https://wa.me/message/CJZ4XQCNRWWTB1" className="social-btn-footer-social" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
              <a href="https://facebook.com/bestcoachmusic" className="social-btn-footer-social" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a> {/* Add real FB URL */}
              <a href="https://vm.tiktok.com/ZMS68pSTC/" className="social-btn-footer-social" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
              <a href="https://www.instagram.com/bestcoachmusic?igsh=YWhpbHMwc3UzNWth" className="social-btn-footer-social" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
          </Col>

          {/* Get In Touch */}
          <Col lg={3} md={6} className="mb-5">
            <h3 className="text-color-footer mb-4">Get In Touch</h3>
            <div className="d-flex mb-3">
              <FaMapMarkerAlt className="text-color-footer me-3" size={24} />
              <div>
                <h5 className="text-white">Address</h5>
                <p>Dansoman Control-down, World Temple AG, Accra, Ghana</p>
              </div>
            </div>
            <div className="d-flex mb-3">
              <FaEnvelope className="text-color-footer me-3" size={24} />
              <div>
                <h5 className="text-white">Email</h5>
                <p>bestcoachmusic@gmail.com</p>
              </div>
            </div>
            <div className="d-flex">
              <FaPhoneAlt className="text-color-footer me-3" size={24} />
              <div>
                <h5 className="text-white">Phone</h5>
                <p>+233 5930 88047<br />+233 2085 02819</p>
              </div>
            </div>
          </Col>

          {/* Quick Links - Use RouterLink for internal navigation */}
          <Col lg={3} md={6} className="mb-5">
            <h3 className="text-color-footer mb-4">Quick Links</h3>
            <div className="d-flex flex-column">
              <RouterLink to="/" className="footer-link-footer mb-2"><FaAngleRight className="me-2" />Home</RouterLink>
              <RouterLink to="/about" className="footer-link-footer mb-2"><FaAngleRight className="me-2" />About Us</RouterLink>
              <RouterLink to="/services" className="footer-link-footer mb-2"><FaAngleRight className="me-2" />Our Services</RouterLink>
              <RouterLink to="/contact" className="footer-link-footer mb-2"><FaAngleRight className="me-2" />Contact Us</RouterLink>
              <RouterLink to="/faq" className="footer-link-footer"><FaAngleRight className="me-2" />FAQ's</RouterLink> {/* Assume /faqs page exists or add it */}
              <RouterLink to="/help" className='footer-link-footer'><FaAngleRight className='me-2'/>Help!</RouterLink>         
            </div>
          </Col>

         {/* Newsletter */}
            <Col lg={3} md={6} className="mb-5">
              <h3 className="text-color-footer mb-4">Newsletter</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                </Form.Group>
                <Button type="submit"  id='btn-news' className="newsletter-footer btn-block w-100" disabled={status.loading}>
                  {status.success ? <Spinner animation="border" size="sm" className="me-2" /> : null}
                  {status.loading ? 'Submitting ...' : 'Submit Now'}
                  
                </Button>
              </Form>
            </Col>
          </Row>

        <div className="pt-5 border-top border-light text-center">
          <p className="m-0">&copy; {currentYear} <a href="https://bestcoachmusic.netlify.app/" className="text-color-footer font-weight-bold" target="_blank" rel="noopener noreferrer">Bestcoach</a>. All Rights Reserved. <a href="https://esef-tech.netlify.app/" className="text-color-footer font-weight-bold" target="_blank" rel="noopener noreferrer">Bestcoach.Dev</a></p>
        </div>
      </Container>

      {/* Back to Top */}
    
  
    </footer>
    </>
  )
}

export default Footer
