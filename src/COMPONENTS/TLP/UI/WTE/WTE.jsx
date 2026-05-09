import React from 'react'
import './WTE.css'


const WTE = () => {
    const steps = [
    {
      number: "1",
      icon: "📧",
      title: "You Enrolled!",
      description: "After you apply for a role, you'll receive an automatic confirmation that we've got your application.",
      note: "Heads up: Sometimes our emails land in spam — give it a quick check so you don't miss us!"
    },
    {
      number: "2",
      icon: "📝",
      title: "A Small Challenge",
      description: "Some roles may include a short assignment or test. Depending on the role, this step may shift the order of the hiring process."
    },
    {
      number: "3",
      icon: "💬",
      title: "Let's Chat",
      description: "If selected, our Talent Acquisition Team will reach out to schedule a quick 15-minute phone or video chat.",
      bullets: [
        "How would others describe you in three words?",
        "Which of our core values resonates most with you, and why?"
      ]
    },
    {
      number: "4",
      icon: "👔",
      title: "Meet the Hiring Manager",
      description: "You'll then have a 30-60 minute interview with the hiring manager. We recommend reviewing the job description beforehand to reflect on how your experience aligns."
    },
    {
      number: "5",
      icon: "🔍",
      title: "Reference Check",
      description: "We'll request three professional references, including at least one former manager. Reference checks are completed before we extend an offer."
    },
    {
      number: "6",
      icon: "🤝",
      title: "Final Touchpoint",
      description: "For some roles, there may be an additional interview with our CEO/COO or another team member."
    },
    {
      number: "7",
      icon: "🚀",
      title: "Offer Incoming!",
      description: "If you make it to the final stage, our Talent team will get in touch to let you know we're moving forward with an offer and confirm your start date."
    },
    {
      number: "8",
      icon: "📄",
      title: "Make It Official",
      description: "A formal written offer will be sent your way for review and signature!"
    }
  ];
  return (
    <React.Fragment>
      <section className="wte-section">
      <div className="wte-container">
        <h2 className="wte-title">What to Expect When You Enroll</h2>

        <div className="timeline">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="timeline-item"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="timeline-dot">
                <span className="dot-number">{step.number}</span>
              </div>

              <div className="timeline-content">
                <div className="step-header">
                  <span className="step-icon">{step.icon}</span>
                  <h3 className="step-title">{step.title}</h3>
                </div>
                
                <p className="step-description">{step.description}</p>
                
                {step.note && (
                  <p className="step-note">{step.note}</p>
                )}
                
                {step.bullets && (
                  <ul className="step-bullets">
                    {step.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
      
    </React.Fragment>
  )
}

export default WTE
