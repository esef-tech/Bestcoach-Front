// src/COMPONENTS/LazyStripeAndChat.jsx
import { useEffect } from "react";

const LazyStripeAndChat = () => {
  useEffect(() => {
    const stripeSrc = "https://js.stripe.com/v3/";
    const existingStripeScript = document.querySelector(`script[src="${stripeSrc}"]`);

    // Prevent duplicate Stripe script injection.
    if (existingStripeScript) {
      return undefined;
    }

    const stripeScript = document.createElement("script");
    stripeScript.src = stripeSrc;
    stripeScript.async = true;
    stripeScript.onerror = () => {
      console.warn("Stripe script failed to load.");
    };
    document.body.appendChild(stripeScript);

    return () => {
      if (stripeScript.parentNode) {
        stripeScript.parentNode.removeChild(stripeScript);
      }
    };
  }, []);

  return null;
};

export default LazyStripeAndChat;
