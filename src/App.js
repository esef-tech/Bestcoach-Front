import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './COMPONENTS/Navbar';
import Package from './COMPONENTS/PAGES/PACKAGES/Package';
import Links from './COMPONENTS/PAGES/QUICK-LINKS/Links'
import News from './COMPONENTS/PAGES/NEWS/News';
import Team from './COMPONENTS/PAGES/TEAM/Team';
import Footer from './COMPONENTS/FOOTER/Footer';
import AIAgent from './COMPONENTS/AIAgent';
import  Home from './COMPONENTS/PAGES/HOME/Home';
import Contact from './COMPONENTS/PAGES/CONTACT/Contact';
import ChurchServices from './COMPONENTS/PAGES/SERVICES/Church-Services';
import SchoolServices from './COMPONENTS/PAGES/SERVICES/School-Service';
import IndividualServices from './COMPONENTS/PAGES/SERVICES/Individual-Services';
import GroupServices from './COMPONENTS/PAGES/SERVICES/Group-Services';


function App() {
  return (
    <>
    <Router>
     <div className="App"> 
      <Navbar />
      <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Package />} />
        <Route path="/quick-links" element={<Links />} />
        <Route path="/news" element={<News />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/schools" element={<SchoolServices />} /> {/* Match your dropdown path */}
          <Route path="/churches" element={<ChurchServices />} />
          <Route path="/individuals" element={<IndividualServices />} />
          <Route path="/groups" element={<GroupServices />} />

      </Routes>
      <Footer />
      <AIAgent />
      </div>
</Router>

    </>
  );
}

export default App;
