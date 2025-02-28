import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github as GitHub, Linkedin, Twitter, Send, User, Calendar, Briefcase } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faJs, faNodeJs, faPython, faAws } from '@fortawesome/free-brands-svg-icons';

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission here
    // For now, just show an alert
    const alertContainer = document.createElement('div');
    alertContainer.className = 'custom-alert';
    
    alertContainer.innerHTML = `
      <div class="custom-alert-content">
        <p>Message sent successfully! We'll get back to you soon.</p>
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
    <div className="contact-container">
      <motion.div 
        className="contact-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="contact-title">Get in Touch</h1>
        <p className="contact-subtitle">
          Have questions about our AI services or want to collaborate? 
          Reach out and let's create something amazing together.
        </p>
      </motion.div>

      <div className="contact-grid">
        <motion.div 
          className="contact-info"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="contact-section">
            <h2 className="contact-section-title">
              <User className="w-5 h-5 text-indigo-400" />
              Contact Information
            </h2>
            <div className="contact-list">
              <a href="mailto:contact@lexaai.com" className="contact-item">
                <Mail className="w-5 h-5 text-indigo-400" />
                <span>contact@lexaai.com</span>
              </a>
              <a href="tel:+1234567890" className="contact-item">
                <Phone className="w-5 h-5 text-indigo-400" />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="contact-item">
                <MapPin className="w-5 h-5 text-indigo-400" />
                <span>123 AI Boulevard, Tech Valley, CA 94103</span>
              </div>
            </div>
          </div>

          <div className="contact-section">
            <h2 className="contact-section-title">
              <Briefcase className="w-5 h-5 text-indigo-400" />
              Professional Experience
            </h2>
            
            <div className="space-y-6">
              <ExperienceCard 
                company="AI Solutions Inc."
                title="Senior AI Engineer"
                date="2022 - Present"
                description="Leading the development of conversational AI systems and natural language processing models for enterprise clients."
                skills={["NLP", "TensorFlow", "PyTorch", "React", "Node.js"]}
              />
              
              <ExperienceCard 
                company="TechGiant Corp"
                title="Machine Learning Engineer"
                date="2019 - 2022"
                description="Developed and deployed machine learning models for content recommendation and user behavior prediction."
                skills={["Python", "AWS", "Scikit-learn", "SQL", "Docker"]}
              />
              
              <ExperienceCard 
                company="StartupX"
                title="Full Stack Developer"
                date="2017 - 2019"
                description="Built scalable web applications and RESTful APIs for various startup clients in the tech industry."
                skills={["JavaScript", "React", "Node.js", "MongoDB", "Express"]}
              />
            </div>
          </div>

          <div className="contact-section">
            <h2 className="contact-section-title">
              <Calendar className="w-5 h-5 text-indigo-400" />
              Technical Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <SkillCard icon={<FontAwesomeIcon icon={faReact} />} name="React" />
              <SkillCard icon={<FontAwesomeIcon icon={faJs} />} name="JavaScript" />
              <SkillCard icon={<FontAwesomeIcon icon={faNodeJs} />} name="Node.js" />
              <SkillCard icon={<FontAwesomeIcon icon={faPython} />} name="Python" />
              <SkillCard icon={<FontAwesomeIcon icon={faAws} />} name="AWS" />
              <SkillCard icon="🤖" name="Machine Learning" />
            </div>
          </div>

          <div className="contact-section">
            <h2 className="contact-section-title">Follow Us</h2>
            <div className="flex gap-4 mt-4">
              <motion.a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="p-3 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition-all"
              >
                <GitHub className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="p-3 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="p-3 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="contact-form-container"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <form onSubmit={handleSubmit} className="contact-form">
            <h2 className="text-2xl font-semibold mb-6 text-white">Send us a message</h2>
            
            <div className="form-group">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input 
                type="text" 
                id="name" 
                className="form-input" 
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input 
                type="email" 
                id="email" 
                className="form-input" 
                placeholder="john@example.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input 
                type="text" 
                id="subject" 
                className="form-input" 
                placeholder="How can we help you?"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea 
                id="message" 
                className="form-textarea" 
                placeholder="Your message here..."
                required
              ></textarea>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="submit-btn flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

const ExperienceCard = ({ 
  company, 
  title, 
  date, 
  description, 
  skills 
}: { 
  company: string; 
  title: string; 
  date: string; 
  description: string; 
  skills: string[] 
}) => (
  <motion.div 
    className="experience-card"
    whileHover={{ y: -5 }}
  >
    <div className="experience-header">
      <h3 className="experience-company">{company}</h3>
      <span className="experience-date">{date}</span>
    </div>
    <h4 className="experience-title">{title}</h4>
    <p className="experience-description">{description}</p>
    <div className="skill-tags">
      {skills.map((skill, index) => (
        <span key={index} className="skill-tag">{skill}</span>
      ))}
    </div>
  </motion.div>
);

const SkillCard = ({ icon, name }: { icon: React.ReactNode | string; name: string }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.05 }}
    className="flex flex-col items-center justify-center p-4 bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700"
  >
    <div className="text-2xl mb-2">
      {typeof icon === 'string' ? icon : icon}
    </div>
    <span className="text-sm text-gray-300">{name}</span>
  </motion.div>
);

export default ContactPage;