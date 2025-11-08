import { useEffect, useState } from "react";

interface CandleFlameProps {
  isLit: boolean;
}

const CandleFlame = ({ isLit }: CandleFlameProps) => {
  const [flameIntensity, setFlameIntensity] = useState(1);

  useEffect(() => {
    if (!isLit) return;
    
    const interval = setInterval(() => {
      setFlameIntensity(0.8 + Math.random() * 0.4);
    }, 100);

    return () => clearInterval(interval);
  }, [isLit]);

  if (!isLit) return null;

  return (
    <>
      {/* Main flame */}
      <div 
        className="absolute -top-8 left-1/2 -translate-x-1/2 w-6 h-16 rounded-full transition-all duration-100"
        style={{ 
          background: "linear-gradient(to top, #FFD700 0%, #FF8C00 30%, #FF4500 60%, #DC143C 100%)",
          filter: `brightness(${flameIntensity}) drop-shadow(0 0 20px rgba(255, 200, 0, 0.9)) drop-shadow(0 0 40px rgba(255, 100, 0, 0.7))`,
          clipPath: "polygon(50% 0%, 20% 30%, 30% 60%, 50% 100%, 70% 60%, 80% 30%)",
          transform: `translateX(-50%) scale(${0.9 + flameIntensity * 0.2})`,
        }} 
      />
      
      {/* Inner flame core */}
      <div 
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-3 h-8 rounded-full transition-all duration-100"
        style={{ 
          background: "linear-gradient(to top, #FFEB3B 0%, #FFF176 50%, #FFFFFF 100%)",
          filter: "brightness(1.5) blur(2px)",
          clipPath: "polygon(50% 0%, 30% 40%, 50% 100%, 70% 40%)",
        }} 
      />
      
      {/* Glow effects */}
      <div 
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full blur-xl transition-all duration-200"
        style={{ 
          background: "radial-gradient(circle, rgba(255, 200, 0, 0.6) 0%, rgba(255, 100, 0, 0.3) 50%, transparent 70%)",
          opacity: flameIntensity,
        }} 
      />
      
      {/* Outer glow */}
      <div 
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full blur-2xl"
        style={{ 
          background: "radial-gradient(circle, rgba(255, 150, 0, 0.4) 0%, rgba(255, 50, 0, 0.2) 40%, transparent 70%)",
          opacity: flameIntensity * 0.7,
        }} 
      />
      
      {/* Sparks */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-yellow-400 animate-pulse"
          style={{
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            top: `${-20 - Math.random() * 40}px`,
            left: `50%`,
            transform: `translateX(${-50 + (Math.random() - 0.5) * 30}%)`,
            opacity: Math.random() * 0.8,
            animationDelay: `${i * 0.2}s`,
            animationDuration: `${1 + Math.random()}s`,
          }}
        />
      ))}
    </>
  );
};

export default CandleFlame;
