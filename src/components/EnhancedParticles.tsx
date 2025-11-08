import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  shape: "circle" | "star" | "heart" | "sparkle";
  duration: number;
  delay: number;
}

const EnhancedParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [
      "hsl(330, 100%, 60%)",
      "hsl(280, 100%, 70%)",
      "hsl(310, 100%, 65%)",
      "hsl(200, 100%, 60%)",
      "hsl(50, 100%, 60%)",
    ];

    const shapes: Particle["shape"][] = ["circle", "star", "heart", "sparkle"];

    const newParticles: Particle[] = [...Array(30)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 3,
    }));

    setParticles(newParticles);
  }, []);

  const renderShape = (particle: Particle) => {
    const baseClass = "absolute transition-all";
    const style = {
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      animation: `float ${particle.duration}s ease-in-out infinite`,
      animationDelay: `${particle.delay}s`,
    };

    switch (particle.shape) {
      case "star":
        return (
          <div
            key={particle.id}
            className={baseClass}
            style={style}
          >
            <svg viewBox="0 0 24 24" fill={particle.color}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        );
      case "heart":
        return (
          <div
            key={particle.id}
            className={baseClass}
            style={style}
          >
            <svg viewBox="0 0 24 24" fill={particle.color}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        );
      case "sparkle":
        return (
          <div
            key={particle.id}
            className={baseClass}
            style={{
              ...style,
              animation: `float ${particle.duration}s ease-in-out infinite, pulse ${particle.duration / 2}s ease-in-out infinite`,
            }}
          >
            <svg viewBox="0 0 24 24" fill={particle.color}>
              <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
            </svg>
          </div>
        );
      default:
        return (
          <div
            key={particle.id}
            className={`${baseClass} rounded-full`}
            style={{
              ...style,
              background: particle.color,
            }}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none opacity-30 overflow-hidden">
      {particles.map(particle => renderShape(particle))}
    </div>
  );
};

export default EnhancedParticles;
