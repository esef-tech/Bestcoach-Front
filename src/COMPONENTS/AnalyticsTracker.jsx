// src/components/AnalyticsTracker.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logEvent } from "firebase/analytics";
import { auth, getAnalyticsInstance } from "../firebase";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    let active = true;

    getAnalyticsInstance().then((analyticsInstance) => {
      if (!active || !analyticsInstance) {
        return;
      }

      logEvent(analyticsInstance, "page_view", {
        page_path: location.pathname,
        page_title: document.title,
        page_location: window.location.href,
        user_id: auth.currentUser?.uid || "anonymous",
      });
    });

    return () => {
      active = false;
    };
  }, [location]);

  return null;
};

export default AnalyticsTracker;
