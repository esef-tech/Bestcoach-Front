import React, {useState} from 'react'
import './Faq.css'
import { Container, Row, Col, Form, Accordion, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';


const Faq = () => {
     const [searchQuery, setSearchQuery] = useState('');

     // Dynamic FAQ categories array (easy to update/add)
  const faqCategories = [
    {
      title: 'Getting Started',
      faqs: [
        { question: 'How do I create an account?', answer: 'Visit the signup page and fill in your details to create an account.' },
        { question: 'What is Bestcoach Music?', answer: 'Bestcoach Music is a platform for music education offering lessons for schools, churches, and individuals.' },
        { question: 'How do I enroll in a course?', answer: 'Browse our courses and click "Enroll Now" to start.' },
      ],
    },
    {
      title: 'Account & Profile',
      faqs: [
        { question: 'How do I reset my password?', answer: 'Click "Forgot Password" on the login page and follow the instructions.' },
        { question: 'Can I change my email address?', answer: 'Yes, go to your profile settings to update your email.' },
        { question: 'How do I delete my account?', answer: 'Contact support for account deletion requests.' },
      ],
    },
    {
      title: 'Lessons & Courses',
      faqs: [
        { question: 'What instruments do you teach?', answer: 'We teach piano, drums, guitar, bass, voice, and more.' },
        { question: 'Are lessons live or pre-recorded?', answer: 'We offer both live sessions and on-demand videos.' },
        { question: 'Can I switch courses?', answer: 'Yes, contact your instructor or support to switch.' },
      ],
    },
    {
      title: 'Billing & Payments',
      faqs: [
        { question: 'What payment methods are accepted?', answer: 'We accept credit cards, PayPal, and bank transfers.' },
        { question: 'How do I cancel my subscription?', answer: 'Go to your account settings and select "Cancel Subscription".' },
        { question: 'Is there a refund policy?', answer: 'Refunds are available within 7 days of purchase.' },
      ],
    },
    {
      title: 'Technical Support',
      faqs: [
        { question: 'What browsers are supported?', answer: 'We recommend Chrome, Firefox, or Safari for the best experience.' },
        { question: 'How do I report a bug?', answer: 'Use the "Report Issue" form in your account or email support.' },
        { question: 'Why is the video not loading?', answer: 'Check your internet connection or try clearing your cache.' },
      ],
    },
    {
      title: 'Events & Webinars',
      faqs: [
        { question: 'How do I register for an event?', answer: 'Visit the events page and click "Register Now".' },
        { question: 'Are webinars free?', answer: 'Most webinars are free for registered users.' },
        { question: 'Can I watch webinar replays?', answer: 'Yes, replays are available on the webinars page.' },
      ],
    },
  ];

  // Filter categories/FAQs based on search
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0 || category.title.toLowerCase().includes(searchQuery.toLowerCase()));





  return (
    
<React.Fragment>

<section className="faqs-page">
      {/* Header */}
      <div className="header  text-white text-center py-5 animate-fade-in" style={{ background: '#00394f' }} > 
        <h1 className="display-3 fw-bold">FAQs</h1>
        <p className="lead-faq">Find answers to common questions about Bestcoach Music.</p>
      </div>

      {/* Search Bar */}
      <Container className="py-4">
        <Form className="d-flex justify-content-center animate-slide-up">
          <Form.Control 
            type="text" 
            placeholder="Search FAQs..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="w-75 me-2"
          />
          <Button variant="orange"><FaSearch /></Button>
        </Form>
      </Container>

      {/* FAQ Categories */}
      <Container className="py-5">
        <Row className="justify-content-center">
          {filteredCategories.map((category, idx) => (
            <Col lg={8} key={idx} className="mb-5 animate-slide-up" style={{ animationDelay: `${0.2 * idx}s` }}>
              <h2 className="text-orange mb-4">{category.title}</h2>
              <Accordion defaultActiveKey="0">
                {category.faqs.map((faq, fIdx) => (
                  <Accordion.Item eventKey={fIdx.toString()} key={fIdx}>
                    <Accordion.Header>{faq.question}</Accordion.Header>
                    <Accordion.Body>{faq.answer}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          ))}
        </Row>
      </Container>
    </section>


</React.Fragment>
    
        
      

  )
}

export default Faq
