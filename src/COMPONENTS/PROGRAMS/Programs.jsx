import React, {useState} from 'react'
import './Programs.css'
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
const Programs = () => {
const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', package: '' });

  const packages = [
    {
      title: 'Standard Package',
      desc: 'At bestcoach we give students creativity and expression. Enroll your school in our dynamic music program—unlock rhythm, melody, and confidence. Join now!',
      img: 'https://www.communitymusicschool.com/wp-content/uploads/2024/10/Joyful-Voices-2024-1-scaled-e1729108515794-2400x1480.jpg', // From search [image:0]
      age: 'For everyone',
      price: 'GH₵500.00 per month',
      duration: '1 hour per session',
      schedule: 'Twice a week',
    },
    {
      title: 'Exclusive Service Package',
      desc: 'Transform your church with inspiring music. Empower your choir with expert training. Enroll in our music program today!',
      img: 'https://www.washingtonperformingarts.org/wp-content/uploads/2023/12/about-the-choir-RS89401_2023LivingTheDream_FEB5_00758-lpr.webp', // From search [image:1]
      age: 'For everyone',
      price: 'GH₵1200.00 per month',
      duration: '2 hours per session',
      schedule: 'On Demand',
    },
    {
      title: 'Flexi-Learn Package',
      desc: 'Whether you\'re a beginner or looking to refine your skills, bestcoach is designed just for you! Learn to play, sing, and express yourself through the power of music.!',
      img: 'https://images.squarespace-cdn.com/content/v1/6213f6b6150312039937363e/4bd42772-e43d-4891-97b2-2f7cc06d9e47/20231217__A7C1741.jpg', // From search [image:2]
      age: 'For everyone',
      price: 'GH₵200.00 per month',
      duration: '1 hour per session',
      schedule: '4-times a month',
    },
  ];

  const handleShow = (pkgTitle) => {
    setFormData({ ...formData, package: pkgTitle });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/enroll', formData); // New backend route
      alert('Enrollment submitted!');
      setShowModal(false);
    } catch (err) {
      alert('Error submitting enrollment');
    }
  };


  return (
    <>
      

<section id="programs" className="programs-section">
      <Container>
        <div className="text-center pb-2 programs-title">
          <p className="px-5" id='section-p'><span className="px-2">Bestcoach Music</span></p>
          <h1 className="mb-4">Bestcoach For Everyone</h1>
        </div>
        <Row>
          {packages.map((pkg, idx) => (
            <Col lg={4} className="mb-5" key={idx}>
              <Card className="program-card pb-2">
                <Card.Img variant="top" src={pkg.img} className="mb-2 img-fluid" />
                <Card.Body className="text-center">
                  <Card.Title as="h4">{pkg.title}</Card.Title>
                  <Card.Text>{pkg.desc}</Card.Text>
                </Card.Body>
                <Card.Footer className="bg-transparent py-4 px-5">
                  <Row className="border-bottom">
                    <Col xs={6} className="py-1 text-right border-right"><strong>Age range</strong></Col>
                    <Col xs={6} className="py-1">{pkg.age}</Col>
                  </Row>
                  <Row className="border-bottom">
                    <Col xs={6} className="py-1 text-right border-right"><strong>Price</strong></Col>
                    <Col xs={6} className="py-1">{pkg.price}</Col>
                  </Row>
                  <Row className="border-bottom">
                    <Col xs={6} className="py-1 text-right border-right"><strong>Duration</strong></Col>
                    <Col xs={6} className="py-1">{pkg.duration}</Col>
                  </Row>
                  <Row>
                    <Col xs={6} className="py-1 text-right border-right"><strong>Schedule</strong></Col>
                    <Col xs={6} className="py-1">{pkg.schedule}</Col>
                  </Row>
                </Card.Footer>
                <Button 
                  id="join-btn"
                  className="px-4 mx-auto mb-4" 
                  onClick={() => handleShow(pkg.title)}
                >
                  Join Now
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Enrollment Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enroll in {formData.package}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" onChange={handleChange} required />
            </Form.Group>
            <Button type="submit" variant="primary">Submit Enrollment</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </section>

    </>
  )
}

export default Programs
