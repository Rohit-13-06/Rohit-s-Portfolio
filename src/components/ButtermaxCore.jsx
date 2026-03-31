import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sphere, Icosahedron, Box, MeshTransmissionMaterial, Text } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';
import russoOneFont from '../assets/fonts/RussoOne-Regular.ttf';
import rapidResponse3DFont from '../assets/fonts/RapidResponse-3D.otf';

// Global state mechanism for the "Cyber-Glitch on Hover" effect
export const glitchStore = {
  isHovered: false
};

const Keycap = React.forwardRef(({ letter, pos, size=[0.5, 0.2, 0.5], highlight=false }, ref) => (
  <group ref={ref} position={pos}>
    <Box args={size}>
      <meshStandardMaterial color={highlight ? "#1a2a3a" : "#111"} metalness={0.8} roughness={0.2} />
    </Box>
    {letter && (
      <Text position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.3} color={highlight ? "#a2d2ff" : "#555"} font={rapidResponse3DFont}>
        {letter}
      </Text>
    )}
  </group>
));

function ExplodingKeyboard() {
  const groupRef = useRef();
  
  // Specific Refs for the exploding parts
  const baseRef = useRef();
  const rKeyRef = useRef();
  const yKeyRef = useRef();
  
  // Text Refs for Opacity manipulation
  const textOhitRef = useRef();
  const textErrarapuRef = useRef();
  
  // Smooth scroll tracking
  const scrollTarget = useRef(0);
  const scrollCurrent = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollTarget.current = Math.min(window.scrollY / 1000, 1);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    // Smoothed scroll interpolation
    scrollCurrent.current = THREE.MathUtils.lerp(scrollCurrent.current, scrollTarget.current, 0.05);

    if (groupRef.current) {
      // Parallax hover based on mouse
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, state.pointer.x * 1, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.pointer.x * 0.1, 0.1);

      // --- THE APPLE-TIER SCROLLYTELLING LOGIC ---
      const s = scrollCurrent.current;

      // 1. The Main Keyboard Base Explodes (Starts 0.15, Ends 0.45)
      const baseProg = Math.max(0, Math.min(1, (s - 0.15) / 0.3));
      if (baseRef.current) {
        baseRef.current.position.y = THREE.MathUtils.lerp(0, -15, baseProg);
        baseRef.current.position.z = THREE.MathUtils.lerp(0, -10, baseProg);
        baseRef.current.rotation.x = THREE.MathUtils.lerp(0, -Math.PI, baseProg);
        
        // At midway, collapse scale to 0 (fading feeling)
        const scale = Math.max(0, 1 - baseProg * 1.5);
        baseRef.current.scale.set(scale, scale, scale);
      }

      // 2. The 'R' Key Flight (Starts 0.35, Ends 0.60)
      const keyProg = Math.max(0, Math.min(1, (s - 0.35) / 0.25));
      if (rKeyRef.current) {
        rKeyRef.current.position.x = THREE.MathUtils.lerp(-1, -5, keyProg); 
        rKeyRef.current.position.y = THREE.MathUtils.lerp(0, 2, keyProg);
        rKeyRef.current.position.z = THREE.MathUtils.lerp(0, 2, keyProg);
        rKeyRef.current.rotation.x = THREE.MathUtils.lerp(0, Math.PI / 2, keyProg);
      }

      // 3. The 'Y' Key Flight (Mirrors R Key)
      if (yKeyRef.current) {
        yKeyRef.current.position.x = THREE.MathUtils.lerp(1, -5, keyProg);
        yKeyRef.current.position.y = THREE.MathUtils.lerp(0, -1, keyProg);
        yKeyRef.current.position.z = THREE.MathUtils.lerp(0, 2, keyProg);
        yKeyRef.current.rotation.x = THREE.MathUtils.lerp(0, Math.PI / 2, keyProg);
      }

      // 4. Name Unspooling (Starts 0.50, Ends 0.70)
      const textProg = Math.max(0, Math.min(1, (s - 0.50) / 0.2));
      
      // 5. Cinematic Handover (Ends 0.78 - Fade out to avoid double-rendering with NameReveal)
      const fadeOut = Math.max(0, Math.min(1, (0.82 - s) / 0.04));
      
      if (textOhitRef.current) {
        textOhitRef.current.fillOpacity = textProg * fadeOut;
      }
      if (textErrarapuRef.current) {
        textErrarapuRef.current.fillOpacity = textProg * fadeOut;
      }
    }
  });

  // Procedural Generic Keys for Keyboard Base
  const renderGenericKeys = () => {
    let keys = [];
    for(let row = 0; row < 5; row++) {
      for(let col = -5; col < 6; col++) {
        // Skip positions where R and Y will be
        if (row === 1 && col === -1) continue; // R pos approx
        if (row === 1 && col === 1) continue; // Y pos approx
        
        keys.push(
          <Keycap 
            key={`${row}-${col}`} 
            pos={[col * 0.6, 0.2, (row * -0.6) + 1.2]} 
            size={[0.45, 0.2, 0.45]} 
          />
        );
      }
    }
    return keys;
  };

  return (
    <group ref={groupRef} rotation={[0.4, 0, 0]} position={[0, -1, 0]}>
      
      {/* 1. Keyboard Base (Blasts Away) */}
      <group ref={baseRef}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
          {/* Main Case */}
          <Box args={[8, 0.3, 4]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#0b0f19" metalness={0.9} roughness={0.1} />
          </Box>
          <Box args={[7.8, 0.35, 3.8]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.1} />
          </Box>
          
          {/* Render 50+ generic dark keycaps */}
          {renderGenericKeys()}
        </Float>
      </group>

      {/* 2. The Isolated 'R' Key */}
      <group ref={rKeyRef}>
        <Keycap letter="R" pos={[-0.6, 0.2, 0.6]} size={[0.5, 0.3, 0.5]} highlight={true} />
        {/* The hidden text that unspools over time */}
        <Text 
          ref={textOhitRef}
          position={[-0.45, 0.1, 0]} 
          rotation={[-Math.PI / 2, 0, 0]} 
          fontSize={0.3} 
          color="#a2d2ff" 
          anchorX="left"
          font={rapidResponse3DFont}
        >
          OHIT
        </Text>
      </group>

      {/* 3. The Isolated 'Y' Key */}
      <group ref={yKeyRef}>
        <Keycap letter="Y" pos={[0.6, 0.2, 0.6]} size={[0.5, 0.3, 0.5]} highlight={true} />
        {/* The hidden text that unspools over time */}
        <Text 
          ref={textErrarapuRef}
          position={[0.75, 0.1, 0]} 
          rotation={[-Math.PI / 2, 0, 0]} 
          fontSize={0.3} 
          color="#a2d2ff" 
          anchorX="left"
          font={rapidResponse3DFont}
        >
          ERRARAPU
        </Text>
      </group>
      {[...Array(60)].map((_, i) => (
        <Sphere key={i} args={[0.03, 8, 8]} position={[(Math.random() - 0.5) * 25, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15]}>
          <meshBasicMaterial color="#e0f2fe" transparent opacity={Math.random() * 0.8 + 0.2} />
        </Sphere>
      ))}
    </group>
  );
}

// Intense, cold glowing post-processing effects
function HolographicEffects() {
  const [active, setActive] = useState(false);
  
  useFrame(() => {
    if (active !== glitchStore.isHovered) {
      setActive(glitchStore.isHovered);
    }
  });

  return (
    <EffectComposer>
      {/* Bloom gives the icy cyan glow */}
      <Bloom luminanceThreshold={0.15} intensity={active ? 3.5 : 1.8} />
      {/* Subtle chromatic aberration to complete the broken HUD aesthetic */}
      <ChromaticAberration offset={active ? [0.015, 0.015] : [0.002, 0.002]} />
      {/* Digital Static */}
      <Noise opacity={active ? 0.2 : 0.04} />
    </EffectComposer>
  );
}

export default function ButtermaxCore() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 1.5]}>
      {/* The dense fog color seamlessly blending with the HTML body background */}
      <color attach="background" args={['#0b0f19']} />
      <fog attach="fog" args={['#0b0f19', 8, 25]} />
      
      {/* Icy, high-contrast directional lighting */}
      <ambientLight intensity={1.2} color="#e0f2fe" />
      <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#a2d2ff" />
      
      <ExplodingKeyboard />
      
      {/* HDRI Environment heavily influences MeshTransmissionMaterial refractions */}
      <Environment preset="city" />
    </Canvas>
  );
}
