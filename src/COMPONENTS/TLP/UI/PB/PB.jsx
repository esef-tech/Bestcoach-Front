import React from 'react'
import './PB.css'


const PB = () => {
    const perks = [
    { icon: "❤️", title: "Comprehensive Health Coverage", desc: "Health, dental, and vision benefits that prioritize your well-being, because you matter." },
    { icon: "⏰", title: "Flexible Work Hours", desc: "Work hard, then work when it works for you. We trust you to manage your time well." },
    { icon: "🏋️", title: "Onsite Gym Access", desc: "Stay energized with a fully equipped gym, weights, cardio, and room to move." },
    { icon: "💡", title: "Personal Growth Support", desc: "We've got your back with resources to help you stay sharp and grow your skills." },
    { icon: "🔧", title: "Tools That Work for You", desc: "We'll set you up with the right tools and gear so you can do your best work, friction-free." },
    { icon: "🏠", title: "Hybrid Work Options", desc: "Many roles offer the best of both worlds, remote flexibility and in-office connection." },

    { icon: "🧠", title: "Mental Wellness Support", desc: "Up to $2,000/year for counseling services, plus access to our Employee Assistance Program." },
    { icon: "🍎", title: "Snacks, Drinks & Good Vibes", desc: "Fresh fruit, snacks, espresso, and a fridge stocked with soda, kombucha, and beer." },
    { icon: "🎵", title: "Free Music Lessons", desc: "Our world-class music education is free for you, and for your friends and family too." },
    { icon: "👥", title: "Collaborative Culture", desc: "Your ideas matter. We learn from each other and build across teams, together." },
    { icon: "🎉", title: "Legendary Team Events", desc: "Golf tournaments, jam nights, and a holiday party you'll talk about all year." },
    { icon: "🌱", title: "Room to Grow", desc: "Wherever your journey takes you up, across, or somewhere new, we're here to support it." }
  ];
  return (
    <React.Fragment>
      <section className="pb-section">
      <div className="pb-container">
        <h2 className="pb-title">Perks &amp; Benefits</h2>

        <div className="perks-grid">
          {perks.map((perk, index) => (
            <div 
              key={index} 
              className="perk-item"
              style={{ animationDelay: `${(index % 6) * 80}ms` }}
            >
              <div className="perk-icon">{perk.icon}</div>
              <div className="perk-text">
                <h3 className="perk-title">{perk.title}</h3>
                <p className="perk-desc">{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </React.Fragment>
  )
}

export default PB
