import React from 'react'
import './Header.css'
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
//import Song from '../Images/team/bc-piano-lesson.jpeg'
import Lessons from '../Images/team/EDDDITED.jpeg'
import TSS from '../Images/team/tss_tss_new.png'



const Header = () => { 

// 5 vibrant music education images from search
  const images = [
        
        'https://bestcoachmusic.netlify.app/IMAGES/WhatsApp%20Image%202024-12-27%20at%205.44.48%20PM%20(1).jpeg',
        'https://bestcoachmusic.netlify.app/IMAGES/bestcoach-pictures/9345.jpg',
        'https://mcmusicschool.org/wp-content/uploads/2024/07/PGH51821-1536x1024.jpeg',
        `${Lessons}`,
        `${TSS}`,
    

    
    
  ];

  return (
    <>

<div className="container-fluid  px-0 px-md-5 mb-5 hero-section">
      {/* Animation Background */}
      <div className="animation-container">
        <span className="music-symbol">♪</span>
        <span className="music-symbol">♫</span>
        <span className="music-symbol">♬</span>
        <span className="music-symbol">♪</span>
        <span className="music-symbol">♫</span>
        <span className="music-symbol">♬</span>
        <span className="music-symbol">♪</span>
        <span className="music-symbol">♫</span>
      </div>



   <section className="header-section">
      <Container>
        <Row className="align-items-center">
          {/* Left: Text */}
          <Col md={6} className="header-text mb-4 mb-md-0">
            <h4>Best Coach Music</h4>
            <h1>Welcome to Bestcoach Music 🎶</h1>
            <p>
              Unlock your musical potential with us! Join our vibrant community and take your skills to the next level. Whether you're a beginner or a seasoned musician, we have something for everyone. Get started today and let the music flow! 🎸🎤
            </p>
            <Button 
              as="a" 
              href='https://linktr.ee/bestcoach_music'
              smooth={true} 
              duration={500} 
              variant="light" 
              className="cta-btn"
            >
              Learn more
            </Button>
          </Col>
          
          {/* Right: Slider */}
          <Col md={6}>
            <Carousel fade={true} interval={5000} controls={false} indicators={true}>
              {images.map((img, idx) => (
                <Carousel.Item key={idx}>
                  <img
                    className="d-block w-100 img-fluid"
                    src={img}
                    alt={`Music education slide ${idx + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          
        </Row>
      </Container>
    </section>
    </div>
    </>
  )
}

export default Header
