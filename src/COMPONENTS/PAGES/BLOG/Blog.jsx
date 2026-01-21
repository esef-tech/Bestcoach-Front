import React, {useState} from 'react'
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // For Read More routing
import { FaSearch, FaCalendarAlt, FaUser, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';

import './Blog.css'; 


const Blog = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [subscribeEmail, setSubscribeEmail] = useState('');
    const [subscribeStatus, setSubscribeStatus] = useState({ loading: false, success: false, error: '' });
     const postsPerPage = 3;

  // Dynamic posts from analysis (array for easy expansion; can fetch from backend/API)
   const posts = [
    {
      id: 'post-7769', 
      title: 'The Butterfly Effect in Online Teaching',
      date: 'June 1, 2021 - July 1, 2021',
      author: 'Tonara Team',
      excerpt: 'If you are not familiar with the butterfly effect, it is essentially when small changes can make bigger changes happen. Whether or not you may agree with the butterfly effect theory, you might agree that this past year and a half most of us had to make many small changes for lessons to continue. Many […]',
      link: 'https://www.tonara.com/blog/the-butterfly-effect-teaching-online/',
      image : 'https://www.tonara.com/wp-content/uploads/2021/06/Copy-of-Blog-Cover-Photo-600_350-24.png', 
    },
    {
      id: 'piano-pedals-what-are-they-for',
      title: 'Piano Pedals - What Are They For and How to Use Them',
      date: 'May 27, 2021 - June 24, 2021',
      author: 'Tonara Team',
      excerpt: 'One of the first questions a new student asks when sitting at the piano bench is, "What do those three pedals do?" Great question! Before diving into the details of each pedal, let\'s look at the history of them. Piano Pedals - Long, Long Ago Piano pedals have been around almost as long as the […]',
      link: '/https://www.tonara.com/blog/piano-pedals-what-are-they-for',
      image: 'https://www.tonara.com/wp-content/uploads/2021/05/Copy-of-Blog-Cover-Photo-600_350-23.png',
    },
    {
      id: 'pack-prepare-instruments-for-mov',
      title: 'How to Pack and Prepare Musical Instruments for the Move',
      date: 'May 25, 2021 - June 21, 2021',
      author: 'Tonara Team',
      excerpt: 'Taking care of your musical instrument properly is extremely important, especially since you have to invest a lot of money, time, and research on choosing and buying the right one. Hence, if you plan to move to a new home, make sure you prepare your instrument for the transfer. Instruments are not only costly but […]',
      link: 'https://www.tonara.com/blog/pack-prepare-instruments-for-move/',
      image: 'https://www.tonara.com/wp-content/uploads/2021/06/Copy-of-Blog-Cover-Photo-600_350-22.png',
    },
    {
      id: 'how-to-find-your-vocal-range',
      title: 'How to Find Your Vocal Range',
      date: 'May 20, 2021 - July 27, 2021',
      author: 'Tonara Team',
      excerpt: 'The vocal range is one of several voice qualities that vocal teachers use to determine voice type. It refers to the full scope of pitches a given singer can produce, from the lowest to the highest. Other important voice qualities to consider are: Vocal tessitura (tehs-sih-‘too-rah): the area of the vocal range most comfortable for […]',
      link: 'https://www.tonara.com/blog/how-to-find-your-vocal-range/',
      image: 'https://www.tonara.com/wp-content/uploads/2021/05/Copy-of-Blog-Cover-Photo-600_350-19.png',
    },
    {
      id: 'benefits-of-music-therapy',  
      title: 'Benefits of Music Therapy',
      date: 'May 18, 2021 - May 25, 2021',
      author: 'Tonara Team',
      excerpt: 'Music is a huge part of everyday life for most people. Some are casual listeners, others live and breathe through it, but the fact is that it’s meant to help people relax, grow, and enjoy themselves in the purest way possible. Even though it can help us through our hardships without us giving it too […]',
      link: 'https://www.tonara.com/blog/benefits-of-music-therapy/',
      image: 'https://www.tonara.com/wp-content/uploads/2021/05/Benefits-of-Music-Therapy.jpg',
    },
    
    {
      id: 'history-of-moonlight-sonata',
      title: 'How to Tell if You Need Piano Tuning',
      date: 'May 11, 2021 - May 23, 2021',
      author: 'Tonara Team',
      excerpt: 'Learning to play the piano is so much fun when you are passionate about the music and want to produce your own songs. Once you have started playing fluently and feel that you can begin to practice more by yourself, you might start thinking about purchasing a piano of your own. You could have your […]',
      link: 'https://www.tonara.com/blog/history-of-moonlight-sonata/',
      image: 'https://www.tonara.com/wp-content/uploads/2021/05/Piano-Tuning.jpg',
    },
    {
      id: 'embrace-the-experience',  
      title: 'Embrace the Experience',
      date: 'May 6, 2021 - May 11, 2021',
      author: 'Tonara Team',
      excerpt: 'By Lou Ann Pope, Tonara Creative Education Specialist One of my favorite radio shows is John Tesh’s Intelligence for Your Life. I have learned so many interesting tidbits, but the best piece of advice is "Don’t buy your children things; give them experiences." So started the first of many trips with my three children. Instead […]',
      link: 'https://www.tonara.com/blog/embrace-the-experience/',
      image: 'https://www.tonara.com/wp-content/uploads/2021/05/Copy-of-Blog-Cover-Photo-600_350-15.png',
    },
    {
      id: 'musical-melody-making-memorable',  
      title: 'Musical Melody: Making it Memorable',
      date: 'May 4, 2021 - May 9, 2021',
      author: 'Tonara Team',
      excerpt: 'By Marilyn Floyd "Music melody is the part of a song that you can sing," - Marilyn Floyd I tell my music composition students. Melody is the part of the song that everyone knows and remembers. Three parameters -melody, harmony, and rhythm - make music out of a collection of sounds and beat. Melodies are the easiest […]',
      link: 'https://www.tonara.com/blog/musical-melody-making-memorable/',
      image: 'https://www.tonara.com/wp-content/uploads/2021/05/Copy-of-Blog-Cover-Photo-600_350-26.png',
    },
    
   {
     id: 'how-to-tell-if-you-need-piano-tuning',
     title: 'How to Tell if You Need Piano Tuning',
     date: 'May 11, 2021 - May 23, 2021',
     author: 'Tonara Team',
     excerpt: 'Learning to play the piano is so much fun when you are passionate about the music and want to produce your own songs. Once you have started playing fluently and feel that you can begin to practice more by yourself, you might start thinking about purchasing a piano of your own. You could have your[…]',
     link: 'https://www.tonara.com/blog/how-to-tell-if-you-need-piano-tuning/',
     image: 'https://www.tonara.com/wp-content/uploads/2021/05/Piano-Tuning.jpg',
   },
   {
    id:'musical-melody-making-memorable',
    title: 'Musical Melody: Making it Memorable',
    date: 'May 4, 2021 - May 9, 2021',
    author: 'Tonara Team',
    excerpt: 'By Marilyn Floyd "Music melody is the part of a song that you can sing," - Marilyn Floyd I tell my music composition students. Melody is the part of the song that everyone knows and remembers. Three parameters -melody, harmony, and rhythm - make music out of a collection of sounds and beat. Melodies are the easiest[…]',
    link: 'https://www.tonara.com/blog/musical-melody-making-memorable/',
    image: 'https://www.tonara.com/wp-content/uploads/2021/05/Copy-of-Blog-Cover-Photo-600_350-26.png',
   },
   {
    id:'conquer-stage-fright-3-tricks',
    title: 'How to Conquer Stage Fright: 3 Simple Tricks',
    date: 'April 29, 2021 - May 2, 2021',
    author: 'Tonara Team',
    excerpt: 'How do you get rid of stage fright? Well, you may never be rid of it 100% – a small amount of stage fright is actually not a bad thing! Well into his 60s, the renowned Duke Ellington used to say he enjoys a happy jolt of stage fright every evening. That being said, Duke[…]',
    link: 'https://www.tonara.com/blog/conquer-stage-fright-3-tricks/',
    image: 'https://www.tonara.com/wp-content/uploads/2021/04/Copy-of-Blog-Cover-Photo-600_350-25.png',
   },
   {
    id: 'piano-hand-flexibility',
    title: 'Piano Hands SHould Be Flexible Hands',
    date: 'April 20, 2021',
    author: 'Tonara Team',
    excerpt: 'Whether a beginner or an advanced player, a pianist should always work at keeping their hands healthy. Human hands (wrists, palms, and fingers) are made of 27 bones, 27 joints, 34 muscles, over 100 ligaments and tendons, and multiple blood vessels and nerves. Since we use our hands constantly every day, we tend to take […]',
    link: 'https://www.tonara.com/blog/piano-hand-flexibility/',
    image: 'https://www.tonara.com/wp-content/uploads/2021/04/Copy-of-Blog-Cover-Photo-600_350-15.png',
   }
  ];


  // Subscribe handler
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscribeStatus({ loading: true, success: false, error: '' });
    try {
      await axios.post('http://localhost:5000/api/subscribe', { email: subscribeEmail });
      setSubscribeStatus({ loading: false, success: true, error: '' });
      setSubscribeEmail('');
    } catch (err) {
      setSubscribeStatus({ loading: false, success: false, error: 'Subscription failed. Try again.' });
    }
  };
  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Filter current posts if search active
  const filteredCurrentPosts = currentPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };




  return (
   <React.Fragment>
    <section className="blog-page">
      {/* Header */}
      <div className="header bg-teal text-white text-center py-5 animate-fade-in">
        <h1 className="display-3 fw-bold">Bestcoach Music Blog</h1>
        <p className="lead">Insights, tips, and stories from the world of music education.</p>
      </div>

      {/* Main Content */}
      <Container className="py-5">
        <Row>
          <Col lg={8}>
            <h2 className="mb-4 text-orange animate-slide-up">Recent Posts</h2>
            {filteredCurrentPosts.map((post, idx) => (
              <Card key={idx} className="mb-5 shadow border-0 animate-fade-in" style={{ animationDelay: `${0.2 * idx}s` }}>
                <Card.Body>
                  <h3 className="text-orange mb-3">{post.title}</h3>
                  <Image src={post.image} alt={`${post.title} illustration`} fluid className="mb-3 rounded animate-zoom-in" />
                  <div className="d-flex text-muted mb-3">
                    <FaCalendarAlt className="me-2" /> {post.date}
                    <FaUser className="ms-4 me-2" /> {post.author}
                  </div>
                  <p className="lead">{post.excerpt}</p>
                  <Link to={`/blog/${post.id}`} className="btn btn-orange animate-bounce-in">Read More</Link>
                </Card.Body>
              </Card>
            ))}
            {/* Pagination */}
            <div className="text-center">
              <Button variant="outline-orange" className="mx-1" onClick={handlePrev} disabled={currentPage === 1}><FaArrowLeft /> Previous</Button>
              <span className="mx-2">Page {currentPage} of {totalPages}</span>
              <Button variant="outline-orange" className="mx-1" onClick={handleNext} disabled={currentPage === totalPages}>Next <FaArrowRight /></Button>
            </div>
          </Col>

          {/* Sidebar */}
          <Col lg={4} className="mt-5 mt-lg-0 animate-slide-right">
            <div className="mb-5">
              <h2 className="mb-4 text-orange">Search</h2>
              <Form className="input-group">
                <Form.Control type="text" placeholder="Search blog..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <Button variant="orange" type="submit"><FaSearch /></Button>
              </Form>
            </div>

            <div className="mb-5">
              <h2 className="mb-4 text-orange">Categories</h2>
              <ul className="list-group">
                <li className="list-group-item"><a href="https://www.instagram.com/bestcoachmusic?igsh=YWhpbHMwc3UzNWth">Music Education</a></li>
                <li className="list-group-item"><a href="https://www.instagram.com/bestcoachmusic?igsh=YWhpbHMwc3UzNWth">Instrument Tips</a></li>
                <li className="list-group-item"><a href="https://www.instagram.com/bestcoachmusic?igsh=YWhpbHMwc3UzNWth">Teaching Strategies</a></li>
                <li className="list-group-item"><a href="https://www.instagram.com/bestcoachmusic?igsh=YWhpbHMwc3UzNWth">Student Stories</a></li>
              </ul>
            </div>

            <div className="mb-5">
              <h2 className="mb-4 text-orange">Subscribe</h2>
              <Form>
                <Form.Control type="email" placeholder="Your email" className="mb-3" />
                <Button variant="orange" block>Subscribe</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    
   </React.Fragment>
  )
}

export default Blog
