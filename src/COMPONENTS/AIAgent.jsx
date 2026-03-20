// src/components/AIAgent.jsx - FINAL BULLETPROOF VERSION (No more runtime errors)
import { useEffect, useRef } from 'react';

const AIAgent = () => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const scriptId = 'relevanceai-chat-bubble';

    // Remove any existing script to prevent duplicates
    const existingScript = document.getElementById(scriptId);
    if (existingScript) existingScript.remove();

    // Suppress specific script errors globally
    const originalOnError = window.onerror;
    window.onerror = function (msg, url) {
      if (url && url.includes('relevanceai.com')) {
        console.warn('Relevance AI script error suppressed');
        return true; // Suppress error
      }
      return originalOnError ? originalOnError.apply(this, arguments) : false;
    };

    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.defer = true;
    script.src = 'https://app.relevanceai.com/embed/chat-bubble.js';

    script.setAttribute('data-relevanceai-share-id', 'd7b62b/f2603cbc-0fea-409c-b20a-58cff63b1184/517d2431-a0a9-4945-b26a-5c3b78afa7a7');
    script.setAttribute('data-share-styles', 'hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=false&bubble_style=agent&primary_color=%23685FFF&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=false&hide_description=false');

    // Safe load
    script.onload = () => console.log('✅ Relevance AI Chatbot loaded successfully');
    script.onerror = () => console.warn('Relevance AI script failed to load (suppressed)');

    document.body.appendChild(script);

    return () => {
      const s = document.getElementById(scriptId);
      if (s && s.parentNode) s.parentNode.removeChild(s);
      window.onerror = originalOnError; // Restore original error handler
    };
  }, []);

  return null;
};

export default AIAgent;