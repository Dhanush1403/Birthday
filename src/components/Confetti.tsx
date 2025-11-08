import { useEffect, useState } from "react";

const Confetti = () => {
  const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number; left: number; color: string; delay: number }>>([]);

  useEffect(() => {
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: ['#FF6B9D', '#00E5FF', '#FFD700', '#00FF9F', '#FF00FF'][Math.floor(Math.random() * 5)],
      delay: Math.random() * 0.5
    }));
    setConfettiPieces(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
