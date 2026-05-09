import React from 'react'
import './Loyalty.css'
import TlpHeader from './UI/TlpHeader.jsx'
import ImageHero from './UI/ImageHero/ImageHero.jsx'
import CTA from './UI/CTA/CTA.jsx'
import WTE from './UI/WTE/WTE.jsx'
import PB from './UI/PB/PB.jsx'
import Enroll from './UI/Enroll/Enroll.jsx'
import Timonial from './UI/Timonial/Timonial.jsx'
import Seo from '../Seo.jsx'




const Loyalty = () => {
  return (
    <React.Fragment>
       <Seo 
  title="Bestcoach Music | The Loyalty Project (TLP)"
  description="Join Bestcoach Music The Loyalty Project (TLP)— the ultimate online singing community. Get real-time vocal coaching, mentorship, live webinars, and connect with singers worldwide. Start your vocal journey today."
  keywords="singing lessons online, vocal coach, music mentorship, bestcoach music, singer community, voice training, online singing classes"
  image="https://bestcoach-front.vercel.app/static/media/Coach.9f8dc9ce950601b9cc93.webp"
/>
    <>
      <TlpHeader />
      <ImageHero />
      <CTA />
      <WTE />
      <PB />
      <Enroll />
      <Timonial/>
      </>
    </React.Fragment>
  )
}

export default Loyalty
