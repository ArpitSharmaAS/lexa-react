import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Brain } from 'lucide-react';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import SlideMenu from './components/SlideMenu';
import TypingContainer from './components/TypingContainer';
import { ThemeProvider } from './context/ThemeContext';
import { ChatProvider } from './context/ChatContext';
import ContactPage from './pages/ContactPage';
import ImageGeneratePage from './pages/ImageGeneratePage';

function App() {
  return (
    <ThemeProvider>
      <ChatProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white relative">
            <Header />
            <SlideMenu />
            <Routes>
              <Route 
                path="/" 
                element={
                  <main className="relative">
                    <ChatContainer />
                    <TypingContainer />
                  </main>
                } 
              />
              <Route 
                path="/features" 
                element={
                  <div className="flex items-center justify-center min-h-screen p-6">
                    <div className="max-w-2xl w-full bg-gray-800 rounded-2xl p-8 shadow-xl">
                      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Brain className="w-8 h-8 text-indigo-500" />
                        Features
                      </h1>
                      <div className="space-y-4">
                        <FeatureCard
                          title="Smart Conversations"
                          description="Advanced AI-powered chat with natural language understanding"
                          icon="💡"
                        />
                        <FeatureCard
                          title="Multi-Model Support"
                          description="Switch between different AI models for specialized tasks"
                          icon="🔄"
                        />
                        <FeatureCard
                          title="Voice Interaction"
                          description="Speak with the AI using advanced speech recognition"
                          icon="🎤"
                        />
                        <FeatureCard
                          title="Code Highlighting"
                          description="Beautiful syntax highlighting for code snippets"
                          icon="💻"
                        />
                      </div>
                    </div>
                  </div>
                } 
              />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/imageGenerate" element={<ImageGeneratePage />} />
            </Routes>
          </div>
        </Router>
      </ChatProvider>
    </ThemeProvider>
  );
}

const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => (
  <div className="bg-gray-700 rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl">
    <div className="flex items-start gap-4">
      <span className="text-2xl">{icon}</span>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  </div>
);

export default App;