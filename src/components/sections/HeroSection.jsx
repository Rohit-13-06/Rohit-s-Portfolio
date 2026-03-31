import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const roles = [
  'AI/ML Engineer',
  'Full-Stack Developer',
  'NLP Researcher',
  'Open Source Builder'
];

function useTypingEffect(words, typingSpeed = 80, deletingSpeed = 50, pauseTime = 2000) {
  const [display, setDisplay] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout;

    if (!isDeleting && display === current) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && display === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setDisplay(prev =>
          isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        );
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [display, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return display;
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
};

const stats = [
  { value: '3+', label: 'Projects' },
  { value: '3', label: 'Internships' },
  { value: 'AI+Web', label: 'Focus Area' }
];

export default function HeroSection() {
  const typedRole = useTypingEffect(roles);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="hero-section" className="hero-section" ref={containerRef}>
      {/* Ambient gradient orb */}
      <div className="hero-orb" />

      <motion.div
        className="hero-inner"
        style={{ y: contentY, opacity: contentOpacity }}
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Label */}
        <motion.div variants={fadeUp} className="hero-label">
          <span className="hero-label-dot" />
          Available for Opportunities
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={fadeUp} className="hero-headline">
          I Build <span className="gradient-text">Intelligent</span>
          <br />
          Web Applications
        </motion.h1>

        {/* Typing Roles */}
        <div style={{ minHeight: '2.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div variants={fadeUp} className="hero-roles" style={{ margin: 0 }}>
            <span className="hero-role-prefix">&gt;</span>
            <span className="hero-role-text">{typedRole}</span>
            <span className="hero-cursor">|</span>
          </motion.div>
        </div>

        {/* Bio */}
        <motion.p variants={fadeUp} className="hero-bio">
          B.Tech CSE student at HITM. Specializing in Deep Learning and Full-Stack 
          Engineering. Currently bridging the gap between sophisticated AI models 
          and seamless user interfaces.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="hero-ctas">
          <a href="#projects-section" className="bm-btn-primary hero-cta-primary">
            View Projects
          </a>
          <a href="#contact-section" className="bm-btn-secondary">
            Get In Touch
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeUp} className="hero-stats">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              className="hero-stat"
              whileHover={{ y: -5, color: 'var(--bm-primary)' }}
            >
              <span className="hero-stat-value">{stat.value}</span>
              <span className="hero-stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
