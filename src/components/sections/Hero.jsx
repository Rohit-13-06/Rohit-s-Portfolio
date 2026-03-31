import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Hero3D from '../canvas/Hero3D';

const Hero = () => {
  return (
    <section id="hero" style={{ height: '100vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Suspense fallback={null}>
            <Hero3D />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
      
      <div style={{ padding: '0 10%', zIndex: 1, pointerEvents: 'none' }}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 800, margin: 0, lineHeight: 1.1 }}
        >
          ROHIT <br />
          <span style={{ color: 'var(--accent-color)' }}>YERRARAPU</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginTop: '1rem', maxWidth: '600px' }}
        >
          A Web Developer specializing in front-end & back-end development, building scalable applications.
        </motion.p>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.6 }}
           style={{ pointerEvents: 'auto', marginTop: '2rem' }}
        >
          <a href="#projects" style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            background: 'var(--accent-color)',
            color: 'white',
            borderRadius: '30px',
            fontWeight: 600,
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)',
          }} onMouseOver={(e) => {
            e.target.style.background = 'var(--accent-hover)';
            e.target.style.transform = 'translateY(-2px)';
          }} onMouseOut={(e) => {
            e.target.style.background = 'var(--accent-color)';
            e.target.style.transform = 'translateY(0)';
          }}>View My Work</a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
