// src/components/Result.jsx
// =============================================
// THE HOUSE RESULT PAGE
// Dramatic animated reveal of your Hogwarts house
// =============================================

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import { FaStar, FaRedo } from 'react-icons/fa';
import ParticlesBackground from './Particles';
import '../styles/Result.css';

// =============================================
// HOUSE DATA — colors, emblems, descriptions
// =============================================
const houseData = {
  Gryffindor: {
    colors:       ['#740001', '#FFD700'],   // maroon + gold
    bgGradient:   'linear-gradient(135deg, #3d0000 0%, #1a0000 50%, #2d1000 100%)',
    borderColor:  '#FFD700',
    glowColor:    'rgba(255, 215, 0, 0.6)',
    emblem:       '🦁',
    trait:        'BRAVERY & COURAGE',
    description:  `You belong in Gryffindor, the house of the brave!
                   Like Harry Potter, Hermione Granger, and Albus Dumbledore,
                   you face challenges head-on with courage and conviction.
                   Your heart is bold, your spirit is fierce, and you would
                   never back down from doing what is right — no matter the cost.`,
    traits: ['⚔️ Brave', '🔥 Daring', '💛 Chivalrous', '⚡ Nerve'],
    founder:      'Godric Gryffindor',
    ghost:        'Nearly Headless Nick',
    element:      '🔥 Fire',
    confettiColors: ['#740001', '#FFD700', '#ff6600', '#ffffff'],
  },

  Ravenclaw: {
    colors:       ['#0e1a40', '#946B2D'],
    bgGradient:   'linear-gradient(135deg, #0a1628 0%, #050d1a 50%, #0d1520 100%)',
    borderColor:  '#946B2D',
    glowColor:    'rgba(148, 107, 45, 0.6)',
    emblem:       '🦅',
    trait:        'WIT & WISDOM',
    description:  `You belong in Ravenclaw, the house of the wise!
                   Like Luna Lovegood and Cho Chang, you possess
                   a sharp, curious mind that hungers for knowledge.
                   You see the world differently from others — finding
                   magic in logic, beauty in learning, and wisdom in
                   asking questions others are afraid to ask.`,
    traits: ['📚 Wise', '🌙 Witty', '💎 Creative', '🔭 Curious'],
    founder:      'Rowena Ravenclaw',
    ghost:        'The Grey Lady',
    element:      '💨 Air',
    confettiColors: ['#0e1a40', '#946B2D', '#aec6cf', '#ffffff'],
  },

  Hufflepuff: {
    colors:       ['#ecb939', '#372e29'],
    bgGradient:   'linear-gradient(135deg, #2a1f00 0%, #1a1200 50%, #261a00 100%)',
    borderColor:  '#ecb939',
    glowColor:    'rgba(236, 185, 57, 0.6)',
    emblem:       '🦡',
    trait:        'LOYALTY & KINDNESS',
    description:  `You belong in Hufflepuff, the house of the loyal!
                   Like Newt Scamander and Nymphadora Tonks, you have
                   a heart full of warmth and dedication. You believe
                   in fairness, hard work, and standing by the people
                   you love. Your kindness is not a weakness —
                   it is your greatest and most magical strength.`,
    traits: ['🌻 Kind', '🤝 Loyal', '⚖️ Fair', '🌱 Patient'],
    founder:      'Helga Hufflepuff',
    ghost:        'The Fat Friar',
    element:      '🌍 Earth',
    confettiColors: ['#ecb939', '#372e29', '#f5d78e', '#ffffff'],
  },

  Slytherin: {
    colors:       ['#1a472a', '#aaaaaa'],
    bgGradient:   'linear-gradient(135deg, #0a1f0f 0%, #050f08 50%, #0d1a10 100%)',
    borderColor:  '#2ecc71',
    glowColor:    'rgba(46, 204, 113, 0.5)',
    emblem:       '🐍',
    trait:        'AMBITION & CUNNING',
    description:  `You belong in Slytherin, the house of the ambitious!
                   Like Merlin himself and Severus Snape, you possess
                   a sharp mind, fierce determination, and an unstoppable
                   drive to achieve greatness. You are resourceful,
                   strategic, and know exactly what you want.
                   Greatness awaits those who are bold enough to claim it.`,
    traits: ['🐍 Cunning', '♟️ Strategic', '👑 Ambitious', '🌑 Resourceful'],
    founder:      'Salazar Slytherin',
    ghost:        'The Bloody Baron',
    element:      '💧 Water',
    confettiColors: ['#1a472a', '#2ecc71', '#aaaaaa', '#ffffff'],
  },
};

// =============================================
// MAIN RESULT COMPONENT
// =============================================
function Result({ house, onRestart }) {

  // Controls confetti visibility
  const [showConfetti, setShowConfetti] = useState(true);

  // Controls the reveal animation sequence
  const [revealStage, setRevealStage] = useState(0);
  // Stage 0: initial flash
  // Stage 1: house name appears
  // Stage 2: full card appears

  // Window size for confetti
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Get this house's data
  const data = houseData[house];

  // Save result to localStorage
  // localStorage lets us remember data even after browser closes
  useEffect(() => {
    localStorage.setItem('hogwartsHouse', house);
    localStorage.setItem('sortedAt', new Date().toLocaleDateString());
  }, [house]);

  // Stop confetti after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  // Animate reveal in stages
  useEffect(() => {
    // After 0.5s show stage 1
    const t1 = setTimeout(() => setRevealStage(1), 500);
    // After 1.5s show stage 2
    const t2 = setTimeout(() => setRevealStage(2), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Update confetti size if window resizes
  useEffect(() => {
    const handleResize = () => setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="result-container" style={{ background: data.bgGradient }}>

      {/* Particles background */}
      <ParticlesBackground />

      {/* Confetti explosion! 🎊 */}
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          colors={data.confettiColors}
          numberOfPieces={200}
          recycle={false}      // pieces fall once, don't loop
          gravity={0.15}
        />
      )}

      {/* Colored glow overlay matching house */}
      <div
        className="result-glow-overlay"
        style={{ background: `radial-gradient(ellipse at center, ${data.glowColor} 0%, transparent 70%)` }}
      />

      {/* Main content */}
      <div className="result-wrapper">

        {/* ---- STAGE 1: House name flash ---- */}
        <AnimatePresence>
          {revealStage >= 1 && (
            <motion.div
              className="house-announcement"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
            >
              {/* Big house emblem */}
              <motion.div
                className="house-emblem-big"
                animate={{
                  scale: [1, 1.15, 1],
                  filter: [
                    `drop-shadow(0 0 20px ${data.glowColor})`,
                    `drop-shadow(0 0 50px ${data.glowColor})`,
                    `drop-shadow(0 0 20px ${data.glowColor})`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {data.emblem}
              </motion.div>

              {/* "You belong in..." text */}
              <motion.p
                className="belong-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                ✦ The Sorting Hat has spoken ✦
              </motion.p>

              {/* House name */}
              <motion.h1
                className="house-name"
                style={{ color: data.colors[0] === '#0e1a40'
                  ? data.borderColor
                  : data.colors[1] === '#FFD700' ? '#FFD700'
                  : data.colors[0] }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
              >
                {house}
              </motion.h1>

              {/* House trait */}
              <motion.p
                className="house-trait"
                style={{ color: data.borderColor }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                {data.trait}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---- STAGE 2: Full house card ---- */}
        {revealStage >= 2 && (
          <motion.div
            className="house-card glass-card"
            style={{ borderColor: data.borderColor,
                     boxShadow: `0 0 40px ${data.glowColor}` }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >

            {/* Description */}
            <motion.p
              className="house-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {data.description}
            </motion.p>

            {/* Divider */}
            <div
              className="card-divider"
              style={{ background: `linear-gradient(90deg, transparent, ${data.borderColor}, transparent)` }}
            />

            {/* Traits row */}
            <motion.div
              className="traits-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {data.traits.map((trait, i) => (
                <span
                  key={i}
                  className="trait-badge"
                  style={{ borderColor: data.borderColor,
                           color: data.borderColor }}
                >
                  {trait}
                </span>
              ))}
            </motion.div>

            {/* House info row */}
            <motion.div
              className="house-info-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className="info-item">
                <span className="info-label">Founder</span>
                <span className="info-value">{data.founder}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Ghost</span>
                <span className="info-value">{data.ghost}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Element</span>
                <span className="info-value">{data.element}</span>
              </div>
            </motion.div>

            {/* localStorage saved message */}
            <motion.p
              className="saved-note"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <FaStar style={{ marginRight: '6px' }} />
              Your result has been saved!
            </motion.p>

          </motion.div>
        )}

        {/* ---- RESTART BUTTON ---- */}
        {revealStage >= 2 && (
          <motion.button
            className="magic-btn restart-btn"
            onClick={onRestart}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaRedo style={{ marginRight: '10px' }} />
            Sort Again
          </motion.button>
        )}

      </div>
    </div>
  );
}

export default Result;