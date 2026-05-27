// src/COMPONENTS/TopHeader.jsx
import React, { useState, useEffect } from 'react';
import {
  FaMapMarkerAlt, FaEnvelope
} from 'react-icons/fa';
import {
  FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp
} from 'react-icons/fa';
import { BsTwitterX } from "react-icons/bs";
import './TopHeader.css';

const TopHeader = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`top-header ${scrolled ? 'scrolled' : ''}`} aria-label="Top Header">
      <div className="top-header-container">
        {/* Left: Contact Info */}
        <div className="contact-info-top-header">
          <div className="info-item-top-header">
            <FaMapMarkerAlt className="icon" />
            <span>Greater Accra Region 0023 Ghana</span>
          </div>
          <div className="info-item-top-header">
            <FaEnvelope className="icon" />
            <span>bestcoachmusic@gmail.com</span>
          </div>
        </div>

        {/* Center: Handwritten Text */}
        <div className="handwriting-center">
          <span className="handwritten-text">
            ♫ Transforming lives one beat at a time. ♪
          </span>
        </div>

        {/* Right: Social Icons */}
        <nav className="social-section-top-header" aria-label="Social Media Links">
          <a href="https://wa.me/message/CJZ4XQCNRWWTB1" target="_blank" rel="noopener noreferrer" className="social-icon-top-header">
            <FaWhatsapp />
          </a>
          <a href="https://facebook.com/bestcoachmusic" target="_blank" rel="noopener noreferrer" className="social-icon-top-header">
            <FaFacebookF />
          </a>
          <a href="https://x.com/BestCoachMusic" target="_blank" rel="noopener noreferrer" className="social-icon-top-header">
            <BsTwitterX />
          </a>
          <a href="https://www.instagram.com/bestcoachmusic" target="_blank" rel="noopener noreferrer" className="social-icon-top-header">
            <FaInstagram />
          </a>
          <a href="https://vm.tiktok.com/ZMS68pSTC/" target="_blank" rel="noopener noreferrer" className="social-icon-top-header">
            <FaTiktok />
          </a>
        </nav>
      </div>
    </header>
  );
};

export default TopHeader;