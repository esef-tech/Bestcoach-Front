import React, {useState, useEffect} from 'react'
import "./Team.css"
import { Container, Row, Col, Card, Form, Button, Image, Badge,} from 'react-bootstrap';
import { FaSearch, FaMusic } from 'react-icons/fa';
import CoachMan from "../Images/team/3.jpg";
import GObeng from "../Images/team/2.jpg";
import TBonful from  "../Images/team/6.jpg";
import Emm from "../Images/team/7.jpg";
import { FaWhatsapp, FaFacebookF, FaInstagram,  } from 'react-icons/fa';
import {BsAlexa} from 'react-icons/bs';
import {FcBusinesswoman} from 'react-icons/fc';
import {TbBrandReactNative} from 'react-icons/tb';
import  {SiGoogleanalytics, SiTechcrunch} from 'react-icons/si';
import { Link } from 'react-router-dom';
import { useSession } from '../../context/SessionContext';




const Team = () => {

  const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const { session, savePreferences, getPreferences } = useSession();
    
    // Dynamic coaches array (expandable, based on  - name, photo, specialty, bio, featured)
    const coaches = [
      {
        name: 'Emmanuel Ameko',
        specialty: 'Founder',
        image: `${CoachMan}`,
        featured: true,
        category: 'founder',
      },
      {
        name: 'Gifty Obeng',
        specialty: 'Administrator',
        image: `${GObeng}`,
        featured: false,
        category: 'administrator',
      },
      {
        name: 'Emmanuel Mamabah',
        specialty: 'Operations Manager',
        image: `${Emm}`,
        featured: false,
        category: 'operations manager',
      },
      {
        name: 'Tracy Bonful',
        specialty: 'Data Analyst',
        image: `${TBonful}`,
        featured: false,
        category: 'data analyst',
      },
      {
        name: 'Ekow Spio Abaidoo',
        specialty: 'Tech Lead',
        image: 'https://example.com/jesus-molina.jpg',
        featured: true,
        category: 'tech lead',
      },
      {
        name: 'Sangah Noona',
        specialty: 'Piano',
        image: 'https://example.com/sangah-noona.jpg',
        featured: false,
        category: 'piano',
      },
      {
        name: 'Erskine Hawkins',
        specialty: 'Piano',
        image: 'https://example.com/erskine-hawkins.jpg',
        featured: false,
        category: 'piano',
      },
      {
        name: 'Victoria Theodore',
        specialty: 'Piano',
        image: 'https://example.com/victoria-theodore.jpg',
        featured: false,
        category: 'piano',
      },
      {
        name: 'Summer Swee-singh',
        specialty: 'Guitar',
        image: 'https://example.com/summer-swee-singh.jpg',
        featured: false,
        category: 'guitar',
      },
      // Add more if needed, e.g., singing/drums coaches for variety
      {
        name: 'Emmanuel Ameko',
        specialty: 'Trumpets',
        image: `${CoachMan}`,
        featured: false,
        category: 'trumpets',
      },
    ];
  
    // Filter coaches
    const filteredCoaches = coaches.filter(coach =>
      (selectedCategory === 'all' || coach.category === selectedCategory) &&
      (coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       coach.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
       coach.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  
    // Dynamic instruments with icons (map instrument to icon component)
    const cetegory = [
      { name: 'all', icon: <FaMusic className="me-2 text-orange" /> },
      { name: 'founder', icon: <BsAlexa className="me-2 text-orange" /> },
      { name: 'administrator', icon: <FcBusinesswoman className="me-2 text-orange" /> },
      { name: 'data analyst', icon: <SiGoogleanalytics className="me-2 text-orange" /> },
      { name: 'operations manager', icon: <TbBrandReactNative className="me-2 text-orange" /> },
      { name: 'tech lead', icon: <SiTechcrunch className="me-2 text-orange" /> }, // SiTechcrunch for tech lead
    ];
  
    useEffect(() => {
    if (session) {
      savePreferences({ ...getPreferences(), lastPage: '/team' });
    }
  }, [session, savePreferences, getPreferences]);
  

  return (
    
    <React.Fragment>  

      <section className="coaches-page">
            {/* Header */}
            <div id="header-color" className="header text-white text-center py-5 animate-fade-in">
              <h1 className="display-3 fw-bold mb-4">Meet Our Team</h1>
              {/*<p className="lead mb-5">World-class musicians dedicated to your progress.</p>*/}
            </div>
      
           {/* Filters */}
            <Container className="py-4">
              <Row className="justify-content-center align-items-center">
                <Col md={6} className="mb-3">
                  <Form className="d-flex animate-slide-up">
                    <Form.Control 
                      type="text" 
                      placeholder="Search team..." 
                      value={searchQuery} 
                      onChange={(e) => setSearchQuery(e.target.value)} 
                      className="me-2"
                    />
                    <Button variant="orange"><FaSearch /></Button>
                  </Form>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="d-flex justify-content-center flex-wrap">
                    {cetegory.map((cat, idx) => (
                      <Button 
                      id="button-color"
                        key={idx} 
                        variant={selectedCategory === cat.name ? 'primary' : 'outline-primary'} 
                        className="me-2 mb-2 animate-bounce-in" 
                        onClick={() => setSelectedCategory(cat.name)}
                      >
                        {cat.icon} {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
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
                        <Button variant="orange" className="animate-bounce-in" id="button-profile-color"><FaWhatsapp className="me-2 text-orange"/><FaFacebookF className="me-2 text-orange"/><FaInstagram className="me-2 text-orange"/></Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
      
            {/* CTA */}
            <Container className="py-5 text-center bg-light">
              <h2 className="mb-4 text-animate animate-slide-up">Ready to Learn from the Best?</h2>
              <Button id="button-join-color" size="lg" className="animate-bounce-in"><Link to="/careers" className="text-white text-decoration-none">Join Our Team</Link></Button>
            </Container>
          </section>
      

      </React.Fragment>
  )
}

export default Team
