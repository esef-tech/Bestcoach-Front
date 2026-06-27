import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './About.css';
import about from './../../Images/team/24.jpg';
import { db } from '../../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import Seo from '../../Seo';
import { useSession } from '../../../context/SessionContext';

const About = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState({ loading: false, success: false, error: '' });
  const { session, savePreferences, getPreferences } = useSession();

  const timeline = [
    { year: '2003', desc: 'BreakSticks.com launched.' },
    { year: '2008', desc: 'Acquired PianoLessons.com, launched The Piano System, first YouTube video.' },
    { year: '2016', desc: 'Lisa Witt joins the team.' },
    { year: '2019', desc: 'Viral lesson released.' },
    { year: '2020', desc: 'Reached 10,000+ members.' },
    { year: '2021', desc: 'App launched.' },
    { year: '2022', desc: 'Coaches program introduced.' },
  ];

  const metrics = [
    { value: '1,000+', label: 'Members' },
    { value: '100+', label: 'Pageviews' },
    { value: '100+', label: 'Instagram' },
    { value: '100+', label: 'Facebook' },
    { value: '9+', label: 'Executives' },
    { value: '2+', label: 'Events' }
  ];

  const seenInLogos = [
    'https://d2vyvo0tyx8ig5.cloudfront.net/sales/about/pianodreamers_icon.png',
    'https://d2vyvo0tyx8ig5.cloudfront.net/sales/about/musicradar_icon.svg',
    'https://d2vyvo0tyx8ig5.cloudfront.net/sales/about/keyboardkraze_icon.svg',
    'https://d2vyvo0tyx8ig5.cloudfront.net/sales/about/learnopoly_icon.svg',
    'https://d2vyvo0tyx8ig5.cloudfront.net/sales/about/pianist_icon.svg',
    'https://d2vyvo0tyx8ig5.cloudfront.net/sales/about/equipboard_icon.svg',
  ];

  const handleNewsletterChange = (e) => setNewsletterEmail(e.target.value);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus({ loading: true, success: false, error: '' });
    try {
      await addDoc(collection(db, 'newsletter'), {
        email: newsletterEmail,
        source: 'About Page',
        timestamp: serverTimestamp()
      });
      setNewsletterStatus({ loading: false, success: true, error: '' });
      setNewsletterEmail('');
      toast.success("Subscribed successfully! 🎉");
      setTimeout(() => {
        setNewsletterStatus(prev => ({ ...prev, success: false }));
      }, 4000);
    } catch (err) {
      console.error(err);
      setNewsletterStatus({
        loading: false,
        success: false,
        error: err.message || 'Subscription failed. Please try again.'
      });
    }
  };

  useEffect(() => {
    if (session) {
      savePreferences({ ...getPreferences(), lastPage: '/about' });
    }
  }, [session, savePreferences, getPreferences]);

  return (
    <React.Fragment>
      <Seo
        title="About Bestcoach Music | Empowering Singers Worldwide"
        description="Learn how Bestcoach Music was founded to create the ultimate online singing community."
        keywords="about bestcoach music, singing community story, vocal coaching mission"
        image="http://localhost:3000/static/media/24.cb44feb0337b0e1f0b46.jpg"
      />
      <section className="about-page">
        {/* Hero Header */}
        <div className="hero-about text-white text-center py-5 animate-fade-in">
          <Container>
            <h1 className="display-3 fw-bold mb-4 about-h1">Life is better with music</h1>
            <p className="lead mb-5 about-p">Learn how to play piano, whenever you want, wherever you want.</p>
            <Button variant="light" as={Link} to="/about" className="me-2 animate-bounce-in link-about-text">About Us</Button>
          </Container>
        </div>

        {/* Mission */}
        <Container className="py-5 text-center">
          <h2 className="mb-4 text-orange animate-slide-up about-h2">Our Mission</h2>
          <p className="lead mb-5 animate-slide-up about-p">To spread music education widely and remove barriers of age or location for learning music.</p>
        </Container>

        {/* Timeline */}
        <Container className="py-5">
          <h2 className="text-center mb-5 text-orange animate-slide-up about-h2">Our History</h2>
          <Row className="justify-content-center">
            {timeline.map((item, idx) => (
              <Col md={4} key={idx} className="mb-4 animate-slide-up" style={{ animationDelay: `${0.2 * idx}s` }}>
                <Card className="glass-card text-center shadow border-0">
                  <Card.Body>
                    <h3 className="text-orange">{item.year}</h3>
                    <p>{item.desc}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>

        {/* Founder Story */}
        <Container className="py-5 bg-light">
          <Row className="align-items-center">
            <Col lg={6} className="animate-slide-left">
              <Image src={about} alt="Founder" fluid className="rounded shadow animate-zoom-in" />
            </Col>
            <Col lg={6} className="animate-slide-right">
              <h2 className="mb-4 text-orange">It all started ...</h2>
              <p className="lead contact-p">Mr. Emmanuel Ameko, founded Bestcoach Music</p>
            </Col>
          </Row>
        </Container>

        {/* Viral Moment */}
        <Container className="py-5 text-center">
          <h2 className="mb-4 text-orange animate-slide-up">Our Viral Moment</h2>
          <iframe width="560" height="315" src="https://d2vyvo0tyx8ig5.cloudfront.net/sales/about/create_emotion.mp4" title="Viral Lesson" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="mb-4 rounded shadow animate-zoom-in" />
          <p className="lead">Our "Create Emotion With 3 Notes" lesson went viral with millions of views.</p>
        </Container>

        {/* Community Metrics */}
        <Container className="py-5 bg-light text-center">
          <h2 className="mb-5 text-orange animate-slide-up">Our Community</h2>
          <Row>
            {metrics.map((metric, idx) => (
              <Col md={2} key={idx} className="mb-4 animate-fade-in" style={{ animationDelay: `${0.2 * idx}s` }}>
                <Card className="glass-card text-center">
                  <Card.Body>
                    <h3 className="text-orange">{metric.value}</h3>
                    <p>{metric.label}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>

        {/* As Seen In */}
        <Container className="py-5 bg-info text-center">
          <h2 className="mb-5 text-orange animate-slide-up">As Seen In</h2>
          <Row className="justify-content-center">
            {seenInLogos.map((logo, idx) => (
              <Col xs={4} md={2} key={idx} className="mb-3 animate-zoom-in" style={{ animationDelay: `${0.2 * idx}s` }}>
                <Image src={logo} alt="Seen In Logo" fluid className="seen-in-logo" />
              </Col>
            ))}
          </Row>
        </Container>

        {/* Newsletter - FIXED Subscribe Button */}
        <Container className="py-5 text-center">
          <h2 className="mb-4 text-orange animate-slide-up">Get Free Weekly Lessons</h2>
          <Form onSubmit={handleNewsletterSubmit} className="newsletter-form d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 animate-fade-in">
            <Form.Control
              type="email"
              placeholder="Your email"
              value={newsletterEmail}
              onChange={handleNewsletterChange}
              required
              className="newsletter-input"
            />
            <Button id="about-signup-button-color" type="submit" disabled={newsletterStatus.loading} className="animate-bounce-in">
              {newsletterStatus.loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Sending...
                </>
              ) : 'Subscribe'}
            </Button>
          </Form>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default About;