import React, { useEffect } from 'react';

const AIAgent = () => {
  useEffect(() => {
    const loadScript = () => {
      if (document.getElementById('relevanceai-script')) return;
      const script = document.createElement('script');
      script.id = 'relevanceai-script';
      script.defer = true;
      script.src = 'https://app.relevanceai.com/embed/chat-bubble.js';
      script.setAttribute('data-relevanceai-share-id', 'd7b62b/f2603cbc-0fea-409c-b20a-58cff63b1184/517d2431-a0a9-4945-b26a-5c3b78afa7a7');
      script.setAttribute('data-share-styles', 'hide_tool_steps=true&hide_file_uploads=true&hide_conversation_list=true&bubble_style=agent&primary_color=%23FD7E14&bubble_icon=pd%2Fchat&input_placeholder_text=Ask me anything about music lessons...&hide_logo=true&hide_description=true');
      script.onerror = () => console.error('Failed to load AI chat');
      document.body.appendChild(script);
      return () => script.parentNode?.removeChild(script);
    };

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.3) {
        loadScript();
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    const timeout = setTimeout(loadScript, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return null;
};

export default AIAgent;