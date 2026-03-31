import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommandHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('yrohitprasad45@gmail.com');
    setIsOpen(false);
  };

  const commands = [
    { id: 'hero', label: 'Go to Top', action: () => scrollToSection('hero-section'), icon: '🏠' },
    { id: 'about', label: 'About Me', action: () => scrollToSection('about-section'), icon: '👤' },
    { id: 'skills', label: 'Skills & Tech Stack', action: () => scrollToSection('skills-section'), icon: '⚡' },
    { id: 'projects', label: 'Featured Projects', action: () => scrollToSection('projects-section'), icon: '📂' },
    { id: 'experience', label: 'Work Experience', action: () => scrollToSection('experience-section'), icon: '💼' },
    { id: 'learning', label: 'Learning & Goals', action: () => scrollToSection('learning-section'), icon: '🚀' },
    { id: 'contact', label: 'Contact Me', action: () => scrollToSection('contact-section'), icon: '✉️' },
    { id: 'email', label: 'Copy Email Address', action: copyEmail, icon: '📋' },
    { id: 'linkedin', label: 'Open LinkedIn', action: () => window.open('https://www.linkedin.com/in/rohit-yerrarapu-6534ab290/', '_blank'), icon: '🔗' },
    { id: 'resume', label: 'Download Resume', action: () => console.log('Resume link needed'), icon: '📄' }
  ];

  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="hud-trigger-wrapper"
        style={{
          position: 'fixed',
          top: '2.5rem',
          right: '2.5rem',
          zIndex: 100,
          cursor: 'pointer',
        }}
      >
        {/* Desktop View: HUD Telemetry Text */}
        <div className="bm-desktop-only hud-telemetry" style={{ fontSize: '0.65rem', opacity: 0.6 }}>
          PRESS <span style={{ color: 'var(--bm-primary)' }}>[CMD + K]</span> FOR HUD
        </div>

        {/* Mobile View: 3-Lines Hamburger Icon */}
        <div className="bm-mobile-only" style={{ flexDirection: 'column', gap: '5px', padding: '10px' }}>
          <div style={{ width: '24px', height: '1.5px', background: 'var(--bm-primary)', boxShadow: '0 0 8px var(--bm-primary-glow)' }} />
          <div style={{ width: '18px', height: '1.5px', background: 'var(--bm-primary)', boxShadow: '0 0 8px var(--bm-primary-glow)', alignSelf: 'flex-end' }} />
          <div style={{ width: '24px', height: '1.5px', background: 'var(--bm-primary)', boxShadow: '0 0 8px var(--bm-primary-glow)' }} />
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0,
              width: '100vw', height: '100vh',
              background: 'rgba(5,5,5,0.8)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'auto',
              cursor: 'auto'
            }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              style={{
                width: 'min(500px, 90%)',
                background: 'rgba(20,20,25,0.95)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                overflow: 'hidden'
              }}
            >
              <div style={{ padding: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <input
                  autoFocus
                  placeholder="Type a command..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    fontFamily: 'var(--font-headline)'
                  }}
                />
              </div>

              <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '0.5rem' }}>
                {filtered.map(cmd => (
                  <div
                    key={cmd.id}
                    className="hud-command-item"
                    onClick={cmd.action}
                    style={{
                      padding: '0.8rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      cursor: 'pointer',
                      borderRadius: '8px',
                      transition: 'background 0.2s ease',
                      fontSize: '0.9rem',
                      color: 'rgba(255,255,255,0.7)',
                      fontFamily: 'var(--font-headline)'
                    }}
                  >
                    <span>{cmd.icon}</span>
                    <span>{cmd.label}</span>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
                    No commands found.
                  </div>
                )}
              </div>

              <div style={{
                padding: '0.6rem 1rem',
                background: 'rgba(255,255,255,0.02)',
                fontSize: '0.6rem',
                color: 'rgba(255,255,255,0.2)',
                textAlign: 'right',
                letterSpacing: '0.1em'
              }}>
                ESC TO CLOSE
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
