import React from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';

export default function NameReveal({ scrollProgress, rotateX, rotateY }) {
  // Guard against undefined scrollProgress
  const fallback = useMotionValue(0);
  const progress = scrollProgress || fallback;

  const nameOpacity = useTransform(progress, [0.82, 0.88, 0.93, 0.96], [0, 1, 1, 0]);
  const nameScale = useTransform(progress, [0.82, 0.88, 0.93, 0.96], [0.7, 1, 1, 1.1]);
  const nameY = useTransform(progress, [0.82, 0.88, 0.93, 0.96], [60, 0, 0, -40]);

  const textStyle = {
    fontFamily: "'RapidBold3D', 'RapidFinalForce', 'RapidBrand', sans-serif",
    fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
    fontWeight: 900,
    letterSpacing: '0.06em',
    color: '#ffffff',
    textShadow: '0 0 40px rgba(0, 214, 255, 0.4), 0 0 80px rgba(0, 80, 255, 0.2)',
    lineHeight: 1.15,
    WebkitTextStroke: '1px rgba(0, 214, 255, 0.3)',
  };

  const subtitleStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 'clamp(0.6rem, 1.2vw, 0.9rem)',
    fontWeight: 400,
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    color: 'var(--bm-primary)',
    opacity: 0.8
  };

  return (
    /* Outer container uses flexbox to center — no transform needed */
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      pointerEvents: 'none',
    }}>
      <motion.div style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        opacity: nameOpacity,
        scale: nameScale,
        y: nameY,
      }}>
        <div style={textStyle}>ROHIT</div>
        <div style={textStyle}>YERRARAPU</div>
        <div style={subtitleStyle}>AI-Focused Web Developer</div>
      </motion.div>
    </div>
  );
}
