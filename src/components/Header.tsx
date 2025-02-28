import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Brain, Menu, Crown, Image, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const { toggleMenu, isMenuOpen } = useTheme();

  return (
    <motion.header 
      className="header backdrop-blur-md bg-opacity-80"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="header-left">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="menu-icon p-2 rounded-xl bg-opacity-20 bg-white"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        <Link to="/" className="logo group">
          <motion.div
            whileHover={{ rotate: 20 }}
            className="relative"
          >
            <Brain className="w-8 h-8 text-indigo-500" />
            <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
          </motion.div>
          <span className="logo-text text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Lexa AI
          </span>
        </Link>
      </div>

      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="get-pro-btn group overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:opacity-90 transition-opacity" />
        <Crown className="w-5 h-5" />
        <span className="relative z-10">Get Pro</span>
      </motion.button>

      <div className="header-right">
        <Link to="/imageGenerate">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-xl bg-opacity-20 bg-white"
          >
            <Image className="w-6 h-6 text-indigo-500" />
          </motion.button>
        </Link>
      </div>
    </motion.header>
  );
};

export default Header;