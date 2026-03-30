import React, {useState, useEffect} from 'react'
import "./Method.css"
import { Container, Row, Col, Accordion, Button, Form, Image} from 'react-bootstrap';
import {  FaMusic,FaSearch } from 'react-icons/fa';
import BestMethod from  "../.../../../Images/team/bc-main-flier.jpeg"
import Seo from '../../Seo'
import { useSession } from '../../../context/SessionContext';

const Method = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const { session, savePreferences, getPreferences } = useSession();

  // Dynamic levels array (expanded with icons/images - placeholders; customize)
  const levels = [
    {
      level: 1,
      title: 'Getting Started On The Piano',
      description: 'Introduces beginners to the piano, covering setup, note identification, scales, and a first real song.',
      icon: <FaMusic className="text-orange me-2" size={24} />,
      image: BestMethod, // Placeholder image for level 1
      subCourses: [
        { name: 'How To Use The Method', lessons: 5, desc: 'Selecting keyboard, setting up practice space, goal-setting.' },
        { name: 'Welcome To The Keyboard', lessons: 8, desc: 'Posture, scales, chords, confidence-building.' },
        { name: 'Theory & Ear Training', lessons: 4, desc: 'Melodic/rhythmic patterns, rhythm understanding.' },
      ],
    },
    {
      level: 2,
      title: 'Keyboard Confidence & Control',
      description: 'Focuses on making scale practice musical, building confidence, and establishing good practice habits.',
      icon: <FaMusic className="text-orange me-2" size={24} />,
      image: BestMethod, // Placeholder image for level 2
      subCourses: [
        { name: 'Developing Your Hands', lessons: 4, desc: 'Technique + creativity with scales, chords, progressions.' },
        { name: 'The Music', lessons: 5, desc: 'Two new songs with different time signatures and rhythms.' },
        { name: 'Theory & Ear Training', lessons: 3, desc: '6/8 time, memory, ear training.' },
      ],
    },
    {
      level: 3,
      title: 'The Key To Beautiful Music',
      description: 'Deep dive into piano chords, inversions, and "fancy" chords for improvisation.',
      icon: <FaMusic className="text-orange me-2" size={24} />,
      image: BestMethod, // Placeholder image for level 3
      subCourses: [
        { name: 'Chording', lessons: 4, desc: 'Minor scales, chord formulas, intervals.' },
        { name: 'The Music', lessons: 5, desc: 'New song + Sus chords.' },
        { name: 'Theory & Ear Training', lessons: 6, desc: 'Interval identification, chord progressions, clap-back challenges.' },
      ],
    },
    {
      level: 4,
      title: 'Playing Chords Like A Pro',
      description: 'Advanced chord playing in new keys, with riffs, fills, and ear training for key signatures.',
      icon: <FaMusic className="text-orange me-2" size={24} />,
      image: BestMethod, // Placeholder image for level 4
      subCourses: [
        { name: 'Playing In New Keys', lessons: 6, desc: 'G major, 7th chords.' },
        { name: 'The Music', lessons: 4, desc: 'Riffs, fills, rhythm patterns, left-hand accompaniment.' },
        { name: 'Theory and Ear Training', lessons: 5, desc: 'Identifying key signatures, chord progressions, 7th chords.' },
      ],
    },
    {
      level: 5,
      title: 'How To Read (And Write) Music',
      description: 'Introduces notation reading (treble, bass, grand staff) and writing original music.',
      icon: <FaMusic className="text-orange me-2" size={24} />,
      image: BestMethod, // Placeholder image for level 5
      subCourses: [
        { name: 'Introduction To Sight Reading', lessons: 6, desc: 'Treble/bass clef, grand staff.' },
        { name: 'Key Signatures And Accidentals', lessons: 7, desc: 'Sharps, flats, new keys.' },
        { name: 'Theory And Ear Training', lessons: 3, desc: 'Writing music, pattern playback, ledger lines.' },
      ],
    },
    {
      level: 6,
      title: 'Developing Your Musicality',
      description: 'Focuses on sustain pedal, phrasing, dynamics, and playing from lead sheets.',
      icon: <FaMusic className="text-orange me-2" size={24} />,
      image: BestMethod, // Placeholder image for level 6
      subCourses: [
        { name: 'Warm Ups & Technique', lessons: 4, desc: 'Practice routines, finger limbering.' },
        { name: 'Sight Reading', lessons: 6, desc: '3/4 time, waltz, minor keys.' },
        { name: 'The Music', lessons: 5, desc: 'Familiar songs, lead sheets, improvisation with harmonic minor scale.' },
        { name: 'Ear Training & Theory', lessons: 4, desc: 'Minor scales, intervals, chords.' },
      ],
    },
    {
      level: 7,
      title: 'Common Piano Player Problems',
      description: 'Solves technical and conceptual challenges like hand independence and key signatures.',
      icon: <FaMusic className="text-orange me-2" size={24} />,
      image: BestMethod, // Placeholder image for level 7
      subCourses: [
        { name: 'The Circle Of 5ths', lessons: 6, desc: 'Tool for playing in all keys.' },
        { name: 'Solving Piano Player Problems', lessons: 5, desc: 'Hand coordination, independence.' },
        { name: 'Creative Technique Practice', lessons: 5, desc: 'Fun, effective technique routines.' },
        { name: 'The Music: How To Improvise', lessons: 4, desc: 'Improvisational templates, backing tracks.' },
      ],
    },
    {
      level: 8,
      title: 'Exploring Musical Styles',
      description: 'Covers Classical, Blues, and Jazz styles across different eras.',
      icon: <FaMusic className="text-orange me-2" size={24} />,
      image: BestMethod, // Placeholder image for level 8
      subCourses: [
        { name: 'Classical', lessons: 13, desc: 'Pieces from three main eras.' },
        { name: 'Blues', lessons: 8, desc: 'Basics and exploration of the genre.' },
        { name: 'Jazz', lessons: 9, desc: 'Develop musical literacy and understanding.' },
      ],
    },
    {
      level: 9,
      title: 'Composition And Songwriting',
      description: 'Teaches song structure, composition techniques, and cross-genre writing.',
      icon: <FaMusic className="text-orange me-2" size={24} />,
      image: BestMethod, // Placeholder image for level 9
      subCourses: [
        { name: 'Composition Techniques', lessons: 3, desc: 'Formula-based composition.' },
        { name: 'Structuring Your Creativity', lessons: 4, desc: 'Song structure, arrangement, polishing.' },
        { name: 'Playing In Different Genres', lessons: 4, desc: 'Applying skills across styles.' },
      ],
    },
    {
      level: 10,
      title: 'Go Anywhere On The Piano',
      description: 'Final level on lifelong learning, practice routines, band performance, and gigging.',
      icon: <FaMusic className="text-orange me-2" size={24} />,
      image: BestMethod, // Placeholder image for level 10
      subCourses: [
        { name: 'The Next Steps For Learning & Playing Songs', lessons: 8, desc: 'Sight reading, personal touches.' },
        { name: 'The Next Steps For Technique & Improvising', lessons: 5, desc: 'Technique tips, improvisational templates.' },
        { name: 'Developing Your Musicianship', lessons: 5, desc: 'Playing with others, creative spin on pieces.' },
      ],
    },
  ];

  // Filter levels based on search
  const filteredLevels = levels.filter(level =>
    level.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    level.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    level.subCourses.some(sub => sub.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    if (session) {
      savePreferences({ ...getPreferences(), lastPage: '/methods' });
    }
  }, [session, savePreferences, getPreferences]);


  return (
  
    <React.Fragment>


      <Seo 
  title="Our Proven Methods | Science-Backed Vocal Training at Bestcoach"
  description="Discover the unique Bestcoach Music methods – combining vocal science, community feedback, and real-time mentorship for faster singing progress."
  keywords="bestcoach methods, vocal training techniques, singing methodology, proven vocal methods"
  image="https://tonara.com/wp-content/themes/tonara/img/tutorials/tutorials_page_banner.jpg"
/>

      <section className="method-page">
      {/* Hero Header */}
      <div className="hero-method bg-primary text-white text-center py-5 animate-fade-in">
        <h1 className="text-method display-3 fw-bold mb-4">The BestCoach Music  Method</h1>
        <p className="lead-method-new mb-5">Your clear path to playing your musical instrument, frustration-free!</p>
        <Button variant="light" size="lg" to="/method" className="animate-bounce-in">Our Methods</Button>
      </div>

      {/* Levels Section */}
      <Container className="py-5">
        <h2 className="text-center mb-5 text-primary animate-slide-up">Your Step-by-Step Journey</h2>
        <Form className="mb-5 d-flex justify-content-center animate-fade-in">
          <Form.Control 
            type="text" 
            placeholder="Search levels or lessons..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="w-50 me-2"
          />
          <Button variant="primary"><FaSearch /></Button>
        </Form>

        <Accordion defaultActiveKey="0">
          {filteredLevels.map((level, idx) => (
            <Accordion.Item eventKey={idx.toString()} key={idx} className="mb-3 animate-slide-up" style={{ animationDelay: `${0.2 * idx}s` }}>
              <Accordion.Header>
                {level.icon} <span className="fw-bold">Level {level.level}: {level.title}</span>
              </Accordion.Header>
              <Accordion.Body>
                <Row className="align-items-center">
                  <Col md={6} className="mb-3 mb-md-0 animate-zoom-in">
                    <Image src={level.image} alt={`Level ${level.level} illustration`} fluid className="rounded shadow level-image" />
                  </Col>
                  <Col md={6} className="animate-fade-in">
                    <p className="lead mb-4">{level.description}</p>
                    <h5 className="mb-3 text-primary">Sub-Courses</h5>
                    <ul className="list-group list-group-flush">
                      {level.subCourses.map((sub, sIdx) => (
                        <li key={sIdx} className="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{sub.name}</strong> ({sub.lessons} lessons)
                            <p className="text-muted mb-0">{sub.desc}</p>
                          </div>
                          <Button variant="outline-primary" size="sm">View Lessons</Button>
                        </li>
                      ))}
                    </ul>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>

      {/* CTA */}
      <Container className="py-5 text-center bg-light">
        <h2 className="mb-4 text-primary animate-slide-up">Ready to Start Your Journey?</h2>
        <Button variant="primary" size="lg" className="animate-bounce-in">Start for Free</Button>
      </Container>
    </section>
        
    </React.Fragment>


  )
}

export default Method
