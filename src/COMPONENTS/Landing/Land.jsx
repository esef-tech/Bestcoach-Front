import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Form, Button, Alert} from 'react-bootstrap'
import {FaFacebook, FaInstagram, FaWhatsapp, FaTiktok }  from 'react-icons/fa'
import './Land.css'
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';



const Land = () => {

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [email, setEmail] = useState(0);
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });
  //const [subscribed, setSubscribed] = useState(false);


  // Countdown Logic (unchanged)
  useEffect(() => {
    const countDownDate = new Date("Sep 1, 2026 12:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
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

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus({ loading: true, success: false, error: '' });

    try {
      await addDoc(collection(db, 'launch-notifications'), {
        email: email,
        timestamp: serverTimestamp(),
        subscribedAt: new Date().toISOString()
      });

      setStatus({ loading: false, success: true, error: '' });
      setEmail(''); // Clear email field

      // Auto-hide success message after 4 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 4000);

    } catch (err) {
      console.error(err);
      setStatus({ 
        loading: false, 
        success: false, 
        error: 'Failed to subscribe. Please try again.' 
      });
    }
  };

  return (

<React.Fragment>
  <div className="landing-page">
        <Container className="min-vh-100 d-flex flex-column justify-content-center text-center">
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <h1 className="display-1 fw-bold mb-4">Coming Soon</h1>
              <p className="lead mb-5">We're working hard to bring you something amazing. Stay tuned!</p>

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
                    <Button type="submit" className="btn-notify" disabled={status.loading}>
                      {status.loading ? 'Submitting...' : 'Notify Me'}
                    </Button>
                  </div>
                </Form>

                {status.success && (
                  <Alert variant="success" className="mt-3 d-inline-block">
                    Thank you! We'll notify you soon 🎉
                  </Alert>
                )}
                {status.error && (
                  <Alert variant="danger" className="mt-3 d-inline-block">
                    {status.error}
                  </Alert>
                )}
              </div>

              {/* Social Media Links */}
              <div>
                <a href="https://facebook.com/bestcoachmusic" className="social-icon"><FaFacebook /></a>
                <a href="https://vm.tiktok.com/ZMS68pSTC/" className="social-icon"><FaTiktok /></a>
                <a href="https://www.instagram.com/bestcoachmusic" className="social-icon"><FaInstagram /></a>
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
