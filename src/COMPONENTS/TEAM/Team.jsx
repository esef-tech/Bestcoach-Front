import React, { useState, useEffect } from 'react';
import "./Team.css";
import { Container, Row, Col, Card, Form, Button, Image, Badge, Modal } from 'react-bootstrap';
import { FaSearch, FaMusic, FaPlus } from 'react-icons/fa';
import CoachMan from "../Images/team/3.jpg";
import GObeng from "../Images/team/2.jpg";
import TBonful from "../Images/team/6.jpg";
import Emm from "../Images/team/7.jpg";
import MJeff from "../Images/team/Executives/Mr.Jeffrey-1.webp";
import MTTS from "../Images/team/Executives/Mathias-4.webp";
import MPR from "../Images/team/Executives/Precious.webp";
import NTTS from "../Images/team/Executives/NANA-SARFO.webp";
import { FaWhatsapp, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { BsAlexa } from 'react-icons/bs';
import { FcBusinesswoman } from 'react-icons/fc';
import { TbBrandReactNative } from 'react-icons/tb';
import { SiGoogleanalytics, SiTechcrunch } from 'react-icons/si';
import { TbChairDirector } from "react-icons/tb";
import { MdPermMedia } from "react-icons/md";
import { SiTaichigraphics } from "react-icons/si";
import { GrMultimedia } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { useSession } from '../../context/SessionContext';

const Team = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const { session, savePreferences, getPreferences } = useSession();

  const coaches = [
    { name: 'Emmanuel Ameko', specialty: 'Founder', image: `${CoachMan}`, featured: true, category: 'founder' },
    { name: 'Jeffrey Addo', specialty: 'Director', image: `${MJeff}`, featured: true, category: 'director' },
    { name: 'Emmanuel Boadi', specialty: 'Operations Manager', image: `${Emm}`, featured: true, category: 'operations manager' },
    { name: 'Ekow Spio Abaidoo', specialty: 'Tech Lead', image: 'https://bestcoachmusic.netlify.app/IMAGES/technology.jpeg', featured: true, category: 'tech lead' },
    { name: 'Precious Nkrumah', specialty: 'Graphic Design Lead', image: `${MPR}`, featured: true, category: 'graphic design lead' },
    { name: 'Tracy Bonful', specialty: 'Data Analyst', image: `${TBonful}`, featured: true, category: 'data analyst' },
    { name: 'Gifty Obeng', specialty: 'Administrator', image: `${GObeng}`, featured: true, category: 'administrator' },
    { name: 'Nana Sarfo', specialty: 'Media Lead', image: `${NTTS}`, featured: true, category: 'media lead' },
    { name: 'Matthiahs', specialty: 'Assistant Media Lead', image: `${MTTS}`, featured: true, category: 'assistant media lead' },
  ];

  const filteredCoaches = coaches.filter(coach =>
    (selectedCategory === 'all' || coach.category === selectedCategory) &&
    (coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     coach.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const categories = [
    { name: 'all', icon: <FaMusic className="me-2 text-orange" /> },
    { name: 'founder', icon: <BsAlexa className="me-2 text-orange" /> },
    { name: 'director', icon: <TbChairDirector className="me-2 text-orange" /> },
    { name: 'operations manager', icon: <TbBrandReactNative className="me-2 text-orange" /> },
    { name: 'tech lead', icon: <SiTechcrunch className="me-2 text-orange" /> },
    { name: 'graphic design lead', icon: <SiTaichigraphics className="me-2 text-orange" /> },
    { name: 'data analyst', icon: <SiGoogleanalytics className="me-2 text-orange" /> },
    { name: 'administrator', icon: <FcBusinesswoman className="me-2 text-orange" /> },
    { name: 'media lead', icon: <MdPermMedia className="me-2 text-orange" /> },
    { name: 'assistant media lead', icon: <GrMultimedia className="me-2 text-orange" /> },
  ];

  const handleViewImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  useEffect(() => {
    if (session) {
      savePreferences({ ...getPreferences(), lastPage: '/team' });
    }
  }, [session, savePreferences, getPreferences]);

  return (
    <React.Fragment>
      <section className="team-page">
        {/* Header */}
        <div id="header-color" className="header text-white text-center py-5 animate-fade-in">
          <h1 className="display-3 fw-bold mb-4">Meet Our Team</h1>
        </div>

        {/* Filters - Exact second image style */}
        <Container className="py-4">
          <Row className="justify-content-center align-items-center">
            <Col md={6} className="mb-3">
              <Form className="d-flex animate-slide-up">
                <Form.Control
                  type="text"
                  placeholder="Search team..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="me-2 search-input"
                />
                <Button id="search-btn" variant="orange"><FaSearch /></Button>
              </Form>
            </Col>
            <Col md={6} className="mb-3">
              <div className="d-flex justify-content-center flex-wrap gap-2">
                {categories.map((cat, idx) => (
                  <Button
                    id="button-btn"
                    key={idx}
                    variant={selectedCategory === cat.name }
                    className="me-2 mb-2 animate-bounce-in search-btn"
                    onClick={() => setSelectedCategory(cat.name)}
                  >
                    {cat.icon} {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
        </Container>

        {/* Coaches Grid - Exact first image card style */}
        <Container className="py-5">
          <Row>
            {filteredCoaches.map((coach, idx) => (
              <Col md={4} key={idx} className="mb-5 animate-slide-up" style={{ animationDelay: `${0.2 * idx}s` }}>
                <Card className="team-card glass-card shadow border-0 h-100">
                  <div className="position-relative">
                    <Image src={coach.image} alt={coach.name} fluid className="card-img-top rounded-top coach-image" />
                    <Button className="plus-overlay" onClick={() => handleViewImage(coach.image)}>
                      <FaPlus />
                    </Button>
                    {coach.featured && (
                      <Badge bg="warning" className="featured-badge position-absolute top-0 start-50 translate-middle-x">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <Card.Body className="text-center p-4">
                    <h4 className="fw-bold text-orange mb-1">{coach.name}</h4>
                    <p className="text-muted mb-4">{coach.specialty}</p>
                  </Card.Body>
                  {/* Dark teal social pill - Exact match to first image */}
                  <div className="social-pill">
                    <Button variant="orange" className="animate-bounce-in w-100" id="button-profile-color">
                      <FaWhatsapp className="me-2 text-orange" />
                      <FaFacebookF className="me-2 text-orange" />
                      <FaInstagram className="me-2 text-orange" />
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>

        {/* CTA */}
        <Container className="py-5 text-center bg-light">
          <h2 className="mb-4 text-animate animate-slide-up text-text">Ready to Learn from the Best?</h2>
          <Button id="button-join-color" size="lg" className="animate-bounce-in">
            <Link to="/careers" className="text-white text-decoration-none">Join Our Team</Link>
          </Button>
        </Container>

        {/* Full Image Modal */}
        <Modal show={showImageModal} onHide={() => setShowImageModal(false)} centered size="lg" className="image-modal">
          <Modal.Body className="p-0 text-center bg-transparent">
            <Image src={selectedImage} fluid className="full-view-image" />
          </Modal.Body>
          <Button variant="light" className="position-absolute top-0 end-0 m-3" onClick={() => setShowImageModal(false)}>
            ✕
          </Button>
        </Modal>
      </section>
    </React.Fragment>
  );
};

export default Team;