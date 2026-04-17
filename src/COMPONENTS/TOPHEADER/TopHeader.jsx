// src/COMPONENTS/TopHeader.jsx
import React from 'react';
import { 
  FaMapMarkerAlt, 
  FaEnvelope 
} from 'react-icons/fa';
import { 
  FaFacebookF,  
  FaInstagram, 
  FaTiktok, FaWhatsapp
} from 'react-icons/fa';
import { BsTwitterX } from "react-icons/bs";
import './TopHeader.css'; // We'll create this next

const TopHeader = () => {
  return (

    <React.Fragment>
    <div className="top-header">
      <div className="top-header-container">
        {/* Left: Contact Info */}
        <div className="contact-info-top-header" data-aos="fade-right"      data-aos-duration="800">
          <div className="info-item-top-header">
            <FaMapMarkerAlt className="icon" />
            <span>Greater Accra Region 0023 Ghana</span>
          </div>
          <div className="info-item-top-header">
            <FaEnvelope className="icon" />
            <span>bestcoachmusic@gmail.com</span>
          </div>
        </div>

{/* CENTER: Animated Handwritten Text */}
<div class="handwriting-center text-orange" data-aos="fade-down" deta-os-duration="1000" data-aos-delay="400">
<span class="handwritten-text">
  ♫ Transforming lives one beat at a time.♪
</span>
</div>
        

        {/* Right: Social Icons */}
        <div className="social-section-top-header" data-aos="fade-left" data-aos-duration="8000"
         data-aos-delay="500">
          <div className="brand-initial"> <a href="https://wa.me/message/CJZ4XQCNRWWTB1" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="social-icon-top-header">
            <FaWhatsapp />
          </a></div>
          
          <a href="https://facebook.com/bestcoachmusic" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="social-icon-top-header">
            <FaFacebookF />
          </a>
          <a href="https://x.com/BestCoachMusic" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="social-icon-top-header">
            <BsTwitterX />
          </a>
          <a href="https://www.instagram.com/bestcoachmusic?igsh=YWhpbHMwc3UzNWth" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="social-icon-top-header">
            <FaInstagram />
          </a>
          <a href="https://vm.tiktok.com/ZMS68pSTC/" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="social-icon-top-header">
            <FaTiktok />
          </a>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
};

export default TopHeader;