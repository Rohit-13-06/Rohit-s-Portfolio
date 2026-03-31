import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import CanvasScrollytelling from './components/CanvasScrollytelling';
import PortfolioBackground from './components/PortfolioBackground';
import Portfolio from './components/Portfolio';
import NameReveal from './components/NameReveal';
import CustomCursor from './components/CustomCursor';
import ScrollIndicator from './components/ScrollIndicator';
import HumanStatus from './components/HumanStatus';
import CommandHUD from './components/CommandHUD';
import './index.css';

function App() {
  const heroRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // --- Shared 3D Hover Tilt Physics ---
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 500);
  const springConfig = { damping: 50, stiffness: 100, mass: 1 };
  
  const rotateY = useSpring(useTransform(mouseX, [0, 2000], [-10, 10]), springConfig);
  const rotateX = useSpring(useTransform(mouseY, [0, 2000], [10, -10]), springConfig);

  const bgRotateY = useSpring(useTransform(mouseX, [0, 2000], [5, -5]), springConfig);
  const bgRotateX = useSpring(useTransform(mouseY, [0, 2000], [-5, 5]), springConfig);

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.01], [1, 0]);

  return (
    <div style={{ position: 'relative', width: '100%', cursor: 'none', background: '#050505', overflowX: 'hidden' }}>
      <CustomCursor />
      <div className="grain-overlay" />
      
      {/* Unique & Human Interaction Layer */}
      <CommandHUD />
      <HumanStatus />
      
      {isLoaded && (
        <motion.div style={{ opacity: scrollIndicatorOpacity }}>
          <ScrollIndicator />
        </motion.div>
      )}

      <PortfolioBackground rotateX={bgRotateX} rotateY={bgRotateY} />

      <CanvasScrollytelling 
        scrollProgress={scrollYProgress} 
        onLoaded={() => setIsLoaded(true)}
        rotateX={rotateX}
        rotateY={rotateY}
      />

      <NameReveal 
        scrollProgress={scrollYProgress} 
        rotateX={rotateX} 
        rotateY={rotateY} 
      />

      <div ref={heroRef} style={{ height: '500vh', width: '100%', pointerEvents: 'none' }} />

      <Portfolio 
        scrollProgress={scrollYProgress} 
        rotateX={rotateX} 
        rotateY={rotateY} 
      />
    </div>
  );
}

export default App;
