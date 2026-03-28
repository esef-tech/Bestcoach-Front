import React from 'react'
import { Container } from 'react-bootstrap'
import Header from '../../HEADER/Header'
import Programs from '../../PROGRAMS/Programs'
import Register from '../../REGISTER/Register'
import Seo from '../../Seo'




const Home = () => {
  return (

   <React.Fragment>
    <Seo 
  title="Bestcoach Music | Online Singing Lessons & Vocal Community"
  description="Join Bestcoach Music — the ultimate online singing community. Get real-time vocal coaching, mentorship, live webinars, and connect with singers worldwide. Start your vocal journey today."
  keywords="singing lessons online, vocal coach, music mentorship, bestcoach music, singer community, voice training, online singing classes"
  image="https://bestcoachmusic.netlify.app/IMAGES/bestcoach-pictures/9345.jpg"
/>
    <>
    <Container fluid className="p-0">
      <Header/>
      <Programs />
      <Register />
    </Container>
    </>
    </React.Fragment>
  )
}

export default Home
