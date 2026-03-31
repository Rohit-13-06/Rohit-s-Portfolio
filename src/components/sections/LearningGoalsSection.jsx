import React from 'react';
import { motion } from 'framer-motion';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
};

const learning = [
  { icon: '🧠', text: 'Advanced NLP & LangChain' },
  { icon: '☁️', text: 'Cloud Deployment (AWS / Vercel)' },
  { icon: '🏗️', text: 'System Design Patterns' },
  { icon: '🤖', text: 'LLM Fine-Tuning & RAG' }
];

const goals = [
  { icon: '🎯', text: 'Land an AI/ML internship at a top company' },
  { icon: '🌍', text: 'Contribute to major open-source AI projects' },
  { icon: '🚀', text: 'Build production-grade AI tools used by real users' },
  { icon: '📝', text: 'Publish research in NLP / speech processing' }
];

export default function LearningGoalsSection() {
  return (
    <section id="learning-section" className="portfolio-section">
      <motion.div
        className="section-inner"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeUp} className="section-header">
          <span className="label-sm">Growth</span>
          <h2 className="section-title">
            Always <span className="gradient-text">Evolving</span>
          </h2>
        </motion.div>

        <div className="learning-goals-grid">
          <motion.div 
            variants={fadeUp} 
            className="bm-card lg-card" 
            whileHover={{ 
              y: -8, 
              borderColor: 'var(--bm-primary)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px var(--bm-primary-glow)'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h3 className="lg-title">
              <span className="lg-icon" style={{ fontSize: '1.5rem' }}>📖</span>
              Currently Learning On
            </h3>
            <p className="lg-description" style={{ fontSize: '0.92rem', color: 'var(--on-surface-variant)', marginBottom: '1.5rem', lineHeight: '1.6', opacity: 0.8 }}>
              I'm currently learning python frameworks and AI/ML fundamentals with Full stack development with cloud deployment (AWS).
            </p>
            <ul className="lg-list">
              {learning.map((item, i) => (
                <motion.li 
                  key={i} 
                  variants={fadeUp} 
                  className="lg-item"
                  whileHover={{ x: 10, color: 'var(--bm-primary)', background: 'rgba(255,255,255,0.05)' }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.95rem' }}>{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            variants={fadeUp} 
            className="bm-card lg-card" 
            whileHover={{ 
              y: -8, 
              borderColor: 'var(--bm-primary)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px var(--bm-primary-glow)'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h3 className="lg-title">
              <span className="lg-icon" style={{ fontSize: '1.5rem' }}>🗺️</span>
              My Goals
            </h3>
            <p className="lg-description" style={{ fontSize: '0.92rem', color: 'var(--on-surface-variant)', marginBottom: '1.5rem', lineHeight: '1.6', opacity: 0.8 }}>
              Dedicated to building meaningful AI products that bridge the gap between research and reality.
            </p>
            <ul className="lg-list">
              {goals.map((item, i) => (
                <motion.li 
                  key={i} 
                  variants={fadeUp} 
                  className="lg-item"
                  whileHover={{ x: 10, color: 'var(--bm-primary)', background: 'rgba(255,255,255,0.05)' }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.95rem' }}>{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
