// src/components/NewTestimonial.jsx - Dynamic, responsive, animated testimonial component based on image
import React from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';
import './Testimonial.css'; // Custom styles

const NewTestimonial = ({
  testimonials = [
    {
      image: 'https://randomuser.me/api/portraits/women/64.jpg',
      name: 'Sarah Johnson',
      position: 'Creative Director',
      text: '"The attention to detail and the level of creativity they brought to our project was extraordinary. The team\'s dedication to excellence made all the difference in achieving our goals."',
    },
    // Add more for dynamic carousel if needed, but image shows single - extend as array
  ],
}) => {
  return (
    <div className="new-testimonial-container py-5">
      {testimonials.map((testimonial, idx) => (
        <Card key={idx} className="testimonial-card mx-auto animate-fade-in" style={{ animationDelay: `${0.2 * idx}s` }}>
          <Card.Body className="position-relative">
            <div className="quote-bubble">“</div>
            <Row className="align-items-center g-3">
              <Col xs={12} md={3} className="text-center text-md-left">
                <Image src={testimonial.image} className="avatar" alt="Client Avatar" fluid />
              </Col>
              <Col xs={12} md={9}>
                <p className="testimonial-text">{testimonial.text}</p>
                <h5 className="client-name">{testimonial.name}</h5>
                <p className="client-position">{testimonial.position}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default NewTestimonial;