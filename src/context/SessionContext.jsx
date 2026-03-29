// src/contexts/SessionContext.jsx
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import Cookies from 'js-cookie';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const SESSION_COOKIE = 'bestcoach_session';
  const CSRF_COOKIE = 'bestcoach_csrf';
  const PREFS_COOKIE = 'bestcoach_preferences';

  // Generate CSRF token
  const generateCSRF = useCallback(() => {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
  }, []);

  // Save secure session
  const saveSecureSession = useCallback((userData) => {
    const newSession = {
      uid: userData.uid,
      email: userData.email,
      displayName: userData.displayName,
      photoURL: userData.photoURL,
      lastLogin: new Date().toISOString(),
    };

    Cookies.set(SESSION_COOKIE, JSON.stringify(newSession), {
      expires: 30,
      secure: true,
      sameSite: 'strict',
      path: '/',
      partitioned: true,
    });

    const newCsrf = generateCSRF();
    Cookies.set(CSRF_COOKIE, newCsrf, {
      expires: 1 / 48,
      secure: true,
      sameSite: 'strict',
      path: '/',
      partitioned: true,
    });

    setSession(newSession);
    setCsrfToken(newCsrf);
  }, [generateCSRF]);

  // Logout - defined early so validateCSRF can depend on it
  const logout = useCallback(async () => {
    await signOut(auth);
    Cookies.remove(SESSION_COOKIE);
    Cookies.remove(CSRF_COOKIE);
    Cookies.remove(PREFS_COOKIE);
    setSession(null);
    setCsrfToken(null);
  }, []);

  // Validate CSRF (now safely depends on logout)
  const validateCSRF = useCallback((submittedToken) => {
    const storedToken = Cookies.get(CSRF_COOKIE);
    if (!storedToken || !submittedToken || submittedToken !== storedToken) {
      console.warn('🚨 CSRF token mismatch - possible attack');
      logout();                    // Safe call
      return false;
    }
    return true;
  }, [logout]);

  // Main auth listener
  useEffect(() => {
    const savedSession = Cookies.get(SESSION_COOKIE);
    if (savedSession) {
      try {
        setSession(JSON.parse(savedSession));
      } catch (e) {}
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        saveSecureSession(user);
      } else {
        setSession(null);
        setCsrfToken(null);
        Cookies.remove(SESSION_COOKIE);
        Cookies.remove(CSRF_COOKIE);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [saveSecureSession]);

  // Update session
  const updateSession = useCallback((newData) => {
    if (!session) return;
    const updated = { ...session, ...newData };
    Cookies.set(SESSION_COOKIE, JSON.stringify(updated), {
      expires: 30,
      secure: true,
      sameSite: 'strict',
      path: '/',
      partitioned: true,
    });
    setSession(updated);
  }, [session]);

  // Preferences
  const savePreferences = useCallback((prefs) => {
    Cookies.set(PREFS_COOKIE, JSON.stringify(prefs), {
      expires: 365,
      secure: true,
      sameSite: 'strict',
      path: '/',
      partitioned: true,
    });
  }, []);

  const getPreferences = useCallback(() => {
    const prefs = Cookies.get(PREFS_COOKIE);
    return prefs ? JSON.parse(prefs) : { theme: 'light', lastPage: '/' };
  }, []);

  return (
    <SessionContext.Provider
      value={{
        session,
        csrfToken,
        isLoading,
        logout,
        updateSession,
        savePreferences,
        getPreferences,
        validateCSRF,
        generateCSRF,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};