import React, {useState} from 'react'
import "./Coaches.css"
import { Container, Row, Col, Card, Form, Button, Image, Badge } from 'react-bootstrap';
import { FaSearch, FaMusic, FaMicrophoneAlt, FaGuitar, FaDrum, FaKeyboard,FaWind } from 'react-icons/fa';
import CoachMan from "../../Images/team/WhatsApp Image 2024-12-27 at 5.44.48 PM (1).jpeg";



const Coaches = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState('all');
  
  // Dynamic coaches array (expandable, based on  - name, photo, specialty, bio, featured)
  const coaches = [
    {
      name: 'Emmanuel Ameko',
      specialty: 'Piano',
      bio: '19 years teaching experience. Classical to popular styles. Known for viral lessons on emotion and technique.',
      image: `${CoachMan}`,
      featured: true,
      instrument: 'piano',
    },
    {
      name: 'Kevin Castro',
      specialty: 'Singing',
      bio: 'Contemporary jazz specialist. Synth for pop/rock. Creative improviser.',
      image: 'https://example.com/kevin-castro.jpg',
      featured: false,
      instrument: 'singing',
    },
    {
      name: 'Brett Ziegler',
      specialty: 'Drums',
      bio: 'Cocktail, boogie woogie, gospel, improv. 23 years teaching.',
      image: 'https://example.com/brett-ziegler.jpg',
      featured: false,
      instrument: 'drums',
    },
    {
      name: 'Cassi Falk',
      specialty: 'Piano',
      bio: 'Royal Conservatory certified. Home studio focus.',
      image: 'https://example.com/cassi-falk.jpg',
      featured: false,
      instrument: 'piano',
    },
    {
      name: 'Jesús Molina',
      specialty: 'Guitar',
      bio: 'Jazz, Latin Grammy award winner.',
      image: 'https://example.com/jesus-molina.jpg',
      featured: true,
      instrument: 'guitar',
    },
    {
      name: 'Sangah Noona',
      specialty: 'Piano',
      bio: 'Versatile jazz and pop pianist.',
      image: 'https://example.com/sangah-noona.jpg',
      featured: false,
      instrument: 'piano',
    },
    {
      name: 'Erskine Hawkins',
      specialty: 'Piano',
      bio: 'Gospel, toured with Eminem/Rihanna.',
      image: 'https://example.com/erskine-hawkins.jpg',
      featured: false,
      instrument: 'piano',
    },
    {
      name: 'Victoria Theodore',
      specialty: 'Piano',
      bio: 'Classical method, Beethoven/Bach/Chopin.',
      image: 'https://example.com/victoria-theodore.jpg',
      featured: false,
      instrument: 'piano',
    },
    {
      name: 'Summer Swee-singh',
      specialty: 'Guitar',
      bio: 'Arrangements, compositions.',
      image: 'https://example.com/summer-swee-singh.jpg',
      featured: false,
      instrument: 'guitar',
    },
    // Add more if needed, e.g., singing/drums coaches for variety
    {
      name: 'Emmanuel Ameko',
      specialty: 'Trumpets',
      bio: 'Vocal technique for all levels.',
      image: `${CoachMan}`,
      featured: false,
      instrument: 'trumpets',
    },
  ];

  // Filter coaches
  const filteredCoaches = coaches.filter(coach =>
    (selectedInstrument === 'all' || coach.instrument === selectedInstrument) &&
    (coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     coach.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
     coach.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Dynamic instruments with icons (map instrument to icon component)
  const instruments = [
    { name: 'all', icon: <FaMusic className="me-2 text-orange" /> },
    { name: 'piano', icon: <FaKeyboard className="me-2 text-orange" /> },
    { name: 'singing', icon: <FaMicrophoneAlt className="me-2 text-orange" /> },
    { name: 'guitar', icon: <FaGuitar className="me-2 text-orange" /> },
    { name: 'drums', icon: <FaDrum className="me-2 text-orange" /> },
    { name: 'trumpets', icon: <FaWind className="me-2 text-orange" /> }, // FaWind for brass/wind instruments
  ];




  return (
    
<React.Fragment>

<section className="coaches-page">
      {/* Header */}
      <div className="header-coach text-primary text-white text-center py-5 animate-fade-in">
        <h1 className="display-3 fw-bold mb-4">Meet Our Coaches</h1>
        <p className="lead-coach mb-5">World-class musicians dedicated to your progress.</p>
      </div>

     {/* Filters */}
      <Container className="py-4">
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="mb-3">
            <Form className="d-flex animate-slide-up">
              <Form.Control 
                type="text" 
                placeholder="Search coaches..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="me-2"
              />
              <Button variant="orange"><FaSearch /></Button>
            </Form>
          </Col>
          <Col md={6} className="mb-3">
            <div className="d-flex justify-content-center flex-wrap">
              {instruments.map((inst, idx) => (
                <Button 
                  key={idx} 
                  variant={selectedInstrument === inst.name ? 'primary' : 'outline-primary'} 
                  className="me-2 mb-2 animate-bounce-in" 
                  onClick={() => setSelectedInstrument(inst.name)}
                >
                  {inst.icon} {inst.name.charAt(0).toUpperCase() + inst.name.slice(1)}
                </Button>
              ))}
            </div>
          </Col>
        </Row>
        </Container>

      {/* Coaches Grid */}
      <Container className="py-5">
        <Row>
          {filteredCoaches.map((coach, idx) => (
            <Col md={4} key={idx} className="mb-5 animate-slide-up" style={{ animationDelay: `${0.2 * idx}s` }}>
              <Card className="shadow border-0 h-100 coach-card">
                <div className="position-relative">
                  <Image src={coach.image} alt={coach.name} fluid className="card-img-top rounded-top" />
                  {coach.featured && <Badge bg="warning" className="featured-badge position-absolute top-0 start-50 translate-middle-x">Featured Coach</Badge>}
                </div>
                <Card.Body className="text-center">
                  <h4 className="fw-bold text-orange">{coach.name}</h4>
                  <p className="text-muted mb-3">{coach.specialty}</p>
                  <p className="lead mb-4">{coach.bio}</p>
                  <Button variant="primary" className="animate-bounce-in">View Profile</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* CTA */}
      <Container className="py-5 text-center bg-light">
        <h2 className="mb-4 text-primary animate-slide-up">Ready to Learn from the Best?</h2>
        <Button variant="primary" size="lg" className="anmate-bounce-in">Start Your Free Trial</Button>
      </Container>
    </section>
</React.Fragment>

 
  )
}

export default Coaches
