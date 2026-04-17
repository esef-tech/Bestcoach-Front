import React, { useState, useEffect } from 'react';
import './Contact.css';
import { Container, Row, Col, Form, Button, Accordion, Card,  Spinner, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock, FaSearch, FaQuestionCircle, FaGlobe, FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import { db, storage } from '../../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import Seo from '../../Seo';
import { useSession } from '../../../context/SessionContext';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: '', hasAccount: ''
  });
  const [attachment, setAttachment] = useState(null);
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const { session, savePreferences, getPreferences } = useSession();
  const [showCallModal, setShowCallModal] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState('');
  const [showMapModal, setShowMapModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'attachment') {
      setAttachment(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      let attachmentUrl = '';
      if (attachment) {
        const fileRef = ref(storage, `contact-attachments/${Date.now()}_${attachment.name}`);
        await uploadBytes(fileRef, attachment);
        attachmentUrl = await getDownloadURL(fileRef);
      }
      await addDoc(collection(db, 'contacts'), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        hasAccount: formData.hasAccount,
        attachmentUrl: attachmentUrl || null,
        timestamp: serverTimestamp()
      });
      toast.success("Message sent successfully! 🎉");
      setFormData({ name: '', email: '', subject: '', message: '', hasAccount: '' });
      setAttachment(null);
      setStatus({ loading: false, success: true, error: '' });
      setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 4000);
    } catch (err) {
      console.error(err);
      setStatus({ loading: false, success: false, error: err.message || 'Submission failed. Please try again.' });
    }
  };

  const faqs =   [
    { question: 'What different types of memberships are available?', answer: 'We offer free trials, monthly, and annual memberships for individuals, schools, and churches.' },
    { question: 'Do you have a specific lesson curriculum?', answer: 'Yes, our curriculum covers beginner to advanced levels for various instruments.' },
    { question: 'I ordered a product from you, how can I track my shipment?', answer: 'Use the tracking link sent to your email or contact support with your order ID.' },
    { question: 'What’s the difference between free and paid content?', answer: 'Free content includes basic tips; paid unlocks full lessons and resources.' },
    { question: 'What are the terms for your refund guarantee?', answer: 'Refunds within 30 days for unused services.' },
    { question: 'Does Bestcoach cover customs fees?', answer: 'No, customs fees are the responsibility of the customer.' },
  ];/* your existing faqs array */ 
  
  const urgentContacts = [
    { icon: <FaPhoneAlt />, label: 'Toll Free:', value: '+233-208-502-816', type: 'call' },
    { icon: <FaGlobe />, label: 'Direct/International:', value: '+233-593-088-047', type: 'call' },
    { icon: <FaClock />, label: 'Office Hours:', value: 'Monday - Friday, 8AM - 5PM', type: 'map' },
    { icon: <FaWhatsapp />, label: 'WhatsApp Chat:', value: '+233-208-502-816', type: 'whatsapp' },
    { icon: <FaTelegramPlane />, label: 'Telegram Chat:', value: '@bestcoachmusic', type: 'telegram' },
    { icon: <FaEnvelope />, label: 'Email Us:', value: 'bestcoachmusic@gmail.com', type: 'email' },
  ];
  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (session) {
      savePreferences({ ...getPreferences(), lastPage: '/contact' });
    }
  }, [session, savePreferences, getPreferences]);


 const handleUrgentClick = (contact) => {
    if (contact.type === 'call') {
      setSelectedPhone(contact.value);
      setShowCallModal(true);
    } else if (contact.type === 'map') {
      setShowMapModal(true);
    } else if (contact.type === 'whatsapp') {
      setShowWhatsAppModal(true);
    } else if (contact.type === 'telegram') {
      setShowTelegramModal(true);
    } else if (contact.type === 'email') {
      setShowEmailModal(true);
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hello Bestcoach Music, I need help with...");
    window.open(`https://wa.me/233208502816?text=${message}`, '_blank');
    setShowWhatsAppModal(false);
  };

  const openTelegram = () => {
    window.open('https://t.me/bestcoachmusic', '_blank');
    setShowTelegramModal(false);
  };

  const openEmail = () => {
    const subject = encodeURIComponent("Inquiry from Bestcoach Website");
    const body = encodeURIComponent("Hello Bestcoach Music team,\n\nI need help with...");
    window.location.href = `mailto:bestcoachmusic@gmail.com?subject=${subject}&body=${body}`;
    setShowEmailModal(false);
  };


  return (
    <React.Fragment>
      <Seo
        title="Contact Bestcoach Music | Get Help, Feedback & Partnership"
        description="Reach out to the Bestcoach Music team. Questions about coaching, community, or partnerships?"
        keywords="contact bestcoach music, singing support, vocal coaching help"
        image="https://tonara.com/wp-content/themes/tonara/img/tutorials/tutorials_page_banner.jpg"
      />

      <section className="contact-page">
        {/* Header - Glassmorphic hero */}
        <div className="header-contact text-white text-center py-5 animate-fade-in">
          <h1 className="display-3  text-h1-c fw-bold">Contact Us</h1>
        </div>

        {/* Intro */}
        <Container className="py-5 text-center">
          <h3 className="mb-4 text-orange animate-slide-up h3-contact">Advice and answers from the Bestcoach team</h3>
          <p className="lead mb-5 text-white animate-slide-up p-contact">Find an answer on your own or get in touch with our support team.</p>
        </Container>

        {/* FAQs - Glassmorphic Accordion */}
        <Container className="py-5">
          <h3 className="mb-4 text-orange animate-slide-up h3-contact-c">Frequently Asked Questions <FaQuestionCircle className="me-2" /></h3>
          <Form className="mb-4 d-flex justify-content-center animate-fade-in">
            <Form.Control
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-50 me-2 form-text-contact"
            />
            <Button variant="orange"><FaSearch /></Button>
          </Form>
          <Accordion defaultActiveKey="0" >
            {filteredFAQs.map((faq, idx) => (
              <Accordion.Item eventKey={idx.toString()} key={idx} className="glass-card animate-slide-up" style={{ animationDelay: `${0.2 * idx}s` }}>
                <Accordion.Header>{faq.question}</Accordion.Header>
                <Accordion.Body >{faq.answer}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Container>

        {/* Contact Form - Glassmorphic Card */}
        <Container className="py-5">
          <h3 className="mb-4 text-orange text-center animate-slide-up h3-contact-c">Reach Out Directly <FaEnvelope className="me-2" /></h3>
          <p className="text-center mb-5 animate-slide-up p-contact">Get in touch with our support team!</p>
          <Row className="justify-content-center">
            <Col lg={7} className="animate-slide-left">
              <Card className="glass-card shadow p-4">
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
                  <Button
                    id="contact-button-submit-color"
                    type="submit"
                    disabled={status.loading}
                    className="w-100 animate-bounce-in"
                  >
                    {status.loading ? <Spinner animation="border" size="sm" className="me-2" /> : null}
                    {status.loading ? 'Sending...' : 'Send Message'}
                  </Button>
                  {status.success && <div className="alert alert-success mt-3 text-center">Message sent successfully! 🎉</div>}
                  {status.error && <div className="alert alert-danger mt-3 text-center">{status.error}</div>}
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Urgent Contact - Glassmorphic buttons */}
        {/* Urgent Contact - NOW WITH MODALS */}
        <Container className="py-5 text-center animate-fade-in">
          <h3 className="mb-4 text-orange h3-contact-c">Have A More Urgent Request? Give Us A Shout. <FaMapMarkerAlt className="me-2" /></h3>
          <Row className="justify-content-center">
            {urgentContacts.map((contact, idx) => (
              <Col xs={12} md={4} key={idx} className="mb-3 animate-slide-up" style={{ animationDelay: `${0.2 * idx}s` }}>
                <Button
                  className="w-100 py-3 urgent-button glass-button contact-button-n"
                  onClick={() => handleUrgentClick(contact)}
                >
                  {contact.icon} {contact.label} {contact.value}
                </Button>
              </Col>
            ))}
          </Row>
        </Container>

        {/* Back Link */}
        <div className="text-center mb-5">
          <Link to="/" className="text-orange link-text-contact">← Back to Home</Link>
        </div>

        {/* ==================== CALL MODAL ==================== */}
        <Modal show={showCallModal} onHide={() => setShowCallModal(false)} centered className="contact-modal">
          <Modal.Body className="glass-modal p-5 text-center">
            <h3 className="mb-4">Call Bestcoach Music Now</h3>
            <div className="phone-number-display mb-4">
              <h2 className="fw-bold text-orange">{selectedPhone}</h2>
            </div>
            <Button
              href={`tel:${selectedPhone}`}
              size="lg"
              className="w-100 py-3 mb-3 call-now-btn"
            >
              📞 Call Now
            </Button>
            <Button variant="outline-secondary" onClick={() => setShowCallModal(false)} className="w-100">
              Cancel
            </Button>
          </Modal.Body>
        </Modal>

        {/* ==================== MAP MODAL ==================== */}
        <Modal show={showMapModal} onHide={() => setShowMapModal(false)} centered size="lg" className="contact-modal">
          <Modal.Body className="glass-modal p-0">
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.1421523060635!2d-0.2754977242975032!3d5.545931633749404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9790ccb546c7%3A0xc3c829323923c9f8!2sWord%20Temple%2C%20Assemblies%20of%20God%20Church!5e0!3m2!1sen!2sgh!4v1769994147843!5m2!1sen!2sgh"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title='BestcoachLocation'
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowMapModal(false)}>Close Map</Button>
          </Modal.Footer>
        </Modal>

        {/* ==================== NEW WHATSAPP MODAL ==================== */}
        <Modal show={showWhatsAppModal} onHide={() => setShowWhatsAppModal(false)} centered className="contact-modal">
          <Modal.Body className="glass-modal p-5 text-center">
            <h3 className="mb-4">Chat with Bestcoach Music on WhatsApp</h3>
            <div className="phone-number-display mb-4">
              <h2 className="fw-bold text-orange">+233-208-502-816</h2>
            </div>
            <Button
              size="lg"
              className="w-100 py-3 mb-3 whatsapp-btn"
              onClick={openWhatsApp}
            >
              <FaWhatsapp className="me-2" /> Chat on WhatsApp
            </Button>
            <Button variant="outline-secondary" onClick={() => setShowWhatsAppModal(false)} className="w-100">
              Cancel
            </Button>
          </Modal.Body>
        </Modal>

       {/* Telegram Modal - unchanged */}
        <Modal show={showTelegramModal} onHide={() => setShowTelegramModal(false)} centered className="contact-modal">
          <Modal.Body className="glass-modal p-5 text-center">
            <h3 className="mb-4">Chat with Bestcoach Music on Telegram</h3>
            <div className="phone-number-display mb-4">
              <h2 className="fw-bold text-orange">@bestcoachmusic</h2>
            </div>
            <Button size="lg" className="w-100 py-3 mb-3 telegram-btn" onClick={openTelegram}>
              <FaTelegramPlane className="me-2" /> Open in Telegram
            </Button>
            <Button variant="outline-secondary" onClick={() => setShowTelegramModal(false)} className="w-100">Cancel</Button>
          </Modal.Body>
        </Modal>

        {/* ==================== NEW EMAIL MODAL ==================== */}
        <Modal show={showEmailModal} onHide={() => setShowEmailModal(false)} centered className="contact-modal">
          <Modal.Body className="glass-modal p-5 text-center">
            <h3 className="mb-4">Email Bestcoach Music</h3>
            <div className="phone-number-display mb-4">
              <h2 className="fw-bold text-orange">bestcoachmusic@gmail.com</h2>
            </div>
            <Button
              size="lg"
              className="w-100 py-3 mb-3 email-btn"
              onClick={openEmail}
            >
              ✉️ Open Email Client
            </Button>
            <Button variant="outline-secondary" onClick={() => setShowEmailModal(false)} className="w-100">Cancel</Button>
          </Modal.Body>
        </Modal>

      </section>
    </React.Fragment>
  );
};

export default Contact;