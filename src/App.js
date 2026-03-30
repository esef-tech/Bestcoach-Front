import React from "react";
import { HelmetProvider } from 'react-helmet-async';   // ← NEW
import AnalyticsTracker from "./COMPONENTS/AnalyticsTracker";
import Seo from "./COMPONENTS/Seo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./COMPONENTS/Navbar";
import Package from "./COMPONENTS/PAGES/PACKAGES/Package";
import Links from "./COMPONENTS/PAGES/QUICK-LINKS/Links";
import News from "./COMPONENTS/PAGES/NEWS/News";
import Teams from "./COMPONENTS/PAGES/TEAMS/Teams";
import Footer from "./COMPONENTS/FOOTER/Footer";
import AIAgent from "./COMPONENTS/AIAgent";
import Home from "./COMPONENTS/PAGES/HOME/Home";
import ChurchServices from "./COMPONENTS/PAGES/SERVICES/Church-Services";
import SchoolServices from "./COMPONENTS/PAGES/SERVICES/School-Service";
import IndividualServices from "./COMPONENTS/PAGES/SERVICES/Individual-Services";
import GroupServices from "./COMPONENTS/PAGES/SERVICES/Group-Services";
import About from "./COMPONENTS/PAGES/ABOUT/About";
import Contact from "./COMPONENTS/PAGES/CONTACT/Contact";
import Careers from "./COMPONENTS/PAGES/CAREERS/Careers";
import Blog from "./COMPONENTS/PAGES/BLOG/Blog";
import TSS from "./COMPONENTS/PAGES/EVENTS/TSS";
import Press from "./COMPONENTS/PAGES/PRESS/Press";
import Help from "./COMPONENTS/PAGES/HELP/Help";
import TeacherSupport from "./COMPONENTS/PAGES/HELP/helpPages/TeacherSupport";
import StudentSupport from "./COMPONENTS/PAGES/HELP/helpPages/StuedentSupport";
import ParentSupport from "./COMPONENTS/PAGES/HELP/helpPages/Parents";
import Webinar from "./COMPONENTS/PAGES/WEBINARS/Webinar";
import Faq from "./COMPONENTS/PAGES/FAQS/Faq";
import StudioTutorials from "./COMPONENTS/PAGES/STUDIO/StudioTutorials";
import Method from "./COMPONENTS/PAGES/METHOD/Method";
import Coaches from "./COMPONENTS/PAGES/COACHES/Coaches";
//import Loyalty from './COMPONENTS/PAGES/LOYALTYPROJECT/Loyalty';
import TMME from "./COMPONENTS/PAGES/EVENTS/TMME";
import Loyal from "./COMPONENTS/PAGES/LOYAL/Loyal";
import Shop from "./COMPONENTS/PAGES/SHOP/Shop";
import Community from "./COMPONENTS/PAGES/COMMUNITY/Community";
import Profile from "./COMPONENTS/Profile";
import { ThemeProvider } from './context/ThemeContext';
import { SessionProvider } from "./context/SessionContext";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (

    <React.Fragment> 
    <>
      <HelmetProvider>
      <Router>
          <AnalyticsTracker />
          <SessionProvider>
          <AuthProvider>
          <Seo />
        <div className="App">
          <ThemeProvider>
            
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/package" element={<Package />} />
            <Route path="/quick-links" element={<Links />} />
            <Route path="/news" element={<News />} />
            <Route path="/team" element={<Teams />} />
            <Route path="/schools" element={<SchoolServices />} />
            <Route path="/churches" element={<ChurchServices />} />
            <Route path="/individuals" element={<IndividualServices />} />
            <Route path="/groups" element={<GroupServices />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/tss" element={<TSS />} />
            <Route path="/tmme" element={<TMME />} />
            <Route path="/press" element={<Press />} />
            <Route path="/help" element={<Help />} />
            <Route path="/help/teacher-support" element={<TeacherSupport />} />
            <Route path="/help/student-support" element={<StudentSupport />} />
            <Route path="/help/parent-support" element={<ParentSupport />} />
            <Route path="/webinars" element={<Webinar />} />
            <Route path="/studio-tutorials" element={<StudioTutorials />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/method" element={<Method />} />
            <Route path="/coach" element={<Coaches />} />
            <Route path="/loyal" element={<Loyal />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
          <AIAgent />
          </ThemeProvider> 
        </div>
        </AuthProvider>
          </SessionProvider>
      </Router>
      </HelmetProvider>
    </>
    </React.Fragment>
  );
}

export default App;
