// src/pages/CommunityForumsPage.jsx - Dynamic, responsive, animated replication of freeCodeCamp forum
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup, Badge, Nav, Image } from 'react-bootstrap';
import { FaSearch, FaUsers, FaClock } from 'react-icons/fa';
import './Community.css'; // Custom styles

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic data arrays (easy to update/fetch from backend)
  const categories = [
    { name: 'Announcements', description: 'Official updates and news', topics: 37, link: '/c/announcements' },
    { name: 'General', description: 'General discussions', topics: 39400, link: '/c/general' },
    { name: 'The Singers Sanctuary', description: 'JavaScript help and discussions', topics: 60700, link: '/c/javascript' },
    { name: 'The Music Mentorship Experience', description: 'Web design questions', topics: 45000, link: '/c/html-css' },
    // Add more categories, multilingual, etc.
  ];

  const latestTopics = [
    { title: 'Spring 2026 Cohort Retrospective', category: 'Announcements', replies: 5, time: '1h', link: '/t/spring-cohort' },
    { title: 'Python Curriculum Survey', category: 'Announcements', replies: 10, time: '2h', link: '/t/python-survey' },
    { title: 'Debug a Pet Adoption Page', category: 'HTML/CSS', replies: 3, time: '1m', link: '/t/pet-adoption' },
    // Add more dynamic topics
  ];

  // Filter categories/topics based on search
  const filteredCategories = categories.filter(cat => cat.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredTopics = latestTopics.filter(topic => topic.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Container fluid className="py-5 bg-light">
      {/* Header Illustration/Banner */}
      <Row className="justify-content-center mb-5 animate-fade-in">
        <Col md={8} className="text-center">
          <h1 className="display-4 fw-bold text-primary">Bestcoach Music Forum</h1>
          <p className="lead text-muted">Join the community and learn music for free!</p>
          <Image src="https://tonara.com/wp-content/themes/tonara/img/tutorials/tutorials_page_banner.jpg" alt="Forum Banner" fluid className="rounded shadow mb-4 animate-zoom-in" />
          <Button variant="primary" className="animate-bounce-in">Visit Curriculum</Button>
        </Col>
      </Row>

      {/* Navigation Bar */}
      <Row className="mb-4 animate-slide-up">
        <Col>
          <Nav className="justify-content-center">
            <Nav.Link href="/categories">Subforums</Nav.Link>
            <Nav.Link href="/latest">Latest</Nav.Link>
            <Nav.Link href="/top">Top</Nav.Link>
            <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
          </Nav>
        </Col>
      </Row>

      {/* Search Bar */}
      <Row className="justify-content-center mb-5 animate-fade-in">
        <Col md={6}>
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Search forums..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="me-2" />
            <Button variant="primary"><FaSearch /></Button>
          </Form>
        </Col>
      </Row>

      {/* Main Content: Categories (Left) + Latest Topics (Right) */}
      <Row>
        <Col md={6} className="mb-4 animate-slide-left">
          <h2 className="mb-4 text-primary">All Categories</h2>
          <ListGroup>
            {filteredCategories.map((cat, idx) => (
              <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center animate-fade-in" style={{ animationDelay: `${0.1 * idx}s` }}>
                <div>
                  <a href={cat.link} className="fw-bold text-primary">{cat.name}</a>
                  <p className="text-muted mb-0">{cat.description}</p>
                </div>
                <Badge bg="primary">{cat.topics} Topics</Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={6} className="mb-4 animate-slide-right">
          <h2 className="mb-4 text-primary">Latest Topics</h2>
          <ListGroup>
            {filteredTopics.map((topic, idx) => (
              <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center animate-fade-in" style={{ animationDelay: `${0.1 * idx}s` }}>
                <div>
                  <a href={topic.link} className="fw-bold text-primary">{topic.title}</a>
                  <p className="text-muted mb-0">{topic.category}</p>
                </div>
                <div className="text-end">
                  <Badge bg="secondary" className="me-2">{topic.replies} Replies</Badge>
                  <small className="text-muted"><FaClock className="me-1" /> {topic.time}</small>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button variant="link" className="mt-3">More...</Button>
        </Col>
      </Row>

      {/* Sidebar/User Stats */}
      <Row className="justify-content-center mt-5 animate-fade-in">
        <Col md={4}>
          <Card className="shadow">
            <Card.Body className="text-center">
              <FaUsers size={40} className="text-primary mb-3" />
              <h4>Online Users</h4>
              <Badge bg="success">23</Badge>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Community;