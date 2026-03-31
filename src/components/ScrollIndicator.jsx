import React from 'react';
import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  return (
    <div className="scroll-indicator">
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="scroll-text"
      >
        SCROLL
      </motion.span>
      <div className="scroll-line">
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="scroll-dot"
        />
      </div>
    </div>
  );
}
