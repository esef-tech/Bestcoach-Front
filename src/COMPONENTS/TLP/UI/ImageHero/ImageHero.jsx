import React from 'react'
import "./ImageHero.css"

const ImageHero = () => {
    const images = [
    "https://bestcoach-front.vercel.app/static/media/24.cb44feb0337b0e1f0b46.jpg", // Group in white t-shirts
    "https://images.unsplash.com/photo-1552664730-d307ca884978", // Man at computer
    "https://d21q7xesnoiieh.cloudfront.net/fit-in/670x0/filters:quality(95)/marketing/musora/lead-gen/careers/careers-images-04.webp", // Two men talking
    "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae", // Woman singing
    "https://d21q7xesnoiieh.cloudfront.net/fit-in/670x0/filters:quality(95)/marketing/musora/lead-gen/careers/careers-images-09.webp", // Studio control room
    "https://bestcoach-front.vercel.app/static/media/Coach.9f8dc9ce950601b9cc93.webp"  // Man in blue turban
  ];
  return (
    <React.Fragment> 
    <div>
      <section className="image-hero">
      {/* Image Grid */}
      <div className="image-grid">
        {images.map((src, index) => (
          <div 
            key={index} 
            className={`grid-item grid-item-${index + 1}`}
          >
            <img 
              src={src} 
              alt={`Bestcoach team and the loyalty moment ${index + 1}`}
              loading="lazy"
            />
            <div className="image-overlay"></div>
          </div>
        ))}
      </div>

      {/* Content Section */}
      <div className="content-section">
        <div className="content-container">
          <h2 className="section-title-IH">Why The Loyalty Project</h2>
          
          <div className="text-content">
            <p>
              We believe music has the power to change the world. Picking up an instrument gives 
              someone a voice, and that voice helps them express who they truly are.
            </p>
            <p>
              When we build our music lesson communities, we put relationships first, always before 
              technology. We're here to help students grow and stay inspired.
            </p>
            <p>
              Joining The Loyalty Project  means more than a job. It's a mission. You'll care about the details, 
              and we'll care about you. From the tools you use to the team you're on, we're in it together.
            </p>
          </div>
        </div>
      </div>
    </section>
    </div>
    </React.Fragment>
  )
}

export default ImageHero
