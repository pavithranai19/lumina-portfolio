import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface StarFieldProps {
  count?: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

function StarField({ count = 4000, mouse }: StarFieldProps) {
  const mesh = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 1.8 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Cyan to purple colors
      const mixFactor = Math.random();
      colors[i3] = mixFactor < 0.7 ? 0 : 1; // R
      colors[i3 + 1] = mixFactor < 0.7 ? 0.83 : 0.22; // G
      colors[i3 + 2] = 1; // B
      
      sizes[i] = Math.random() * 2 + 0.5;
    }
    
    return [positions, colors, sizes];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = time * 0.02;
    mesh.current.rotation.y = time * 0.03;
    
    // Mouse influence
    mesh.current.rotation.x += mouse.current.y * 0.0005;
    mesh.current.rotation.y += mouse.current.x * 0.0005;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.003}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function TwinklingStars({ count = 500 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 4;
      pos[i3 + 1] = (Math.random() - 0.5) * 4;
      pos[i3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const material = mesh.current.material as THREE.PointsMaterial;
    material.opacity = 0.5 + Math.sin(state.clock.getElapsedTime() * 2) * 0.3;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.002}
        color="#00d4ff"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface GalaxyBackgroundProps {
  className?: string;
}

export default function GalaxyBackground({ className = '' }: GalaxyBackgroundProps) {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <StarField mouse={mouse} />
        <TwinklingStars />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
}
