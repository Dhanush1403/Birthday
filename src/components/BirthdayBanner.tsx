interface BalloonProps {
  index: number;
  color: string;
}

const Balloon: React.FC<BalloonProps> = ({ index, color }) => {
  return (
    <div
      className="absolute animate-float"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${index * 0.5}s`,
        animationDuration: `${4 + Math.random() * 2}s`
      }}
    >
      <div
        className="w-8 h-10 rounded-full"
        style={{
          background: color,
          transform: `rotate(${Math.random() * 30 - 15}deg)`
        }}
      />
    </div>
  );
};

const BirthdayBanner: React.FC = () => {
  const colors = ['#FF69B4', '#FFD700', '#87CEEB', '#FF6B9D', '#98FB98', '#DDA0DD'];

  return (
    <div className="fixed top-0 left-0 w-full h-20 z-50 pointer-events-none">
      <div className="absolute w-full h-full overflow-hidden">
        <svg className="w-full h-full animate-wave" viewBox="0 0 1280 80" preserveAspectRatio="xMidYMid slice">
          {/* Animated colorful banner flags */}
          {[...Array(20)].map((_, i) => {
            const color = colors[i % colors.length];
            const x = i * 64;
            const delay = i * 0.1;
            return (
              <g key={i} className="transform-gpu">
                <polygon
                  points={`${x},0 ${x + 32},40 ${x + 64},0`}
                  fill={color}
                  stroke="none"
                  className="animate-flag-wave"
                  style={{
                    animation: `flagWave 2s ease-in-out infinite`,
                    animationDelay: `${delay}s`,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                    transformOrigin: `${x + 32}px 0`
                  }}
                />
                <circle
                  cx={x + 32}
                  cy="5"
                  r="3"
                  fill="#FFD700"
                  className="animate-twinkle"
                  style={{ animationDelay: `${delay * 0.5}s` }}
                />
              </g>
            );
          })}
        </svg>
      </div>
      {/* Floating balloons */}
      <div className="absolute w-full h-full">
        {[...Array(8)].map((_, i) => (
          <Balloon key={i} index={i} color={colors[i % colors.length]} />
        ))}
      </div>
    </div>
  );
};

export default BirthdayBanner;
