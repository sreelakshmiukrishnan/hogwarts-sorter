// src/components/LandingPage.jsx
// =============================================
// THE MAGICAL LANDING PAGE
// First thing users see when they open the app
// =============================================

import { useState, useEffect } from 'react';

// Framer Motion — for smooth animations
// motion.div = an animated <div>
// AnimatePresence = handles exit animations
import { motion } from 'framer-motion';

// React Icons — ready-made icon components
import { GiWizardStaff, GiSpellBook, GiCastle } from 'react-icons/gi';
import { FaStar } from 'react-icons/fa';

// Our particles background
import ParticlesBackground from './Particles';

// Our CSS styles for this page
import '../styles/LandingPage.css';

// ---- TYPEWRITER HOOK ----
// Simpler version using ONE useEffect and a local counter
function useTypewriter(text, speed = 60) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    // Reset displayed text when text prop changes
   

    // Local counter variable — no state needed!
    let i = 0;

    // setInterval runs a function repeatedly every 'speed' ms
    const timer = setInterval(() => {
      if (i < text.length) {
        // Add next letter using slice
        // slice(0, 3) on "Hello" gives "Hel"
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        // All letters typed — stop the interval
        clearInterval(timer);
      }
    }, speed);

    // Cleanup: if component disappears, stop the interval
    return () => clearInterval(timer);

  }, [text, speed]); // only re-run if text or speed changes

  return displayed;
}

// ---- MAIN COMPONENT ----
function LandingPage({ onStart }) {

  // The subtitle text that will be typed out
  const subtitle = useTypewriter(
    'The Sorting Hat awaits... Discover where you truly belong.',
    65
  );

  // Floating decoration items (icons around the page)
  const decorations = [
    { icon: <FaStar />,         className: 'deco deco-1' },
    { icon: <GiSpellBook />,    className: 'deco deco-2' },
    { icon: <FaStar />,         className: 'deco deco-3' },
    { icon: <GiWizardStaff />,  className: 'deco deco-4' },
    { icon: <FaStar />,         className: 'deco deco-5' },
    { icon: <GiCastle />,       className: 'deco deco-6' },
  ];

  return (
    <div className="landing-container">

      {/* Layer 1: Stars background */}
      <ParticlesBackground />

      {/* Layer 2: Dark gradient overlay on top of stars */}
      <div className="landing-overlay" />

      {/* Layer 3: Floating decoration icons */}
      {decorations.map((item, i) => (
        <div key={i} className={item.className}>
          {item.icon}
        </div>
      ))}

      {/* Layer 4: Main content — uses Framer Motion */}
      {/* motion.div with 'initial' and 'animate' creates a fade+slide in */}
      <motion.div
        className="landing-content"
        initial={{ opacity: 0, y: 40 }}   // starts invisible, 40px down
        animate={{ opacity: 1, y: 0 }}    // animates to visible, normal pos
        transition={{ duration: 1, ease: 'easeOut' }}
      >

        {/* Castle Icon — floats up and down */}
        <motion.div
          className="castle-icon"
          animate={{ y: [0, -15, 0] }}          // bounces up and down
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <GiCastle />
        </motion.div>

        {/* Decorative top line */}
        <motion.p
          className="pre-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          ✦ Hogwarts School of Witchcraft & Wizardry ✦
        </motion.p>

        {/* Main glowing title */}
        <motion.h1
          className="main-title glow-text"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
        >
          House
          <span className="title-break"> </span>
          Sorting
        </motion.h1>

        {/* Decorative divider */}
        <motion.div
          className="title-divider"
          initial={{ width: 0 }}
          animate={{ width: '200px' }}
          transition={{ delay: 1, duration: 1 }}
        />

        {/* Typewriter subtitle */}
        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {subtitle}
          {/* Blinking cursor at end of typed text */}
          <span className="cursor">|</span>
        </motion.p>

        {/* House preview badges */}
        <motion.div
          className="house-badges"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <span className="badge gryffindor">⚔️ Gryffindor</span>
          <span className="badge ravenclaw">📚 Ravenclaw</span>
          <span className="badge hufflepuff">🌻 Hufflepuff</span>
          <span className="badge slytherin">🐍 Slytherin</span>
        </motion.div>

        {/* Start Button */}
        <motion.button
          className="magic-btn start-btn"
          onClick={onStart}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          // Framer Motion hover & tap effects
          whileHover={{ scale: 1.08, boxShadow: '0 0 40px rgba(201,168,76,0.9)' }}
          whileTap={{ scale: 0.95 }}
        >
          <GiWizardStaff style={{ marginRight: '10px', fontSize: '1.2rem' }} />
          Begin Sorting
        </motion.button>

        {/* Small note below button */}
        <motion.p
          className="footer-note"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1 }}
        >
          ✨ Answer 8 questions to reveal your true house ✨
        </motion.p>

      </motion.div>
    </div>
  );
}

export default LandingPage;