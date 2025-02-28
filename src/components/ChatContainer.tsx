import React from 'react';
import { useChat } from '../context/ChatContext';
import Message from './Message';
import { motion } from 'framer-motion';
import { Brain, Command, Clock, Cloud } from 'lucide-react';

const ChatContainer = () => {
  const { messages } = useChat();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="chat-container">
      {messages.length === 0 ? (
        <motion.div 
          className="flex items-center justify-center min-h-[80vh]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center space-y-8 max-w-2xl mx-auto px-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative inline-block"
            >
              <Brain className="w-20 h-20 text-indigo-500 mx-auto" />
              <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20" />
            </motion.div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Welcome to Lexa AI
            </h1>
            
            <p className="text-gray-300 text-lg">
              Start a conversation and explore the power of AI.
              Your chat history will be displayed here.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <CommandCard
                icon={<Command className="w-6 h-6" />}
                command="@news"
                description="Get the latest news articles"
              />
              <CommandCard
                icon={<Clock className="w-6 h-6" />}
                command="@time"
                description="Get current date and time"
              />
              <CommandCard
                icon={<Cloud className="w-6 h-6" />}
                command="@weather"
                description="Check weather conditions"
              />
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {messages.map((message, index) => (
            <Message key={index} {...message} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

const CommandCard = ({ icon, command, description }: { icon: React.ReactNode, command: string, description: string }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -2 }}
    className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-4 border border-gray-700"
  >
    <div className="flex items-start gap-3">
      <div className="p-2 bg-indigo-500 bg-opacity-20 rounded-lg">
        {icon}
      </div>
      <div>
        <code className="text-indigo-400 font-mono">{command}</code>
        <p className="text-gray-400 text-sm mt-1">{description}</p>
      </div>
    </div>
  </motion.div>
);

export default ChatContainer;