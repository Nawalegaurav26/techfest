/* Techfest 2026 - Telemetry Log 19 */
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
function CyborgNode({ headColor, visorColor, accentColor, nodeRef, visorRef }) {
  return (
    <group ref={nodeRef}>
      {/* Cyborg Head */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshStandardMaterial
          color={headColor}
          metalness={0.9}
          roughness={0.1}
          emissive={headColor}
          emissiveIntensity={0.25}
        />
      </mesh>
      {/* Cyborg Visor */}
      <mesh ref={visorRef} position={[0, 0.01, 0.045]}>
        <boxGeometry args={[0.09, 0.02, 0.01]} />
        <meshStandardMaterial
          color={visorColor}
          emissive={visorColor}
          emissiveIntensity={0.6}
          toneMapped={false}
        />
      </mesh>
      {/* Cybernetic Neck/Antenna */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.05, 4]} />
        <meshStandardMaterial 
          color={accentColor} 
          metalness={0.95}
          emissive={accentColor}
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}

function DroneScene({ colorsTheme }) {
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
  const mousePos = useRef({ x: 0, y: 0 });

  // Listen to window-level mouse movements to bypass Canvas pointer-events: none blocking
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
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

    // Organic noise-like drift (using multiple sine waves at different frequencies)
    const driftX = Math.sin(elapsed * 1.5) * 0.08 + Math.cos(elapsed * 2.8) * 0.03;
    const driftY = Math.cos(elapsed * 1.2) * 0.08 + Math.sin(elapsed * 2.3) * 0.03;
    const driftZ = Math.sin(elapsed * 1.8) * 0.05;

    // 1. Determine target 3D screen position
    let targetX = 0;
    let targetY = 0;
    let targetZ = 0.5; // default floating depth

    const idleMode = Date.now() - lastMouseTime.current > 4000;

    if (idleMode) {
      // Autonomous floating path (figure-eight Lissajous curve) + hover drift
      targetX = Math.sin(elapsed * 0.55) * (width * 0.32) + driftX;
      targetY = Math.cos(elapsed * 0.38) * (height * 0.28) + driftY;
      targetZ = 0.4 + Math.sin(elapsed * 0.8) * 0.25 + driftZ;
    } else {
      // Smooth tracking under mouse cursor + orbital/hover float around cursor
      // So even if the mouse stops, it loops in a tiny organic orbit around the cursor
      targetX = (mousePos.current.x * width) / 2 + driftX * 1.5;
      targetY = (mousePos.current.y * height) / 2 + driftY * 1.5;
      targetZ = 0.6 + driftZ;
    }

    // 2. LERP translation coordinates (inertial lag)
    const lerpSpeed = idleMode ? 1.6 : 3.0;
    const prevX = pos.current.x;
    const prevY = pos.current.y;
    pos.current.x = THREE.MathUtils.lerp(pos.current.x, targetX, delta * lerpSpeed);
    pos.current.y = THREE.MathUtils.lerp(pos.current.y, targetY, delta * lerpSpeed);
    pos.current.z = THREE.MathUtils.lerp(pos.current.z, targetZ, delta * lerpSpeed);

    // Apply floating height bobbing and micro motor vibrations
    const vibration = Math.sin(elapsed * 45.0) * 0.0015;
    droneGroup.current.position.set(pos.current.x, pos.current.y + vibration, pos.current.z);

    // 3. Dynamic banking tilts (roll based on X velocity, pitch based on Y velocity)
    const vx = pos.current.x - prevX;
    const vy = pos.current.y - prevY;
    const targetRoll = -vx * 3.5; // banking roll
    const targetPitch = vy * 3.0; // pitching lift

    // Combine banking tilts with smooth organic swaying angles
    const wobbleRoll = Math.sin(elapsed * 2.0) * 0.03;
    const wobblePitch = Math.cos(elapsed * 1.8) * 0.03;
    const wobbleYaw = Math.sin(elapsed * 0.7) * 0.08 + (vx * 1.5);

    rot.current.z = THREE.MathUtils.lerp(rot.current.z, targetRoll + wobbleRoll, delta * 4.0);
    rot.current.x = THREE.MathUtils.lerp(rot.current.x, targetPitch + wobblePitch, delta * 4.0);
    rot.current.y = THREE.MathUtils.lerp(rot.current.y, wobbleYaw, delta * 3.0);

    droneGroup.current.rotation.set(rot.current.x, rot.current.y, rot.current.z);

    // 4. Spin rotors
    if (leftRotorRef.current) leftRotorRef.current.rotation.y += delta * 25.0;
    if (rightRotorRef.current) rightRotorRef.current.rotation.y += delta * 25.0;

    // 5. Animate bottom torch (spotlight / cone beam)
    if (lightConeRef.current) {
      // Subtle beam flicker
      const flicker = 0.85 + Math.sin(elapsed * 30.0) * 0.08 + Math.cos(elapsed * 45.0) * 0.05;
      lightConeRef.current.material.opacity = 0.25 * flicker;
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

  return (
    <group>
      {/* ─── PROCEDURAL DRONE ASSEMBLY ─── */}
      <group ref={droneGroup}>
        {/* Core Sphere - Upper Hemisphere (Primary Cyber Color) */}
        <mesh castShadow position={[0, 0.01, 0]}>
          <sphereGeometry args={[0.1, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial 
            color={colorsTheme.primary} 
            metalness={0.9} 
            roughness={0.1} 
            emissive={colorsTheme.primary}
            emissiveIntensity={0.25}
          />
        </mesh>
        
        {/* Core Sphere - Lower Hemisphere (Tertiary Cyber Color) */}
        <mesh castShadow position={[0, -0.01, 0]}>
          <sphereGeometry args={[0.1, 16, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
          <meshStandardMaterial 
            color={colorsTheme.tertiary} 
            metalness={0.9} 
            roughness={0.15} 
            emissive={colorsTheme.tertiary}
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* Center Coupling Ring (Secondary Cyber Color Glowing Belt) */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.102, 0.012, 8, 24]} />
          <meshStandardMaterial 
            color={colorsTheme.secondary} 
            metalness={0.95} 
            emissive={colorsTheme.secondary}
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* Glowing Lens / Front Eye Rim */}
        <mesh position={[0, 0.02, 0.075]}>
          <torusGeometry args={[0.028, 0.006, 6, 16]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
        </mesh>
        
        {/* Glowing Lens / Front Eye Lens */}
        <mesh ref={eyeRef} position={[0, 0.02, 0.08]}>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshStandardMaterial 
            color={colorsTheme.primary} 
            emissive={colorsTheme.primary} 
            emissiveIntensity={1.2} 
            toneMapped={false}
          />
        </mesh>

        {/* Left Wing / Arm Cylinder */}
        <mesh position={[-0.14, 0.02, 0]} rotation={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.015, 0.012, 0.12, 8]} />
          <meshStandardMaterial 
            color="#1e293b" 
            metalness={0.8} 
            roughness={0.2}
          />
        </mesh>
        {/* Left Wing Sleeve / Accent Ring */}
        <mesh position={[-0.11, 0.025, 0]} rotation={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.017, 0.017, 0.02, 8]} />
          <meshStandardMaterial 
            color={colorsTheme.secondary} 
            emissive={colorsTheme.secondary}
            emissiveIntensity={0.6}
          />
        </mesh>
        {/* Left Rotor Guard */}
        <mesh position={[-0.2, 0.03, 0]}>
          <torusGeometry args={[0.045, 0.008, 6, 24]} />
          <meshStandardMaterial 
            color={colorsTheme.secondary} 
            metalness={0.9} 
            roughness={0.1}
            emissive={colorsTheme.secondary}
            emissiveIntensity={0.5}
          />
        </mesh>
        {/* Left Rotor Blade - Semi-transparent Glowing Energy Blade */}
        <mesh ref={leftRotorRef} position={[-0.2, 0.03, 0]}>
          <boxGeometry args={[0.08, 0.004, 0.012]} />
          <meshStandardMaterial 
            color={colorsTheme.tertiary} 
            emissive={colorsTheme.tertiary}
            emissiveIntensity={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Right Wing / Arm Cylinder */}
        <mesh position={[0.14, 0.02, 0]} rotation={[0, 0, -0.1]}>
          <cylinderGeometry args={[0.015, 0.012, 0.12, 8]} />
          <meshStandardMaterial 
            color="#1e293b" 
            metalness={0.8} 
            roughness={0.2}
          />
        </mesh>
        {/* Right Wing Sleeve / Accent Ring */}
        <mesh position={[0.11, 0.025, 0]} rotation={[0, 0, -0.1]}>
          <cylinderGeometry args={[0.017, 0.017, 0.02, 8]} />
          <meshStandardMaterial 
            color={colorsTheme.tertiary} 
            emissive={colorsTheme.tertiary}
            emissiveIntensity={0.6}
          />
        </mesh>
        {/* Right Rotor Guard */}
        <mesh position={[0.2, 0.03, 0]}>
          <torusGeometry args={[0.045, 0.008, 6, 24]} />
          <meshStandardMaterial 
            color={colorsTheme.tertiary} 
            metalness={0.9} 
            roughness={0.1}
            emissive={colorsTheme.tertiary}
            emissiveIntensity={0.5}
          />
        </mesh>
        {/* Right Rotor Blade - Semi-transparent Glowing Energy Blade */}
        <mesh ref={rightRotorRef} position={[0.2, 0.03, 0]}>
          <boxGeometry args={[0.08, 0.004, 0.012]} />
          <meshStandardMaterial 
            color={colorsTheme.secondary} 
            emissive={colorsTheme.secondary}
            emissiveIntensity={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Bottom spotlight casing */}
        <mesh position={[0, -0.08, 0]} rotation={[Math.PI, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.02, 0.05, 8]} />
          <meshStandardMaterial 
            color={colorsTheme.primary} 
            metalness={0.9} 
            emissive={colorsTheme.primary}
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Spotlight light source */}
        <spotLight
          ref={spotlightRef}
          position={[0, -0.09, 0]}
          angle={0.4}
          penumbra={0.6}
          intensity={8.0}
          distance={3.5}
          color={colorsTheme.primary}
          castShadow
        />

        {/* Double-layered visual light beam cones */}
        {/* Inner Core Beam */}
        <mesh ref={lightConeRef} position={[0, -0.7, 0]}>
          <coneGeometry args={[0.22, 1.25, 16, 1, true]} />
          <meshBasicMaterial
            color={colorsTheme.primary}
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        {/* Outer Aura Beam */}
        <mesh position={[0, -0.7, 0]}>
          <coneGeometry args={[0.32, 1.25, 16, 1, true]} />
          <meshBasicMaterial
            color={colorsTheme.secondary}
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* ─── ORBITING CYBORGS ─── */}
      <CyborgNode 
        headColor={colorsTheme.primary} 
        visorColor={colorsTheme.secondary} 
        accentColor={colorsTheme.tertiary} 
        nodeRef={cyborg1} 
        visorRef={cyborg1Visor} 
      />
      <CyborgNode 
        headColor={colorsTheme.secondary} 
        visorColor={colorsTheme.tertiary} 
        accentColor={colorsTheme.primary} 
        nodeRef={cyborg2} 
        visorRef={cyborg2Visor} 
      />
      <CyborgNode 
        headColor={colorsTheme.tertiary} 
        visorColor={colorsTheme.primary} 
        accentColor={colorsTheme.secondary} 
        nodeRef={cyborg3} 
        visorRef={cyborg3Visor} 
      />
    </group>
  );
}

export default function FloatingDrone() {
  const location = useLocation();

  // Hide the floating drone on RoboLab, Terminal, and ComingSoon modules to keep views clean
  const hiddenRoutes = ['/robolab', '/terminal', '/comingsoon'];
  const shouldHide = hiddenRoutes.some(route => location.pathname.startsWith(route));

  // Determine accent color theme based on page path (Triadic cyber tones)
  const colorsTheme = useMemo(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes('robowars')) {
      return {
        primary: '#ff2d55',    // Plasma Red
        secondary: '#fbbf24',  // Cyber Gold
        tertiary: '#a855f7',   // Neon Purple
      };
    }
    if (path.includes('workshops')) {
      return {
        primary: '#00f5c4',    // Cyber Mint
        secondary: '#a855f7',  // Neon Purple
        tertiary: '#38bdf8',   // Electric Blue
      };
    }
    if (path.includes('about')) {
      return {
        primary: '#ff8c00',    // Solar Orange
        secondary: '#00f2ff',  // Bright Cyan
        tertiary: '#ff2d55',   // Neon Red
      };
    }
    // Default / general pages
    return {
      primary: '#38bdf8',      // Electric Sky Blue
      secondary: '#ff2d55',    // Plasma Red
      tertiary: '#fbbf24',     // Cyber Gold
    };
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
      <Canvas camera={{ position: [0, 0, 3.2], fov: 60 }} shadows style={{ pointerEvents: 'none' }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 4, 3]} intensity={1.0} color="#ffffff" castShadow />
        <pointLight position={[-3, -3, -1]} intensity={0.5} color={colorsTheme.primary} />
        
        <DroneScene colorsTheme={colorsTheme} />
      </Canvas>
    </div>
  );
}
