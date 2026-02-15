import React, { useState, useEffect, useCallback } from 'react'
import "./Loyalty.css"
import { Container, Row, Col, Button, Image, ListGroup, Card} from 'react-bootstrap';
import { FaUsers, FaHeadset, FaBook, FaQuestionCircle} from 'react-icons/fa';
import BestMethod from  "../.../../../Images/team/bc-main-flier.jpeg"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Arrows for navigation


const Loyalty = () => {

  // Dynamic data for sections (easy to update)
  const benefits = [
    'Secure a new, highly lucrative recurring revenue stream',
    'Continue building your personal brand with a unique offering',
    'Control every aspect of your group (study material, engagement, pricing)',
    'Further strengthen your community presence and reach',
  ];

  const responsibilities = [
    'Work with Bestcoach to build your group (flexible options)',
    'Promote your course to drive subscriptions',
    'Moderate the group and teach students the joy of music',
  ];

  const faqs = [
    { q: 'Are students supported by a teacher?', a: 'Yes – Students receive daily support and encouragement from a real teacher.' },
    { q: 'Are students part of a community?', a: 'Yes – Students are never alone; part of a community of peers.' },
    { q: 'Can students learn at their own pace?', a: 'Yes – Full flexibility to learn on their own time.' },
    { q: 'Is there a supporting platform?', a: 'Yes – Students use an award-winning app to learn, practice, and engage.' },
    { q: 'Is the price affordable?', a: 'Yes – Set your own price (e.g., $40/month) and receive a significant revenue share.' },
  ];

  const lessonTypes = [
    { icon: 'https://www.tonara.com/wp-content/uploads/2021/08/0wFVLpANoYc.webp', title: 'Mentorship Training' },
    { icon: 'https://www.tonara.com/wp-content/uploads/2021/08/OgT83CPGbQI.webp', title: 'Technical Training' },
    { icon: 'https://www.tonara.com/wp-content/uploads/2021/08/OgT83CPGbQI.webp', title: 'Continual Growth  & Development' },
  ];

  const [currentSection, setCurrentSection] = useState(0);
  // Dynamic data for sections (easy to update - each section as object)
  const sections = [
    {

      // Hero section with image background and clear call to action
      content: (
        <div className="hero bg-primary text-white text-center py-5 animate-fade-in">
          {/*<Image src="https://www.tonara.com/wp-content/uploads/2021/08/Header-image.svg" alt="Ambassador Header Image" fluid className="header-image mb-4 animate-zoom-in" />*/}
          <h1 className="display-3 fw-bold mb-3">Join the Bestcoach Loyalty Ambassador Program</h1>
          <p className="lead text-orange text-bg-secondary mb-5">Influence through education, continue building your personal brand, and enjoy an amazing new revenue stream!</p>
          <Button variant="light" size="lg" href="mailto:support@bestcoachmusic.com?subject=Ambassador Program Inquiry&body=I'd like to schedule a call about the Ambassador Program." className="animate-bounce-in">Schedule A Call</Button>
        </div>
      ),
    },
    {

      // Clear value proposition with dynamic placeholders for potential earnings (can be made dynamic with backend data)
      content: (
        <Container className="py-5 text-center animate-slide-up">
          <h2 className="mb-4 text-primary">What can you earn from our Loaylty Ambassador  Program?</h2>
          <p className="lead mb-5">Your potential recurring earnings will be based on the pricing YOU choose to set for the course.</p>
          <Row className="justify-content-center">
            <Col md={4} className="mb-4">
              <Card className="shadow p-4">
                <h3>Students: 0</h3> {/* Placeholder - make dynamic if backend connected */}
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="shadow p-4">
                <h3>Per month: 0</h3> {/* Placeholder */}
              </Card>
            </Col>
          </Row>
          <Button variant="light" size="lg" href="mailto:support@bestcoachmusic.com?subject=Ambassador Program Inquiry&body=I'd like to schedule a call about the Ambassador Program." className="mt-4 animate-bounce-in">Schedule A Call</Button>
        </Container>
      ),
    },
    {
      // Clear explanation of the program with engaging icons and a call to action
      content: (
        <Container className="py-5 bg-light">
          <Row className="align-items-center section-equal">
            <Col md={6} className="animate-zoom-in">
              <Image src="https://www.tonara.com/wp-content/uploads/2021/08/0wFVLpANoYc.webp" alt="Learning Groups" fluid className="rounded shadow section-image" />
            </Col>
            <Col md={6} className="animate-fade-in">
              <h2 className="mb-4 text-primary">What are Bestcoach Loyalty Ambassador  Groups?</h2>
              <p className="lead mb-4">Subscription-based, study communities led by real musicians, allowing students to learn at their own pace and time.</p>
              <ListGroup variant="flush" className="mb-5">
                {['Engaging online course materials (self-paced)', 'Interactive group chats with teacher and peers', 'Periodic live lessons and activities (challenges, competitions)', 'Progress tracking, practice stats, achievements, and rewards'].map((feature, idx) => (
                  <ListGroup.Item key={idx} className="border-0 animate-fade-in dynamic-hover" style={{ animationDelay: `${0.2 * idx}s` }}>
                    <FaHeadset className="text-orange me-2" size={24}  /> {feature}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="text-center text-md-start">
                <Button variant="light" size="lg" href="mailto:support@bestcoachmusic.com?subject=Ambassador Program Inquiry&body=I'd like to schedule a call about the Ambassador Program." className="animate-bounce-in">Schedule A Call</Button>
              </div>
            </Col>
          </Row>
        </Container>
      ),
    },
    {
      // Clear benefits section with engaging icons and a call to action
      content: (
        <Container className="py-5">
          <Row className="align-items-center section-equal">
            <Col md={6} className="animate-zoom-in">
              <Image src="https://www.tonara.com/wp-content/uploads/2021/08/dW6dFBoHUu4.webp" alt="Benefits" fluid className="rounded shadow section-image" />
            </Col>
            <Col md={6} className="animate-fade-in">
              <h2 className="mb-4 text-primary">What’s in it for me?</h2>
              <p className="lead mb-4">Build and grow  your influence with your church music department  through our Loyalty Ambassador music program.</p>
              <ListGroup variant="flush" className="mb-5">
                {benefits.map((benefit, idx) => (
                  <ListGroup.Item key={idx} className="border-0 animate-fade-in dynamic-hover" style={{ animationDelay: `${0.2 * idx}s` }}>
                    <FaUsers className="text-orange me-2" size={24}/> {benefit}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="text-center text-md-start">
                <Button variant="light" size="lg" href="mailto:support@bestcoachmusic.com?subject=Ambassador Program Inquiry&body=I'd like to schedule a call about the Ambassador Program." className="animate-bounce-in">Schedule A Call</Button>
              </div>
            </Col>
          </Row>
        </Container>
      ),
    },
    {
      // Clear responsibilities section with engaging icons and a call to action
      content: (
        <Container className="py-5 bg-light">
          <Row className="align-items-center section-equal">
            <Col md={6} className="animate-zoom-in">
              <Image src="https://www.tonara.com/wp-content/uploads/2021/08/OgT83CPGbQI.webp" alt="Role" fluid className="rounded shadow section-image" />
            </Col>
            <Col md={6} className="animate-fade-in">
              <h2 className="mb-4 text-primary">What do I need to do?</h2>
              <p className="lead mb-4">As a partner, you can create your unique learning group.</p>
              <ListGroup variant="flush" className="mb-5">
                {responsibilities.map((resp, idx) => (
                  <ListGroup.Item key={idx} className="border-0 animate-fade-in dynamic-hover" style={{ animationDelay: `${0.2 * idx}s` }}>
                    <FaBook className="text-orange me-2" size={24}  /> {resp}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="text-center text-md-start">
                <Button variant="light" size="lg" href="mailto:support@bestcoachmusic.com?subject=Ambassador Program Inquiry&body=I'd like to schedule a call about the Ambassador Program." className="animate-bounce-in">Schedule A Call</Button>
              </div>
            </Col>
          </Row>
        </Container>
      ),
    },
    {
      // Clear FAQ section with engaging icons and a call to action
      content: (
        <Container className="py-5">
          <Row className="align-items-center section-equal">
            <Col md={6} className="animate-zoom-in">
              <Image src={BestMethod} alt="Student Benefits" fluid className="rounded shadow section-image" />
            </Col>
            <Col md={6} className="animate-fade-in">
              <h2 className="mb-4 text-primary">What else do Bestcoach Learning Groups offer students?</h2>
              <Row className="justify-content-center mb-5">
                {lessonTypes.map((type, idx) => (
                  <Col md={4} key={idx} className="text-center mb-4 animate-zoom-in" style={{ animationDelay: `${0.2 * idx}s` }}>
                    <Image src={type.icon} alt={type.title} fluid className="mb-2" style={{ maxWidth: '100px' }} />
                    <p className="fw-bold">{type.title}</p>
                  </Col>
                ))}
              </Row>
              <ListGroup variant="flush" className="mb-5">
                {faqs.map((faq, idx) => (
                  <ListGroup.Item key={idx} className="border-0 d-flex justify-content-between animate-fade-in dynamic-hover" style={{ animationDelay: `${0.2 * idx}s` }}>
                    <span className="fw-bold"><FaQuestionCircle className="text-orange me-2" size={24}  /> {faq.q}</span>
                    <span className="text-success">{faq.a}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="text-center text-md-start">
                <Button variant="light" size="lg" href="mailto:support@bestcoachmusic.com?subject=Ambassador Program Inquiry&body=I'd like to schedule a call about the Ambassador Program." className="animate-bounce-in">Schedule A Call</Button>
              </div>
            </Col>
          </Row>
        </Container>
      ),
    },
  ];


     const handlePrev = useCallback(() => {
    setCurrentSection((prev) => {
      if (prev > 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const handleNext = useCallback(() => {
    setCurrentSection((prev) => {
      if (prev < sections.length - 1) {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
        return prev + 1;
      }
      return prev;
    });
  }, [sections.length]);

  // Auto-advance (timely - every 10s)
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 10000); // 10 seconds
    return () => clearInterval(timer);
  }, [handleNext]); // Fixed deps - use memoized handleNext

   
  return (
    
    <React.Fragment>
      <section className="loyalty-ambassador-page">
      {sections[currentSection].content}

      {/* Navigation Arrows */}
      <div className="navigation text-center py-3 bg-light">
        <Button variant="light" onClick={handlePrev} disabled={currentSection === 0} className="me-3 animate-bounce-in">
          <FaArrowLeft className="text-orange me-2" size={24}/> Back
        </Button>
        <Button variant="light" onClick={handleNext} disabled={currentSection === sections.length - 1} className="animate-bounce-in">
          Next <FaArrowRight className="text-orange me-2" size={24}/>
        </Button>
      </div>
    </section>
      
    </React.Fragment>
  )
}

export default Loyalty
