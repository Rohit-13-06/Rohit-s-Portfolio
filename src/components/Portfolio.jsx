import React from 'react';
import { motion, useTransform, useScroll, useSpring } from 'framer-motion';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import EducationSection from './sections/EducationSection';
import SkillsSection from './sections/SkillsSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import LearningGoalsSection from './sections/LearningGoalsSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } 
  }
};

const SectionWrapper = ({ children, id, className = "" }) => (
  <motion.div
    id={id}
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={sectionVariants}
  >
    {children}
  </motion.div>
);

export default function Portfolio({ scrollProgress, rotateX, rotateY }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Fade in after name reveal clears (0.95 → 0.99)
  const contentOpacity = useTransform(scrollProgress, [0.95, 0.99], [0, 1]);
  const contentY = useTransform(scrollProgress, [0.95, 1], [60, 0]);

  return (
    <div className="portfolio-wrapper">
      {/* Reading Progress Bar */}
      <motion.div
        className="progress-bar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, var(--bm-primary), var(--bm-secondary))',
          transformOrigin: '0%',
          scaleX,
          zIndex: 1000,
          boxShadow: '0 0 10px var(--bm-primary-glow)',
          opacity: contentOpacity
        }}
      />

      <motion.div
        className="portfolio-content"
        style={{
          opacity: contentOpacity,
          y: contentY,
        }}
      >
        {/* Glassmorphic sticky nav */}
        <nav className="portfolio-nav">
          <div className="nav-brand">RY<span style={{ color: 'var(--bm-primary)' }}>.</span></div>
          <div className="nav-links">
            <a href="#about-section">About</a>
            <a href="#education-section">Education</a>
            <a href="#skills-section">Skills</a>
            <a href="#projects-section">Projects</a>
            <a href="#experience-section">Experience</a>
            <a href="#contact-section">Contact</a>
          </div>
          <a href="#contact-section" className="nav-cta-btn">Hire Me</a>
        </nav>

        <main>
          <SectionWrapper id="hero-section"><HeroSection /></SectionWrapper>
          <SectionWrapper id="about-section"><AboutSection /></SectionWrapper>
          <SectionWrapper id="education-section"><EducationSection /></SectionWrapper>
          <SectionWrapper id="skills-section"><SkillsSection /></SectionWrapper>
          <SectionWrapper id="projects-section"><ProjectsSection /></SectionWrapper>
          <SectionWrapper id="experience-section"><ExperienceSection /></SectionWrapper>
          <SectionWrapper id="learning-section"><LearningGoalsSection /></SectionWrapper>
          <SectionWrapper id="contact-section"><ContactSection /></SectionWrapper>
        </main>
        
        <Footer />
      </motion.div>
    </div>
  );
}
