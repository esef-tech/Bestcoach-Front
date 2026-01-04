import React from 'react'
import './Header.css'
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';



const Header = () => {

// 5 vibrant music education images from search
  const images = [
    'https://thumbs.dreamstime.com/b/enthusiastic-young-music-teacher-leads-his-diverse-student-orchestra-vibrant-classroom-filled-colorful-instruments-399131937.jpg',
    'https://thumbs.dreamstime.com/b/music-teacher-giving-violin-lesson-to-young-child-student-vector-design-generative-ai-heartwarming-illustration-patiently-392976173.jpg',
    'https://thumbs.dreamstime.com/b/little-girls-singing-song-teacher-plating-piano-isolated-white-woman-kids-cartoon-chorus-people-characters-music-education-188732307.jpg',
    'https://thumbs.dreamstime.com/b/school-music-female-teacher-audience-class-concept-vector-illustration-69929922.jpg',
    'https://mcmusicschool.org/wp-content/uploads/2024/07/PGH51821-1536x1024.jpeg',
  ];

  return (
    <>

<div className="container-fluid bg-primary px-0 px-md-5 mb-5 hero-section">
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



   <section className="header-section bg-primary">
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
