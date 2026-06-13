import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Procedural seedable random number generator (LCG)
// Prevents react-hooks/purity linter issues
function seededRandom(seed) {
  let s = seed;
  return function() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function ReactorCore({ activeSection }) {
  const groupRef = useRef();
  const innerCoreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const particlesRef = useRef();

  const particleCount = 800; // Optimized count for continuous render speed

  // Generate particle coordinates and speeds
  const particleData = useMemo(() => {
    const rand = seededRandom(107);
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const angle = rand() * Math.PI * 2;
      const radius = 0.5 + rand() * 4.0;
      positions[idx] = Math.cos(angle) * radius;
      positions[idx+1] = (rand() - 0.5) * 8.0;
      positions[idx+2] = Math.sin(angle) * radius;
      
      velocities[i] = 0.15 + rand() * 0.7; // upwards speeds
    }
    return { positions, velocities };
  }, [particleCount]);

  useFrame((state, delta) => {
    // 1. Gyroscopic rings rotation on custom axes
    if (ring1Ref.current) ring1Ref.current.rotation.x += delta * 0.45;
    if (ring2Ref.current) ring2Ref.current.rotation.y += delta * 0.55;
    if (ring3Ref.current) ring3Ref.current.rotation.z += delta * 0.35;

    // 2. Pulse the central core energy sphere
    if (innerCoreRef.current) {
      const pulse = 1.0 + Math.sin(state.clock.getElapsedTime() * 3.5) * 0.12;
      innerCoreRef.current.scale.set(pulse, pulse, pulse);
      innerCoreRef.current.rotation.y += delta * 0.4;
    }

    // 3. Upward flowing energy particles
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        pos[idx+1] += delta * particleData.velocities[i] * 1.8;
        if (pos[idx+1] > 4.0) {
          pos[idx+1] = -4.0;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.y += delta * 0.06;
    }

    // 4. Parallax mouse cursor tracking
    if (groupRef.current) {
      const targetX = state.pointer.y * 0.4;
      const targetY = state.pointer.x * 0.4;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, delta * 2.2);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, delta * 2.2);
    }
  });

  // Align colors based on active routing
  const activeColor = useMemo(() => {
    switch (activeSection) {
      case 'about':
        return '#ff00ff'; // Neon Magenta
      case 'workshops':
        return '#00f5c4'; // Cyber Mint
      case 'store':
      case 'accommodation':
        return '#ff00ff';
      default:
        return '#00f2ff'; // Electric Cyan
    }
  }, [activeSection]);

  return (
    <group ref={groupRef}>
      {/* Three concentrical gyroscope metallic rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.5, 0.05, 8, 48]} />
        <meshStandardMaterial color={activeColor} metalness={0.9} roughness={0.15} emissive={activeColor} emissiveIntensity={0.15} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[3.2, 0.05, 8, 48]} />
        <meshStandardMaterial color={activeColor} metalness={0.9} roughness={0.15} emissive={activeColor} emissiveIntensity={0.15} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[3.9, 0.05, 8, 48]} />
        <meshStandardMaterial color={activeColor} metalness={0.9} roughness={0.15} emissive={activeColor} emissiveIntensity={0.15} />
      </mesh>

      {/* Central power core */}
      <group ref={innerCoreRef}>
        <mesh>
          <sphereGeometry args={[0.9, 16, 16]} />
          <meshBasicMaterial color={activeColor} transparent opacity={0.3} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.3, 1]} />
          <meshBasicMaterial color={activeColor} wireframe transparent opacity={0.12} />
        </mesh>
      </group>

      {/* Streaming energy particles */}
      <Points ref={particlesRef} positions={particleData.positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={activeColor}
          size={0.065}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.5}
        />
      </Points>
    </group>
  );
}

function CameraController({ activeSection }) {
  useFrame((state, delta) => {
    const cam = state.camera;
    let targetPos;
    let targetFov;
    
    switch (activeSection) {
      case 'home':
        targetPos = [0, 0, 7.0];
        targetFov = 60;
        break;
      case 'events':
      case 'competitions':
        targetPos = [3.6, 2.0, 6.0];
        targetFov = 50;
        break;
      case 'workshops':
        targetPos = [0, 4.2, 6.2];
        targetFov = 65;
        break;
      case 'accommodation':
        targetPos = [-2.4, 2.4, 5.0];
        targetFov = 55;
        break;
      case 'about':
        targetPos = [1.2, 0.3, 4.0];
        targetFov = 45;
        break;
      case 'store':
      case 'contact':
      case 'sponsors':
        targetPos = [0, -3.2, 4.6];
        targetFov = 70;
        break;
      default:
        targetPos = [0, 0, 7.5];
        targetFov = 60;
    }

    const camSpeed = delta * 2.5;
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, targetPos[0], camSpeed);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, targetPos[1], camSpeed);
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, targetPos[2], camSpeed);
    
    cam.fov = THREE.MathUtils.lerp(cam.fov, targetFov, camSpeed);
    cam.updateProjectionMatrix();

    // Look at origin core
    cam.lookAt(0, 0, 0);
  });

  return null;
}

export default function NeuralCanvas({ activeSection = 'home' }) {
  return (
    <div className="absolute inset-0 z-0 bg-[#050505] overflow-hidden select-none pointer-events-none">
      <Canvas camera={{ position: [0, 0, 7.5], fov: 60 }}>
        <color attach="background" args={['#050505']} />
        
        {/* Interactive shiny lights */}
        <ambientLight intensity={0.5} />
        <pointLight position={[8, 8, 8]} intensity={1.5} color="#00f2ff" />
        <pointLight position={[-8, -8, -8]} intensity={0.8} color="#ff00ff" />
        
        <ReactorCore activeSection={activeSection} />
        <CameraController activeSection={activeSection} />
      </Canvas>
    </div>
  );
}
