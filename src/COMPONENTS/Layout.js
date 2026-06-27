// src/COMPONENTS/Layout.js
import { Helmet } from 'react-helmet-async';
import { useNonce } from '../context/NonceContext';

const Layout = ({ children }) => {
  const nonce = useNonce();

  return (
    <>
      <Helmet>
        <meta
          httpEquiv="Content-Security-Policy"
          content={`default-src 'self'; 
                    script-src 'strict-dynamic' 'nonce-${nonce}' https: 'unsafe-inline'; 
                    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; 
                    img-src 'self' data: https: blob:; 
                    font-src 'self' https://fonts.gstatic.com data:; 
                    connect-src 'self' https://api-d7b62b.stack.tryrelevance.com https://firebasestorage.googleapis.com https://*.googleapis.com wss://*.firebaseio.com https://app.relevanceai.com https://www.google-analytics.com; 
                    media-src 'self' https://player.vimeo.com; 
                    frame-src 'self' https://player.vimeo.com https:; 
                    base-uri 'self'; object-src 'none';`}
        />
      </Helmet>
      {children}
    </>
  );
};

export default Layout;