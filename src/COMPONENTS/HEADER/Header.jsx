import React from 'react'
import './Header.css'
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
//import Song from '../Images/team/bc-piano-lesson.jpeg'
import Lessons from '../Images/webp/EDDDITED.webp'
//import TSS from '../../COMPONENTS/Images/bestcoach-pictures/TSS_NEW.jpeg'
import TSS from '../../COMPONENTS/Images/webp/TSS_NEW.webp'
import  COACH from  '../../COMPONENTS/Images/webp/Coach.webp'
import TSSSMAIN from '../../COMPONENTS/Images/webp/App.test.webp'
import  PLAY from '../../COMPONENTS/Images/webp/9345.webp'
import  STRINGS from '../../COMPONENTS/Images/webp/playing.webp'



const Header = () => { 

// 5 vibrant music education images from search
  const images = [

    {
      webp: `${TSS}`,
      jpg: 'https://bestcoachmusic.netlify.app/IMAGES/bestcoach-pictures/9345.jpg',
      alt: 'Bestcoach Music - Live Performance'
    },

    {
      webp: `${COACH}`,
      jpg: 'https://mcmusicschool.org/wp-content/uploads/2024/07/PGH51821-1536x1024.jpeg',
      alt: 'Bestcoach Music - Studio Session'
    },

     {
      webp: `${TSSSMAIN}`, 
      jpg: 'https://bestcoachmusic.netlify.app/IMAGES/WhatsApp%20Image%202024-12-27%20at%205.44.48%20PM%20(1).jpeg',
      alt: 'Bestcoach Music - Singers Sanctuary'
    },
    
    {
      webp: `${PLAY}`,
      jpg: 'https://mcmusicschool.org/wp-content/uploads/2024/07/PGH51821-1536x1024.jpeg',
      alt: 'Bestcoach Music - Studio Session'
    },

    {
      webp: `${Lessons}`,
      jpg: 'https://mcmusicschool.org/wp-content/uploads/2024/07/PGH51821-1536x1024.jpeg',
      alt: 'Bestcoach Music - Lesson Session'
    },


    {
      webp: `${STRINGS}`,
      jpg: 'https://mcmusicschool.org/wp-content/uploads/2024/07/PGH51821-1536x1024.jpeg',
      alt: 'Bestcoach Music - String  Lessons  Session'
    },


    { webp: Lessons.replace('.jpeg', '.webp'), jpg: Lessons, alt: 'Bestcoach Music - Piano Lesson' },
    { webp: TSS.replace('.png', '.webp'), jpg: TSS, alt: 'Bestcoach Music - TSS Event' },





      
    
  ];

  return (
    <>

<div className="container-fluid  px-0 px-md-5 mb-5 hero-section" data-os="fade-down" data-aos-duration="1200">
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
          <Col md={6} className="header-text mb-4 mb-md-0" data-aos="fade-right" data-aos-delay="300">
            {/*<h4>Best Coach Music</h4>8*/}
            <h1>Welcome to Bestcoach Music 🎶</h1>
            <p data-aos="fade-up" data-aos-delay="600">
              Unlock your musical potential with us! Join our vibrant community and take your skills to the next level. Whether you're a beginner or a seasoned musician, we have something for everyone. Get started today and let the music flow! 🎸🎤
            </p>
            <Button 
              as="a" 
              href='https://linktr.ee/bestcoach_music'
              variant="light" 
              className="cta-btn"
              data-aos="zoom-in" data-aos-delay="900"
              name='LearMore'
            >
              Learn more
            </Button>
          </Col>
          
          {/* Right: Slider1 
          <Col md={6} data-aos="fade-left" data-aos-delay="400">
            <Carousel fade={true} interval={5000} controls={false} indicators={true} className="hero-carousel" >
              {images.map((img, idx) => (
                <Carousel.Item key={idx}>
                  <img
                    className="d-block w-100 img-fluid carousel-image"
                    src={img}
                    alt={`Bestcoach Music - Slide ${idx + 1}`}
                    width="1200"          
                    height="520"  
                    loading={idx === 0 ? "eager" : "lazy"}
                    fetchPriority={idx === 0 ? "high" : "auto"}

                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          */}
          
      {/* Right Carousel */}
            <Col md={6}>
              <Carousel fade interval={5000} controls={false} indicators={true}>
                {images.map((img, idx) => (
                  <Carousel.Item key={idx}>
                    <picture>
                      <source srcSet={img.webp} type="image/webp" />
                      <img
                        className="d-block w-100 carousel-image"
                        src={img.jpg}
                        alt={img.alt}
                        width="1200"
                        height="520"
                        loading={idx === 0 ? "eager" : "lazy"}
                        fetchPriority={idx === 0 ? "high" : "auto"}
                      />
                    </picture>
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
