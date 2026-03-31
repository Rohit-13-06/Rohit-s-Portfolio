import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';


function Keyboard({ position, rotation }) {
  const meshRef = useRef();
  useFrame(() => {
    if(meshRef.current) meshRef.current.rotation.x += 0.002;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} position={position} rotation={rotation}>
      <group ref={meshRef}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.5, 0.1, 1]} />
          <meshStandardMaterial color="#111" metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[2.3, 0.05, 0.8]} />
          <meshStandardMaterial color="#0a0a0c" wireframe transparent opacity={0.6} />
        </mesh>
      </group>
    </Float>
  );
}

function Mouse({ position, rotation }) {
  const meshRef = useRef();
  useFrame(() => {
    if(meshRef.current) meshRef.current.rotation.z -= 0.003;
  });

  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5} position={position} rotation={rotation}>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.4, 0.15, 0.7]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.2} />
      </mesh>
    </Float>
  );
}

// Scene Wrapper to handle Parallax Rotation from Props
function SceneContainer({ rotateX, rotateY }) {
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current) return;
    
    // Sync React Motion Values to Three.js Rotation (in radians)
    // We convert degrees (from props) to radians slowly for smoothness
    const targetRotX = THREE.MathUtils.degToRad(rotateX.get() || 0);
    const targetRotY = THREE.MathUtils.degToRad(rotateY.get() || 0);
    
    // Lean smoothing inside the render loop
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1);
  });

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Keyboard position={[2.5, -1, -1]} rotation={[0.4, -0.2, 0.1]} />
      <Mouse position={[0, -2, 2]} rotation={[-0.2, 0.5, -0.1]} />
      <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={20} blur={2} far={4} color="#00D6FF" />
    </group>
  );
}

export default function PortfolioBackground({ rotateX, rotateY }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 5, 20]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 10, 5]} angle={0.2} penumbra={1} intensity={2} color="#00D6FF" />
        <spotLight position={[-5, 5, -5]} angle={0.3} penumbra={1} intensity={1} color="#ffffff" />
        
        {/* Pass tilt values into the interactive scene container */}
        <SceneContainer rotateX={rotateX} rotateY={rotateY} />
      </Canvas>
    </div>
  );
}
