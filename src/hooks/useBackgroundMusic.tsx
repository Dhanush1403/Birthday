import { useEffect, useRef, useState } from 'react';

export const useBackgroundMusic = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    return () => {
      stopMusic();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playMusic = () => {
    if (!audioContextRef.current || isPlaying) return;
    
    const ctx = audioContextRef.current;
    
    // Create a gain node for volume control
    const mainGain = ctx.createGain();
    mainGain.gain.value = 0.08; // Soft background music
    mainGain.connect(ctx.destination);
    gainNodeRef.current = mainGain;

    // Happy birthday melody pattern (simplified)
    const melody = [
      { note: 392, duration: 0.5 }, // G
      { note: 392, duration: 0.5 }, // G
      { note: 440, duration: 1 },   // A
      { note: 392, duration: 1 },   // G
      { note: 523, duration: 1 },   // C
      { note: 494, duration: 2 },   // B
    ];

    let currentTime = ctx.currentTime;
    
    const playMelody = () => {
      melody.forEach((note, index) => {
        const oscillator = ctx.createOscillator();
        const noteGain = ctx.createGain();
        
        oscillator.connect(noteGain);
        noteGain.connect(mainGain);
        
        oscillator.frequency.value = note.note;
        oscillator.type = 'sine';
        
        const startTime = currentTime + index * 0.5;
        noteGain.gain.setValueAtTime(0, startTime);
        noteGain.gain.linearRampToValueAtTime(1, startTime + 0.05);
        noteGain.gain.setValueAtTime(1, startTime + note.duration - 0.1);
        noteGain.gain.linearRampToValueAtTime(0, startTime + note.duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + note.duration);
        
        oscillatorsRef.current.push(oscillator);
      });
      
      currentTime += melody.length * 0.5 + 1;
      
      // Loop the melody
      if (isPlaying) {
        setTimeout(() => {
          if (isPlaying) playMelody();
        }, melody.length * 500 + 1000);
      }
    };

    setIsPlaying(true);
    playMelody();
  };

  const stopMusic = () => {
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Oscillator already stopped
      }
    });
    oscillatorsRef.current = [];
    setIsPlaying(false);
  };

  return {
    playMusic,
    stopMusic,
    isPlaying,
  };
};
