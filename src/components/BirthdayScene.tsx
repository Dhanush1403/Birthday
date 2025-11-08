import React, { useState } from 'react';
import { motion } from 'framer-motion';
import cakeImg from '../../sweet-birthday-cake-with-candles_18591-82310.avif';
import Confetti from './Confetti';

const Candle: React.FC<{ position: number; delay: number }> = ({ position, delay }) => {
  const [isLit, setIsLit] = useState(false);

  return (
    <div 
      className="absolute cursor-pointer"
      style={{ 
        left: `${position}%`,
        top: '-25px',
        zIndex: 20
      }}
      onClick={() => setIsLit(true)}
    >
      {/* Candle stick */}
      <div className="w-3 h-10 rounded-full" style={{
        background: 'linear-gradient(to right, #FF9AA2, #FFB7B2)',
      }} />
      
      {/* Flame */}
      {isLit && (
        <motion.div
          className="relative -top-2"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [-5, 5, -5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Outer flame */}
          <motion.div
            className="absolute w-4 h-6 rounded-full"
            style={{
              background: 'linear-gradient(to top, #FFD700, #FFA500)',
              filter: 'blur(2px)',
              boxShadow: '0 0 10px #FFD700, 0 0 20px #FFA500, 0 0 30px #FF4500',
              zIndex: 10
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Inner flame */}
          <motion.div
            className="absolute w-2 h-4 rounded-full"
            style={{
              left: '4px',
              background: '#FFFFFF',
              filter: 'blur(1px)',
              zIndex: 11
            }}
            animate={{
              height: [12, 16, 12],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}
    </div>
  );
};

const BirthdayScene: React.FC = () => {
  return (
    <div className="w-full h-[400px] flex items-center justify-center bg-gradient-to-b from-purple-900 to-purple-600">
      <div className="relative">
  {/* Use provided cake image with gentle float and confetti */}
  <Confetti />
  <motion.div className="relative w-[720px] h-[220px] flex items-center justify-center"
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  >
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ delay: 1, duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="p-2 rounded-lg"
    >
      <motion.img
        src={cakeImg}
        alt="birthday cake"
        className="w-44 h-44 object-contain rounded-lg shadow-2xl bg-white"
        initial={{ y: 20, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
      />
    </motion.div>
  </motion.div>

        {/* Animated caption */}
        <motion.div className="mt-4 flex items-center justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.h3 className="text-2xl text-pink-300 font-semibold italic"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          >
            Happy Birthday!
          </motion.h3>
        </motion.div>
      </div>
    </div>
    );
};

export default BirthdayScene;