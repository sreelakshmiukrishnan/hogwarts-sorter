// src/components/MusicToggle.jsx
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaMusic, FaVolumeMute } from 'react-icons/fa';
import '../styles/MusicToggle.css';

function MusicToggle() {

  const [isPlaying, setIsPlaying] = useState(true); // starts as true!
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/sounds/ambient.mpeg');
    audio.loop   = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    // ✅ Play immediately — user already clicked "Enter"
    // so browser allows this now!
    audio.play().catch(() => {});

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggleMusic = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <motion.button
      className={`music-toggle ${isPlaying ? 'playing' : ''}`}
      onClick={toggleMusic}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isPlaying ? 'Mute music' : 'Play music'}
    >
      {isPlaying && (
        <motion.div
          className="music-ring"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      )}

      <span className="music-icon">
        {isPlaying ? <FaMusic /> : <FaVolumeMute />}
      </span>

      <span className="music-label">
        {isPlaying ? 'Music On' : 'Music Off'}
      </span>

    </motion.button>
  );
}

export default MusicToggle;