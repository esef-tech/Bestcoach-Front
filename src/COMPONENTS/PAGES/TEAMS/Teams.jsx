import React from 'react'
import './Team.css'
import Team from '../../TEAM/Team'
import Seo from '../../Seo'

const Teams = () => {
  return (

    <React.Fragment>
      <Seo 
  title="Our Team | World-Class Vocal Coaches & Mentors at Bestcoach"
  description="Meet the passionate team of vocal coaches, singers, and music educators behind Bestcoach Music. Real experts dedicated to your singing success."
  keywords="bestcoach team, vocal coaches, music mentors, singing instructors, bestcoach music team"
  image="https://bestcoach-front.vercel.app/static/media/3.5046414ecfe9d11edfb4.jpg"
/>
    <>
      <Team />
    </>
    </React.Fragment>
  )
}

export default Teams
