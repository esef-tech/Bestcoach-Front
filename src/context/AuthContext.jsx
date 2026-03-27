
// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';                    // ← your firebase.js
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);           // extra profile data
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setCurrentUser(firebaseUser);
      setIsAuthenticated(!!firebaseUser);
      setUser(firebaseUser ? { name: firebaseUser.displayName || firebaseUser.email } : null);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};