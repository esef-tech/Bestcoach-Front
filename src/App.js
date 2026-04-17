import React, { useEffect } from "react";
import { HelmetProvider } from 'react-helmet-async';
import AnalyticsTracker from "./COMPONENTS/AnalyticsTracker";
import Seo from "./COMPONENTS/Seo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./COMPONENTS/Navbar";
import Footer from "./COMPONENTS/FOOTER/Footer";
import AIAgent from "./COMPONENTS/AIAgent";
import { ThemeProvider } from './context/ThemeContext';
import { SessionProvider } from "./context/SessionContext";
import { AuthProvider } from "./context/AuthContext";
import AOS from 'aos';
import 'aos/dist/aos.css';

// All pages imported normally (no lazy loading yet - this fixes Vercel blank page)
import Home from "./COMPONENTS/PAGES/HOME/Home";
import Package from "./COMPONENTS/PAGES/PACKAGES/Package";
import Links from "./COMPONENTS/PAGES/QUICK-LINKS/Links";
import News from "./COMPONENTS/PAGES/NEWS/News";
import Teams from "./COMPONENTS/PAGES/TEAMS/Teams";
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
import TMME from "./COMPONENTS/PAGES/EVENTS/TMME";
import Loyal from "./COMPONENTS/PAGES/LOYAL/Loyal";
import Shop from "./COMPONENTS/PAGES/SHOP/Shop";
import Community from "./COMPONENTS/PAGES/COMMUNITY/Community";
import Profile from "./COMPONENTS/Profile";
import { LanguageProvider } from "./context/LanguageContext";
import SignIn from "./COMPONENTS/AUTH/LOGIN/SignIn";
import SignUp from "./COMPONENTS/AUTH/SIGNUP/SignUp";
import MFAVerification from "./COMPONENTS/AUTH/MFA/MFAVerificationPage";
import FPASS from "./COMPONENTS/AUTH/FPASS/ForgotPassword"
import Terms from "./COMPONENTS/DocxPages/Terms";
import Privacy from "./COMPONENTS/DocxPages/Privacy";

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error) { console.error("🚨 App crashed:", error); }
  render() {
    if (this.state.hasError) {
      return <div style={{ padding: "40px", textAlign: "center", background: "#f8d7da", color: "#721c24", minHeight: "100vh" }}>
        <h2>Application Error</h2>
        <p>Check browser console (F12) → Refresh page</p>
      </div>;
    }
    return this.props.children;
  }
}

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-in-out', offset: 100 });
  }, []);

  return (
    <HelmetProvider>
      <LanguageProvider>
      <Router>
        <AnalyticsTracker />
        <SessionProvider>
          <AuthProvider>
            <Seo />
            <ErrorBoundary>
              <div className="App">
                <ThemeProvider>
                  <Navbar />
                  <Routes>
                    <Route path="/signin" element={<SignIn />} />
  <Route path="/signup" element={<SignUp />} />
  <Route path="/mfa-verification" element={<MFAVerification />} />
  <Route path="/forgot-password" element={<FPASS/>} />
  <Route path="/terms" element={<Terms />} />
<Route path="/privacy" element={<Privacy />} />

A
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
            </ErrorBoundary>
          </AuthProvider>
        </SessionProvider>
      </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;