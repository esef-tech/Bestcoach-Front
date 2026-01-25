import React, {useState} from 'react'
import  './Parents.css';
import { Container, Row, Col, Card, Form, Button,} from 'react-bootstrap';

const Parents = () => {
    const [searchQuery, setSearchQuery] = useState('');
    
        // Dynamic sections array (from analyzed data)
      const sections = [
        {
          title: 'Bestcoach Connect: Getting Started (12)',
          articles: [
            { title: 'Step 1: Build Your Profile', link: '/help/teacher-support/build-your-profile' },
            { title: 'Step 2: Market Yourself and Gain Students', link: '/help/teacher-support/market-yourself' },
            { title: 'Step 3: Stay Active', link: '/help/teacher-support/stay-active' },
            { title: 'Step 4: Hold Lessons & Send Assignments', link: '/help/teacher-support/lessons-assignments' },
            { title: 'Step 5: Handle Payments with the Student', link: '/help/teacher-support/handle-payments' },
            // ... add remaining 7 placeholders or full links
          ],
          viewAll: '/help/teacher-support/getting-started',
        },
        {
          title: 'Bestcoach Connect: Lessons (5)',
          articles: [
            { title: 'I received a lesson request, what now?', link: '/help/teacher-support/lesson-request-actions' },
            { title: 'Lesson cancelation policy for teachers', link: '/help/teacher-support/lesson-cancelation-policy' },
            { title: 'What is the Ongoing Support package? Is it recommended?', link: '/help/teacher-support/ongoing-support-package' },
            { title: 'Is it worth it for me to offer a 30-minute Free Trial to potential students?', link: '/help/teacher-support/offering-free-trial' },
            { title: 'What are the different types of lessons I can offer?', link: '/help/teacher-support/types-of-lessons' },
          ],
          viewAll: '/help/teacher-support/lessons',
        },
        {
          title: 'Rock Out Loud Live (14)',
          articles: [
            { title: 'Best practices for the ultimate virtual lesson experience', link: '/help/teacher-support/best-practices-virtual-lesson' },
            { title: 'How do I start the virtual music lesson?', link: '/help/teacher-support/start-virtual-lesson' },
            { title: 'How can I help my students and their parents get set up on Rock Out Loud Live?', link: '/help/teacher-support/students-parents-setup' },
            { title: 'How do I get set up for a duet?', link: '/help/teacher-support/setup-duet' },
            { title: 'I need help with troubleshooting the connection.', link: '/help/teacher-support/troubleshooting-connection' },
            // ... add remaining 9
          ],
          viewAll: '/help/teacher-support/rock-out-loud-live',
        },
        // ... add remaining sections similarly (Payment, Account Settings, General, Studio sections)
    
        {
            title: 'Payments & Payouts (13)',
            articles: [
              { title: 'How do I get paid?', link: '/help/teacher-support/get-paid' },
              { title: 'How do I set up my payment information?', link: '/help/teacher-support/setup-payment-info' },
              { title: 'What are the payment methods available?', link: '/help/teacher-support/payment-methods' },
              { title: 'How do I view my earnings?', link: '/help/teacher-support/view-earnings' },
              { title: 'What is the payout schedule?', link: '/help/teacher-support/payout-schedule' },
              { title: 'How do I request a payout?', link: '/help/teacher-support/request-payout' },
              { title: 'What are the fees for payouts?', link: '/help/teacher-support/payout-fees' },
              { title: 'How do I update my tax information?', link: '/help/teacher-support/update-tax-info' },
            ],
            viewAll: '/help/teacher-support/payments-payouts',
        },
        {
            title: 'Account Settings & Profile (10)',
            articles: [
              { title: 'How do I update my profile?', link: '/help/teacher-support/update-profile' },
              { title: 'How do I change my password?', link: '/help/teacher-support/change-password' },
              { title: 'How do I update my email address?', link: '/help/teacher-support/update-email' },
              { title: 'How do I manage my notifications?', link: '/help/teacher-support/manage-notifications' },
              { title: 'How do I delete my account?', link: '/help/teacher-support/delete-account' },
              { title: 'How do I manage my privacy settings?', link: '/help/teacher-support/manage-privacy' },
              { title: 'How do I manage my subscription settings?', link: '/help/teacher-support/manage-subscription' },
              { title: 'How do I manage my payment methods?', link: '/help/teacher-support/manage-payment-methods' },
              { title: 'How do I manage my tax information?', link: '/help/teacher-support/manage-tax-info' },
            ],
            viewAll: '/help/teacher-support/account-settings-profile',
        },
    
        {
            title: 'Bestcoach Connect: General (11)',
            articles: [
              { title: 'How do I get set up for a duet?', link: '/help/teacher-support/setup-duet' },
              { title: 'I need help with troubleshooting the connection.', link: '/help/teacher-support/troubleshooting-connection' },
              { title: 'How do I get set up for a group?', link: '/help/teacher-support/setup-group' },
              { title: 'How do I get set up for a private lesson?', link: '/help/teacher-support/setup-private-lesson' },
              { title: 'How do I get set up for a live session?', link: '/help/teacher-support/setup-live-session' },
              { title: 'How do I get set up for a recording session?', link: '/help/teacher-support/setup-recording-session' },
              { title: 'How do I get set up for a virtual class?', link: '/help/teacher-support/setup-virtual-class' },
              { title: 'How do I get set up for a workshop?', link: '/help/teacher-support/setup-workshop' },
              { title: 'How do I get set up for a masterclass?', link: '/help/teacher-support/setup-masterclass' },
              { title: 'How do I get set up for a podcast?', link: '/help/teacher-support/setup-podcast' },
              { title: 'How do I get set up for a webinar?', link: '/help/teacher-support/setup-webinar' },
            ],
            viewAll: '/help/teacher-support/bestcoach-connect-general',
        },
        {
            title: 'Bestcoach Studio: Getting Started (9)',
            articles: [
              { title: 'How do I get started with Bestcoach Studio?', link: '/help/teacher-support/get-started-bestcoach-studio' },
              { title: 'How do I create a new project?', link: '/help/teacher-support/create-new-project' },
              { title: 'How do I import media into Bestcoach Studio?', link: '/help/teacher-support/import-media' },
              { title: 'How do I add effects to my project?', link: '/help/teacher-support/add-effects' },
              { title: 'How do I export my project?', link: '/help/teacher-support/export-project' },
              { title: 'How do I share my project with others?', link: '/help/teacher-support/share-project' },
              { title: 'How do I manage my projects?', link: '/help/teacher-support/manage-projects' },
              { title: 'How do I access the help center for Bestcoach Studio?', link: '/help/teacher-support/help-center-bestcoach-studio' },
              { title: 'How do I reset my preferences in Bestcoach Studio?', link: '/help/teacher-support/reset-preferences-bestcoach-studio' },
            ],
            viewAll: '/help/teacher-support/bestcoach-studio-getting-started',
        },
    
        {
            title: 'Bestcoach Studio: Lessons (6)',
            articles: [
              { title: 'How do I create a lesson?', link: '/help/teacher-support/create-lesson' },
              { title: 'How do I add content to a lesson?', link: '/help/teacher-support/add-content-to-lesson' },
              { title: 'How do I edit a lesson?', link: '/help/teacher-support/edit-lesson' },
              { title: 'How do I delete a lesson?', link: '/help/teacher-support/delete-lesson' },
              { title: 'How do I share a lesson with students?', link: '/help/teacher-support/share-lesson' },
              { title: 'How do I view student progress on lessons?', link: '/help/teacher-support/view-student-progress' },
            ],
            viewAll: '/help/teacher-support/bestcoach-studio-lessons',
        },
    
       {
            title: 'Bestcoach Studio: Assignments (5)',
            articles: [
              { title: 'How do I create an assignment?', link: '/help/teacher-support/create-assignment' },
              { title: 'How do I add content to an assignment?', link: '/help/teacher-support/add-content-to-assignment' },
              { title: 'How do I edit an assignment?', link: '/help/teacher-support/edit-assignment' },
              { title: 'How do I delete an assignment?', link: '/help/teacher-support/delete-assignment' },
              { title: 'How do I share an assignment with students?', link: '/help/teacher-support/share-assignment' },
            ],
            viewAll: '/help/teacher-support/bestcoach-studio-assignments',
        },
        {
            title: 'Bestcoach Studio: Academy (6)',
            articles: [
              { title: 'How do I access the Academy?', link: '/help/teacher-support/access-academy' },
              { title: 'How do I browse courses in the Academy?', link: '/help/teacher-support/browse-courses-academy' },
              { title: 'How do I enroll in a course?', link: '/help/teacher-support/enroll-course' },
              { title: 'How do I complete a course?', link: '/help/teacher-support/complete-course' },
              { title: 'How do I view my course progress?', link: '/help/teacher-support/view-course-progress' },
              { title: 'How do I access my certificate?', link: '/help/teacher-support/access-certificate' },
            ],
            viewAll: '/help/teacher-support/bestcoach-studio-academy',
        },
        {
          title: 'Bestcoach Studio: General (18)',
          articles: [
            { title: 'Can I create a group?', link: '/help/teacher-support/create-group' },
            { title: 'Can the language of Bestcoach Studio be changed?', link: '/help/teacher-support/change-language' },
            { title: 'What languages does Bestcoach Studio support?', link: '/help/teacher-support/supported-languages' },
            { title: 'Can students access Bestcoach Studio on a Computer?', link: '/help/teacher-support/students-access-computer' },
            { title: 'How do I unsubscribe from Bestcoach Studio?', link: '/help/teacher-support/unsubscribe' },
            // ... add remaining 13
          ],
          viewAll: '/help/teacher-support/bestcoach-studio-general',
        },
      ];
    
    // Filter sections/articles based on search
      const filteredSections = sections.map(section => ({
        ...section,
        articles: section.articles.filter(article => 
          article.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(section => section.articles.length > 0 || section.title.toLowerCase().includes(searchQuery.toLowerCase()));
    


  return (
    <React.Fragment>

        <section className="teacher-support-page">
              {/* Header */}
              <div className="header-parent text-white text-center py-4 animate-fade-in">
                {/*<Image src="https://example.com/bestcoach-logo.png" alt="Bestcoach Logo" fluid style={{ maxWidth: '250px' }} className="mb-3 animate-zoom-in" />*/}
              
              </div>
        
              {/* Navigation */}
              <Container fluid className="bg-light py-3">
                <Row className="justify-content-center">
                  <Col md={10} className="d-flex justify-content-between">
                    <a href="/" className="nav-link">Home</a>
                    <a href="/help/student-support" className="nav-link">Parent Support</a>
                
                  </Col>
                </Row>
              </Container>
        
              {/* Main Content */}
              <Container className="py-5">
                <h1 className="display-4 fw-bold mb-3 animate-slide-up">Teacher Support</h1>
                <p className="lead mb-5 animate-slide-up">Find the answers to all your questions regarding Bestcoach Music platforms.</p>
        
                {/* Search Bar */}
                <Form className="mb-5 animate-fade-in">
                  <Form.Control type="text" placeholder="Search in Knowledge Base" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </Form>
        
                {/* Sections */}
                {filteredSections.map((section, idx) => (
                  <Card key={idx} className="mb-4 shadow border-0 animate-slide-up" style={{ animationDelay: `${0.2 * idx}s` }}>
                    <Card.Body>
                      <h2 className="mb-3 text-orange">{section.title}</h2>
                      <ul className="list-unstyled">
                        {section.articles.map((article, aIdx) => (
                          <li key={aIdx} className="mb-2">
                            <a href={article.link} className="text-dark">{article.title}</a>
                          </li>
                        ))}
                      </ul>
                      <Button variant="link" as="a" href={section.viewAll} className="mt-2">View All</Button>
                    </Card.Body>
                  </Card>
                ))}
              </Container>
        
              {/* Footer */}
              <div className="footer bg-light text-center py-3 animate-fade-in">
                <p className="text-muted m-0">© 2026 Bestcoach Help Center - Teaching Done Differently</p>
              </div>
            </section>
        
      
    </React.Fragment>
  )
}

export default Parents
