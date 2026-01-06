import React from 'react'
import './Services.css'
import { Container, Row, Col } from 'react-bootstrap';
import { FiMusic, FiHeadphones } from 'react-icons/fi'; // Feather icons
import { FaDrum, FaGuitar, FaTools, FaMicrophoneAlt } from 'react-icons/fa'; // Font Awesome
const Services = () => {

// Service data 
  const services = [
    {
      emoji: '🎹',
      title: 'Piano',
      desc: 'Enroll in our piano course today and unlock your musical potential!',
    },
    {
      emoji: '🥁',
      title: 'Drums',
      desc: 'Join our drum course today and unleash your inner rhythm and talent!',
    },
    {
      emoji: '🎸',
      title: 'Guitar',
      desc: 'Join our guitar course today and master the art of playing!',
    },
    {
      emoji: '🎶',
      title: 'Instrument Repairs',
      desc: 'Join our instrument repairs course today and master the art of fixing musical instruments!',
    },
    {
      emoji: '🎧',
      title: 'Sound Engineering',
      desc: 'Join our sound engineering course today and master the art of audio production and engineering!',
    },
    {
      emoji: '🎶',
      title: 'Instrumental Rental',
      desc: 'Join our instrumental rental service today and access top-quality musical instruments for your needs!',
    },
  ];

  // Colorful icons for background animation
  const musicIcons = [
    <FiMusic className="music-icon" />,
    <FaDrum className="music-icon" />,
    <FaGuitar className="music-icon" />,
    <FaTools className="music-icon" />, // For repairs
    <FiHeadphones className="music-icon" />,
    <FaMicrophoneAlt className="music-icon" />,
  ];

  return (

<section id="services" className="services-section bg-light pt-5 position-relative">
      {/* Background Animation with Icons */}
      <div className="animation-container">
        {musicIcons.map((Icon, idx) => (
          <div
            key={idx}
            className="music-icon-wrapper"
            style={{ animationDelay: `${idx * 2}s` }} // Staggered start
          >
            {Icon}
          </div>
        ))}
      </div>

      <Container className="pb-3">
        <Row>
          {services.map((service, idx) => (
            <Col lg={4} md={6} className="pb-1" key={idx}>
              <div className="d-flex bg-white shadow-sm border-top rounded mb-4 service-card h-100" style={{ padding: '30px' }}>
                <span className="h1 font-weight-normal text-primary mb-3">{service.emoji}</span>
                <div className="pl-4">
                  <h4>{service.title}</h4>
                  <p className="m-0">{service.desc}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>

    
  )
}

export default Services
