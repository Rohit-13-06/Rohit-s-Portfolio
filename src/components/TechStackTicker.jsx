import React from 'react';
import { motion } from 'framer-motion';

const techStack = [
  { name: 'HTML5', icon: 'html5' },
  { name: 'CSS3', icon: 'css3' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'React', icon: 'react' },
  { name: 'Python', icon: 'python' },
  { name: 'Java', icon: 'openjdk' },
  { name: 'MySQL', icon: 'mysql' },
  { name: 'Supabase', icon: 'supabase' },
  { name: 'Git', icon: 'git' },
  { name: 'GitHub', icon: 'github' },
  { name: 'Streamlit', icon: 'streamlit' }
];

export default function TechStackTicker() {
  // Triple the items to ensure seamless loop
  const duplicatedStack = [...techStack, ...techStack, ...techStack];

  return (
    <div className="tech-ticker-container">
      <motion.div 
        className="tech-ticker-track"
        animate={{
          x: [0, -100 * techStack.length], // Assuming each card base 100px width logic in CSS
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
        style={{ display: 'flex', gap: '2rem', padding: '1rem 0' }}
      >
        {duplicatedStack.map((tech, index) => (
          <div key={index} className="tech-card bm-card">
            <img 
              src={`https://api.iconify.design/simple-icons:${tech.icon}.svg?color=%23ffffff`} 
              alt={tech.name} 
              className="tech-icon"
              style={{ width: '40px', height: '40px', marginBottom: '0.75rem' }}
              onError={(e) => {
                e.target.src = `https://cdn.simpleicons.org/${tech.icon}/ffffff`;
              }}
            />
            <span className="tech-name">{tech.name}</span>
          </div>
        ))}
      </motion.div>
      
      {/* Gradient masks for smooth edges */}
      <div className="ticker-mask-left"></div>
      <div className="ticker-mask-right"></div>
    </div>
  );
}
