import React from 'react'
import './CTA.css'


const CTA = () => {
    const galleryImages = [
    "https://d21q7xesnoiieh.cloudfront.net/fit-in/670x0/filters:quality(95)/marketing/musora/lead-gen/careers/careers-images-09.webp", // Studio with camera
    "https://www.washingtonperformingarts.org/wp-content/uploads/2023/12/about-the-choir-RS89401_2023LivingTheDream_FEB5_00758-lpr.webp", // Live event
    "https://images.unsplash.com/photo-1552664730-d307ca884978", // Man with dog
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c", // Team group
    "https://bestcoach-front.vercel.app/static/media/9345.cc62baa0e2d8a0f3b408.webp", // Woman at desk
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee"  // Cute dog
  ];
  return (
    <React.Fragment>
      
    <section className="cta-section">
      <div className="cta-container">
        {/* Header Text */}
        <div className="cta-header">
          <p className="pre-title">IF YOU RESONATE WITH THESE THEN...</p>
          
          <div className="main-quote">
            <span className="quote-mark left">“</span>
            <h1 className="quote-text">
              LET’S FILL<br />THE WORLD<br />WITH MUSIC!
            </h1>
            <span className="quote-mark right">”</span>
          </div>
        </div>

        {/* Image Gallery Grid */}
        <div className="gallery-grid">
          {galleryImages.map((src, index) => (
            <div 
              key={index} 
              className={`gallery-item gallery-item-${index + 1}`}
            >
              <img 
                src={src} 
                alt={`Bestcoach Music Loyalty moment ${index + 1}`}
                loading="lazy"
              />
              <div className="image-hover-overlay"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </React.Fragment>
  )
}

export default CTA
