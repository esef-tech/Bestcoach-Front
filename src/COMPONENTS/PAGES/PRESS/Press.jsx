import React from 'react'
import './Press.css'
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { FaCalendarAlt } from 'react-icons/fa';
import Seo from  '../../Seo'


const Press = () => {

    const pressEntries = [
    {
      image: 'https://www.tonara.com/wp-content/uploads/2021/01/summercamplogo.png',
      source: 'Summer Camp Hub',
      date: '01.12.2021',
      title: '5 Best Online Piano Lessons For Kids 2021',
      link: 'https://summercamphub.com/best-online-piano-lessons-for-kids/',
    },
    {
      image: 'https://www.tonara.com/wp-content/uploads/2021/01/MUSICED-f64c72-round-180x180-1.png',
      source: 'Music:Ed',
      date: '01.06.2021',
      title: 'Innovation, connectivity and empowerment feature at Tonara’s music education expo',
      link: 'https://musiceducation.global/innovation-connectivity-and-empowerment-feature-at-tonaras-music-education-expo/',
    },
    {
      image: 'https://www.tonara.com/wp-content/uploads/2021/01/soundbrenner-vector-logo.png',
      source: 'Soundbrenner',
      date: '01.05.2021',
      title: '5 Tips to Keep Your Music Students Engaged In Between Lessons',
      link: 'https://www.soundbrenner.com/blog/engagement-tips/',
    },
    {
      image: 'https://www.tonara.com/wp-content/uploads/2020/11/1200px-Logo_MaestroVision.svg.png',
      source: 'MaestroVision',
      date: '10.27.2020',
      title: 'What Makes a Productive e-Learning Experience',
      link: 'https://maestrovision.com/2020/10/20/what-makes-a-productive-e-learning-experience/#tip9',
    },
    {
      image: 'https://www.tonara.com/wp-content/uploads/2020/11/upjourneylogo.png',
      source: 'Up Journey',
      date: '10.19.2020',
      title: 'How to Make Online Learning More Engaging and Interactive',
      link: 'https://upjourney.com/how-to-make-online-learning-more-engaging-and-interactive',
    },
    {
      image: 'https://www.tonara.com/wp-content/uploads/2020/10/startup-info-logo-blue-black.jpg',
      source: 'Startup.Info',
      date: '09.14.2020',
      title: 'How Tonara went from a Game-changer to a Lifesaver',
      link: 'https://startup.info/ohad-golan-tonara/',
    },
    {
      image: 'https://www.tonara.com/wp-content/uploads/2020/10/MCB_purple.png',
      source: 'Music Con Brio',
      date: '10.09.2020',
      title: 'Tonara Review: Six Weeks In',
      link: 'https://www.musicconbriopiano.com/piano-lesson-blog/tonara-review-six-weeks-in',
    },
    {
      image: 'https://www.tonara.com/wp-content/uploads/2020/07/2019-Best-Tools-for-Schools_2020.jpg',
      source: 'SBO Magazine',
      date: '03.03.2020',
      title: 'Best Tool for Schools 2020',
      link: 'https://sbomagazine.com/resources/1440-best-tools-for-schools/6922-2020-best-tools-for-schools-awards.html',
    },
    {
      image: 'https://www.tonara.com/wp-content/uploads/2020/06/88PK_01_COLORsmall.png',
      source: '88 Piano Keys',
      date: '05.04.2020',
      title: 'Is Tonara Worth The Effort?',
      link: 'https://www.leilaviss.com/blog/tonara',
    },
    {
      image: 'https://www.tonara.com/wp-content/uploads/2020/06/pamelataylormusic.jpg',
      source: 'Pamela Taylor Music',
      date: '04.09.2020',
      title: 'Teaching Flute & Piano Online',
      link: 'https://pamelataylormusic.com/teaching-flute-piano-online',
    },
    {
      image: 'https://www.tonara.com/wp-content/uploads/2020/06/JESSICA-PERESTA-logo.png',
      source: 'The Domestic Musician',
      date: '03.19.2020',
      title: 'Music Can Be Taught Differently By Using Tonara',
      link: 'https://www.thedomesticmusician.com/music-can-be-taught-differently-by-using-tonara/',
    },
    {
      image: 'https://www.tonara.com/wp-content/uploads/2020/06/Musicedmentorlogo.png',
      source: 'Music Ed Mentor',
      date: '10.19.2019',
      title: 'Favorite Apps for Student Practice',
      link: 'https://www.musicedmentor.com/blog/favorite-apps-for-student-practice',
    },
  ];


  return (
    <React.Fragment>
      <Seo 
  title="Press & Media | Bestcoach Music in the News"
  description="See where Bestcoach Music has been featured. Press coverage, interviews, and media mentions about our singing community and mentorship programs."
  keywords="bestcoach music press, music education news, singing platform media, vocal coaching in the press"
  image="https://tonara.com/wp-content/themes/tonara/img/tutorials/tutorials_page_banner.jpg"
/>
      <section className="press-page">
      {/* Header with image background */}
      <div className="header-press text-white text-center py-5 animate-fade-in">
        <h1 className="display-3 fw-bold">Press</h1>
        <p className="lead-press text-orange">Stay updated with the latest Bestcoach Music news!</p>
      </div>

      {/* Press Entries */}
      <Container className="py-5">
        <Row>
          {pressEntries.map((entry, idx) => (
            <Col lg={12} className="mb-4 animate-slide-up" key={idx} style={{ animationDelay: `${0.2 * idx}s` }}>
              <Card className="shadow border-0 h-100">
                <Card.Body className="d-flex align-items-center">
                  <Image src={entry.image} alt={`${entry.source} logo`} rounded className="me-4" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                  <div>
                    <h4 className="text-orange">{entry.source}</h4>
                    <div className="text-muted mb-2">
                      <FaCalendarAlt className="me-2" /> {entry.date}
                    </div>
                    <h5>{entry.title}</h5>
                    <Button variant="primary" href={entry.link} target="_blank" rel="noopener noreferrer" className="animate-bounce-in">Read More</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
    </React.Fragment>
  )
}

export default Press
