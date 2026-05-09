import React from 'react'
import './Loyalty.css'
import TlpHeader from './UI/TlpHeader.jsx'
import ImageHero from './UI/ImageHero/ImageHero.jsx'
import CTA from './UI/CTA/CTA.jsx'
import WTE from './UI/WTE/WTE.jsx'
import PB from './UI/PB/PB.jsx'
import Enroll from './UI/Enroll/Enroll.jsx'




const Loyalty = () => {
  return (
    <React.Fragment>
      <TlpHeader />
      <ImageHero />
      <CTA />
      <WTE />
      <PB />
      <Enroll />
      
    </React.Fragment>
  )
}

export default Loyalty
