import React, { useState } from 'react'
import "./Enroll.css"

const Enroll = () => {
    const [showSuccess, setShowSuccess] = useState(false);
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/u/0/d/e/YOUR_GOOGLE_FORM_ID/formResponse"; 
  // ← Replace with your actual Google Form link

  const handleEnrollClick = () => {
    // Open Google Form in new tab
    window.open(GOOGLE_FORM_URL, '_blank');

    // Show success message on current page
    setShowSuccess(true);

    // Auto-hide success message after 6 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 6000);
  };


  return (
    <React.Fragment>
      <section className="enroll-section">
      <div className="enroll-container">
        <div className="enroll-content">
          <h2 className="enroll-title">
            Ready to Join The Loyalty Project?
          </h2>

          <p className="enroll-subtitle">
            We believe the world needs more music — and more people like you. 
            Whether you're applying, exploring, or just curious, we'd love to hear from you.
          </p>

          <p className="enroll-message">
            Let’s make something meaningful together.
          </p>

          <button
            className="enroll-btn"
            onClick={handleEnrollClick}
            aria-label="Enroll Now - Open Application Form"
          >
            ENROLL NOW!
            <span className="btn-arrow">→</span>
          </button>

          {/* Success Message */}
          {showSuccess && (
            <div className="success-message">
              <div className="success-content">
                ✅ <strong>Enrollment successful!</strong><br />
                Check your email for verification.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
    </React.Fragment>
  )
}

export default Enroll
