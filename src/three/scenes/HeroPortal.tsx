import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';

function Portal() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mesh2Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.z = t * 0.3;
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
    if (mesh2Ref.current) {
      mesh2Ref.current.rotation.z = -t * 0.2;
      mesh2Ref.current.rotation.y = Math.cos(t * 0.15) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <torusGeometry args={[3, 0.04, 16, 100]} />
        <meshStandardMaterial color="#00F5FF" emissive="#00F5FF" emissiveIntensity={2} transparent opacity={0.8} />
      </mesh>
      <mesh ref={mesh2Ref}>
        <torusGeometry args={[2.5, 0.03, 16, 80]} />
        <meshStandardMaterial color="#BF00FF" emissive="#BF00FF" emissiveIntensity={1.5} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function Particles({ count = 5000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 40;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#BF00FF" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function FloatingOrbs() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.children.forEach((child, i) => {
        child.position.y = Math.sin(clock.getElapsedTime() * 0.5 + i * 1.5) * 0.5;
      });
    }
  });

  return (
    <group ref={group}>
      {[[-2, 0, -1], [2.5, 1, -2], [-1, -1, -3], [1.5, -0.5, -1.5]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#00F5FF' : '#FF006E'}
            emissive={i % 2 === 0 ? '#00F5FF' : '#FF006E'}
            emissiveIntensity={3}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroPortal() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          <pointLight position={[0, 0, 5]} color="#00F5FF" intensity={5} />
          <pointLight position={[3, 2, -2]} color="#BF00FF" intensity={3} />
          <Portal />
          <Particles />
          <FloatingOrbs />
        </Suspense>
      </Canvas>
    </div>
  );
}
