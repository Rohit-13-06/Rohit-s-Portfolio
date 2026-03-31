import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: scrolled ? '1rem 5%' : '2rem 5%',
        background: scrolled ? 'rgba(10, 10, 10, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.3s ease',
        zIndex: 100,
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent'
      }}
    >
      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-color)' }}>
        RY.
      </div>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '2rem' }}>
        {['About', 'Projects', 'Contact'].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} style={{ fontWeight: 500, transition: 'color 0.3s ease' }}
              onMouseOver={(e) => e.target.style.color = 'var(--accent-color)'}
              onMouseOut={(e) => e.target.style.color = 'var(--text-primary)'}>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default Navbar;
