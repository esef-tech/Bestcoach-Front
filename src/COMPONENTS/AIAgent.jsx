import { useEffect } from "react";

const CHAT_SCRIPT_ID = "relevanceai-chat-bubble";
const CHAT_SCRIPT_SRC = "https://app.relevanceai.com/embed/chat-bubble.js";
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

const AIAgent = () => {
  useEffect(() => {
    const host = window.location.hostname;
    const isLocalHost = LOCAL_HOSTS.has(host);
    const allowLocalChat = process.env.REACT_APP_ENABLE_CHAT_LOCAL === "true";

    // Prevent third-party runtime overlay errors on localhost during development.
    if (isLocalHost && !allowLocalChat) {
      document.getElementById(CHAT_SCRIPT_ID)?.remove();
      document
        .querySelectorAll(
          'script[src*="app.relevanceai.com/embed/chat-bubble.js"], [data-relevanceai-chat], .relevance-chat-bubble, iframe[src*="relevanceai.com"]',
        )
        .forEach((node) => node.remove());
      return undefined;
    }

    const existingScript = document.getElementById(CHAT_SCRIPT_ID);
    if (existingScript) {
      return undefined;
    }

    const script = document.createElement("script");
    script.id = CHAT_SCRIPT_ID;
    script.async = true;
    script.defer = true;
    script.setAttribute(
      "data-relevanceai-share-id",
      "d7b62b/f2603cbc-0fea-409c-b20a-58cff63b1184/517d2431-a0a9-4945-b26a-5c3b78afa7a7",
    );
    script.setAttribute(
      "data-share-styles",
      "hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=false&bubble_style=agent&primary_color=%23685FFF&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=false&hide_description=false",
    );
    script.src = CHAT_SCRIPT_SRC;
    script.onerror = () => {
      console.warn("Relevance AI script failed to load.");
    };

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
};

export default AIAgent;
