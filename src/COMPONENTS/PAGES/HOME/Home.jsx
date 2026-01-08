import React from 'react'
import { Container } from 'react-bootstrap'
import Header from '../../HEADER/Header'
import Services from '../../SECTION/Services'
import Programs from '../../PROGRAMS/Programs'
import Register from '../../REGISTER/Register'
import Team from '../../TEAM/Team'



const Home = () => {
  return (
    <>
    <Container fluid className="p-0">
      <Header />
      <Services />
      <Programs />
      <Register />
      <Team />
    </Container>
    </>
  )
}

export default Home
