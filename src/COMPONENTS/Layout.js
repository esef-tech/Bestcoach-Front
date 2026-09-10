// src/COMPONENTS/Layout.js
// NOTE: The CSP <meta> tag was removed.
// The single source of truth for Content-Security-Policy is now
// the Content-Security-Policy header in vercel.json. Do NOT add a
// meta CSP here — dual policies are enforced as an intersection
// and will silently block media, scripts, and API hosts.
const Layout = ({ children }) => {
  return <>{children}</>;
};

export default Layout;