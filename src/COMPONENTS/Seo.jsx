// src/components/Seo.jsx
import { Helmet } from 'react-helmet-async';

const Seo = ({
  title = "Bestcoach Music | Community & Forums",
  description = "Join the Bestcoach Music Community. Share threads, like, comment, and connect with musicians in real time.",
  keywords = "music community, bestcoach, forum, music threads, musicians",
  image = "https://bestcoachmusic.netlify.app/IMAGES/2025-bc-logo.jpeg",   // ← Replace with your OG image URL
  url = window.location.href,
}) => {
  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Social */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default Seo;