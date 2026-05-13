// src/data/questions.js
// =============================================
// ALL QUIZ QUESTIONS AND ANSWERS
// Each answer gives points to specific houses
// =============================================

const questions = [
  {
    id: 1,
    question: "You find an injured magical creature in the Forbidden Forest. What do you do?",
    emoji: "🦄",
    answers: [
      {
        text: "Rush in to help it immediately, no matter the danger",
        // This answer gives 3 points to Gryffindor, 1 to Hufflepuff
        points: { gryffindor: 3, ravenclaw: 0, hufflepuff: 1, slytherin: 0 },
      },
      {
        text: "Research the creature first to help it safely",
        points: { gryffindor: 0, ravenclaw: 3, hufflepuff: 1, slytherin: 0 },
      },
      {
        text: "Gently approach and comfort it with patience",
        points: { gryffindor: 0, ravenclaw: 0, hufflepuff: 3, slytherin: 0 },
      },
      {
        text: "Observe from a distance — getting involved could be dangerous",
        points: { gryffindor: 0, ravenclaw: 1, hufflepuff: 0, slytherin: 3 },
      },
    ],
  },

  {
    id: 2,
    question: "Which quality do you value most in yourself?",
    emoji: "⚡",
    answers: [
      {
        text: "Courage — I face my fears head on",
        points: { gryffindor: 3, ravenclaw: 0, hufflepuff: 0, slytherin: 1 },
      },
      {
        text: "Intelligence — knowledge is my greatest weapon",
        points: { gryffindor: 0, ravenclaw: 3, hufflepuff: 0, slytherin: 1 },
      },
      {
        text: "Loyalty — I would never abandon those I love",
        points: { gryffindor: 1, ravenclaw: 0, hufflepuff: 3, slytherin: 0 },
      },
      {
        text: "Ambition — I will do whatever it takes to succeed",
        points: { gryffindor: 0, ravenclaw: 1, hufflepuff: 0, slytherin: 3 },
      },
    ],
  },

  {
    id: 3,
    question: "You have a free afternoon at Hogwarts. What do you do?",
    emoji: "🏰",
    answers: [
      {
        text: "Sneak into a restricted area just for the thrill",
        points: { gryffindor: 3, ravenclaw: 0, hufflepuff: 0, slytherin: 1 },
      },
      {
        text: "Spend hours in the library reading ancient spellbooks",
        points: { gryffindor: 0, ravenclaw: 3, hufflepuff: 1, slytherin: 0 },
      },
      {
        text: "Organize a fun activity for your friends",
        points: { gryffindor: 1, ravenclaw: 0, hufflepuff: 3, slytherin: 0 },
      },
      {
        text: "Work on a secret project to get ahead of everyone else",
        points: { gryffindor: 0, ravenclaw: 1, hufflepuff: 0, slytherin: 3 },
      },
    ],
  },

  {
    id: 4,
    question: "A fellow student is being unfairly bullied. What do you do?",
    emoji: "🛡️",
    answers: [
      {
        text: "Step in immediately and confront the bully directly",
        points: { gryffindor: 3, ravenclaw: 0, hufflepuff: 1, slytherin: 0 },
      },
      {
        text: "Think of the cleverest way to outsmart the bully",
        points: { gryffindor: 1, ravenclaw: 3, hufflepuff: 0, slytherin: 0 },
      },
      {
        text: "Comfort the student and report it to a teacher",
        points: { gryffindor: 0, ravenclaw: 0, hufflepuff: 3, slytherin: 0 },
      },
      {
        text: "Remember this moment and use it to your advantage later",
        points: { gryffindor: 0, ravenclaw: 1, hufflepuff: 0, slytherin: 3 },
      },
    ],
  },

  {
    id: 5,
    question: "Which magical subject excites you the most?",
    emoji: "📚",
    answers: [
      {
        text: "Defense Against the Dark Arts — protection through strength",
        points: { gryffindor: 3, ravenclaw: 0, hufflepuff: 0, slytherin: 1 },
      },
      {
        text: "Arithmancy — uncovering the magic hidden in numbers",
        points: { gryffindor: 0, ravenclaw: 3, hufflepuff: 0, slytherin: 1 },
      },
      {
        text: "Herbology — nurturing living magical things",
        points: { gryffindor: 0, ravenclaw: 1, hufflepuff: 3, slytherin: 0 },
      },
      {
        text: "Potions — precise, powerful, and full of secrets",
        points: { gryffindor: 0, ravenclaw: 1, hufflepuff: 0, slytherin: 3 },
      },
    ],
  },

  {
    id: 6,
    question: "You discover a powerful but forbidden spell. What do you do?",
    emoji: "🔮",
    answers: [
      {
        text: "Learn it — you might need it to protect others someday",
        points: { gryffindor: 3, ravenclaw: 1, hufflepuff: 0, slytherin: 0 },
      },
      {
        text: "Study it thoroughly to understand its implications",
        points: { gryffindor: 0, ravenclaw: 3, hufflepuff: 0, slytherin: 1 },
      },
      {
        text: "Report it to a teacher — some things are forbidden for good reason",
        points: { gryffindor: 1, ravenclaw: 0, hufflepuff: 3, slytherin: 0 },
      },
      {
        text: "Master it in secret — power like this must not be wasted",
        points: { gryffindor: 0, ravenclaw: 0, hufflepuff: 0, slytherin: 3 },
      },
    ],
  },

  {
    id: 7,
    question: "How do your friends describe you?",
    emoji: "🌟",
    answers: [
      {
        text: "Brave, bold, and the first to volunteer",
        points: { gryffindor: 3, ravenclaw: 0, hufflepuff: 1, slytherin: 0 },
      },
      {
        text: "Curious, witty, and always asking 'but why?'",
        points: { gryffindor: 0, ravenclaw: 3, hufflepuff: 0, slytherin: 1 },
      },
      {
        text: "Kind, reliable, and always there when needed",
        points: { gryffindor: 0, ravenclaw: 0, hufflepuff: 3, slytherin: 0 },
      },
      {
        text: "Determined, focused, and quietly powerful",
        points: { gryffindor: 1, ravenclaw: 1, hufflepuff: 0, slytherin: 3 },
      },
    ],
  },

  {
    id: 8,
    question: "The Sorting Hat is about to be placed on your head. What are you thinking?",
    emoji: "🎩",
    answers: [
      {
        text: "Please not Slytherin... anywhere but Slytherin!",
        points: { gryffindor: 3, ravenclaw: 1, hufflepuff: 1, slytherin: 0 },
      },
      {
        text: "I've already analyzed all four houses and have a preference",
        points: { gryffindor: 0, ravenclaw: 3, hufflepuff: 1, slytherin: 0 },
      },
      {
        text: "Whatever house it chooses, I'll give it my absolute best",
        points: { gryffindor: 1, ravenclaw: 0, hufflepuff: 3, slytherin: 0 },
      },
      {
        text: "I know exactly where I belong — and I intend to prove it",
        points: { gryffindor: 1, ravenclaw: 0, hufflepuff: 0, slytherin: 3 },
      },
    ],
  },
];

// Export so other files can use this data
export default questions;