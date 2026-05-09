import React from 'react'
import './Loyal.css'
import LOYAL_HEADER from '../../LOYALTY-PROJECT-UI/LOYAL-HEADER'  
import Testimonial from '../../LOYALTY-PROJECT-UI/Testimonial'
import  Card from '../../LOYALTY-PROJECT-UI/CARD'
import PB from '../../TLP/UI/PB/PB.jsx'


const Loyal = () => {
  return (
    <React.Fragment>
        <LOYAL_HEADER />
        <Testimonial />
        <Card />
        <PB />

      
    </React.Fragment>
  )
}

export default Loyal
