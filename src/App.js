import React, { Suspense, lazy, useEffect } from "react";
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

// ======================== LAZY LOADED PAGES ========================
const Home = lazy(() => import("./COMPONENTS/PAGES/HOME/Home"));
const Package = lazy(() => import("./COMPONENTS/PAGES/PACKAGES/Package"));
const Links = lazy(() => import("./COMPONENTS/PAGES/QUICK-LINKS/Links"));
const News = lazy(() => import("./COMPONENTS/PAGES/NEWS/News"));
const Teams = lazy(() => import("./COMPONENTS/PAGES/TEAMS/Teams"));
const ChurchServices = lazy(() => import("./COMPONENTS/PAGES/SERVICES/Church-Services"));
const SchoolServices = lazy(() => import("./COMPONENTS/PAGES/SERVICES/School-Service"));
const IndividualServices = lazy(() => import("./COMPONENTS/PAGES/SERVICES/Individual-Services"));
const GroupServices = lazy(() => import("./COMPONENTS/PAGES/SERVICES/Group-Services"));
const About = lazy(() => import("./COMPONENTS/PAGES/ABOUT/About"));
const Contact = lazy(() => import("./COMPONENTS/PAGES/CONTACT/Contact"));
const Careers = lazy(() => import("./COMPONENTS/PAGES/CAREERS/Careers"));
const Blog = lazy(() => import("./COMPONENTS/PAGES/BLOG/Blog"));
const TSS = lazy(() => import("./COMPONENTS/PAGES/EVENTS/TSS"));
const Press = lazy(() => import("./COMPONENTS/PAGES/PRESS/Press"));
const Help = lazy(() => import("./COMPONENTS/PAGES/HELP/Help"));
const TeacherSupport = lazy(() => import("./COMPONENTS/PAGES/HELP/helpPages/TeacherSupport"));
const StudentSupport = lazy(() => import("./COMPONENTS/PAGES/HELP/helpPages/StuedentSupport"));
const ParentSupport = lazy(() => import("./COMPONENTS/PAGES/HELP/helpPages/Parents"));
const Webinar = lazy(() => import("./COMPONENTS/PAGES/WEBINARS/Webinar"));
const Faq = lazy(() => import("./COMPONENTS/PAGES/FAQS/Faq"));
const StudioTutorials = lazy(() => import("./COMPONENTS/PAGES/STUDIO/StudioTutorials"));
const Method = lazy(() => import("./COMPONENTS/PAGES/METHOD/Method"));
const Coaches = lazy(() => import("./COMPONENTS/PAGES/COACHES/Coaches"));
const TMME = lazy(() => import("./COMPONENTS/PAGES/EVENTS/TMME"));
const Loyal = lazy(() => import("./COMPONENTS/PAGES/LOYAL/Loyal"));
const Shop = lazy(() => import("./COMPONENTS/PAGES/SHOP/Shop"));
const Community = lazy(() => import("./COMPONENTS/PAGES/COMMUNITY/Community"));
const Profile = lazy(() => import("./COMPONENTS/Profile"));

// ======================== IMPROVED ERROR BOUNDARY ========================
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("🚨 App ErrorBoundary caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8d7da",
          color: "#721c24",
          padding: "40px",
          textAlign: "center"
        }}>
          <h2>⚠️ Something went wrong</h2>
          <p>Check the browser console (F12) for details.</p>
          <button 
            className="btn btn-danger mt-3"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
      offset: 100,
    });
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <AnalyticsTracker />
        <SessionProvider>
          <AuthProvider>
            <Seo />
            <ErrorBoundary>
              <div className="App">
                <ThemeProvider>
                  <Navbar />

                  <Suspense
                    fallback={
                      <div style={{
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#f8f9fa",
                        flexDirection: "column"
                      }}>
                        <div className="spinner-border text-primary" style={{ width: "4rem", height: "4rem" }} role="status">
                          <span className="visually-hidden">Loading Bestcoach Music...</span>
                        </div>
                        <p className="mt-3 text-muted">Loading Bestcoach Music...</p>
                      </div>
                    }
                  >
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
                  </Suspense>

                  <Footer />
                  <AIAgent />
                </ThemeProvider>
              </div>
            </ErrorBoundary>
          </AuthProvider>
        </SessionProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;