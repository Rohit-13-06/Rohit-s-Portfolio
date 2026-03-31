import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HumanStatus() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 3, duration: 1 }}
      style={{ 
        position: 'fixed', 
        bottom: '2rem', 
        right: '2rem', 
        zIndex: 100,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.4rem'
      }}
    >
      {/* Location & Time Telemetry */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span className="hud-telemetry" style={{ fontSize: '0.65rem' }}>
          HYDERABAD // {formatTime(time)}
        </span>
        <span style={{ fontSize: '0.8rem' }}>🇮🇳</span>
      </div>

      {/* Availability Pulse */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <motion.div 
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: '6px', height: '6px', background: '#00FF94', borderRadius: '50%', boxShadow: '0 0 10px #00FF94' }}
        />
        <span style={{ 
          fontFamily: 'var(--font-headline)', 
          fontSize: '0.6rem', 
          letterSpacing: '0.15em', 
          color: '#00FF94',
          textTransform: 'uppercase',
          fontWeight: 600
        }}>
          Open for Opportunities
        </span>
      </div>

    </motion.div>
  );
}
