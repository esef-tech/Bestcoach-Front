import React, {useEffect}from 'react'
import './Webinar.css'
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { FaCalendarAlt, FaPlayCircle } from 'react-icons/fa'; // Icons for date and play
import Seo from '../../Seo'
import {useSession} from '../../../context/SessionContext'

const Webinar = () => {


  const { session, savePreferences, getPreferences } = useSession();
  useEffect(() => {
    if (session) {
      savePreferences({ ...getPreferences(), lastPage: '/webinars' });
    }
  }, [session, savePreferences, getPreferences]);




  // Dynamic webinars array (from analyzed Tonara data - easy to update/add)
  const webinars = [
    {
      title: 'Mid-Year Practice Boost',
      date: '02.15.2021',
      presenter: 'Jennifer Foxx, Music Educator Resources',
      description: 'Webinar replay on practice boost strategies.',
      image: 'https://www.tonara.com/wp-content/uploads/2021/02/Mid-Year-Practice-Boost3_2-1.png',
      link: 'https://event.webinarjam.com/go/replay/56/3v478un2iygikvc5',
    },
    {
      title: 'What a Pandemic Can Teach us About Music Practice',
      date: '08.13.2020',
      presenter: 'Leila Viss, 88 Piano Keys',
      description: 'Webinar on lessons from pandemic for music practice.',
      image: 'https://www.tonara.com/wp-content/uploads/2020/08/Leila-viss-webinar-blog-banner-FB.png',
      link: 'https://event.webinarjam.com/register/12/vym9obw',
    },
    {
      title: 'Promoting Your Online Music Studio',
      date: '06.10.2020',
      presenter: 'Carly Walton, Teach Music Online',
      description: 'Webinar on promoting online music studios.',
      image: 'https://www.tonara.com/wp-content/uploads/2020/06/Carlycarareplay.png',
      link: 'https://event.webinarjam.com/register/3/wy608b7',
    },
    {
      title: 'Strategies for Teaching Online & Managing Your Studio',
      date: '04.02.2020',
      presenter: 'Beth Horton, Creative Education Specialist',
      description: 'Webinar on online teaching strategies and studio management.',
      image: 'https://www.tonara.com/wp-content/uploads/2020/06/Beth-Webinar3.png',
      link: 'https://event.webinarjam.com/channel/Tonara',
    },
  ];



  return (
    <React.Fragment>

      <Seo 
  title="Live Webinars | Bestcoach Music Vocal Masterclasses"
  description="Join live webinars and masterclasses with top vocal coaches. Learn breath control, performance skills, audition prep, and more – all in real time."
  keywords="bestcoach webinars, vocal masterclasses, live singing webinars, online vocal workshops"
  image="https://tonara.com/wp-content/themes/tonara/img/press/company_tonara_press.jpg"
/>

      <section className="webinars-page">
      {/* Header */}
      <div className="header-webinar text-white text-center py-5 animate-fade-in">
        <h1 className="display-3 fw-bold">Bestcoach Webinars</h1>
        <p className="lead">By Teachers, For Teachers</p>
        <p className="intro-text">As a part of our mission to move music education forward, we want to provide resources to our teaching community by our teaching community. Check out our available webinar replays below!</p>
      </div>

      {/* Webinars List */}
      <Container className="py-5">
        <Row className="justify-content-center">
          {webinars.map((webinar, idx) => (
            <Col lg={8} md={10} key={idx} className="mb-5 animate-slide-up" style={{ animationDelay: `${0.2 * idx}s` }}>
              <Card className="shadow border-0">
                <Image src={webinar.image} alt={webinar.title} fluid className="card-img-top rounded-top animate-zoom-in" />
                <Card.Body>
                  <h3 className="text-orange mb-3">{webinar.title}</h3>
                  <div className="text-muted mb-3">
                    <FaCalendarAlt className="me-2" /> {webinar.date}
                  </div>
                  <p className="text-muted mb-3">Presenter: {webinar.presenter}</p>
                  <p className="lead mb-4">{webinar.description}</p>
                  <Button variant="primary" href={webinar.link} target="_blank" rel="noopener noreferrer" className="btn-watch animate-bounce-in">
                    <FaPlayCircle className="me-2" /> Watch Replay
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
      
    </React.Fragment>
  )
}

export default Webinar
