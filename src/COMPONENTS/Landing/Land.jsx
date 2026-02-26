import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Form, Button, Alert} from 'react-bootstrap'
import {FaFacebook, FaInstagram, FaWhatsapp, FaTiktok }  from 'react-icons/fa'
import './Land.css'



const Land = () => {

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [email, setEmail] = useState(0);
  const [subscribed, setSubscribed] = useState(false);


  //Countdown Logic 
  useEffect(() => {
    const counDownDate = new Date("Sep 1, 2026 12:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = counDownDate - now;


      if ( distance < 0){
        clearInterval(timer);

      }

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);

    }, 1000);

    return () => clearInterval(timer)

}, [] );

const  handleSubscribe = (e) => {
  e.preventDefault();
  if(email){
      setSubscribed(true);
setEmail('');
 //connect to backend to save email
  }

};

  return (

<React.Fragment>
  <div className="landing-page">
    <Container className="min-vh-100 de-flex flex-column justify-content-centre text-centre">
      <Row className="justify-content-centre">
        <Col md={10} lg={8}>
        <h1 className="display-1 fw-bold mb-4">Coming Soon</h1>
        <p className="lead mb-5">We are working hard to bring you something amazing. Stay tuned!</p>
        {/* Countdown Timer */}
        <div className="row mb-5 countdown-row">
          <div className="col-3">
            <div className="countdown-item">{days.toString().padStart(2, '0')}</div>
            <div className="countdown-label">Days</div>
          </div>
           <div className="col-3">
            <div className="countdown-item">{hours.toString().padStart(2, '0')}</div>
            <div className="countdown-label">Hours</div>
          </div>
           <div className="col-3">
            <div className="countdown-item">{minutes.toString().padStart(2, '0')}</div>
            <div className="countdown-label">Minutes</div>
          </div>
           <div className="col-3">
            <div className="countdown-item">{seconds.toString().padStart(2, '0')}</div>
            <div className="countdown-label">Seconds</div>
          </div>
        </div>
        {/* Subscription Form */}
        <div className="mb-5">
          <h4 className="mb-3">Get notified when we launch:</h4>
          {!subscribed ?(

            <Form onSubmit={handleSubscribe} className="row g-3 justify-content-center">
                  <div className="col-auto">
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-auto">
                    <Button type="submit" className="btn-notify">Notify Me</Button>
                  </div>
                </Form> 
                 ) : (
                <Alert variant="success" className="d-inline-block">Thank you! We'll notify you soon 🎉</Alert>
          )}
        </div>
        {/* Social Media Links */}
        <div>
              <a href="https://facebook.com/bestcoachmusic" className="social-icon"><FaFacebook /></a>
              <a href="https://vm.tiktok.com/ZMS68pSTC/" className="social-icon"><FaTiktok /></a>
              <a href="https://www.instagram.com/bestcoachmusic?igsh=YWhpbHMwc3UzNWth" className="social-icon"><FaInstagram /></a>
              <a href="https://wa.me/message/CJZ4XQCNRWWTB1" className="social-icon"><FaWhatsapp /></a>
            </div>
        </Col>
      </Row>
    </Container>
  </div>


    </ React.Fragment>
  )
}

export default Land
