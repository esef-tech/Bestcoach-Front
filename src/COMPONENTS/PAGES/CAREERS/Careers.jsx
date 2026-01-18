import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal, Alert , Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaBriefcase, FaUsers, FaHeart, FaUpload } from 'react-icons/fa';
import axios from 'axios';
import './Careers.css';
import about from './../../Images/team/20.jpg'


const Careers = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', job: '', resumeFile: null, resumeUrl: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  // Dynamic job listings (expandable array)
  const jobs = [
    { title: 'Music Instructor', location: 'Accra, Ghana', type: 'Full-Time', desc: 'Teach piano, drums, or guitar to students. Experience in music education required.' },
    { title: 'Sound Engineer', location: 'Remote', type: 'Part-Time', desc: 'Handle audio production for events and lessons. Technical skills in sound mixing essential.' },
    { title: 'Administrative Assistant', location: 'Accra, Ghana', type: 'Full-Time', desc: 'Manage schedules, student enrollments, and office tasks.' },
  ];

  // Filter jobs
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (e) => {
    if (e.target.name === 'resumeFile') {
      setFormData({ ...formData, resumeFile: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleApply = (jobTitle) => {
    setFormData({ ...formData, job: jobTitle });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    const formPayload = new FormData();
    formPayload.append('name', formData.name);
    formPayload.append('email', formData.email);
    formPayload.append('job', formData.job);
    if (formData.resumeFile) formPayload.append('resumeFile', formData.resumeFile); // Local file
    formPayload.append('resumeUrl', formData.resumeUrl); // Cloud/LinkedIn URL

    try {
      await axios.post('http://localhost:5000/api/apply', formPayload, { headers: { 'Content-Type': 'multipart/form-data' } });
      setStatus({ loading: false, success: true, error: '' });
      setShowModal(false);
      setFormData({ name: '', email: '', job: '', resumeFile: null, resumeUrl: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Application failed. Try again.' });
    }
  };

  return (
    <React.Fragment>
  <section className="careers-page">
      {/* Header with image background */}
      <div className="header-1 text-white text-center py-5 animate-fade-in">
        <h1 className="display-3 fw-bold">Careers at Bestcoach Music</h1>
        <p className="lead">Join our team and inspire the next generation of musicians.</p>
        <div className="breadcrumb">
          <Link to="/https://bestcoach-front.vercel.app/" className="text-white">Home</Link> / Careers
        </div>
      </div>

      {/* Company Intro */}
      <Container className="py-5">
        <Row className="align-items-center mb-5 animate-slide-up">
          <Col lg={6}>
            <Image src={about} alt="Bestcoach team" fluid className="rounded shadow animate-zoom-in" />
          </Col>
          <Col lg={6}>
            <h2 className="mb-4 text-orange">About Bestcoach Music</h2>
            <p className="lead">Bestcoach Music is a leading music education platform dedicated to nurturing talent and fostering creativity. Join us to make a difference in music education!</p>
          </Col>
        </Row>

        {/* Benefits */}
        <h2 className="text-center mb-5 text-orange">Why Join Us?</h2>
        <Row>
          <Col md={4} className="mb-4 animate-fade-in" style={{ animationDelay: '0s' }}>
            <Card className="text-center shadow border-0 h-100">
              <Card.Body>
                <FaBriefcase className="text-orange mb-3" size={50} />
                <h4 className="mb-3">Innovative Work</h4>
                <p>Work on cutting-edge music education tools and programs.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card className="text-center shadow border-0 h-100">
              <Card.Body>
                <FaUsers className="text-orange mb-3" size={50} />
                <h4 className="mb-3">Collaborative Team</h4>
                <p>Join a passionate team dedicated to creativity and growth.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Card className="text-center shadow border-0 h-100">
              <Card.Body>
                <FaHeart className="text-orange mb-3" size= {50} />
                <h4 className="mb-3">Impactful Mission</h4>
                <p>Help transform lives through the power of music.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Job Listings */}
        <h2 className="text-center mb-4 text-orange">Open Positions</h2>
        <Form className="mb-4 d-flex justify-content-center animate-slide-up">
          <Form.Control 
            type="text" 
            placeholder="Search jobs..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="w-50 me-2"
          />
          <Button variant="orange"><FaSearch /></Button>
        </Form>
        <Row>
          {filteredJobs.length > 0 ? filteredJobs.map((job, idx) => (
            <Col md={6} key={idx} className="mb-4 animate-slide-up" style={{ animationDelay: `${0.2 * idx}s` }}>
              <Card className="shadow border-0 h-100">
                <Card.Body>
                  <h4 className="text-orange">{job.title}</h4>
                  <p className="text-muted">{job.location} - {job.type}</p>
                  <p>{job.desc}</p>
                  <Button variant="primary" onClick={() => handleApply(job.title)} className="animate-bounce-in">Apply Now</Button>
                </Card.Body>
              </Card>
            </Col>
          )) : (
            <Col className="text-center">
              <p className="lead">No openings currently. Send your resume to careers@bestcoachmusic.com</p>
            </Col>
          )}
        </Row>
      </Container>

      {/* Apply Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Apply for {formData.job}</Modal.Title>
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
              <Form.Label>Resume File (img, word, pdf, odt)<FaUpload className="text-orange" /></Form.Label>
              <Form.Control type="file" name="resumeFile" accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.oasis.opendocument.text" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Or Resume URL (Google Drive, LinkedIn, etc.)</Form.Label>
              <Form.Control name="resumeUrl" value={formData.resumeUrl} onChange={handleChange} placeholder="https://drive.google.com/resume-link or https://linkedin.com/in/yourprofile" />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={status.loading}>
              {status.loading ? 'Submitting...' : 'Submit Application'}
            </Button>
            {status.success && <Alert variant="success" className="mt-3">Application sent successfully!</Alert>}
            {status.error && <Alert variant="danger" className="mt-3">{status.error}</Alert>}
          </Form>
        </Modal.Body>
      </Modal>
    </section>
    </React.Fragment>
  )
}
export default Careers
