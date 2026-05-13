// src/App.jsx
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage  from './components/LandingPage';
import Quiz         from './components/Quiz';
import Result       from './components/Result';
import MusicToggle  from './components/MusicToggle';
import WandCursor   from './components/WandCursor';
import './App.css';

const pageVariants = {
  initial: { opacity: 0, scale: 0.97, y: 10  },
  animate: { opacity: 1, scale: 1,    y: 0   },
  exit:    { opacity: 0, scale: 0.97, y: -10 },
};

const pageTransition = { duration: 0.5, ease: 'easeInOut' };

function App() {

  const [screen,    setScreen]   = useState('landing');
  const [house,     setHouse]    = useState(null);

  // ✅ New — controls the entry overlay
  const [entered,   setEntered]  = useState(false);

  const goToQuiz = () => {
    window.scrollTo(0, 0);
    setScreen('quiz');
  };

  const goToResult = (chosenHouse) => {
    window.scrollTo(0, 0);
    setHouse(chosenHouse);
    setScreen('result');
  };

  const restartApp = () => {
    window.scrollTo(0, 0);
    setHouse(null);
    setScreen('landing');
  };

  // ---- ENTRY OVERLAY ----
  // Shows BEFORE the app loads
  // First click here = user interaction = music can play!
  if (!entered) {
    return (
      <div style={{
        minHeight:       '100vh',
        width:           '100%',
        background:      'radial-gradient(ellipse at center, #0d0d2b 0%, #000000 100%)',
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        justifyContent:  'center',
        cursor:          'pointer',
      }}
        onClick={() => setEntered(true)}
      >
        {/* Floating stars */}
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ fontSize: '3rem', marginBottom: '16px' }}
        >
          ✨
        </motion.div>

        {/* Castle */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: '5rem', marginBottom: '24px' }}
        >
          🏰
        </motion.div>

        {/* Title */}
        <motion.h1
          animate={{
            textShadow: [
              '0 0 20px #c9a84c',
              '0 0 50px #f0d080',
              '0 0 20px #c9a84c',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            fontFamily:    "'Cinzel Decorative', cursive",
            color:         '#c9a84c',
            fontSize:      'clamp(1.5rem, 5vw, 3rem)',
            letterSpacing: '6px',
            marginBottom:  '16px',
            textAlign:     'center',
            padding:       '0 20px',
          }}
        >
          Hogwarts Awaits
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            fontFamily:    "'Cinzel', serif",
            color:         '#a09880',
            fontSize:      '0.8rem',
            letterSpacing: '3px',
            marginBottom:  '48px',
            textAlign:     'center',
          }}
        >
          A magical journey awaits you...
        </motion.p>

        {/* Click to Enter button */}
        <motion.div
          animate={{
            scale:     [1, 1.05, 1],
            boxShadow: [
              '0 0 20px rgba(201,168,76,0.4)',
              '0 0 50px rgba(201,168,76,0.8)',
              '0 0 20px rgba(201,168,76,0.4)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            background:    'linear-gradient(135deg, #c9a84c, #8B6914)',
            color:         '#1a1000',
            fontFamily:    "'Cinzel', serif",
            fontWeight:    '700',
            fontSize:      '1rem',
            padding:       '16px 48px',
            borderRadius:  '50px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            cursor:        'pointer',
          }}
        >
          🪄 Enter
        </motion.div>

        {/* Music note hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{
            fontFamily:  "'Cinzel', serif",
            color:       '#a09880',
            fontSize:    '0.68rem',
            letterSpacing: '2px',
            marginTop:   '24px',
          }}
        >
          🎵 with sound for best experience
        </motion.p>

      </div>
    );
  }

  // ---- MAIN APP (after entering) ----
  return (
    <div className="app-container">
      <WandCursor />
      <MusicToggle />

      <AnimatePresence mode="wait">

        {screen === 'landing' && (
          <motion.div
            key="landing"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <LandingPage onStart={goToQuiz} />
          </motion.div>
        )}

        {screen === 'quiz' && (
          <motion.div
            key="quiz"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <Quiz onFinish={goToResult} />
          </motion.div>
        )}

        {screen === 'result' && (
          <motion.div
            key="result"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <Result house={house} onRestart={restartApp} />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

export default App;