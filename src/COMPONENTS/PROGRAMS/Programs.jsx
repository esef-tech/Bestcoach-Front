import React, { useState } from 'react';
import './Programs.css';
import { Container, Row, Col, Card, Button, Modal, Form, Spinner } from 'react-bootstrap';
import { auth, db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Programs = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', package: '', price: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const packages = [
    {
      title: 'Standard Package',
      desc: 'At BestCoach, we inspire creativity and self-expression. Enroll  in our vibrant music program to cultivate rhythm, musicality, and confidence . Sign up today and let the music begin!.',
      img: 'https://www.communitymusicschool.com/wp-content/uploads/2024/10/Joyful-Voices-2024-1-scaled-e1729108515794-2400x1480.jpg',
      age: 'For everyone',
      price: 'GH₵500.00 per month',
      duration: '1 hour per session',
      schedule: 'Twice a week',
    },
    {
      title: 'Exclusive Service Package',
      desc: 'Enhance life with inspiring music. Unlock your potential through expert instruction. Enroll in our music program today!',
      img: 'https://www.washingtonperformingarts.org/wp-content/uploads/2023/12/about-the-choir-RS89401_2023LivingTheDream_FEB5_00758-lpr.webp',
      age: 'For everyone',
      price: 'GH₵1,200.00 per month',
      duration: '2 hours per session',
      schedule: 'On Demand',
    },
    {
      title: 'Flexi-Learn Package',
      desc: "Whether you're a beginner or looking to refine your skills, bestcoach is designed just for you! Learn to play, sing, and express yourself through music.",
      img: 'https://images.squarespace-cdn.com/content/v1/6213f6b6150312039937363e/4bd42772-e43d-4891-97b2-2f7cc06d9e47/20231217__A7C1741.jpg',
      age: 'For everyone',
      price: 'GH₵200.00 per month',
      duration: '1 hour per session',
      schedule: '4-times a month',
    },
  ];

  const handleShow = (pkgTitle, pkgPrice) => {
    setFormData({ ...formData, package: pkgTitle, price: pkgPrice });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      await addDoc(collection(db, 'enrollments'), {
        name: formData.name,
        email: formData.email,
        package: formData.package,
        price: formData.price,
        timestamp: serverTimestamp(),
        userId: auth.currentUser?.uid || 'anonymous',
      });
      toast.success("Enrollment request sent successfully! 🎉");
      setFormData({ name: '', email: '', package: '', price: '' });
      setShowModal(false);
    } catch (err) {
      console.error(err);
      toast.error('Enrollment failed. Please try again.');
      setStatus({ loading: false, success: false, error: 'Enrollment failed.' });
    } finally {
      setStatus({ loading: false });
    }
  };

  return (
    <>
      <section id="programs" className="programs-section">
        <Container>
          <div className="text-center pb-5">
            <p className="section-badge">Bestcoach Music</p>
            <h1 className="programs-title">Bestcoach For Everyone</h1>
          </div>

          <Row className="g-4">
            {packages.map((pkg, idx) => (
              <Col lg={4} md={6} key={idx}>
                <Card className="program-card h-100">
                  <Card.Img variant="top" src={pkg.img} className="card-img" />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="program-card-title">{pkg.title}</Card.Title>
                    <Card.Text className="program-card-desc flex-grow-1">{pkg.desc}</Card.Text>

                    <div className="program-details mt-auto">
                      <div className="detail-row">
                        <span className="detail-label">Age range</span>
                        <span className="detail-value">{pkg.age}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Price</span>
                        <span className="detail-value">{pkg.price}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Duration</span>
                        <span className="detail-value">{pkg.duration}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Schedule</span>
                        <span className="detail-value">{pkg.schedule}</span>
                      </div>
                    </div>
                  </Card.Body>

                  <Card.Footer className="bg-transparent border-0 pt-0 pb-4 px-4">
                    <Button
                      className="join-btn w-100"
                      onClick={() => handleShow(pkg.title, pkg.price)}
                    >
                      Join Now
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Enrollment Modal */}
      <Modal show={showModal} onHide={handleClose} centered className="auth-modal">
        <Modal.Header closeButton>
          <Modal.Title>Enroll in {formData.package}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price (GH₵)</Form.Label>
              <Form.Control name="price" type="text" value={formData.price} readOnly />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={status.loading} className="w-100 py-3 rounded-4">
              {status.loading ? <Spinner animation="border" size="sm" /> : 'Send Enrollment Request'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Programs;