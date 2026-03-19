import { useEffect } from 'react';

const AIAgent = () => {
  useEffect(() => {
    try {
      const loadScript = () => {
        try {
          if (document.getElementById('relevanceai-script')) return;
          
          const script = document.createElement('script');
          script.id = 'relevanceai-script';
          script.async = true;
          script.crossOrigin = 'anonymous';
          script.src = 'https://app.relevanceai.com/embed/chat-bubble.js';
          
          let errorHandled = false;
          const handler = () => {
            if (!errorHandled) {
              errorHandled = true;
              try {
                const s = document.getElementById('relevanceai-script');
                if (s && s.parentNode) s.parentNode.removeChild(s);
              } catch (e) {}
            }
          };
          
          script.onerror = handler;
          script.addEventListener('error', handler, true);
          
          script.setAttribute('data-relevanceai-share-id', 'd7b62b/f2603cbc-0fea-409c-b20a-58cff63b1184/517d2431-a0a9-4945-b26a-5c3b78afa7a7');
          script.setAttribute('data-share-styles', 'hide_tool_steps=true&hide_file_uploads=true&hide_conversation_list=true&bubble_style=agent&primary_color=%23FD7E14&bubble_icon=pd%2Fchat&input_placeholder_text=Ask me anything about music lessons...&hide_logo=true&hide_description=true');
          
          document.body.appendChild(script);
        } catch (e) {}
      };

      let loaded = false;
      const load = () => {
        if (!loaded) {
          loaded = true;
          loadScript();
        }
      };

      const scroll = () => {
        if (window.scrollY > window.innerHeight * 0.3) {
          load();
          window.removeEventListener('scroll', scroll);
        }
      };

      window.addEventListener('scroll', scroll, { passive: true });
      const timeout = setTimeout(load, 5000);

      return () => {
        window.removeEventListener('scroll', scroll);
        clearTimeout(timeout);
      };
    } catch (e) {}
  }, []);

  return null;
};

export default AIAgent;