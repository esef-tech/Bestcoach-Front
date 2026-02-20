import React from 'react'
import { Container } from 'react-bootstrap'
import Header from '../../HEADER/Header'
import Programs from '../../PROGRAMS/Programs'
import Register from '../../REGISTER/Register'




const Home = () => {
  return (
    <>
    <Container fluid className="p-0">
      <Header />
      <Programs />
      <Register />
    </Container>
    </>
  )
}

export default Home
