// src/context/NonceContext.js
import React, { createContext, useContext, useMemo } from 'react';

const NonceContext = createContext('');

export const NonceProvider = ({ children }) => {
  // Generate a secure random nonce on every render (client-side)
  const nonce = useMemo(() => {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array));
  }, []);

  return (
    <NonceContext.Provider value={nonce}>
      {children}
    </NonceContext.Provider>
  );
};

export const useNonce = () => useContext(NonceContext);