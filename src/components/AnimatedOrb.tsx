import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function OrbMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform float uHover;
    varying vec2 vUv;
    
    vec3 palette(float t) {
      vec3 a = vec3(0.0, 0.83, 1.0); // Cyan
      vec3 b = vec3(0.52, 0.22, 0.93); // Purple
      vec3 c = vec3(1.0, 0.0, 0.43); // Pink
      return mix(mix(a, b, t), c, sin(t * 3.14159) * 0.5 + 0.5);
    }
    
    void main() {
      vec2 center = vUv - 0.5;
      float dist = length(center);
      
      float angle = atan(center.y, center.x);
      float noise = sin(angle * 6.0 + uTime * 2.0) * 0.1;
      noise += sin(angle * 12.0 - uTime * 1.5) * 0.05;
      
      float gradient = dist + noise * (0.3 + uHover * 0.2);
      vec3 color = palette(gradient + uTime * 0.2);
      
      float alpha = smoothstep(0.5, 0.3, dist);
      alpha *= 0.8 + uHover * 0.2;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        uniforms={{
          uTime: { value: 0 },
          uHover: { value: 0 },
        }}
      />
    </mesh>
  );
}

interface AnimatedOrbProps {
  className?: string;
}

export default function AnimatedOrb({ className = '' }: AnimatedOrbProps) {
  return (
    <div className={`rounded-full overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true }}
      >
        <OrbMesh />
      </Canvas>
    </div>
  );
}
