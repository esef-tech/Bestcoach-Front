// src/COMPONENTS/TopHeader.jsx
import React, { useState, useEffect } from 'react';
import {
  FaMapMarkerAlt,
  FaEnvelope
} from 'react-icons/fa';
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp
} from 'react-icons/fa';
import { BsTwitterX } from "react-icons/bs";
import './TopHeader.css';

const TopHeader = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <React.Fragment>
      <header 
        className={`top-header ${scrolled ? 'scrolled' : ''}`}
        aria-label="Top Header"
      >
        <div className="top-header-container">
          
          {/* Left: Contact Info */}
          <div className="contact-info-top-header" data-aos="fade-right" data-aos-duration="800">
            <div className="info-item-top-header">
              <FaMapMarkerAlt className="icon" aria-hidden="true" />
              <span>Greater Accra Region 0023 Ghana</span>
            </div>
            <div className="info-item-top-header">
              <FaEnvelope className="icon" aria-hidden="true" />
              <span>bestcoachmusic@gmail.com</span>
            </div>
          </div>

          {/* CENTER: Animated Handwritten Text */}
          <div 
            className="handwriting-center text-orange" 
            data-aos="fade-down" 
            data-aos-duration="1000" 
            data-aos-delay="400"
          >
            <span className="handwritten-text">
              ♫ Transforming lives one beat at a time.♪
            </span>
          </div>

          {/* Right: Social Navigation */}
          <nav 
            className="social-section-top-header" 
            data-aos="fade-left" 
            data-aos-duration="800" 
            data-aos-delay="500"
            aria-label="Social Media Links"
          >
            <a 
              href="https://wa.me/message/CJZ4XQCNRWWTB1"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-top-header"
              aria-label="Chat with us on WhatsApp"
            >
              <FaWhatsapp aria-hidden="true" />
            </a>

            <a 
              href="https://facebook.com/bestcoachmusic"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-top-header"
              aria-label="Visit our Facebook page"
            >
              <FaFacebookF aria-hidden="true" />
            </a>

            <a 
              href="https://x.com/BestCoachMusic"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-top-header"
              aria-label="Follow us on X (formerly Twitter)"
            >
              <BsTwitterX aria-hidden="true" />
            </a>

            <a 
              href="https://www.instagram.com/bestcoachmusic?igsh=YWhpbHMwc3UzNWth"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-top-header"
              aria-label="Follow us on Instagram"
            >
              <FaInstagram aria-hidden="true" />
            </a>

            <a 
              href="https://vm.tiktok.com/ZMS68pSTC/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-top-header"
              aria-label="Follow us on TikTok"
            >
              <FaTiktok aria-hidden="true" />
            </a>
          </nav>
        </div>
      </header>
    </React.Fragment>
  );
};

export default TopHeader;