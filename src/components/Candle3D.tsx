import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface FlameProps {
  isLit: boolean;
}

const Flame = ({ isLit }: FlameProps) => {
  const flameRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const [flameIntensity, setFlameIntensity] = useState(1);

  useFrame((state) => {
    if (!flameRef.current || !isLit) return;
    
    // Flickering animation
    const time = state.clock.getElapsedTime();
    const flicker = Math.sin(time * 10) * 0.1 + Math.sin(time * 7.3) * 0.05;
    
    flameRef.current.scale.y = 1 + flicker;
    flameRef.current.scale.x = 0.8 + flicker * 0.5;
    flameRef.current.scale.z = 0.8 + flicker * 0.5;
    
    // Flame sway
    flameRef.current.position.x = Math.sin(time * 2) * 0.02;
    
    // Light intensity flicker
    if (lightRef.current) {
      lightRef.current.intensity = 2 + flicker * 0.5;
    }
    
    setFlameIntensity(1 + flicker);
  });

  if (!isLit) return null;

  return (
    <group position={[0, 1.2, 0]}>
      {/* Main flame */}
      <mesh ref={flameRef} position={[0, 0.3, 0]}>
        <coneGeometry args={[0.08, 0.4, 8]} />
        <meshStandardMaterial
          color="#ff6b00"
          emissive="#ff4500"
          emissiveIntensity={flameIntensity}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Inner flame core */}
      <mesh position={[0, 0.25, 0]}>
        <coneGeometry args={[0.04, 0.25, 8]} />
        <meshStandardMaterial
          color="#ffff00"
          emissive="#ffffff"
          emissiveIntensity={2}
          transparent
          opacity={0.95}
        />
      </mesh>
      
      {/* Point light for glow */}
      <pointLight
        ref={lightRef}
        color="#ff9933"
        intensity={2}
        distance={3}
        decay={2}
      />
      
      {/* Glow sphere */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};

interface CandleProps {
  isLit: boolean;
}

const Candle = ({ isLit }: CandleProps) => {
  const candleRef = useRef<THREE.Group>(null);
  const [scale, setScale] = useState(0);

  useFrame(() => {
    if (!candleRef.current) return;
    
    // Smooth scale-in animation
    if (isLit && scale < 1) {
      setScale(Math.min(scale + 0.05, 1));
    }
    
    candleRef.current.scale.set(scale, scale, scale);
    
    // Gentle rotation
    if (isLit) {
      candleRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={candleRef}>
      {/* Candle body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.15, 1, 32]} />
        <meshStandardMaterial
          color="#dc2626"
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      
      {/* Candle top (wax melted edge) */}
      <mesh position={[0, 1.02, 0]} castShadow>
        <cylinderGeometry args={[0.115, 0.12, 0.05, 32]} />
        <meshStandardMaterial
          color="#b91c1c"
          roughness={0.4}
        />
      </mesh>
      
      {/* Wick */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.008, 0.01, 0.15, 8]} />
        <meshStandardMaterial
          color={isLit ? "#2d1810" : "#1a1a1a"}
          roughness={0.9}
        />
      </mesh>
      
      {/* Flame */}
      <Flame isLit={isLit} />
    </group>
  );
};

interface Candle3DProps {
  isLit: boolean;
}

const BirthdayCake = ({ isLit }: { isLit: boolean }) => {
  const cakeRef = useRef<THREE.Group>(null);
  const [rotationSpeed, setRotationSpeed] = useState(0.002);

  useFrame((state) => {
    if (!cakeRef.current) return;
    cakeRef.current.rotation.y += rotationSpeed;
  });

  return (
    <group ref={cakeRef} position={[0, -0.5, 0]}>
      {/* Cake base */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1, 1.1, 0.5, 32]} />
        <meshPhongMaterial color="#8B4513" />
      </mesh>

      {/* Cake layers */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.9, 1, 0.3, 32]} />
        <meshPhongMaterial color="#FFE4B5" />
      </mesh>

      {/* Frosting details */}
      {[...Array(16)].map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 0.9,
              0.8,
              Math.sin(angle) * 0.9
            ]}
            castShadow
          >
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshPhongMaterial color="#FFF0F5" />
          </mesh>
        );
      })}

      {/* Candle positions */}
      {[...Array(5)].map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const radius = 0.5;
        return (
          <group
            key={i}
            position={[
              Math.cos(angle) * radius,
              0.8,
              Math.sin(angle) * radius
            ]}
          >
            <Candle isLit={isLit} />
          </group>
        );
      })}
    </group>
  );
};

const Candle3D = ({ isLit }: Candle3DProps) => {
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    if (isLit) {
      setShowSparkles(true);
    }
  }, [isLit]);

  if (!isLit) return null;

  return (
    <div className="w-full h-[400px] mx-auto relative">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 2, 4]} fov={45} />
        
        {/* Enhanced lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.6}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        {/* Spot lights for dramatic effect */}
        <spotLight
          position={[-3, 3, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#ff9999"
        />
        <spotLight
          position={[3, 3, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#99ff99"
        />

        {/* Fog for depth */}
        <fog attach="fog" args={['#000000', 3.5, 15]} />
        
        {/* Birthday cake with candles */}
        <BirthdayCake isLit={isLit} />
        
        {/* Ground plane with shadow */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.3} />
        </mesh>
        
        {/* Enhanced orbit controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          autoRotate={true}
          autoRotateSpeed={1}
          maxDistance={8}
          minDistance={3}
        />
      </Canvas>
      
      {/* Sparkle overlay */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: 0
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Candle3D;
