import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useChat } from '../context/ChatContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Dog, // Changed from Horse to Dog since Horse isn't available
  Infinity, 
  CircuitBoard,
  Settings,
  Phone,
  X
} from 'lucide-react';

const SlideMenu = () => {
  const { isMenuOpen, toggleMenu } = useTheme();
  const { changeModel } = useChat();

  const menuVariants = {
    closed: { x: '-100%' },
    open: { 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  const showModelChangeAlert = (modelName: string) => {
    const alertContainer = document.createElement('div');
    alertContainer.className = 'custom-alert';
    
    alertContainer.innerHTML = `
      <div class="custom-alert-content">
        <p>Switched to ${modelName} model successfully!</p>
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

  const handleModelChange = (model: string, displayName: string) => {
    changeModel(model);
    showModelChangeAlert(displayName);
    toggleMenu();
  };

  const ModelButton = ({ 
    model,
    displayName,
    icon: Icon, 
    gradient 
  }: { 
    model: string,
    displayName: string,
    icon: typeof Sparkles, 
    gradient: string 
  }) => (
    <motion.button
      variants={itemVariants}
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => handleModelChange(model, displayName)}
      className={`menu-btn group overflow-hidden relative ${gradient}`}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white bg-opacity-10 rounded-lg">
          <Icon size={20} />
        </div>
        <span>Use {displayName}</span>
      </div>
    </motion.button>
  );

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={toggleMenu}
          />
          <motion.div
            className="slide-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white bg-opacity-10"
            >
              <X size={24} />
            </motion.button>

            <div className="mt-12 space-y-4">
              <ModelButton
                model="gemini"
                displayName="Gemini"
                icon={Sparkles}
                gradient="bg-gradient-to-r from-purple-500 to-pink-500"
              />
              
              <ModelButton
                model="llama"
                displayName="LLama"
                icon={Dog}
                gradient="bg-gradient-to-r from-green-500 to-teal-500"
              />
              
              <ModelButton
                model="qwen"
                displayName="Qwen"
                icon={Infinity}
                gradient="bg-gradient-to-r from-blue-500 to-indigo-500"
              />
              
              <ModelButton
                model="mistral"
                displayName="Mistral"
                icon={CircuitBoard}
                gradient="bg-gradient-to-r from-red-500 to-orange-500"
              />

              <Link to="/features" className="block">
                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="menu-btn w-full bg-gradient-to-r from-gray-700 to-gray-600"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white bg-opacity-10 rounded-lg">
                      <Settings size={20} />
                    </div>
                    <span>Features</span>
                  </div>
                </motion.button>
              </Link>

              <Link to="/contact" className="block">
                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="menu-btn w-full bg-gradient-to-r from-gray-700 to-gray-600"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white bg-opacity-10 rounded-lg">
                      <Phone size={20} />
                    </div>
                    <span>Contact</span>
                  </div>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SlideMenu;