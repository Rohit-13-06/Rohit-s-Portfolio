import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Overlay() {
  const { scrollYProgress } = useScroll();
  
  // Nav bar visibility (0 at top, 1 after slight scroll)
  const navOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  // Storytelling Beats Opacity Mapping
  // Beat 1: Hero (0-15%)
  const beat1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.15], [1, 1, 0]);
  const beat1Y = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // Beat 2: Engineering Reveal (15-40%)
  const beat2Opacity = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
  const beat2X = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [-50, 0, 0, -50]);

  // Beat 3: Mechanics & Expansion (40-65%)
  const beat3Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6, 0.7], [0, 1, 1, 0]);
  const beat3X = useTransform(scrollYProgress, [0.4, 0.5, 0.6, 0.7], [50, 0, 0, 50]);

  // Beat 4: Final Reassembly & CTA (75-100%)
  const beat4Opacity = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);
  const beat4Y = useTransform(scrollYProgress, [0.75, 0.85, 1], [50, 0, 0]);

  return (
    <div className="scrollytelling-container" style={{ position: 'relative', width: '100vw' }}>
      
      {/* 400vh Scroll Track to drive the 3D animation timeline */}
      <div style={{ height: '400vh', width: '100%', pointerEvents: 'none' }} />

      {/* APPLE-STYLE FIX NAV */}
      <motion.nav 
        className="glass-nav" 
        style={{ opacity: navOpacity, pointerEvents: 'auto' }}
      >
        <div style={{ color: 'var(--on-surface)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '-0.02em' }}>
          RY-KEYBOARD
        </div>
        <div className="glass-nav-links">
          <a href="#overview">Overview</a>
          <a href="#mechanics">Mechanics</a>
          <a href="#switches">Switches</a>
          <a href="#specs">Specs</a>
        </div>
        <div>
          <a href="#buy" className="nav-cta" style={{ color: 'var(--on-surface)' }}>Experience RY</a>
        </div>
      </motion.nav>

      {/* --- FIXED VIEWPORT SCROLLYTELLING OVERLAYS --- */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 10 }}>
        
        {/* BEAT 1: HERO (0-15%) */}
        <motion.div 
          style={{ 
            opacity: beat1Opacity, y: beat1Y,
            position: 'absolute', top: '70%', left: '0', right: '0', 
            textAlign: 'center', pointerEvents: 'auto'
          }}
        >
          <h1 style={{ fontSize: '4.5rem', fontWeight: 700, margin: 0, color: 'var(--on-surface)' }}>
            RY-KEYBOARD
          </h1>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: 'var(--on-surface-variant)', marginTop: '0.5rem' }}>
            Typing, perfected.
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--on-surface-variant)', marginTop: '1rem' }}>
            Flagship mechanical engineering, re-engineered for a world that never stops.
          </p>
        </motion.div>

        {/* BEAT 2: ENGINEERING REVEAL (15-40%) */}
        <motion.div 
          style={{ 
            opacity: beat2Opacity, x: beat2X,
            position: 'absolute', top: '40%', left: '10%', maxWidth: '400px',
            textAlign: 'left', pointerEvents: 'auto'
          }}
        >
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--on-surface)', marginBottom: '1rem' }}>
            Precision-engineered for flow.
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--on-surface-variant)' }}>
            Custom linear switches, acoustic dampening chambers, and optimized actuation deliver studio-grade feedback.
          </p>
          <p style={{ fontSize: '1.1rem', color: 'var(--on-surface-variant)' }}>
            Every keystroke is tuned for balance, power, and comfort—hour after hour.
          </p>
        </motion.div>

        {/* BEAT 3: MECHANICS & ISOLATION (40-65%) */}
        <motion.div 
          style={{ 
            opacity: beat3Opacity, x: beat3X,
            position: 'absolute', top: '40%', right: '10%', maxWidth: '400px',
            textAlign: 'right', pointerEvents: 'auto'
          }}
        >
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--on-surface)', marginBottom: '1rem' }}>
            Adaptive feedback, redefined.
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--on-surface-variant)' }}>
            Multi-layer PBT keycaps resist wear in every direction.
          </p>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--on-surface-variant)' }}>
            Real-time tactile analysis adapts to your typing environment.
          </p>
          <p style={{ fontSize: '1.1rem', color: 'var(--on-surface-variant)' }}>
            Your rhythm stays pure—distractions fade away.
          </p>
        </motion.div>

        {/* BEAT 4: FINAL REASSEMBLY / CTA (75-100%) */}
        <motion.div 
          style={{ 
            opacity: beat4Opacity, y: beat4Y,
            position: 'absolute', bottom: '15%', left: '0', right: '0',
            textAlign: 'center', pointerEvents: 'auto'
          }}
        >
          <h2 style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--on-surface)', marginBottom: '0.5rem' }}>
            Feel everything. Type nothing else.
          </h2>
          <p style={{ fontSize: '1.5rem', color: 'var(--on-surface-variant)', marginBottom: '2rem' }}>
            RY-CORE. Designed for focus, crafted for comfort.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button style={{ padding: '1rem 2.5rem', background: '#fff', color: '#000', border: 'none', borderRadius: '50px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>
              Experience RY-CORE
            </button>
            <button style={{ padding: '1rem 2.5rem', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50px', fontSize: '1rem', cursor: 'pointer' }}>
              See full specs
            </button>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}
