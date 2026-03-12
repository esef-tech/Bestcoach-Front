// src/pages/ShopPage.jsx - Dynamic, responsive, animated replication of Musora shop
import React, { useState, useEffect} from 'react';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { FaClock, FaFilter, FaSearch } from 'react-icons/fa';
import  './Shop.css';

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Dynamic products array (easy to update/fetch from backend)
  const products = [
    { name: 'The Bestcoach Digital Deal', originalPrice: 1205, discountedPrice: 240, save: 80, soldOut: true },
    { name: 'The TSS  Deal', originalPrice: 389, discountedPrice: 240, save: 38, soldOut: true },
    { name: 'The TMME   Deal', originalPrice: 489, discountedPrice: 240, save: 51, soldOut: true },
    { name: '30-Day Independence', price: 127, soldOut: true },
    // Add more products
  ];

  // Countdown timer (dynamic - to a date)
  useEffect(() => {
    const endDate = new Date('2024-12-01').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;
      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter products based on search
  const filteredProducts = products.filter(prod => prod.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Container fluid className="py-5">
      {/* Hero Banner */}
      <Row className="justify-content-center text-center mb-5 animate-fade-in">
        <Col md={8}>
          <h1 className="display-4 fw-bold text-primary">YOUR MUSICAL GOALS START HERE</h1>
          <p className="lead text-muted">Last chance pricing plus FREE bonuses with your membership.</p>
          <div className="countdown d-flex justify-content-center gap-3 mb-4"> <FaClock/>
            <Badge bg="primary" className="p-3">{countdown.days} Days</Badge>
            <Badge bg="primary" className="p-3">{countdown.hours} Hrs</Badge>
            <Badge bg="primary" className="p-3">{countdown.minutes} Min</Badge>
            <Badge bg="primary" className="p-3">{countdown.seconds} Sec</Badge>
          </div>
        </Col>
      </Row>

      {/* Search and Filters */}
      <Row className="mb-4 animate-slide-up">
        <Col md={6} className="mx-auto">
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="me-2" />
            <Button variant="primary"><FaSearch /></Button>
          </Form>
        </Col>
      </Row>

      {/* Product Grid */}
      <Row>
        {filteredProducts.map((prod, idx) => (
          <Col md={4} key={idx} className="mb-4 animate-zoom-in" style={{ animationDelay: `${0.2 * idx}s` }}>
            <Card className="shadow text-center">
                
              <Card.Body>
                <h4 className="fw-bold text-primary">{prod.name}</h4>
                {prod.discountedPrice ? (
                  <p className="text-muted"><del>GH&#8373;{prod.originalPrice}</del> GH&#8373;{prod.discountedPrice} (Save {prod.save}%)</p>
                ) : (
                  <p className="text-muted">GH&#8373;{prod.price} </p>
                )}
                <Badge bg="danger" className="mb-3"><FaFilter/>Sold Out</Badge>
                <Button variant="secondary" disabled>Quick Add</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Shop;