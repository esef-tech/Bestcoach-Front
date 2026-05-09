import React, { useRef, useEffect } from 'react';
import "./TlpHeader.css";

const TlpHeader = () => {
  const videoRef = useRef(null);

  // Optional: Restart video if it ends (extra safety)
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleEnded = () => {
        video.play().catch(console.error);
      };
      video.addEventListener('ended', handleEnded);
      return () => video.removeEventListener('ended', handleEnded);
    }
  }, []);

  return (
    <header className="brand-header">
      {/* Video Background */}
      <div className="video-container">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="background-video"
          onError={(e) => console.error("Video failed to load:", e)}
        >
          {/* IMPORTANT: Replace with a DIRECT MP4 link (YouTube won't work) */}
          <source
            src="https://player.vimeo.com/progressive_redirect/playback/1069332461/rendition/540p/file.mp4?loc=external&signature=091de529f5ff88f52584a0b882c23a6cb692594dc08bb5e4fa8393f94ccbded3" 
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="video-overlay"></div>

        {/* Subtle grain effect */}
        <div className="grain-overlay"></div>
      </div>

      {/* Content Container */}
      <div className="content-container">
        <div className="header-content">
          {/* Top Bar */}
          <div className="top-bar">
            <div className="logo-placeholder">BESTCOACH</div>
            <div className="nav-hint">MUSIC</div>
          </div>

          {/* Main Hero Text */}
          <div className="hero-text-container">
            <h1 className="brand-title">
              THE
              <span className="title-highlight">LOYALTY PROJECT</span>
            </h1>
            <p className="brand-subtitle">
              Transform. Grow. Inspire.
            </p>
          </div>

          {/* CTA Buttons (without play/pause) */}
          <div className="cta-group">
            <button className="cta-primary">
              EXPLORE THE PROJECT
            </button>
            <button className="cta-secondary">
              WATCH TRAILER
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="scroll-indicator">
            <span>SCROLL TO EXPLORE</span>
            <div className="scroll-arrow">↓</div>
          </div>
        </div>
      </div>

      {/* Mobile iPhone frame hint */}
      <div className="iphone-frame-hint">
        <div className="iphone-notch"></div>
      </div>
    </header>
  );
};

export default TlpHeader;