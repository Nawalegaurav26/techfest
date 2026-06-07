import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Html } from '@react-three/drei';
import * as THREE from 'three';

// Procedural seedable random generator for particles
function seededRandom(seed) {
  let s = seed;
  return function() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// Sub-component for rendering parts in solid, wireframe, or point cloud modes
function BotPart({ geometry, color, emissiveIntensity = 0.1, renderMode }) {
  if (renderMode === 'POINT_CLOUD') {
    return (
      <points>
        {geometry}
        <pointsMaterial color={color} size={0.035} sizeAttenuation={true} />
      </points>
    );
  }

  return (
    <mesh castShadow receiveShadow>
      {geometry}
      <meshStandardMaterial
        color={color}
        wireframe={renderMode === 'WIREFRAME'}
        metalness={0.9}
        roughness={0.15}
        emissive={color}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  );
}

export default function CyberBot({ renderMode = 'SOLID', coreRotationSpeed = 1.0, showParticles = true, stanceOverride = null, setGyroActive = () => {} }) {
  const robotGroup = useRef();
  const headGroup = useRef();
  const leftArmGroup = useRef();
  const rightArmGroup = useRef();
  const innerCoreRef = useRef();
  const outerCoreRef = useRef();
  const scanningConeRef = useRef();
  const thrusterFlameRef = useRef();
  const particlesRef = useRef();
  const logoMeshRef = useRef();

  const scrollProgress = useRef(0);
  const prevScroll = useRef(0);
  const scrollVelocity = useRef(0);
  const tiltRef = useRef({ x: 0, y: 0 });
  const [logoTex, setLogoTex] = useState(null);

  // Load transparent logo texture asynchronously
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/central_logo_home-screen_big_logo_transparent.png', (texture) => {
      setLogoTex(texture);
    });
  }, []);

  // Listen to mobile device tilt (gyroscope)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOrientation = (e) => {
      if (e.beta === null || e.gamma === null) return;
      
      // Mark gyro active in HUD telemetry
      setGyroActive(true);
      
      // Assuming average holding angle of 60deg pitch in portrait
      // Map tilting of phone to rotation offsets in radians
      const targetX = (e.beta - 60) * (Math.PI / 180) * 0.45; // pitch
      const targetY = e.gamma * (Math.PI / 180) * 0.45;        // roll
      
      // Clamp to prevent visual glitches (max ~20 degrees)
      tiltRef.current.x = Math.max(-0.35, Math.min(0.35, targetX));
      tiltRef.current.y = Math.max(-0.35, Math.min(0.35, targetY));
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [setGyroActive]);

  // Setup flame particles
  const particleCount = 250;
  const flameData = useMemo(() => {
    const rand = seededRandom(42);
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    const spreads = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      // Cylindrical/conical distributions
      const angle = rand() * Math.PI * 2;
      const r = rand() * 0.15;
      positions[idx] = Math.cos(angle) * r;
      positions[idx + 1] = -0.8 - rand() * 0.5; // start below base
      positions[idx + 2] = Math.sin(angle) * r;

      speeds[i] = 1.5 + rand() * 2.5;
      spreads[i] = 0.2 + rand() * 0.8;
    }
    return { positions, speeds, spreads };
  }, [particleCount]);

  // Handle frame updates
  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    // 1. Calculate Target Scroll Progress (LERPed)
    let targetScroll = 0;
    if (stanceOverride !== null) {
      targetScroll = stanceOverride;
    } else if (typeof window !== 'undefined') {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        targetScroll = window.scrollY / totalHeight;
      }
    }
    // Smooth out scroll transitions
    scrollProgress.current = THREE.MathUtils.lerp(scrollProgress.current, targetScroll, delta * 3.5);
    const p = Math.min(Math.max(scrollProgress.current, 0), 1);

    // Calculate Scroll Velocity & Inertia
    const currentProgress = scrollProgress.current;
    const timeDelta = Math.max(delta, 0.001);
    const rawVelocity = (currentProgress - prevScroll.current) / timeDelta;
    prevScroll.current = currentProgress;

    // Smooth scroll velocity using LERP
    scrollVelocity.current = THREE.MathUtils.lerp(scrollVelocity.current, rawVelocity, delta * 5.0);

    // 2. Define Multi-Stage Interpolation Targets
    // Stage 0: Standby Hover (p = 0.0)
    // Stage 1: Flight Mode (p = 0.33)
    // Stage 2: Tactical Scan (p = 0.66)
    // Stage 3: Plasma Overload (p = 1.0)
    
    let stage = 0;
    let t = 0; // local interpolation progress between stages

    if (p < 0.33) {
      stage = 0;
      t = p / 0.33;
    } else if (p < 0.66) {
      stage = 1;
      t = (p - 0.33) / 0.33;
    } else {
      stage = 2;
      t = (p - 0.66) / 0.34;
    }

    // Clamp t
    t = Math.min(Math.max(t, 0), 1);

    // Keyframes configuration
    const keyframes = [
      { // Stage 0: Hover
        posY: 0.2, posX: 0, posZ: 0,
        rotX: 0, rotY: 0, rotZ: 0,
        lArmRotX: 0, lArmRotY: 0, lArmRotZ: -0.2,
        rArmRotX: 0, rArmRotY: 0, rArmRotZ: 0.2,
        headRotX: 0, headRotY: 0,
        reactorSpeed: 1.0,
        coneOpacity: 0.0,
        flameScaleY: 1.0,
        flameWidth: 1.0,
        visorColor: new THREE.Color('#00f2ff'), // Cyan
        shakeIntensity: 0.0
      },
      { // Stage 1: Flight
        posY: -0.2, posX: 0, posZ: -1.0,
        rotX: 0.7, rotY: 0, rotZ: 0,
        lArmRotX: -1.4, lArmRotY: 0, lArmRotZ: -0.15,
        rArmRotX: -1.4, rArmRotY: 0, rArmRotZ: 0.15,
        headRotX: -0.5, headRotY: 0,
        reactorSpeed: 2.2,
        coneOpacity: 0.0,
        flameScaleY: 2.8,
        flameWidth: 1.4,
        visorColor: new THREE.Color('#00f2ff'),
        shakeIntensity: 0.005
      },
      { // Stage 2: Scan
        posY: 0.0, posX: 0.5, posZ: 0.3,
        rotX: 0, rotY: -0.4, rotZ: 0,
        lArmRotX: 0.5, lArmRotY: 0.2, lArmRotZ: -0.3,
        rArmRotX: 0.5, rArmRotY: -0.2, rArmRotZ: 0.3,
        headRotX: 0.1, headRotY: Math.sin(elapsed * 2.0) * 0.4, // panning
        reactorSpeed: 0.7,
        coneOpacity: 0.5,
        flameScaleY: 0.7,
        flameWidth: 0.8,
        visorColor: new THREE.Color('#00f2ff'),
        shakeIntensity: 0.0
      },
      { // Stage 3: Overload
        posY: 0.6, posX: 0, posZ: 0,
        rotX: 0.1 * Math.sin(elapsed * 8), rotY: 0, rotZ: 0,
        lArmRotX: 0, lArmRotY: 0, lArmRotZ: -2.3, // arms raised high
        rArmRotX: 0, rArmRotY: 0, rArmRotZ: 2.3,
        headRotX: 0.4, headRotY: 0,
        reactorSpeed: 5.5,
        coneOpacity: 0.0,
        flameScaleY: 1.8,
        flameWidth: 2.0,
        visorColor: new THREE.Color('#ff2d55'), // Plasma Red
        shakeIntensity: 0.035 // High shaking
      }
    ];

    const current = keyframes[stage];
    const next = keyframes[stage + 1];

    // Lerp parameters
    const posY = THREE.MathUtils.lerp(current.posY, next.posY, t);
    const posX = THREE.MathUtils.lerp(current.posX, next.posX, t);
    const posZ = THREE.MathUtils.lerp(current.posZ, next.posZ, t);

    const rotX = THREE.MathUtils.lerp(current.rotX, next.rotX, t);
    const rotY = THREE.MathUtils.lerp(current.rotY, next.rotY, t);
    const rotZ = THREE.MathUtils.lerp(current.rotZ, next.rotZ, t);

    const lArmRotX = THREE.MathUtils.lerp(current.lArmRotX, next.lArmRotX, t);
    const lArmRotY = THREE.MathUtils.lerp(current.lArmRotY, next.lArmRotY, t);
    const lArmRotZ = THREE.MathUtils.lerp(current.lArmRotZ, next.lArmRotZ, t);

    const rArmRotX = THREE.MathUtils.lerp(current.rArmRotX, next.rArmRotX, t);
    const rArmRotY = THREE.MathUtils.lerp(current.rArmRotY, next.rArmRotY, t);
    const rArmRotZ = THREE.MathUtils.lerp(current.rArmRotZ, next.rArmRotZ, t);

    const headRotX = THREE.MathUtils.lerp(current.headRotX, next.headRotX, t);
    const headRotY = stage === 2 ? current.headRotY : THREE.MathUtils.lerp(current.headRotY, next.headRotY, t);

    const reactorSpeed = THREE.MathUtils.lerp(current.reactorSpeed, next.reactorSpeed, t) * coreRotationSpeed;
    const coneOpacity = THREE.MathUtils.lerp(current.coneOpacity, next.coneOpacity, t);
    const flameScaleY = THREE.MathUtils.lerp(current.flameScaleY, next.flameScaleY, t);
    const flameWidth = THREE.MathUtils.lerp(current.flameWidth, next.flameWidth, t);
    const shakeIntensity = THREE.MathUtils.lerp(current.shakeIntensity, next.shakeIntensity, t);

    // 3D Organic float displacements & rotations (hover drone stabilization physics)
    const turbulenceSpeed = 1.0 + p * 1.5; // faster drifts under velocity
    const turbulenceAmp = 1.0 - p * 0.35;   // slightly smaller drifts when in high speed flight

    const floatX = (Math.sin(elapsed * 1.2 * turbulenceSpeed) * 0.03 + Math.cos(elapsed * 0.7 * turbulenceSpeed) * 0.015) * turbulenceAmp;
    const floatY = (Math.cos(elapsed * 1.5 * turbulenceSpeed) * 0.045 + Math.sin(elapsed * 0.9 * turbulenceSpeed) * 0.02) * turbulenceAmp;
    const floatZ = (Math.sin(elapsed * 1.0 * turbulenceSpeed) * 0.02) * turbulenceAmp;

    const floatRotX = Math.sin(elapsed * 0.8 * turbulenceSpeed) * 0.02 * turbulenceAmp;
    const floatRotY = Math.cos(elapsed * 1.1 * turbulenceSpeed) * 0.025 * turbulenceAmp;
    const floatRotZ = Math.sin(elapsed * 1.3 * turbulenceSpeed) * 0.02 * turbulenceAmp;

    // Apply basic idle bobbing
    const idleBob = Math.sin(elapsed * 2.0) * 0.12 * (1 - p * 0.5); // reduced bobbing when scrolling/flying
    const shakeX = (Math.random() - 0.5) * shakeIntensity;
    const shakeY = (Math.random() - 0.5) * shakeIntensity;
    const shakeZ = (Math.random() - 0.5) * shakeIntensity;

    // Calculate interactive motion sensory offsets
    let targetTiltX = 0;
    let targetTiltY = 0;

    // Detect if gyroscope orientation feeds data
    const hasGyroData = Math.abs(tiltRef.current.x) > 0.001 || Math.abs(tiltRef.current.y) > 0.001;

    if (hasGyroData) {
      targetTiltX = tiltRef.current.x;
      targetTiltY = tiltRef.current.y;
    } else {
      // Fallback pointer tracking (handles desktop hover parallax and mobile touch drag)
      targetTiltX = -state.pointer.y * 0.22;
      targetTiltY = state.pointer.x * 0.32;
    }

    // Initialize/retrieve interactive tilt state on mesh group
    if (!robotGroup.current._interactiveTilt) {
      robotGroup.current._interactiveTilt = { x: 0, y: 0 };
    }
    
    // Smoothly LERP translation values to prevent visual snaps
    robotGroup.current._interactiveTilt.x = THREE.MathUtils.lerp(robotGroup.current._interactiveTilt.x, targetTiltX, delta * 4.0);
    robotGroup.current._interactiveTilt.y = THREE.MathUtils.lerp(robotGroup.current._interactiveTilt.y, targetTiltY, delta * 4.0);

    // Calculate Stance Transition Inertia (tilt forward on scroll down, backward on scroll up)
    // raw scroll velocity maps to pitch tilt (X axis) and bank banking tilt (Z axis)
    const inertialTiltX = Math.max(-0.4, Math.min(0.4, scrollVelocity.current * 0.65));
    const inertialTiltZ = Math.max(-0.12, Math.min(0.12, -scrollVelocity.current * 0.22));

    // Apply translations and blended rotations
    if (robotGroup.current) {
      robotGroup.current.position.set(
        posX + floatX + shakeX, 
        posY + floatY + idleBob + shakeY, 
        posZ + floatZ + shakeZ
      );
      robotGroup.current.rotation.set(
        rotX + floatRotX + robotGroup.current._interactiveTilt.x + inertialTiltX, 
        rotY + floatRotY + robotGroup.current._interactiveTilt.y, 
        rotZ + floatRotZ + inertialTiltZ
      );
    }

    if (headGroup.current) {
      headGroup.current.rotation.set(headRotX, headRotY, 0);
    }

    if (leftArmGroup.current) {
      leftArmGroup.current.rotation.set(lArmRotX, lArmRotY, lArmRotZ);
    }

    if (rightArmGroup.current) {
      rightArmGroup.current.rotation.set(rArmRotX, rArmRotY, rArmRotZ);
    }

    // Spin & Pulse Tokamak Core
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y += delta * reactorSpeed * 2;
      const coreMesh = innerCoreRef.current.children[0];
      if (coreMesh && coreMesh.material) {
        // High frequency glow pulsing relative to reactor speed
        const corePulse = 0.85 + Math.sin(elapsed * 4.0 * reactorSpeed) * 0.35;
        coreMesh.material.emissiveIntensity = Math.max(0.3, corePulse);
      }
    }
    if (outerCoreRef.current) {
      outerCoreRef.current.rotation.x += delta * reactorSpeed;
      outerCoreRef.current.rotation.y += delta * reactorSpeed * 1.5;
      const outerCoreMesh = outerCoreRef.current.children[0];
      if (outerCoreMesh && outerCoreMesh.material) {
        const outerPulse = 0.35 + Math.cos(elapsed * 3.0 * reactorSpeed) * 0.15;
        outerCoreMesh.material.emissiveIntensity = Math.max(0.1, outerPulse);
      }
    }

    // Visor material color blending
    const visorMat = headGroup.current?.children[1]?.children[0]?.material;
    if (visorMat) {
      const visorCol = new THREE.Color().lerpColors(current.visorColor, next.visorColor, t);
      visorMat.color.copy(visorCol);
      visorMat.emissive.copy(visorCol);
      // High emission intensity on overload, blended with tiny continuous flicker
      const visorFlicker = 1.0 + Math.sin(elapsed * 12.0) * 0.05;
      visorMat.emissiveIntensity = (stage === 2 ? 1.6 : 0.85) * visorFlicker;
    }

    // Animate scanning cone
    if (scanningConeRef.current) {
      scanningConeRef.current.material.opacity = coneOpacity * (0.85 + Math.sin(elapsed * 25) * 0.15); // jitter glow
      // scanning cone pulses scale
      const scanScale = 1.0 + Math.sin(elapsed * 8) * 0.05;
      scanningConeRef.current.scale.set(scanScale, 1.0, scanScale);
    }

    // Animate Jet Exhaust Flame cone (flicker and turbulent noise)
    if (thrusterFlameRef.current) {
      const flameNoise = 1.0 + Math.sin(elapsed * 45.0) * 0.12 + Math.cos(elapsed * 72.0) * 0.08;
      thrusterFlameRef.current.scale.set(
        flameWidth * (0.92 + Math.sin(elapsed * 18.0) * 0.04),
        flameScaleY * flameNoise,
        flameWidth * (0.92 + Math.cos(elapsed * 18.0) * 0.04)
      );
      const flameOpacity = showParticles 
        ? (0.38 + Math.sin(elapsed * 38.0) * 0.12) 
        : 0;
      thrusterFlameRef.current.material.opacity = Math.max(0.0, Math.min(1.0, flameOpacity));
    }

    // Animate particle flow
    if (particlesRef.current && showParticles) {
      const pos = particlesRef.current.geometry.attributes.position.array;
      const speedMult = flameScaleY * 1.5;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        // Move downwards
        pos[idx + 1] -= delta * flameData.speeds[i] * speedMult;
        
        // Add side-to-side turbulent wind field drift (curling hot exhaust)
        const windX = Math.sin(elapsed * 4.0 + pos[idx + 1] * 3.0) * 0.04;
        const windZ = Math.cos(elapsed * 3.2 + pos[idx + 1] * 3.0) * 0.04;
        pos[idx] += windX * delta;
        pos[idx + 2] += windZ * delta;

        // Slightly spread out
        const angle = Math.atan2(pos[idx + 2], pos[idx]);
        const spreadSpeed = delta * flameData.spreads[i] * speedMult * 0.15;
        pos[idx] += Math.cos(angle) * spreadSpeed;
        pos[idx + 2] += Math.sin(angle) * spreadSpeed;

        // Reset particle to top disk on boundary
        if (pos[idx + 1] < -3.5 || Math.sqrt(pos[idx] * pos[idx] + pos[idx + 2] * pos[idx + 2]) > 1.2) {
          const randAngle = Math.random() * Math.PI * 2;
          const r = Math.random() * 0.12;
          pos[idx] = Math.cos(randAngle) * r;
          pos[idx + 1] = -0.8; // start below base
          pos[idx + 2] = Math.sin(randAngle) * r;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.y += delta * 0.2;
    }

    // 3D Motion Sensory and Parallax Logo backplate animation
    if (logoMeshRef.current) {
      // 3D parameters linked to scroll position
      let logoScale = 1.35;
      let logoPosY = 0.1;
      let logoPosZ = -1.1;
      let logoRotY = 0;

      if (p < 0.33) {
        logoScale = THREE.MathUtils.lerp(1.35, 0.9, p / 0.33);
        logoPosY = THREE.MathUtils.lerp(0.1, -0.2, p / 0.33);
        logoPosZ = THREE.MathUtils.lerp(-1.1, -1.8, p / 0.33);
      } else if (p < 0.66) {
        const tLocal = (p - 0.33) / 0.33;
        logoScale = THREE.MathUtils.lerp(0.9, 1.45, tLocal);
        logoPosY = THREE.MathUtils.lerp(-0.2, 0.4, tLocal);
        logoPosZ = THREE.MathUtils.lerp(-1.8, -0.7, tLocal);
        logoRotY = Math.sin(elapsed * 0.8) * 0.15; // slow drift during scan
      } else {
        const tLocal = (p - 0.66) / 0.34;
        logoScale = THREE.MathUtils.lerp(1.45, 1.85, tLocal);
        logoPosY = THREE.MathUtils.lerp(0.4, 0.65, tLocal);
        logoPosZ = THREE.MathUtils.lerp(-0.7, -0.9, tLocal);
        logoRotY = Math.sin(elapsed * 6.0) * 0.04; // jitter rotation during overload
      }

      // Parallax offsets (opposite rotation of the robot to create deep 3D separation)
      const parallaxX = robotGroup.current?._interactiveTilt?.y || 0;
      const parallaxY = robotGroup.current?._interactiveTilt?.x || 0;

      logoMeshRef.current.position.set(parallaxX * 0.45, logoPosY + parallaxY * 0.35, logoPosZ);
      logoMeshRef.current.scale.setScalar(logoScale);
      logoMeshRef.current.rotation.set(-parallaxY * 0.25, logoRotY + parallaxX * 0.3, 0);

      // Color blending (matching robot's visor state)
      if (logoMeshRef.current.material) {
        const blendedCol = new THREE.Color().lerpColors(current.visorColor, next.visorColor, t);
        logoMeshRef.current.material.color.copy(blendedCol);
        
        // Pulse opacity based on time and scroll depth
        const baseOpacity = p > 0.8 
          ? (0.18 + Math.random() * 0.08) // high frequency static flash during overload
          : (0.15 + Math.sin(elapsed * 2.0) * 0.05); // slow breathing default
        logoMeshRef.current.material.opacity = baseOpacity;
      }
    }
  });

  // Theme colors
  const cyanColor = '#00f2ff';
  const grayColor = '#607080';
  const darkerGray = '#2e3a47';

  return (
    <group>
      {/* ─── HOLOGRAPHIC LOGO BACKPLATE ─── */}
      {logoTex && (
        <mesh ref={logoMeshRef}>
          <planeGeometry args={[1.5, 1.5]} />
          <meshBasicMaterial
            map={logoTex}
            transparent={true}
            opacity={0.15}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      <group ref={robotGroup}>
      {/* ─── HEAD ASSEMBLY ─── */}
      <group ref={headGroup} position={[0, 0.72, 0]}>
        {/* Main Dome Helmet */}
        <BotPart
          geometry={<sphereGeometry args={[0.36, 16, 16]} />}
          color={darkerGray}
          renderMode={renderMode}
        />
        {/* Glowing Visor (Eye Plate) */}
        <group position={[0, 0.05, 0.26]}>
          <BotPart
            geometry={<boxGeometry args={[0.5, 0.1, 0.16]} />}
            color={cyanColor}
            emissiveIntensity={1.0}
            renderMode={renderMode}
          />
        </group>
        {/* Ear/Antenna Left */}
        <group position={[-0.4, 0.1, 0]} rotation={[0, 0, 0.3]}>
          <BotPart
            geometry={<cylinderGeometry args={[0.03, 0.03, 0.25, 8]} />}
            color={grayColor}
            renderMode={renderMode}
          />
        </group>
        {/* Ear/Antenna Right */}
        <group position={[0.4, 0.1, 0]} rotation={[0, 0, -0.3]}>
          <BotPart
            geometry={<cylinderGeometry args={[0.03, 0.03, 0.25, 8]} />}
            color={grayColor}
            renderMode={renderMode}
          />
        </group>

        {/* Tactical scanning cone (glowing mesh projection) */}
        <mesh ref={scanningConeRef} position={[0, -0.8, 1.1]} rotation={[0.6, 0, 0]}>
          <coneGeometry args={[0.7, 1.8, 16, 1, true]} />
          <meshBasicMaterial color={cyanColor} transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} wireframe />
        </mesh>

        {/* 3D Space Label: Visor */}
        <Html
          position={[0, 0.45, 0]}
          center
          distanceFactor={6}
          style={{ transition: 'opacity 0.3s' }}
        >
          <div className="hud-callout">
            <span className="hud-pulse" />
            <div className="hud-label">COLLIMATOR VISOR // S.01</div>
          </div>
        </Html>
      </group>

      {/* ─── TORSO / TOKAMAK DRIVE ─── */}
      <group position={[0, 0, 0]}>
        {/* Collar ring */}
        <group position={[0, 0.48, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <BotPart
            geometry={<torusGeometry args={[0.45, 0.04, 6, 24]} />}
            color={cyanColor}
            emissiveIntensity={0.3}
            renderMode={renderMode}
          />
        </group>

        {/* Torso Outer Armor plates */}
        <group position={[0, 0, 0]}>
          {/* Main frame cylinder */}
          <BotPart
            geometry={<cylinderGeometry args={[0.38, 0.28, 0.85, 8, 1, true]} />}
            color={darkerGray}
            renderMode={renderMode}
          />
          {/* Back spine pack */}
          <group position={[0, 0, -0.3]}>
            <BotPart
              geometry={<boxGeometry args={[0.22, 0.7, 0.25]} />}
              color={grayColor}
              renderMode={renderMode}
            />
          </group>
        </group>

        {/* Internal Tokamak Reactor core */}
        <group ref={innerCoreRef}>
          <BotPart
            geometry={<sphereGeometry args={[0.16, 8, 8]} />}
            color={cyanColor}
            emissiveIntensity={0.9}
            renderMode={renderMode}
          />
        </group>
        <group ref={outerCoreRef}>
          {/* Reactor wireframe gyroscopic cage */}
          <BotPart
            geometry={<icosahedronGeometry args={[0.26, 1]} />}
            color={cyanColor}
            emissiveIntensity={0.4}
            renderMode="WIREFRAME" // Force wireframe cage for visual depth
          />
        </group>

        {/* Torso bottom bracket */}
        <group position={[0, -0.48, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <BotPart
            geometry={<torusGeometry args={[0.32, 0.03, 6, 24]} />}
            color={cyanColor}
            emissiveIntensity={0.2}
            renderMode={renderMode}
          />
        </group>

        {/* 3D Space Label: Core */}
        <Html
          position={[-0.6, 0.0, 0]}
          center
          distanceFactor={6}
        >
          <div className="hud-callout">
            <span className="hud-pulse" style={{ backgroundColor: 'var(--sky)' }} />
            <div className="hud-label">PLASMA REACTOR // CORE.02</div>
          </div>
        </Html>
      </group>

      {/* ─── LEFT ARM ASSEMBLY ─── */}
      <group ref={leftArmGroup} position={[-0.48, 0.32, 0]}>
        {/* Shoulder capsule */}
        <BotPart
          geometry={<sphereGeometry args={[0.12, 10, 10]} />}
          color={grayColor}
          renderMode={renderMode}
        />
        {/* Upper arm cylinder */}
        <group position={[-0.1, -0.22, 0]} rotation={[0, 0, 0.1]}>
          <BotPart
            geometry={<cylinderGeometry args={[0.06, 0.05, 0.38, 8]} />}
            color={darkerGray}
            renderMode={renderMode}
          />
        </group>
        {/* Elbow joint */}
        <group position={[-0.13, -0.44, 0]}>
          <BotPart
            geometry={<sphereGeometry args={[0.08, 8, 8]} />}
            color={cyanColor}
            renderMode={renderMode}
          />
          {/* Forearm cylinder */}
          <group position={[0, -0.2, 0]}>
            <BotPart
              geometry={<cylinderGeometry args={[0.05, 0.04, 0.32, 8]} />}
              color={darkerGray}
              renderMode={renderMode}
            />
            {/* Hand Claws */}
            <group position={[0, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
              <BotPart
                geometry={<torusGeometry args={[0.07, 0.025, 4, 12, Math.PI * 1.4]} />}
                color={grayColor}
                renderMode={renderMode}
              />
            </group>
          </group>
        </group>
      </group>

      {/* ─── RIGHT ARM ASSEMBLY ─── */}
      <group ref={rightArmGroup} position={[0.48, 0.32, 0]}>
        {/* Shoulder capsule */}
        <BotPart
          geometry={<sphereGeometry args={[0.12, 10, 10]} />}
          color={grayColor}
          renderMode={renderMode}
        />
        {/* Upper arm cylinder */}
        <group position={[0.1, -0.22, 0]} rotation={[0, 0, -0.1]}>
          <BotPart
            geometry={<cylinderGeometry args={[0.06, 0.05, 0.38, 8]} />}
            color={darkerGray}
            renderMode={renderMode}
          />
        </group>
        {/* Elbow joint */}
        <group position={[0.13, -0.44, 0]}>
          <BotPart
            geometry={<sphereGeometry args={[0.08, 8, 8]} />}
            color={cyanColor}
            renderMode={renderMode}
          />
          {/* Forearm cylinder */}
          <group position={[0, -0.2, 0]}>
            <BotPart
              geometry={<cylinderGeometry args={[0.05, 0.04, 0.32, 8]} />}
              color={darkerGray}
              renderMode={renderMode}
            />
            {/* Hand Claws */}
            <group position={[0, -0.2, 0]} rotation={[0, 0, -Math.PI / 2]}>
              <BotPart
                geometry={<torusGeometry args={[0.07, 0.025, 4, 12, Math.PI * 1.4]} />}
                color={grayColor}
                renderMode={renderMode}
              />
            </group>
          </group>
        </group>
      </group>

      {/* ─── JET THRUSTER BASE ─── */}
      <group position={[0, -0.55, 0]}>
        {/* Thruster exhaust bell */}
        <BotPart
          geometry={<cylinderGeometry args={[0.22, 0.15, 0.22, 8]} />}
          color={grayColor}
          renderMode={renderMode}
        />
        {/* Glow exhaust flame cone */}
        <mesh ref={thrusterFlameRef} position={[0, -0.32, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.12, 0.5, 10, 1, true]} />
          <meshBasicMaterial
            color={cyanColor}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        {/* Exhaust Flame points streaming down */}
        {showParticles && (
          <Points ref={particlesRef} positions={flameData.positions} stride={3} frustumCulled={false}>
            <PointMaterial
              transparent
              color={cyanColor}
              size={0.038}
              sizeAttenuation={true}
              depthWrite={false}
              opacity={0.65}
            />
          </Points>
        )}

        {/* 3D Space Label: Jet Exhaust */}
        <Html
          position={[0, -0.85, 0]}
          center
          distanceFactor={6}
        >
          <div className="hud-callout">
            <span className="hud-pulse" style={{ backgroundColor: 'var(--plasma)' }} />
            <div className="hud-label">THRUST MATRIX // ION.03</div>
          </div>
        </Html>
      </group>
    </group>
    </group>
  );
}
