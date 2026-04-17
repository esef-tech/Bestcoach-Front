import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Privacy.css';

const Privacy = () => {
  return (
    <section className="privacy-page">
      <div className="hero-privacy text-white text-center py-5 animate-fade-in">
        <Container>
          <h1 className="display-3 fw-bold mb-3">Privacy Policy</h1>
          <p className="lead">Bestcoach Music – Effective Date: 29 March 2026</p>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="glass-card p-5 mb-5">
              <h2 className="prbs mb-4">1. Introduction</h2>
              <p className='prbs'>We are committed to protecting your privacy in accordance with ISO 27701 and applicable data protection laws.</p>

              <h2 className="prbs mt-5 mb-4">2. Information We Collect</h2>
              <p className='prbs'>Account Data, Profile &amp; Content Data, Usage &amp; Technical Data, Payment Data, Community &amp; Interaction Data.</p>

              <h2 className="prbs mt-5 mb-4">3. How We Use Your Data</h2>
              <p className='prbs'>Providing the Platform, personalizing your experience, processing payments, security, and legal compliance.</p>

              <h2 className="prbs mt-5 mb-4">4. Data Sharing</h2>
              <p className='prbs'>We share data only with Firebase, payment processors, and hosting providers under strict agreements. We never sell your data.</p>

              <h2 className="prbs mt-5 mb-4">5. Your Rights</h2>
              <p className='prbs'>You have the right to access, correct, delete your data, withdraw consent, and more. Email: bestcoachmusic@gmail.com</p>

              <h2 className="prbs mt-5 mb-4">6. Security</h2>
              <p className='prbs'>We implement ISO 27001-aligned controls including encryption, CSRF protection, and regular audits.</p>

              <div className="text-center mt-5">
                <Link to="/" className="btn btn-primary btn-lg">Return to Home</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Privacy;