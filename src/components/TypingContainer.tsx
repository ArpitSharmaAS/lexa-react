import React, { useState, useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { Send, Mic, Moon, Sun, Trash2, Search, Globe } from 'lucide-react';

const TypingContainer = () => {
  const [input, setInput] = useState('');
  const { sendMessage, clearChat, startVoiceInput, isListening, toggleEarthMode, isEarthMode } = useChat();
  const { isDarkMode, toggleTheme } = useTheme();
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const newRecognition = new SpeechRecognition();
      
      newRecognition.continuous = true;
      newRecognition.interimResults = true;
      newRecognition.lang = 'en-US';

      newRecognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map(result => result.transcript)
          .join('');
        
        setInput(transcript);
      };

      newRecognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        showCustomAlert('Speech recognition error. Please try again.');
      };

      setRecognition(newRecognition);
    }
  }, []);

  const handleVoiceInput = () => {
    if (!recognition) {
      showCustomAlert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognition.stop();
      startVoiceInput(false);
    } else {
      recognition.start();
      startVoiceInput(true);
      showCustomAlert('Listening... Speak now');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const handleLiveSearch = () => {
    if (!input.trim()) {
      showCustomAlert('Please enter a search query first');
      return;
    }
    
    // Open a new tab with Google search
    window.open(`https://www.google.com/search?q=${encodeURIComponent(input)}`, '_blank');
  };

  const handleEarthMode = () => {
    toggleEarthMode();
    showCustomAlert(isEarthMode ? 'Switched to normal chat mode' : 'Switched to Live Search mode');
  };

  const showCustomAlert = (message: string) => {
    const alertContainer = document.createElement('div');
    alertContainer.className = 'custom-alert';
    
    alertContainer.innerHTML = `
      <div class="custom-alert-content">
        <p>${message}</p>
        <button class="custom-alert-close">OK</button>
      </div>
    `;
    
    document.body.appendChild(alertContainer);
    
    const closeButton = alertContainer.querySelector('.custom-alert-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        alertContainer.remove();
      });
    }

    setTimeout(() => {
      alertContainer.remove();
    }, 3000);
  };

  return (
    <motion.div 
      className="typing-container"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="typing-content">
        <form onSubmit={handleSubmit} className="flex-1 typing-textarea">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isEarthMode ? "Describe the Topic you want to Serach..." : "Enter a prompt here..."}
            className="w-full px-4 py-3 transition-all duration-300 bg-gray-800 bg-opacity-50 border border-gray-700 resize-none rounded-xl backdrop-blur-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            rows={1}
            style={{ minHeight: '50px', maxHeight: '200px' }}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={handleEarthMode}
            className={`earth-btn ${isEarthMode ? 'active' : ''}`}
            title={isEarthMode ? "Switch to normal chat" : "Switched to Live Search mode"}
          >
            <Globe size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="absolute p-2 text-white bg-indigo-500 rounded-lg right-3 bottom-3"
            disabled={!input.trim()}
          >
            <Send size={20} />
          </motion.button>
        </form>

        <div className="flex gap-2 typing-controls">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700 text-gray-300 hover:bg-gray-700 transition-all duration-300 ${
              isListening ? 'bg-red-500 text-white' : ''
            }`}
            onClick={handleVoiceInput}
          >
            <Mic size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-3 text-gray-300 transition-all duration-300 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl backdrop-blur-lg hover:bg-gray-700"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 text-gray-300 transition-all duration-300 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl backdrop-blur-lg hover:bg-red-500 hover:text-white"
            onClick={clearChat}
          >
            <Trash2 size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingContainer;