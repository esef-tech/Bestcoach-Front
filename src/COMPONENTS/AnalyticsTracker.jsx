// src/components/AnalyticsTracker.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logEvent } from 'firebase/analytics';
import { analytics, auth } from '../firebase';

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (!analytics) {
      console.warn('🔥 Firebase Analytics not initialized');
      return;
    }

    console.log('📊 Analytics: page_view logged →', location.pathname); // ← debug line

    logEvent(analytics, 'page_view', {
      page_path: location.pathname,
      page_title: document.title,
      page_location: window.location.href,
      user_id: auth.currentUser?.uid || 'anonymous', // optional but helpful
    });
  }, [location]);

  return null;
};

export default AnalyticsTracker;