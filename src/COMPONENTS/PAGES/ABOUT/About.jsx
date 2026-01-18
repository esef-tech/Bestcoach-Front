import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './About.css'
import about from './../../Images/team/24.jpg'
import featureImage from './../../Images/team/WhatsApp Image 2024-12-27 at 5.44.48 PM (1).jpeg'


const About = () => {
    // Dynamic data for features (easy to update/add)
  const features = [
    { text: 'Best Coach Music, a BCSE-CENTRE subsidiary, excels in music education and student development.' },
    { text: 'Best Coach Music nurtures musicians with a comprehensive curriculum and personalized instruction.' },
    { text: 'Best Coach Music excels in music education.' },
  ];


  return (
    <>
      <section className="about-page">
      {/* Header */}
      <div className="header bg-primary text-white text-center py-5 animate-fade-in">
        <h1 className="display-3 fw-bold">About Us</h1>
        <div className="d-inline-flex breadcrumb">
          <p className="m-0"><Link to="/https://bestcoach-front.vercel.app/" className="text-white">Home</Link></p>
          <p className="m-0 px-2">/</p>
          <p className="m-0">About Us</p>
        </div>
      </div>

      {/* About Section */}
      <Container className="py-5">
        <Row className="align-items-center">
          <Col lg={5} className="mb-5 mb-lg-0 animate-slide-left">
            <img src={about} alt="About-pic" className="img-fluid rounded shadow-lg animate-zoom-in" />
          </Col>
          <Col lg={7} className="animate-slide-right">
            <p className="section-title pr-5 mb-2"><span className="pr-2">Learn About Us</span></p>
            <h1 className="mb-4 fw-bold">Bestcoach Music</h1>
            <p className="lead mb-4">BCM empowers students with musical skills that provide a means of survival and success, promoting personal growth and well-being, and supporting them in times of uncertainty.</p>
            <Row className="pt-2 pb-4">
              <Col xs={6} md={4} className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <img src={featureImage} alt="Feature-pic" className="img-fluid rounded shadow animate-zoom-in" />
              </Col>
              <Col xs={6} md={8}>
                <ul className="list-inline m-0">
                  {features.map((feature, idx) => (
                    <li key={idx} className="py-2 border-top border-bottom animate-slide-up" style={{ animationDelay: `${0.1 * (idx + 1)}s` }}>
                      <i className="fa fa-check text-primary me-3"></i> {feature.text}
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
            <Link to="#" className="btn btn-primary mt-2 py-2 px-4 animate-bounce-in">Learn More</Link>
          </Col>
        </Row>
      </Container>
    </section>

    </>
  )
}

export default About
