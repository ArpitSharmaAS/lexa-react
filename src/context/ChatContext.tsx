// import React, { createContext, useContext, useState, useEffect } from 'react';

// interface Message {
//   content: string;
//   sender: 'user' | 'bot';
//   imageUrl?: string;
// }

// interface ChatContextType {
//   messages: Message[];
//   sendMessage: (content: string) => Promise<void>;
//   clearChat: () => void;
//   copyResponse: (content: string) => void;
//   speakResponse: (content: string) => void;
//   changeModel: (model: string) => void;
//   isListening: boolean;
//   startVoiceInput: (isListening: boolean) => void;
//   isEarthMode: boolean;
//   toggleEarthMode: () => void;
// }

// const ChatContext = createContext<ChatContextType | undefined>(undefined);

// export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [apiUrl, setApiUrl] = useState('https://chat-bot-backend-theta.vercel.app/api/chat');
//   const [isListening, setIsListening] = useState(false);
//   const [isEarthMode, setIsEarthMode] = useState(false);
//   const [previousApiUrl, setPreviousApiUrl] = useState('');

//   useEffect(() => {
//     const savedMessages = localStorage.getItem('chatHistory');
//     if (savedMessages) {
//       setMessages(JSON.parse(savedMessages));
//     }
//   }, []);

//   const saveMessages = (newMessages: Message[]) => {
//     setMessages(newMessages);
//     localStorage.setItem('chatHistory', JSON.stringify(newMessages));
//   };

//   const sendMessage = async (content: string) => {
//     const newMessages = [...messages, { content, sender: 'user' }];
//     saveMessages(newMessages);

//     try {
//       if (isEarthMode) {
//         // Image generation mode
//         const response = await fetch('http://localhost:3000/generate', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ prompt: content }),
//         });

//         const data = await response.json();
        
//         if (data.imageUrl) {
//           saveMessages([
//             ...newMessages, 
//             { 
//               content: `Generated image for: "${content}"`, 
//               sender: 'bot',
//               imageUrl: data.imageUrl
//             }
//           ]);
//         } else {
//           saveMessages([
//             ...newMessages,
//             { content: 'Error: Failed to generate image.', sender: 'bot' }
//           ]);
//         }
//       } else {
//         // Normal chat mode
//         const response = await fetch(apiUrl, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ prompt: content }),
//         });

//         const data = await response.json();
//         const botResponse = data.response || data.generatedText || 'Error: No response from server.';
        
//         saveMessages([...newMessages, { content: botResponse, sender: 'bot' }]);
//       }
//     } catch (error) {
//       saveMessages([
//         ...newMessages,
//         { content: 'Error: Failed to get response.', sender: 'bot' }
//       ]);
//     }
//   };

//   const clearChat = () => {
//     setMessages([]);
//     localStorage.removeItem('chatHistory');
//   };

//   const copyResponse = (content: string) => {
//     navigator.clipboard.writeText(content);
//   };

//   const speakResponse = (content: string) => {
//     const utterance = new SpeechSynthesisUtterance(content);
//     window.speechSynthesis.speak(utterance);
//   };

//   const changeModel = (model: string) => {
//     const modelUrls: { [key: string]: string } = {
//       gemini: 'https://grmine-api.vercel.app/generate',
//       llama: 'https://chat-bot-backend-theta.vercel.app/api/chat',
//       qwen: 'https://qwen-gold.vercel.app/api/chat',
//       mistral: 'https://chat-bot-backend-theta.vercel.app/api/chat/mixtral'
//     };

//     if (modelUrls[model]) {
//       setApiUrl(modelUrls[model]);
//     }
//   };

//   const startVoiceInput = (listening: boolean) => {
//     setIsListening(listening);
//   };

//   const toggleEarthMode = () => {
//     if (!isEarthMode) {
//       // Switching to Earth mode (image generation)
//       setPreviousApiUrl(apiUrl);
//       setApiUrl('http://localhost:3000/generate');
//       setIsEarthMode(true);
//     } else {
//       // Switching back to normal chat mode
//       setApiUrl(previousApiUrl || 'https://chat-bot-backend-theta.vercel.app/api/chat');
//       setIsEarthMode(false);
//     }
//   };

//   return (
//     <ChatContext.Provider value={{
//       messages,
//       sendMessage,
//       clearChat,
//       copyResponse,
//       speakResponse,
//       changeModel,
//       isListening,
//       startVoiceInput,
//       isEarthMode,
//       toggleEarthMode
//     }}>
//       {children}
//     </ChatContext.Provider>
//   );
// };

// export const useChat = () => {
//   const context = useContext(ChatContext);
//   if (context === undefined) {
//     throw new Error('useChat must be used within a ChatProvider');
//   }
//   return context;
// };


import React, { createContext, useContext, useState, useEffect } from 'react';

interface Message {
  content: string;
  sender: 'user' | 'bot';
  imageUrl?: string;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
  copyResponse: (content: string) => void;
  speakResponse: (content: string) => void;
  changeModel: (model: string) => void;
  isListening: boolean;
  startVoiceInput: (isListening: boolean) => void;
  isEarthMode: boolean;
  toggleEarthMode: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [apiUrl, setApiUrl] = useState('https://chat-bot-backend-theta.vercel.app/api/chat');
  const [isListening, setIsListening] = useState(false);
  const [isEarthMode, setIsEarthMode] = useState(false);
  const [previousApiUrl, setPreviousApiUrl] = useState('');

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  const saveMessages = (newMessages: Message[]) => {
    setMessages(newMessages);
    localStorage.setItem('chatHistory', JSON.stringify(newMessages));
  };

  const sendMessage = async (content: string) => {
    const newMessages = [...messages, { content, sender: 'user' }];
    saveMessages(newMessages);

    try {
      const chatApiUrl = isEarthMode
        ? 'https://web-scraper-production-8532.up.railway.app/generate' // 🔴 Sahi URL yahan replace karo!
        : apiUrl;

      console.log('🔍 Hitting API:', chatApiUrl);

      const response = await fetch(chatApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: content }),
      });

      const data = await response.json();
      console.log('✅ API Response:', data);

      const botResponse = data.generatedText || data.response || '⚠️ Error: No response from server.';

      saveMessages([...newMessages, { content: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error('❌ API Error:', error);
      saveMessages([
        ...newMessages,
        { content: '⚠️ Error: Failed to get response.', sender: 'bot' },
      ]);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatHistory');
  };

  const copyResponse = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const speakResponse = (content: string) => {
    const utterance = new SpeechSynthesisUtterance(content);
    window.speechSynthesis.speak(utterance);
  };

  const changeModel = (model: string) => {
    const modelUrls: { [key: string]: string } = {
      gemini: 'https://grmine-api.vercel.app/generate',
      llama: 'https://chat-bot-backend-theta.vercel.app/api/chat',
      qwen: 'https://qwen-gold.vercel.app/api/chat',
      mistral: 'https://chat-bot-backend-theta.vercel.app/api/chat/mixtral',
    };

    if (modelUrls[model]) {
      console.log(`🚀 Switching model to: ${model} (API: ${modelUrls[model]})`);
      setApiUrl(modelUrls[model]);
    } else {
      console.warn('⚠️ Invalid model selected:', model);
    }
  };

  const startVoiceInput = (listening: boolean) => {
    setIsListening(listening);
  };

  const toggleEarthMode = () => {
    if (!isEarthMode) {
      console.log('🌍 Switching to Earth Mode');
      setPreviousApiUrl(apiUrl);
      setApiUrl('https://web-scraper-production-8532.up.railway.app/generate'); // 🔴 Sahi URL lagao!
      setIsEarthMode(true);
    } else {
      console.log('💬 Switching back to normal chat mode');
      setApiUrl(previousApiUrl || 'https://chat-bot-backend-theta.vercel.app/api/chat');
      setIsEarthMode(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        clearChat,
        copyResponse,
        speakResponse,
        changeModel,
        isListening,
        startVoiceInput,
        isEarthMode,
        toggleEarthMode,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
