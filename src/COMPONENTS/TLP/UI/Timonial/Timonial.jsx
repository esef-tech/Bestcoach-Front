import React, { useState , useEffect} from 'react'
import './Timonial.css'


const Timonial = () => {
    const testimonials = [
    {
      id: 1,
      name: "Gifty Obeng",
      title: "Administartive  Manager, Bestcoach Muisc",
      image: "https://bestcoach-front.vercel.app/static/media/2.549f179bfc4fe9934975.jpg",
      quote: "At Bestcoach Music, talent and humility go hand in hand. People are focused, good at what they do, and genuinely want to collaborate. No ego, just shared goals. That kind of openness is rare, and it's something I deeply value.",
    },
    {
      id: 2,
      name: "Precious Nkrumah",
      title: "Graphic design Lead, Bestcoach Music",
      image: "https://bestcoach-front.vercel.app/static/media/Precious.13186eb9aff5b2ee9310.webp",
      quote: "Being Part of Bestcoach Music feels like being part of a band. Everyone listens, everyone contributes, and the result is music that moves people. The culture is truly special.",
    },
    {
      id: 3,
      name: "Nana Sarfo",
      title: "Media Lead, Bestcoach Music",
      image: "https://bestcoach-front.vercel.app/static/media/NANA-SARFO.d59042793c0f130e1b38.webp",
      quote: "At Bestcoach Music,  creativity and care for people are so perfectly balanced. Bestcoach Music  doesn't just talk about community — we live it every day.",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume autoplay after manual navigation
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];
    
  return (
    <React.Fragment>
      <section className="timonail-section">
      <div className="timonail-container">
        <div className="testimonial-card">
          <div className="testimonial-content">
            {/* Image */}
            <div className="testimonial-image">
              <img src={current.image} alt={current.name} />
            </div>

            {/* Quote */}
            <div className="testimonial-text">
              <div className="quote-icon">“</div>
              
              <p className="quote-text-timonial">{current.quote}</p>

              <div className="author">
                <p className="author-name">{current.name}</p>
                <p className="author-title">{current.title}</p>
              </div>

                <button
                  type="button"
                  className="read-more"
                  onClick={() => { /* placeholder: open details or navigate */ }}
                  aria-label={`Read more about ${current.name}`}
                >
                  Read more →
                </button>
            </div>
          </div>

            {/* Prev / Next controls */}
            <div className="testimonial-controls">
              <button
                type="button"
                className="nav-btn prev"
                onClick={prevSlide}
                aria-label="Previous testimonial"
              >
                ‹
              </button>
              <button
                type="button"
                className="nav-btn next"
                onClick={nextSlide}
                aria-label="Next testimonial"
              >
                ›
              </button>
            </div>

          {/* Navigation Dots */}
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
    </React.Fragment>
  )
}

export default Timonial
