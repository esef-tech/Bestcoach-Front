import { useEffect } from "react";

const CHAT_SCRIPT_ID = "relevanceai-chat-bubble";
const CHAT_SCRIPT_SRC = "https://app.relevanceai.com/embed/chat-bubble.js";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

const AIAgent = () => {
  useEffect(() => {
    const host = window.location.hostname;
    const isLocalHost = LOCAL_HOSTS.has(host);
    const allowLocalChat = process.env.REACT_APP_ENABLE_CHAT_LOCAL === "true";

    // Prevent third-party script on localhost during development (optional)
    if (isLocalHost && !allowLocalChat) {
      removeExistingChatElements();
      return undefined;
    }

    // Prevent duplicate script injection
    if (document.getElementById(CHAT_SCRIPT_ID)) {
      return undefined;
    }

    const script = document.createElement("script");
    script.id = CHAT_SCRIPT_ID;
    script.async = true;
    script.defer = true;

    script.setAttribute(
      "data-relevanceai-share-id",
      "d7b62b/f2603cbc-0fea-409c-b20a-58cff63b1184/517d2431-a0a9-4945-b26a-5c3b78afa7a7"
    );
    script.setAttribute(
      "data-share-styles",
      "hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=false&bubble_style=agent&primary_color=%23685FFF&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=false&hide_description=false"
    );

    script.src = CHAT_SCRIPT_SRC;

    // Improved error handling
    script.onload = () => {
      console.log("%c✅ Relevance AI Chat Bubble Loaded Successfully", "color: #10b981; font-weight: bold");
    };

    script.onerror = (error) => {
      console.warn("%c⚠️ Relevance AI Chat Bubble failed to load (non-critical)", "color: #f59e0b");
      console.warn("Relevance AI Error:", error);
      // Prevent uncaught promise rejection / console spam
      return false;
    };

    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      removeExistingChatElements();
    };
  }, []);

  return null;
};

// Helper function to clean up any existing Relevance AI elements
const removeExistingChatElements = () => {
  const selectors = [
    `#${CHAT_SCRIPT_ID}`,
    'script[src*="app.relevanceai.com/embed/chat-bubble.js"]',
    '[data-relevanceai-chat]',
    '.relevance-chat-bubble',
    'iframe[src*="relevanceai.com"]'
  ];

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((node) => {
      try {
        node.remove();
      } catch (e) {
        // Ignore cleanup errors
      }
    });
  });
};

export default AIAgent;