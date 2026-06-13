import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';

// Procedural seedable random
function seededRandom(seed) {
  let s = seed;
  return function() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// 3D Cyborg mesh helper
function CyborgNode({ color, nodeRef, visorRef }) {
  return (
    <group ref={nodeRef}>
      {/* Cyborg Head */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshStandardMaterial
          color="#1b1b1f"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      {/* Cyborg Visor */}
      <mesh ref={visorRef} position={[0, 0.01, 0.045]}>
        <boxGeometry args={[0.09, 0.02, 0.01]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          toneMapped={false}
        />
      </mesh>
      {/* Cybernetic Neck/Antenna */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.05, 4]} />
        <meshStandardMaterial color="#607080" metalness={0.8} />
      </mesh>
    </group>
  );
}

function DroneScene({ activeColor }) {
  const droneGroup = useRef();
  const leftRotorRef = useRef();
  const rightRotorRef = useRef();
  const lightConeRef = useRef();
  const spotlightRef = useRef();
  const eyeRef = useRef();

  // References for orbiting cyborg nodes
  const cyborg1 = useRef();
  const cyborg1Visor = useRef();
  const cyborg2 = useRef();
  const cyborg2Visor = useRef();
  const cyborg3 = useRef();
  const cyborg3Visor = useRef();

  // Movement & physics states
  const pos = useRef({ x: 0, y: 0, z: 0 });
  const rot = useRef({ x: 0, y: 0, z: 0 });
  const lastMouseTime = useRef(Date.now());
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Listen to mouse movements to track active cursor interaction
  useEffect(() => {
    const handleMouseMove = (e) => {
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      lastMouseTime.current = Date.now();
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Pre-calculate random orbits for the 3 cyborg nodes
  const orbitData = useMemo(() => {
    return [
      { radius: 0.45, speed: 1.8, phase: 0, heightOffset: -0.22 },
      { radius: 0.65, speed: -1.4, phase: Math.PI * 0.66, heightOffset: -0.42 },
      { radius: 0.85, speed: 2.2, phase: Math.PI * 1.33, heightOffset: -0.62 }
    ];
  }, []);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();
    const { width, height } = state.viewport;

    // 1. Determine target 3D screen position
    let targetX = 0;
    let targetY = 0;
    let targetZ = 0.5; // default floating depth

    const idleMode = Date.now() - lastMouseTime.current > 4000;

    if (idleMode) {
      // Autonomous floating path (figure-eight Lissajous curve)
      targetX = Math.sin(elapsed * 0.55) * (width * 0.32);
      targetY = Math.cos(elapsed * 0.38) * (height * 0.28);
      targetZ = 0.4 + Math.sin(elapsed * 0.8) * 0.25;
    } else {
      // Smooth tracking under mouse cursor
      targetX = (state.pointer.x * width) / 2;
      targetY = (state.pointer.y * height) / 2;
      targetZ = 0.6; // sit closer during tracking
    }

    // 2. LERP translation coordinates (inertial lag)
    const lerpSpeed = idleMode ? 1.6 : 3.2;
    const prevX = pos.current.x;
    const prevY = pos.current.y;
    pos.current.x = THREE.MathUtils.lerp(pos.current.x, targetX, delta * lerpSpeed);
    pos.current.y = THREE.MathUtils.lerp(pos.current.y, targetY, delta * lerpSpeed);
    pos.current.z = THREE.MathUtils.lerp(pos.current.z, targetZ, delta * lerpSpeed);

    // Apply floating height bobbing (stabilization waves)
    const floatBob = Math.sin(elapsed * 2.2) * 0.04;
    droneGroup.current.position.set(pos.current.x, pos.current.y + floatBob, pos.current.z);

    // 3. Dynamic banking tilts (roll based on X velocity, pitch based on Y velocity)
    const vx = pos.current.x - prevX;
    const vy = pos.current.y - prevY;
    const targetRoll = -vx * 2.8;
    const targetPitch = vy * 2.2;

    rot.current.z = THREE.MathUtils.lerp(rot.current.z, targetRoll, delta * 5.0);
    rot.current.x = THREE.MathUtils.lerp(rot.current.x, targetPitch, delta * 5.0);
    rot.current.y = Math.sin(elapsed * 0.8) * 0.12; // slow yaw swing

    droneGroup.current.rotation.set(rot.current.x, rot.current.y, rot.current.z);

    // 4. Spin rotors
    if (leftRotorRef.current) leftRotorRef.current.rotation.y += delta * 25.0;
    if (rightRotorRef.current) rightRotorRef.current.rotation.y += delta * 25.0;

    // 5. Animate bottom torch (spotlight / cone beam)
    if (lightConeRef.current) {
      // Subtle beam flicker
      const flicker = 0.85 + Math.sin(elapsed * 30.0) * 0.08 + Math.cos(elapsed * 45.0) * 0.05;
      lightConeRef.current.material.opacity = 0.22 * flicker;
    }
    if (spotlightRef.current) {
      const flicker = 0.9 + Math.sin(elapsed * 35.0) * 0.08;
      spotlightRef.current.intensity = 8.0 * flicker;
    }

    // Pulse front camera lens
    if (eyeRef.current) {
      eyeRef.current.material.emissiveIntensity = 0.8 + Math.sin(elapsed * 6.0) * 0.4;
    }

    // 6. Update and illuminate orbiting cyborg nodes
    const updateCyborg = (ref, visorRef, data) => {
      if (!ref.current) return;
      const angle = elapsed * data.speed + data.phase;
      
      // Calculate node coordinates orbiting around the drone's position
      // They orbit in a flat horizontal disk, slightly offset below the drone
      const cx = pos.current.x + Math.cos(angle) * data.radius;
      const cy = pos.current.y + data.heightOffset + Math.sin(elapsed * 1.5 + data.phase) * 0.05;
      const cz = pos.current.z + Math.sin(angle) * data.radius;
      
      ref.current.position.set(cx, cy, cz);
      // Make cyborg face inward towards the drone
      ref.current.rotation.y = -angle + Math.PI / 2;

      // Determine if cyborg is illuminated by the bottom torch beam
      // The light cone expands downwards. Let's calculate horizontal radial distance from beam center (drone column)
      const distToBeam = Math.sqrt(Math.pow(cx - pos.current.x, 2) + Math.pow(cz - pos.current.z, 2));
      const inBeam = distToBeam < 0.28 && cy < pos.current.y;

      if (visorRef.current) {
        // Enlarge emissive glow if under the spotlight
        const targetGlow = inBeam ? 2.5 : 0.2;
        visorRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
          visorRef.current.material.emissiveIntensity,
          targetGlow,
          delta * 8.0
        );
      }
    };

    updateCyborg(cyborg1, cyborg1Visor, orbitData[0]);
    updateCyborg(cyborg2, cyborg2Visor, orbitData[1]);
    updateCyborg(cyborg3, cyborg3Visor, orbitData[2]);
  });

  const droneColor = '#38BDF8';
  const darkerGray = '#2e3a47';
  const chromeColor = '#8090a0';

  return (
    <group>
      {/* ─── PROCEDURAL DRONE ASSEMBLY ─── */}
      <group ref={droneGroup}>
        {/* Core Sphere */}
        <mesh castShadow>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color={darkerGray} metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Glowing Lens / Front Eye */}
        <mesh ref={eyeRef} position={[0, 0.02, 0.08]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color={activeColor} emissive={activeColor} emissiveIntensity={1.0} />
        </mesh>

        {/* Left Wing / Arm */}
        <mesh position={[-0.14, 0.02, 0]} rotation={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.015, 0.015, 0.12, 6]} />
          <meshStandardMaterial color={chromeColor} metalness={0.8} />
        </mesh>
        {/* Left Rotor Guard */}
        <mesh position={[-0.2, 0.03, 0]}>
          <torusGeometry args={[0.045, 0.008, 4, 16]} />
          <meshStandardMaterial color={darkerGray} metalness={0.9} />
        </mesh>
        {/* Left Rotor Blade */}
        <mesh ref={leftRotorRef} position={[-0.2, 0.03, 0]}>
          <boxGeometry args={[0.08, 0.002, 0.012]} />
          <meshStandardMaterial color="#050508" metalness={0.5} />
        </mesh>

        {/* Right Wing / Arm */}
        <mesh position={[0.14, 0.02, 0]} rotation={[0, 0, -0.1]}>
          <cylinderGeometry args={[0.015, 0.015, 0.12, 6]} />
          <meshStandardMaterial color={chromeColor} metalness={0.8} />
        </mesh>
        {/* Right Rotor Guard */}
        <mesh position={[0.2, 0.03, 0]}>
          <torusGeometry args={[0.045, 0.008, 4, 16]} />
          <meshStandardMaterial color={darkerGray} metalness={0.9} />
        </mesh>
        {/* Right Rotor Blade */}
        <mesh ref={rightRotorRef} position={[0.2, 0.03, 0]}>
          <boxGeometry args={[0.08, 0.002, 0.012]} />
          <meshStandardMaterial color="#050508" metalness={0.5} />
        </mesh>

        {/* Bottom spotlight casing */}
        <mesh position={[0, -0.08, 0]} rotation={[Math.PI, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.02, 0.05, 8]} />
          <meshStandardMaterial color={chromeColor} metalness={0.9} />
        </mesh>

        {/* Spotlight light source */}
        <spotLight
          ref={spotlightRef}
          position={[0, -0.09, 0]}
          angle={0.4}
          penumbra={0.6}
          intensity={8.0}
          distance={3.0}
          color={activeColor}
          castShadow
        />

        {/* Transparent visual light beam cone */}
        <mesh ref={lightConeRef} position={[0, -0.7, 0]}>
          <coneGeometry args={[0.26, 1.25, 16, 1, true]} />
          <meshBasicMaterial
            color={activeColor}
            transparent
            opacity={0.22}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* ─── ORBITING CYBORGS ─── */}
      <CyborgNode color={activeColor} nodeRef={cyborg1} visorRef={cyborg1Visor} />
      <CyborgNode color={activeColor} nodeRef={cyborg2} visorRef={cyborg2Visor} />
      <CyborgNode color={activeColor} nodeRef={cyborg3} visorRef={cyborg3Visor} />
    </group>
  );
}

export default function FloatingDrone() {
  const location = useLocation();

  // Hide the floating drone on RoboLab, Terminal, and ComingSoon modules to keep views clean
  const hiddenRoutes = ['/robolab', '/terminal', '/comingsoon'];
  const shouldHide = hiddenRoutes.some(route => location.pathname.startsWith(route));

  // Determine accent color theme based on page path
  const activeColor = useMemo(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes('robowars')) return '#ff2d55'; // Plasma Red
    if (path.includes('workshops')) return '#00f5c4'; // Cyber Mint
    if (path.includes('about')) return '#ff8c00'; // Orange
    return '#38bdf8'; // Electric Sky Blue default
  }, [location.pathname]);

  if (shouldHide) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 15, // float above content (z-index 10) but below navbar/drawers
        pointerEvents: 'none', // allow clicks to pass straight through to background
        mixBlendMode: 'screen',
      }}
    >
      <Canvas camera={{ position: [0, 0, 3.2], fov: 60 }} shadows>
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 4, 3]} intensity={1.0} color="#ffffff" castShadow />
        <pointLight position={[-3, -3, -1]} intensity={0.5} color={activeColor} />
        
        <DroneScene activeColor={activeColor} />
      </Canvas>
    </div>
  );
}
