import React, {useState} from 'react'
import './StudioTutorials.css'
import { Container, Row, Col, Card, Button, Image, Form} from 'react-bootstrap';
import { FaPlayCircle, FaSearch } from 'react-icons/fa'; // Icons for play and search
import Seo from '../../Seo'



const StudioTutorials = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Dynamic tutorials array (from Tonara analysis - thumbnails/links/desc as placeholders; update with real)
  const tutorials = [
    {
      title: 'Getting Started with Bestcoach Studio',
      thumbnail: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1174469023%2F1406041452053%2F1%2Foriginal.20260110-015414?w=150&auto=format%2Ccompress&q=75&sharp=10&s=f476a473682fa3e2cc6a3f202a5e2666',
      link: 'https://youtube.com/embed/video-id1', // Embed YouTube or Vimeo
      desc: 'Learn how to set up your profile and start teaching with Bestcoach Studio.',
    },
    {
      title: 'Assigning Tasks to Students',
      thumbnail: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1174469023%2F1406041452053%2F1%2Foriginal.20260110-015414?w=150&auto=format%2Ccompress&q=75&sharp=10&s=f476a473682fa3e2cc6a3f202a5e2666',
      link: 'https://youtube.com/embed/video-id2',
      desc: 'Step-by-step guide on creating and assigning practice tasks.',
    },
    {
      title: 'Tracking Student Progress',
      thumbnail: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1174469023%2F1406041452053%2F1%2Foriginal.20260110-015414?w=150&auto=format%2Ccompress&q=75&sharp=10&s=f476a473682fa3e2cc6a3f202a5e2666',
      link: 'https://youtube.com/embed/video-id3',
      desc: 'Monitor and analyze your students\' practice sessions effectively.',
    },
    {
      title: 'Customizing Lesson Plans',
      thumbnail: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1174469023%2F1406041452053%2F1%2Foriginal.20260110-015414?w=150&auto=format%2Ccompress&q=75&sharp=10&s=f476a473682fa3e2cc6a3f202a5e2666',
      link: 'https://youtube.com/embed/video-id4',
      desc: 'Tailor lesson plans to fit individual student needs.',
    },
    {
      title: 'Integrating Bestcoach with Your Teaching Tools',
      thumbnail: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1174469023%2F1406041452053%2F1%2Foriginal.20260110-015414?w=150&auto=format%2Ccompress&q=75&sharp=10&s=f476a473682fa3e2cc6a3f202a5e2666',
      link: 'https://youtube.com/embed/video-id5',
      desc: 'Connect Bestcoach with other apps for seamless teaching.',
    },
    {
      title: 'Advanced Features for Pro Teachers',
      thumbnail: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1174469023%2F1406041452053%2F1%2Foriginal.20260110-015414?w=150&auto=format%2Ccompress&q=75&sharp=10&s=f476a473682fa3e2cc6a3f202a5e2666',
      link: 'https://youtube.com/embed/video-id6',
      desc: 'Unlock pro tips and advanced functionalities.',
    },
  ];

  // Filter tutorials based on search
  const filteredTutorials = tutorials.filter(tut =>
    tut.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tut.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <React.Fragment>

      <Seo 
  title="Studio Tutorials | Pro Recording & Home Studio Setup Guides"
  description="Step-by-step studio tutorials: home recording setup, microphone techniques, mixing vocals, and pro studio tips from Bestcoach Music experts."
  keywords="studio tutorials, home recording guide, vocal recording tips, bestcoach studio tutorials"
  image="https://tonara.com/wp-content/themes/tonara/img/tutorials/tutorials_page_banner.jpg"
/>


       <section className="studio-tutorial-page">
      {/* Header background image (no text) */}
      <div className="header-studio  animate-fade-in"></div>

      {/* Content after header */}
      <Container className="py-5 text-center">
        <h1 className="display-4 fw-bold mb-4 text-orange animate-slide-up">Studio Tutorials</h1>
        <p className="lead fw-bold text-orange mb-5 animate-slide-up">Watch our tutorials to get the most out of Bestcoach Studio.</p>

        {/* Search Bar */}
        <Form className="d-flex justify-content-center mb-5 animate-fade-in">
          <Form.Control 
            type="text" 
            placeholder="Search tutorials..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="w-50 me-2"
          />
          <Button variant="orange"><FaSearch /></Button>
        </Form>

        {/* Tutorials Grid */}
        <Row>
          {filteredTutorials.map((tut, idx) => (
            <Col md={4} key={idx} className="mb-4 animate-slide-up" style={{ animationDelay: `${0.2 * idx}s` }}>
              <Card className="shadow border-0 h-100">
                <div className="position-relative">
                  <Image src={tut.thumbnail} alt={tut.title} fluid className="card-img-top" />
                  <Button variant="link" href={tut.link} target="_blank" rel="noopener noreferrer" className="play-btn animate-bounce-in">
                    <FaPlayCircle size={60} />
                  </Button>
                </div>
                <Card.Body>
                  <h5 className="text-orange">{tut.title}</h5>
                  <p className="text-muted">{tut.desc}</p>
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

export default StudioTutorials
