// src/components/Quiz.jsx
// =============================================
// THE QUIZ SCREEN
// Shows questions one by one, tracks scores
// =============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiSpellBook, GiWizardStaff } from 'react-icons/gi';
import questions from '../data/questions';
import '../styles/Quiz.css';

function Quiz({ onFinish }) {

  // Which question we're on (0 = first question)
  const [currentQ, setCurrentQ] = useState(0);

  // Stores points for each house as user answers
  const [scores, setScores] = useState({
    gryffindor: 0,
    ravenclaw: 0,
    hufflepuff: 0,
    slytherin: 0,
  });

  // Which answer is selected (highlighted)
  const [selected, setSelected] = useState(null);

  // Whether we're transitioning between questions
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Current question object from our data file
  const question = questions[currentQ];

  // Progress percentage for the progress bar
  // e.g. on question 3 of 8: (3/8)*100 = 37.5%
  const progress = ((currentQ) / questions.length) * 100;

  // ---- HANDLE ANSWER SELECTION ----
  const handleAnswer = (answerIndex) => {
    // Don't allow clicking while transitioning
    if (isTransitioning) return;

    // Highlight the selected answer
    setSelected(answerIndex);

    // Get the points from the chosen answer
    const chosenPoints = question.answers[answerIndex].points;

    // Add those points to our running scores
    const newScores = {
      gryffindor: scores.gryffindor + chosenPoints.gryffindor,
      ravenclaw:  scores.ravenclaw  + chosenPoints.ravenclaw,
      hufflepuff: scores.hufflepuff + chosenPoints.hufflepuff,
      slytherin:  scores.slytherin  + chosenPoints.slytherin,
    };

    // Wait 600ms (so user sees selection), then move on
    setIsTransitioning(true);
    setTimeout(() => {

      // Is this the last question?
      if (currentQ + 1 >= questions.length) {
        // Calculate the winning house and finish
        calculateResult(newScores);
      } else {
        // Move to next question
        setScores(newScores);
        setCurrentQ(currentQ + 1);
        setSelected(null);            // clear selection
        setIsTransitioning(false);
      }

    }, 700); // 700ms delay feels natural
  };

  // ---- CALCULATE RESULT ----
  // Find which house has the most points
  const calculateResult = (finalScores) => {
    // Object.entries converts object to array of [key, value] pairs
    // e.g. { gryffindor: 12, ravenclaw: 8 } →
    //      [['gryffindor', 12], ['ravenclaw', 8]]
    const sorted = Object.entries(finalScores).sort(
      (a, b) => b[1] - a[1]  // sort by value, highest first
    );

    // sorted[0][0] is the house name with highest score
    const winningHouse = sorted[0][0];

    // Capitalize first letter: 'gryffindor' → 'Gryffindor'
    const formatted =
      winningHouse.charAt(0).toUpperCase() + winningHouse.slice(1);

    // Tell App.jsx we're done, pass the house name
    onFinish(formatted);
  };

  return (
    <div className="quiz-container">

      {/* Background overlay */}
      <div className="quiz-overlay" />

      {/* Main quiz content */}
      <div className="quiz-wrapper">

        {/* ---- HEADER ---- */}
        <motion.div
          className="quiz-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GiSpellBook className="quiz-icon" />
          <p className="quiz-label">The Sorting Ceremony</p>
        </motion.div>

        {/* ---- PROGRESS BAR ---- */}
        <div className="progress-container">
          <div className="progress-text">
            Question {currentQ + 1} of {questions.length}
          </div>
          <div className="progress-bar-bg">
            <motion.div
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* ---- QUESTION CARD ---- */}
        {/* AnimatePresence lets components animate when removed */}
        {/* 'key' tells Framer Motion when content has changed */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}  // changes every question = triggers animation
            className="question-card glass-card"
            initial={{ opacity: 0, x: 60 }}    // slides in from right
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}       // slides out to left
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >

            {/* Question emoji */}
            <div className="question-emoji">{question.emoji}</div>

            {/* Question text */}
            <h2 className="question-text">{question.question}</h2>

            {/* ---- ANSWER OPTIONS ---- */}
            <div className="answers-grid">
              {question.answers.map((answer, index) => (
                <motion.button
                  key={index}
                  className={`answer-btn ${selected === index ? 'selected' : ''}`}
                  onClick={() => handleAnswer(index)}
                  // Stagger each button's appearance
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={selected === null ? { scale: 1.02, x: 6 } : {}}
                  whileTap={selected === null ? { scale: 0.98 } : {}}
                  disabled={isTransitioning} // disable after selection
                >
                  {/* Answer letter label: A, B, C, D */}
                  <span className="answer-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {/* Answer text */}
                  <span className="answer-text">{answer.text}</span>
                </motion.button>
              ))}
            </div>

          </motion.div>
        </AnimatePresence>

        {/* ---- BOTTOM WAND DECORATION ---- */}
        <motion.div
          className="quiz-footer"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <GiWizardStaff />
        </motion.div>

      </div>
    </div>
  );
}

export default Quiz;