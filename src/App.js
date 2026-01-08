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
        <Route path="/services/schools" element={<SchoolServices />} />
        <Route path="/services/churches" element={<ChurchServices />} />
        <Route path="/services/individuals" element={<IndividualServices />} />
        <Route path="/services/groups" element={<GroupServices />} />
        <Route path="/quick-links" element={<Links />} />
        <Route path="/news" element={<News />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <AIAgent />
      </div>

</Router>

    </>
  );
}

export default App;
