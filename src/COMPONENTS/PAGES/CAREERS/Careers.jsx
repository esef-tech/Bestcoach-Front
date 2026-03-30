import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal, Alert , Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaBriefcase, FaUsers, FaHeart, FaUpload } from 'react-icons/fa';
import './Careers.css';
import about from './../../Images/team/20.jpg'
import { auth, db, storage } from '../../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Seo from '../../Seo'
import { useSession } from '../../../context/SessionContext';



const Careers = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', job: '', resumeFile: null, resumeUrl: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });
  const [showLoginPrompt, setShowLoginPrompt] = useState(false); // New prompt
  const { session, savePreferences, getPreferences } = useSession();


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
    if (!auth.currentUser) {
      setShowLoginPrompt(true);
      return;
    }
    setFormData({ ...formData, job: jobTitle });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      let resumeUrl = formData.resumeUrl || '';
      if (formData.resumeFile) {
        const fileRef = ref(storage, `resumes/${Date.now()}_${formData.resumeFile.name}`);
        await uploadBytes(fileRef, formData.resumeFile);
        resumeUrl = await getDownloadURL(fileRef);
      }

      await addDoc(collection(db, 'applications'), {
        name: formData.name,
        email: formData.email,
        job: formData.job,
        resumeUrl,
        userId: auth.currentUser.uid,
        timestamp: serverTimestamp()
      });

      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', job: '', resumeFile: null, resumeUrl: '' });
      setShowModal(false);
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Application failed. Try again.' });
    }
  };

  useEffect(() => {
    if (session) {
      savePreferences({ ...getPreferences(), lastPage: '/careers' });
    }
  }, [session, savePreferences, getPreferences]);

  return (
    <React.Fragment>

      <Seo 
  title="Careers at Bestcoach Music | Join Our Singing Revolution"
  description="Join the Bestcoach Music team! Exciting careers for vocal coaches, developers, content creators, and music lovers who want to empower singers worldwide."
  keywords="careers bestcoach music, music jobs, vocal coach jobs, singing platform careers"
  image="http://localhost:3000/static/media/20.886e1c18f8913f201b8a.jpg"
/>
  <section className="careers-page">
      {/* Header with image background */}
      <div className="header-1 text-white text-center py-5 animate-fade-in">
        <h1 className="display-3 fw-bold">Careers at Bestcoach Music</h1>
        <p  className="primary-text">Join our team and inspire the next generation of musicians.</p>
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
                <Form.Label>Which position are you applying for?</Form.Label>
                <Form.Control name="job" value={formData.job} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Resume File (img, word, pdf, odt) <FaUpload className="text-orange" /></Form.Label>
                <Form.Control type="file" name="resumeFile" accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.oasis.opendocument.text" onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Or Resume URL (Google Drive, LinkedIn, etc.)</Form.Label>
                <Form.Control name="resumeUrl" value={formData.resumeUrl} onChange={handleChange} placeholder="https://drive.google.com/... or https://linkedin.com/in/..." />
              </Form.Group>
              <Button type="submit" variant="primary" disabled={status.loading} className="w-100">
                {status.loading ? 'Submitting...' : 'Submit Application'}
              </Button>

              {status.success && <Alert variant="success" className="mt-3">Application sent successfully!</Alert>}
              {status.error && <Alert variant="danger" className="mt-3">{status.error}</Alert>}
            </Form>
          </Modal.Body>
        </Modal>

        {/* Login Required Prompt Modal */}
      <Modal show={showLoginPrompt} onHide={() => setShowLoginPrompt(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h5>You must be logged in to apply for jobs.</h5>
          <p>Please sign in or create an account first.</p>
          <Button variant="primary" onClick={() => {
            setShowLoginPrompt(false);
            window.location.href = '/?login=true'; // Triggers Navbar login modal
          }}>
            Sign In Now
          </Button>
        </Modal.Body>
      </Modal>
    </section>
    </React.Fragment>
  )
}
export default Careers
