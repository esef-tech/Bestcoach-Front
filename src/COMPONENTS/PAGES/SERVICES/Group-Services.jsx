import React,{useState} from 'react'
import './Group-Services.css'
import { Container, Row, Col, Card, Form, Button, Carousel, Alert } from 'react-bootstrap';
import {  FaSearch } from 'react-icons/fa';


const GroupServices = () => {


  const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchError, setSearchError] = useState('');
  
    // Dynamic data for sections
    const courses = [
      { icon: '🎹', title: 'Piano', desc: 'Step into a transformative journey where music becomes the heartbeat of your school’s curriculum.' },
      { icon: '🥁', title: 'Drums', desc: 'Discover the joy of transforming education through sound by enrolling in our exclusive drum lessons designed for schools.' },
      { icon: '🎸', title: 'Guitar', desc: 'Unleash the heartbeat of learning in your school with our specialized guitar lessons.' },
    ];
  
    const relatedPosts = [
      { img: 'https://example.com/school1.jpg', title: 'Bestcoach for Schools', icons: ['🎹', '🥁', '🎸'] },
      { img: 'https://example.com/school2.jpg', title: 'Bestcoach for Schools', icons: ['🎹', '🥁', '🎸'] },
      { img: 'https://example.com/school3.jpg', title: 'Bestcoach for Schools', icons: ['🎹', '🥁', '🎸'] },
    ];
  
    const comments = [
      { img: 'https://example.com/admin.jpg', name: 'Nuella', role: 'Administrator', desc: 'Hey everyone, elevate your school\'s learning with our specialized piano course!' },
      { img: 'https://example.com/strings_coach.jpg', name: 'Daniel', role: 'Bass Coach', desc: 'Join our guitar course for schools—unlock passion and inspiration!', children: [
        { img: 'https://example.com/technology.jpg', name: 'Spio', role: 'Tech Lead', desc: 'Enroll in drum lessons for dynamic school rhythms!' }
      ] },
    ];
  
    const categories = [
      { title: 'Piano Lessons', icon: '🎹' },
      { title: 'Drums Lessons', icon: '🥁' },
      { title: 'Bass Lessons', icon: '🎸' },
      { title: 'Lead & Acoustic Guitar', icon: '🎸' },
      { title: 'Voice Lessons', icon: '🎤' },
    ];
  
    const recentPosts = [
      { img: 'https://example.com/church3.jpg', title: 'Bestcoach for Schools', icons: ['🎹', '🥁', '🎸'] },
      { img: 'https://example.com/church3.webp', title: 'Bestcoach for Schools', icons: ['🎹', '🥁', '🎸'] },
      { img: 'https://example.com/Indviduals.jpg', title: 'Bestcoach for Schools', icons: ['🎹', '🥁', '🎸'] },
    ];
  
    const tags = [
      'Disk Jockey', 'Instrument Rentals', 'Workshops', 'Music Production', 'Instruments Repairs', 'Clarinet & More..'
    ];
  
    // Mock search function (dynamic - can connect to backend/API for real search)
    const handleSearch = (e) => {
      e.preventDefault();
      setSearchError('');
      setSearchResults([]);
      if (!searchQuery.trim()) {
        setSearchError('Please enter a keyword.');
        return;
      }
  
      // Mock search logic - filter from content (dynamic; replace with Axios to backend if needed)
      const allContent = [...courses, ...categories, ...tags, ...comments.flatMap(c => [c, ...(c.children || [])])];
      const results = allContent.filter(item => 
        (item.title || item.desc || item.name || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
  
      if (results.length === 0) {
        setSearchError('No results found.');
      } else {
        setSearchResults(results);
      }
    };
  
  
  return (
    <>
      
<section className="schools-page">
      {/* Header */}
      <div className="header bg-primary text-white text-center py-5 animate-fade-in">
        <h1 className="display-4">Bestcoach for Schools</h1>
        <p>Home / Schools</p>
      </div>

      {/* Detail Section */}
      <Container className="py-5">
        <Row>
          <Col lg={8}>
            <div className="detail animate-slide-up">
              <h1 className="mb-3">Transforming Lives, One Beat at a Time</h1>
              <div className="icons d-flex mb-4">
                {courses.map((course, idx) => (
                  <p key={idx} className="mr-3"><span className="icon">{course.icon}</span> {course.title}</p>
                ))}
              </div>
              <img src="https://example.com/bc-main-flier.jpg" alt="School Music" className="img-fluid rounded mb-4 animate-zoom-in" />
              <p className="mb-4">Step into a transformative journey where music becomes the heartbeat of your school’s curriculum...</p>
              <h2 className="mb-4">Enroll in our Guitar Lessons designed for Schools</h2>
              <img src="https://example.com/poll-musical-instruments-2.webp" alt="Guitar" className="img-fluid rounded w-50 float-left mr-4 mb-3 animate-fade-in" />
              <p>Discover the joy of transforming education through sound...</p>
              <h3 className="mb-4">Enroll in our Drum Lessons designed for Schools</h3>
              <img src="https://example.com/church.jpg" alt="Drums" className="img-fluid rounded w-50 float-right ml-4 mb-3 animate-fade-in" />
              <p>Unleash the heartbeat of learning in your school...</p>
            </div>

            {/* Related Posts Carousel */}
            <div className="related-posts mb-5 animate-slide-up">
              <h2 className="mb-4">Bestcoach Music</h2>
              <Carousel>
                {relatedPosts.map((post, idx) => (
                  <Carousel.Item key={idx}>
                    <div className="d-flex align-items-center bg-light shadow-sm rounded p-3">
                      <img src={post.img} alt={post.title} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                      <div className="pl-3">
                        <h5>{post.title}</h5>
                        <div className="d-flex">
                          {post.icons.map((icon, i) => <small key={i} className="mr-3">{icon}</small>)}
                        </div>
                      </div>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>

            {/* Comment List */}
            <div className="comments mb-5 animate-slide-up">
              <h2 className="mb-4">3 Comments</h2>
              {comments.map((comment, idx) => (
                <div key={idx} className="media mb-4">
                  <img src={comment.img} alt={comment.name} className="img-fluid rounded-circle mr-3" style={{ width: '45px' }} />
                  <div className="media-body">
                    <h6>{comment.name} <small><i>{comment.role}</i></small></h6>
                    <p>{comment.desc}</p>
                    <Button variant="light" size="sm">Join Now</Button>
                    {comment.children && comment.children.map((child, cIdx) => (
                      <div key={cIdx} className="media mt-4">
                        <img src={child.img} alt={child.name} className="img-fluid rounded-circle mr-3" style={{ width: '45px' }} />
                        <div className="media-body">
                          <h6>{child.name} <small><i>{child.role}</i></small></h6>
                          <p>{child.desc}</p>
                          <Button variant="light" size="sm">Join Now</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Form */}
            <div className="comment-form bg-light p-5 animate-slide-up">
              <h2 className="mb-4">Join Bestcoach Now</h2>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name *</Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control type="email" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Name of School *</Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select>
                    <option>Select Course or Services</option>
                    {/* Add options dynamically from array if needed */}
                    <option>Piano</option>
                    <option>Drums</option>
                    {/* ... other options */}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message *</Form.Label>
                  <Form.Control as="textarea" rows={5} />
                </Form.Group>
                <Button type="submit" variant="primary">Submit</Button>
              </Form>
            </div>
          </Col>

          {/* Sidebar */}
          <Col lg={4} className="mt-5 mt-lg-0 animate-slide-right">
            {/* Author Bio */}
            <Card className="text-center bg-primary text-white py-5 px-4 mb-5">
              <img src="https://example.com/PIANO_COACH.jpg" alt="Emmanuel" className="rounded-circle mx-auto mb-3" style={{ width: '100px' }} />
              <h3 className="text-secondary mb-3">Emmanuel</h3>
              <p className="m-0">At bestcoach we provide specialized programs that help schools enhance their musical education and student engagement through music.</p>
            </Card>

            {/* Search Form */}
            <div className="mb-5">
              <h2 className="mb-4">Search</h2>
              <Form onSubmit={handleSearch}>
                <Form.Group className="input-group">
                  <Form.Control 
                    type="text" 
                    placeholder="Keyword" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button variant="primary" type="submit"><FaSearch /></Button>
                </Form.Group>
              </Form>
              {searchError && <Alert variant="danger" className="mt-3">{searchError}</Alert>}
              {searchResults.length > 0 && (
                <ul className="list-group mt-3">
                  {searchResults.map((result, idx) => (
                    <li key={idx} className="list-group-item">{result.title || result.name} - {result.desc?.slice(0, 50)}...</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Category List */}
            <div className="mb-5">
              <h2 className="mb-4">Categories</h2>
              <ul className="list-group">
                {categories.map((cat, idx) => (
                  <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                    <a href="#">{cat.title}</a>
                    <span className="badge badge-primary badge-pill">{cat.icon}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Single Image */}
            <div className="mb-5">
              <img src="https://example.com/group.jpg" alt="Group" className="img-fluid rounded animate-zoom-in" />
            </div>

            {/* Recent Post */}
            <div className="mb-5">
              <h2 className="mb-4">Bestcoach for everyone</h2>
              {recentPosts.map((post, idx) => (
                <div key={idx} className="d-flex align-items-center bg-light shadow-sm rounded mb-3 animate-fade-in">
                  <img src={post.img} alt={post.title} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                  <div className="pl-3">
                    <h5>{post.title}</h5>
                    <div className="d-flex">
                      {post.icons.map((icon, i) => <small key={i} className="mr-3">{icon}</small>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Single Image */}
            <div className="mb-5">
              <img src="https://example.com/kids-learning-multiple-instrumen.jpg" alt="Kids Learning" className="img-fluid rounded animate-zoom-in" />
            </div>

            {/* Tag Cloud */}
            <div className="mb-5">
              <h2 className="mb-4">Bestcoach Services</h2>
              <div className="d-flex flex-wrap m-n1">
                {tags.map((tag, idx) => (
                  <a key={idx} href="#" className="btn btn-outline-primary m-1 animate-bounce-in">{tag}</a>
                ))}
              </div>
            </div>

            {/* Single Image */}
            <div className="mb-5">
              <img src="https://example.com/piano-course-2.jpeg" alt="Piano Course" className="img-fluid rounded animate-zoom-in" />
            </div>

            {/* Plain Text */}
            <div>
              <h2 className="mb-4">Join Bestcoach</h2>
              <p>Elevate your school's musical education with BestCoach! Discover the transformative power of sound through our dedicated piano, drums, guitar, and vocal lessons—designed exclusively for schools seeking to inspire and uplift their students. Join us to refine skills, enrich learning experiences, and let every note resonate with passion. Embrace this opportunity to create soulful harmonies that touch young minds. Enroll now and become the sound of inspiration in your school!</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>

    </>
  )
}

export default GroupServices
