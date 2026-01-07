import React from 'react'
import './Team.css'
import { Container, Row, Col } from 'react-bootstrap';
import { FaTwitter, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import Tilt from 'react-parallax-tilt'; // For 3D tilt effect on cards


const Team = () => {

const teamMembers = [
    {
      name: 'Emmanuel Ameko',
      role: 'Founder',
      image: '/Images/team/25.jpg', // Professional founder portrait from search
    },
    {
      name: 'Tracy Boful',
      role: 'Data Analyst',
      image: '/Images/team/22.jpg', // Analyst portrait
    },
    {
      name: 'Emmanuel Mamabah',
      role: 'Head of Operations',
      image: '/Images/team/23.jpg', // Operations head portrait
    },
    {
      name: 'Gifty Tracy',
      role: 'Procurement Officer',
      image: '/Images/team/30.jpg', // Procurement officer portrait
    },
  ];


  return (
    <>
      <section id="team" className="team-section">
      {/* Background Particles */}
      <div className="particle">♪</div>
      <div className="particle">♫</div>
      <div className="particle">♬</div>
      <div className="particle">♪</div>
      <div className="particle">♫</div>

      <Container>
        <div className="text-center pb-2 team-title">
          <p className="section-title px-5"><span className="px-2">Our Team</span></p>
          <h1 className="mb-4">Team Bestcoach</h1>
        </div>
        <Row>
          {teamMembers.map((member, idx) => (
            <Col md={6} lg={3} className="team-card" key={idx}>
              <Tilt options={{ max: 25, scale: 1.05 }}> {/* 3D tilt for extraordinary effect */}
                <div className="team-image-wrapper">
                  <img src={member.image} alt={member.name} className="team-image" />
                  <div className="team-overlay">
                    <a href="#" className="social-btn"><FaTwitter /></a>
                    <a href="#" className="social-btn"><FaFacebookF /></a>
                    <a href="#" className="social-btn"><FaLinkedinIn /></a>
                  </div>
                </div>
              </Tilt>
              <h4 className="team-name">{member.name}</h4>
              <i className="team-role">{member.role}</i>
            </Col>
          ))}
        </Row>
      </Container>
    </section>

    </>
  )
}

export default Team
