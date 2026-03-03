import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button,  ListGroup, Image, Accordion, Modal} from 'react-bootstrap';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt, FaUsers,   FaCar, FaBus, FaBicycle, FaWalking } from 'react-icons/fa';

import './TSS.css'


const TSS = () => {
    

  const [showMapModal, setShowMapModal] = useState(false);
  const [showDirectionsModal, setShowDirectionsModal] = useState(false);
  const [selectedMode, setSelectedMode] = useState('driving'); // Default mode
  const [origin, setOrigin] = useState('');
  const [directionsUrl, setDirectionsUrl] = useState('');


  const lineup = [
    { name: 'Joe Mettle', image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1174463335%2F1406041452053%2F1%2Foriginal.jpg?h=294&w=294&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C640%2C640&s=e7bb3d730baceb2df9010a3147f2974a' },
    { name: 'Noble G', image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1174463360%2F1406041452053%2F1%2Foriginal.jpg?h=294&w=294&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C640%2C640&s=2a248049d7d34dcd2288c4d87cd7b3e0' },
    { name: 'Sandra Boakye-Duah', image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1174463400%2F1406041452053%2F1%2Foriginal.jpg?h=294&w=294&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C640%2C640&s=f2a4bf70d90b93165c0a96cd7406f3ae' },
    { name: 'Nana Yaw Apare', image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1174463836%2F1406041452053%2F1%2Foriginal.20260110-000930?h=294&w=294&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C150%2C150&s=717519cc96ed9ab5b8f940345751a04b' },
  ];

  const agenda = [
    { time: '10:30 AM - 10:50 AM', activity: 'Live Music & Practical Sessions', speaker: 'MD Nana Yaw Apare', image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1174463836%2F1406041452053%2F1%2Foriginal.20260110-000930?h=294&w=294&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C150%2C150&s=717519cc96ed9ab5b8f940345751a04b' },
    { time: '10:50 AM - 11:50 AM', activity: 'TSS Introduction & Ministration', speaker: 'Minister Joe Mettle', image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1174463335%2F1406041452053%2F1%2Foriginal.jpg?h=294&w=294&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C640%2C640&s=e7bb3d730baceb2df9010a3147f2974a' },
    { time: '12:30 PM - 1:00 PM', activity: 'Music  Ministration & Vocal Mentorship', speaker: 'Minister Sandra Boakye Duah', image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1174463400%2F1406041452053%2F1%2Foriginal.jpg?h=294&w=294&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C640%2C640&s=f2a4bf70d90b93165c0a96cd7406f3ae' },
    { time: '1: 00PM -  2:00 PM', activity: 'Music Theory & Ministration', speaker: 'Minister Noble G', image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1174463360%2F1406041452053%2F1%2Foriginal.jpg?h=294&w=294&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C640%2C640&s=2a248049d7d34dcd2288c4d87cd7b3e0' },
    
];

  const faqs = [
    { question: 'When is The TSS Event?', answer: 'Sat, Apr 18, 2026 at 10:00 AM.' },
    { question: 'Is The TSS free?', answer: 'No, tickets are from GH₵ 350.00' },
    { question: 'How much do I need to pay for TSS?', answer: 'Ticket price is GH₵ 350.00  per person.' },
    { question: 'What is The TSS?', answer: 'A vocal workshop for gospel singers seeking growth.' },
  ];

// Dynamic event data (can fetch from backend /api/events)
  const event = {
    title: 'The Singers Sanctuary (TSS)',
    description: 'THE SINGERS SANCTUARY is a carefully curated vocal mentorship and artistic development experience designed to NURTURE, REFINE, and EMPOWER SINGERS across churches, music ministries, and the creative space.nnCreated by BEST COACH MUSIC, the programme exists to address a growing gap in the music and worship ecosystem: talented singers with passion, but without clarity, healthy technique, or access to intentional mentorship. nnThe Singer’s Sanctuary is not a concert, talent show, or performance showcase. nIt is a transformation-focused learning environment where singers gain insight, skill, direction, and spiritual grounding for long-term vocal and artistic growth.nnTHE SINGERS SANCTUARY - FINDING THE VOICE THAT FINDS YOU BACK ',
    date: 'Sat, Apr 18, 2026',
    time: '10:00 AM',
    duration: '4 hours',
    location: 'Word Temple Assemblies of God Church , GPWG+9RG, Accra, Greater Accra Region 0023 Ghana',
    organizer: 'BEST COACH MUSIC',
    ticketPrice: ' from GH₵ 150.00',
    ageRestriction: 'Ages 12+',
    parking: 'Free parking',
    doorsOpen: '8:00 AM',
    refundPolicy: 'Refunds up to 7 days before event',
    category: 'Music, Singer/Songwriter',
    mapIframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.1421523060635!2d-0.2754977242975032!3d5.545931633749404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9790ccb546c7%3A0xc3c829323923c9f8!2sWord%20Temple%2C%20Assemblies%20of%20God%20Church!5e0!3m2!1sen!2sgh!4v1769994147843!5m2!1sen!2sgh" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    image: 'https://ayatickets.com/uploads/events/38b12fb62f96ce87f902d9fb8bd96dee.jpg', //  music workshop image
    agenda: [
      { time: '10:00 AM - 10:50 AM', activity: 'TSS Introduction & Ministration by Minister Joe Mettle' },
      { time: '10:50 AM  12:00 PM', activity: 'Live Music & Practical Sessions by MD Nana Yaw Ampare' },
      { time: '12:30 PM - 1:00 PM', activity: 'Music  Ministration & Vocal Mentorship by Minister Sandra Boakye Duah' },
       { time: '12:30 PM - 1:00 PM', activity: 'Music Theory & Ministration by Minister Noble G' }
    ],
  };

  const handleShowDirections = (mode) => {
    setSelectedMode(mode);
    setShowDirectionsModal(true);
  };

  const handleGetDirections = (e) => {
    e.preventDefault();
    const destination = encodeURIComponent(event.location);
    const directionsMode = selectedMode.toLowerCase();
    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${destination}&travelmode=${directionsMode}`;
    setDirectionsUrl(url);
  };
    
  

  return (
<React.Fragment>
  
<section className="events-tss-page">
      {/* Header */}
      <div className="header text-white text-center py-5 animate-fade-in">
        <h1 className="display-3 fw-bold">{event.title}</h1>
        <p className="lead-1">A gathering for voices with purpose</p>
      </div>

      {/* Main Content */}
      <Container className="py-5">
        <Row className="align-items-center mb-5 animate-slide-up">
          <Col lg={6}>
            <Image src={event.image} alt={event.title} fluid className="rounded shadow animate-zoom-in" />
          </Col>
          <Col lg={6}>
            <h2 className="mb-4 text-orange">Event Description</h2>
            <p className="lead-p">{event.description}</p>
          </Col>
        </Row>

        {/* Details */}
        <h2 className="text-center mb-5 text-orange">Event Details</h2>
        <Row className="text-center mb-5">
          <Col md={3} className="mb-4 animate-fade-in">
            <FaCalendarAlt size={50} className="text-orange mb-3" />
            <h4>Date</h4>
            <p>{event.date}</p>
          </Col>
          <Col md={3} className="mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <FaClock size={50} className="text-orange mb-3" />
            <h4>Time</h4>
            <p>{event.time} ({event.duration})</p>
          </Col>
          <Col md={3} className="mb-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <FaMapMarkerAlt size={50} className="text-orange mb-3" />
            <h4>Location</h4>
            <p>{event.location}</p>
          </Col>
          <Col md={3} className="mb-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <FaTicketAlt size={50} className="text-orange mb-3" />
            <h4>Ticket</h4>
            <p>{event.ticketPrice}</p>
          </Col>
        </Row>

        {/* Agenda - Use ListGroup instead of Timeline */}
        <h2 className="text-center mb-5 text-orange">Agenda</h2>
        <ListGroup variant="flush">
          {event.agenda.map((item, idx) => (
            <ListGroup.Item key={idx} className="d-flex align-items-center animate-slide-up" style={{ animationDelay: `${0.2 * idx}s` }}>
              <div className="me-3 text-orange fw-bold">{item.time}</div>
              <div>{item.activity}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>

      </Container>
    </section>
    <section className="events-tss-page">
      {/* Overview */}
      <Container className="py-5 animate-fade-in">
        {/*<h2 className="mb-3 text-dark">Overview</h2>
        <p className="lead mb-4 animate-slide-up">{event.description}</p>*/}

        <h3 className="mb-3 text-dark">The Singers Sanctuary</h3>
        <p className="mb-4 animate-slide-up">A gathering for voices with purpose. Before the spotlight... Before the stage .... There must be a sanctuary.</p>

        <p className="text-muted mb-4 animate-slide-up">Presented by BEST COACH MUSIC</p>

        <p className="text-muted mb-5 animate-slide-up">Category: Music, Singer/Songwriter</p>

        {/* Lineup */}
        <h2 className="mb-3 text-dark">Lineup</h2>
        <Accordion defaultActiveKey="0" className="mb-5">
          {lineup.map((person, idx) => (
            <Accordion.Item eventKey={idx.toString()} key={idx} className="animate-slide-up" style={{ animationDelay: `${0.2 * idx}s` }}>
              <Accordion.Header>
                <Image src={person.image} roundedCircle width={40} height={40} className="me-3" />
                {person.name}
              </Accordion.Header>
              <Accordion.Body>
                {/* Add bio if available */}
                <p>Bio for {person.name} coming soon.</p>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>

        {/* Good to Know */}
        <h2 className="mb-3 text-dark">Good to Know</h2>
        <Row className="mb-5">
          <Col md={6} className="animate-fade-in">
            <ul className="list-unstyled">
              <li><FaClock className="me-2 text-purple" /> 4 hours</li>
              <li><FaUsers className="me-2 text-purple" /> Ages 12+</li>
              <li><FaTicketAlt className="me-2 text-purple" /> Free parking</li>
              <li><FaCalendarAlt className="me-2 text-purple" /> Doors at 8:00AM</li>
            </ul>
          </Col>
          <Col md={6} className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p>Refund Policy</p>
            <p className="text-muted">Refunds up to 7 days before event</p>
          </Col>
        </Row>

        {/* Location */}
        <h2 className="mb-3 text-dark">Location</h2>
        <p className="mb-2 animate-slide-up">Word Temple, Assemblies of God Church, Accra Ghana </p>
        <p className="text-muted mb-4 animate-slide-up">GPWG+9RG, Accra, Greater Accra Region 0023 Ghana</p>
       <Button variant="light" onClick={() => setShowMapModal(true)} className="mb-5 animate-bounce-in">Show map</Button>

        {/* How to Get There */}
        <h3 className="mb-3 text-dark">How do you want to get there?</h3>
        <ul className="list-unstyled mb-5">
          <li className="mb-2 animate-slide-up cursor-pointer" onClick={() => handleShowDirections('driving')}><FaCar className="me-2 text-purple" /> Driving</li>
          <li className="mb-2 animate-slide-up cursor-pointer" onClick={() => handleShowDirections('transit')}><FaBus className="me-2 text-purple" /> Public transit</li>
          <li className="mb-2 animate-slide-up cursor-pointer" onClick={() => handleShowDirections('bicycling')}><FaBicycle className="me-2 text-purple" /> Biking</li>
          <li className="animate-slide-up cursor-pointer" onClick={() => handleShowDirections('walking')}><FaWalking className="me-2 text-purple" /> Walking</li>
        </ul>

        {/* Agenda */}
        <h2 className="mb-3 text-dark">Agenda</h2>
        <Accordion defaultActiveKey="0" className="mb-5">
          {agenda.map((item, idx) => (
            <Accordion.Item eventKey={idx.toString()} key={idx} className="animate-slide-up" style={{ animationDelay: `${0.2 * idx}s` }}>
              <Accordion.Header>
                <Image src={item.image} roundedCircle width={40} height={40} className="me-3" /> {/* Add speaker image */}
                {item.time} {item.activity}
              </Accordion.Header>
              <Accordion.Body>
                <p>Details for {item.activity} by {item.speaker}.</p>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
        {/*<Button variant="link" className="d-block mx-auto mb-5 animate-fade-in">Show all agenda</Button>*/}

        {/* RSVP / Buy Ticket Iframe */}
        <h2 className="mb-3 text-dark"> Buy Ticket / Register for TSS</h2>
         {/* Register Button */}
        <div className="text-center mt-5">
          <Button style={{ backgroundColor: '#fd7e14', borderColor: '#fd7e14' }} href="https://creion.app/events/the-singers-sanctuary-tss-yj0vo" target="_blank" rel="noopener noreferrer" className="px-5 py-3 fs-5 animate-bounce-in">
            Get Tickets Now
          </Button>
        </div>
  
        {/*<iframe 
        title='TSS-MAP'
          src="https://ayatickets.com/embed/event/the-singers-sanctuary" 
          width="100%" 
          height="720" 
          style={{ border: '1px solid #ddd', borderRadius: '12px' }} 
          className="mb-5 animate-zoom-in"
        ></iframe>*/}

        {/* FAQ */}
        <h2 className="mb-3 text-dark">Frequently asked questions</h2>
        <Accordion defaultActiveKey="0" className="mb-5">
          {faqs.map((faq, idx) => (
            <Accordion.Item eventKey={idx.toString()} key={idx} className="animate-slide-up" style={{ animationDelay: `${0.2 * idx}s` }}>
              <Accordion.Header>{faq.question}</Accordion.Header>
              <Accordion.Body>{faq.answer}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>


        {/* Register Button 
        <div className="text-center mt-5">
          <Button style={{ backgroundColor: '#fd7e14', borderColor: '#fd7e14' }} href="https://www.eventbrite.com/e/the-singers-sanctuary-tickets-1980234197792?aff=oddtdtcreator" target="_blank" rel="noopener noreferrer" className="px-5 py-3 fs-5 animate-bounce-in">
            Register for TSS Event
          </Button>
        </div>*/}
  
        {/* Organized By */}
        <h2 className="mb-3 text-dark">Organized by</h2>
        <Card className="text-center p-3 bg-light shadow animate-fade-in">
          <Image src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1174469023%2F1406041452053%2F1%2Foriginal.20260110-015414?w=150&auto=format%2Ccompress&q=75&sharp=10&s=f476a473682fa3e2cc6a3f202a5e2666" roundedCircle width={60} height={60} className="mx-auto mb-3" />
          <h4>BEST COACH MUSIC</h4>
          <p className="text-mutEvented">Followers: 1.2k | Hosting: Events</p>
          <Button style={{ backgroundColor: '#17a2b8', borderColor: '#17a2b8' }} className="me-2">Contact</Button>
          <Button  style={{ backgroundColor: '#fd7e14', borderColor: '#fd7e14' }}>Follow</Button>
        </Card>
       {/* Map Modal - Fixed to display map */}
      <Modal show={showMapModal} onHide={() => setShowMapModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Event Location Map</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div dangerouslySetInnerHTML={{ __html: event.mapIframe }} className="map-iframe" />
        </Modal.Body>
      </Modal>

      {/* Directions Modal */}
      <Modal show={showDirectionsModal} onHide={() => setShowDirectionsModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Get Directions ({selectedMode})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleGetDirections}>
            <Form.Group className="mb-3">
              <Form.Label>Enter your location</Form.Label>
              <Form.Control value={origin} onChange={(e) => setOrigin(e.target.value)} required placeholder="Your starting address" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">Get Directions</Button>
          </Form>
          {directionsUrl && (
            <iframe title='TSS-MAP' src={directionsUrl} width="100%" height="400" className="mt-3" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          )}
        </Modal.Body>
      </Modal>
      </Container>
    </section>
</React.Fragment>
  )
}

export default TSS
