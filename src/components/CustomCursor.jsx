import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Velocity-driven kinetic effects
  const [velocity, setVelocity] = useState(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const moveCursor = (e) => {
      const now = Date.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        const dx = e.clientX - lastPos.current.x;
        const dy = e.clientY - lastPos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const v = dist / dt;
        setVelocity(v);
        
        lastPos.current = { x: e.clientX, y: e.clientY };
        lastTime.current = now;
      }

      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  // Scale up on velocity
  const cursorScale = useTransform(useSpring(velocity, { damping: 10 }), [0, 5], [1, 2.5]);
  const trailOpacity = useTransform(useSpring(velocity, { damping: 10 }), [0, 5], [0, 0.4]);

  return (
    <>
      {/* Kinetic Trail (Lagging slightly) */}
      <motion.div 
        style={{ 
          position: 'fixed',
          top: 0, left: 0,
          width: 32, height: 32,
          border: '1px solid rgba(0, 214, 255, 0.3)',
          borderRadius: '50%',
          x: useSpring(cursorX, { damping: 40, stiffness: 150 }),
          y: useSpring(cursorY, { damping: 40, stiffness: 150 }),
          scale: cursorScale,
          opacity: trailOpacity,
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />

      {/* Main Magnetic Core */}
      <motion.div 
        className="custom-cursor"
        style={{ 
          x: cursorXSpring,
          y: cursorYSpring,
          scale: useTransform(useSpring(velocity, { damping: 10 }), [0, 5], [1, 0.5]),
          zIndex: 10000,
        }}
      >
        <div className="cursor-inner" />
      </motion.div>
    </>
  );
}
