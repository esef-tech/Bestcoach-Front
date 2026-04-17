import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Terms.css';

const Terms = () => {
  return (
    <section className="terms-page">
      <div className="hero-terms text-white text-center py-5 animate-fade-in">
        <Container>
          <h1 className="display-3 fw-bold mb-3">Terms of Use</h1>
          <p className="lead">Bestcoach Music – Effective Date: 29 March 2026</p>
        </Container>
      </div>

      <Container className="py-5 ">
        <Row className="justify-content-center">
          <Col lg={10}>
            {/* Content from your DOCX */}
            <div className="glass-card p-5 mb-5">
              <h2 className="prbs mb-4">1. Acceptance of Terms</h2>
              <p className='prbs'>By accessing or using Bestcoach Music (the “Platform”), you agree to be bound by these Terms of Use. If you do not agree, you must not use the Platform.</p>

              <h2 className="prbs mt-5 mb-4">2. Eligibility</h2>
              <p className='prbs'>You must be at least 13 years old (or the minimum age in your jurisdiction) to use the Platform.</p>

              <h2 className="prbs mt-5 mb-4">3. User Accounts</h2>
              <p className='prbs'>You are responsible for maintaining the confidentiality of your account credentials.</p>

              <h2 className="prbs mt-5 mb-4">4. User Content &amp; Community Guidelines</h2>
              <p className='prbs'>You retain ownership of content you post. By posting, you grant us a worldwide, non-exclusive, royalty-free license to host, display, and distribute your content.</p>
              <p className='prbs'><strong>Prohibited content includes:</strong> Hate speech, harassment, copyrighted material without permission, spam, malicious code, or any illegal content.</p>

              <h2 className="prbs mt-5 mb-4">5. Intellectual Property</h2>
              <p className='prbs'>All Platform content is owned by Bestcoach Music. You may not copy, modify, or distribute it without permission.</p>

              <h2 className="prbs mt-5 mb-4">6. Subscriptions, Packages &amp; Shop</h2>
              <p className='prbs'>All payments are final and non-refundable except where required by law.</p>

              <h2 className="prbs mt-5 mb-4">7. Termination</h2>
              <p className='prbs'>We may suspend or terminate your account for violations. You may delete your account via settings.</p>

              <h2 className="prbs mt-5 mb-4">8. Disclaimers &amp; Limitation of Liability</h2>
              <p className='prbs'>The Platform is provided “as is”. Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.</p>

              <h2 className="prbs mt-5 mb-4">9. Governing Law</h2>
              <p className='prbs'>These Terms are governed by the laws of Ghana. Disputes shall be resolved in the courts of Accra, Ghana.</p>

              <h2 className="prbs mt-5 mb-4">10. Changes to Terms</h2>
              <p className='prbs'>We may update these Terms. Continued use after changes constitutes acceptance.</p>

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

export default Terms;