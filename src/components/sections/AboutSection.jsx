import React from 'react';
import { motion } from 'framer-motion';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } }
};

const cards = [
  {
    icon: '👤',
    label: 'Who I Am',
    title: 'B.Tech CSE Student',
    body: 'A passionate Computer Science student at HITM, Hyderabad with a deep interest in building intelligent systems that create real-world impact. I thrive at the intersection of AI and software engineering.'
  },
  {
    icon: '⚡',
    label: 'What I Do',
    title: 'AI + Web Development',
    body: 'I build AI-powered web applications — from NLP classification models and LLM integrations to responsive full-stack platforms with modern frameworks like React, Next.js, and Supabase.'
  },
  {
    icon: '🔬',
    label: 'What Makes Me Unique',
    title: 'Research-Driven Builder',
    body: 'I\'ve worked on HuBERT-based language identification at IIIT Hyderabad, built AI-powered academic platforms, and developed community-driven cultural archives with LLM integration — not typical student projects.'
  },
  {
    icon: '🚀',
    label: 'Currently Working On',
    title: 'Deepening AI Expertise',
    body: 'Exploring advanced NLP techniques, LangChain for LLM orchestration, and system design patterns. Building tools that push the boundaries of what student developers can ship to production.'
  }
];

export default function AboutSection() {
  return (
    <section id="about-section" className="portfolio-section">
      <motion.div
        className="section-inner"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeUp} className="section-header">
          <span className="label-sm">About</span>
          <h2 className="section-title">
            More Than Just <span className="gradient-text">Code</span>
          </h2>
          <p className="section-subtitle">
            I don't just write code — I engineer intelligent solutions that solve meaningful problems.
          </p>
        </motion.div>

        <div className="about-grid">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bm-card about-card"
              whileHover={{ 
                y: -10, 
                borderColor: 'var(--bm-primary)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px var(--bm-primary-glow)'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="about-card-icon" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <span className="label-sm" style={{ marginBottom: '0.2rem', color: 'var(--bm-primary)', opacity: 0.8 }}>{card.label}</span>
              <h3 className="about-card-title" style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>{card.title}</h3>
              <p className="about-card-body" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{card.body}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
