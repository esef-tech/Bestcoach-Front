import React, {useState} from 'react'
import './Help.css'
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import { FaSearch, FaBookOpen, FaUserGraduate, FaUserTie } from 'react-icons/fa'; // Icons
import { Link } from 'react-router-dom';


const Help = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Dynamic categories array (easy to update)
  const categories = [
    {
      icon: <FaBookOpen size={80} className="text-orange mb-3" />,
      title: 'Teacher Support',
      description: 'A fully-fledged Knowledge Base to help teachers find solutions.',
      link: '/help/teacher-support', // Stub for subpage
    },
    {
      icon: <FaUserGraduate size={80} className="text-orange mb-3" />,
      title: 'Student Support',
      description: 'A helpful guide to better understand and navigate through Bestcoach Music platforms.',
      link: '/help/student-support',
    },
    {
      icon: <FaUserTie size={80} className="text-orange mb-3" />,
      title: 'Parent Support',
      description: 'Any questions that parents have are answered here.',
      link: '/help/parent-support',
    },
  ];

  // Filter categories based on search
  const filteredCategories = categories.filter(cat =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <React.Fragment>
      <section className="help-page">
      {/* Header with logo */}
      <div className="header-help bg-teal text-center py-4 animate-fade-in">
      </div>

      {/* Welcome Section */}
      <Container className="py-5 text-center">
        <h1 className="display-4 fw-bold mb-4 animate-slide-up">Welcome!</h1>
        <Image src="https://www.tonara.com/helpcenter/wp-content/uploads/2020/03/connect_illustration@2x-392x246.png" alt="Help Illustration" fluid className="mb-4 animate-zoom-in" style={{ maxWidth: '400px' }} />
        <h2 className="mb-4 text-orange animate-slide-up">How can we help you?</h2>

        {/* Search Bar */}
        <Form className="d-flex justify-content-center mb-5 animate-fade-in">
          <Form.Control 
            type="text" 
            placeholder="Search in Knowledge Base" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="w-50 me-2"
          />
          <Button variant="orange"><FaSearch /></Button>
        </Form>

        {/* Categories */}
        <Row>
          {filteredCategories.map((cat, idx) => (
            <Col md={4} key={idx} className="mb-4 animate-slide-up" style={{ animationDelay: `${0.2 * idx}s` }}>
              <Card className="text-center shadow border-0 h-100">
                <Card.Body>
                  {cat.icon}
                  <h3 className="mb-3">{cat.title}</h3>
                  <p className="text-muted">{cat.description}</p>
                  <Button variant="primary" as={Link} to={cat.link} className="animate-bounce-in">View Support →</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <div className="footer bg-light text-center py-3 animate-fade-in">
        <p className="text-muted m-0">© 2026 Bestcoach Help Center - Teaching Done Differently</p>
      </div>
    </section>


    </React.Fragment>
  )
}

export default Help
