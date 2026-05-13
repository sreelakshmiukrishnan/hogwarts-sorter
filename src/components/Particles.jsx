// src/components/Particles.jsx
// =============================================
// FLOATING STARS BACKGROUND
// This creates the magical starfield behind everything
// =============================================

import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

function ParticlesBackground() {

  // 'init' tracks whether the particles engine is ready
  const [init, setInit] = useState(false);

  // useEffect runs code AFTER the component appears on screen
  // Think of it like: "once you're ready, do this setup"
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // loadSlim loads a lighter version (faster to load)
      await loadSlim(engine);
    }).then(() => {
      setInit(true); // engine is ready!
    });
  }, []); // the [] means "only run this once"

  // Don't render until engine is ready
  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        // Background is transparent — our CSS handles bg color
        background: { color: { value: 'transparent' } },

        // How particles are rendered
        fpsLimit: 60,

        particles: {
          // ---- APPEARANCE ----
          color: { value: ['#c9a84c', '#ffffff', '#f0d080', '#a0c0ff'] },
          // ^ gold, white, light gold, blue-ish stars

          shape: { type: 'circle' },

          opacity: {
            value: { min: 0.1, max: 0.8 },
            animation: {
              enable: true,        // stars twinkle
              speed: 1,
              minimumValue: 0.1,
            },
          },

          size: {
            value: { min: 1, max: 3 }, // tiny stars
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 0.5,
            },
          },

          // ---- MOVEMENT ----
          move: {
            enable: true,
            speed: 0.4,          // slow, dreamy float
            direction: 'none',   // random direction
            random: true,
            straight: false,
            outModes: { default: 'out' }, // disappear at edges
          },

          // ---- HOW MANY ----
          number: {
            value: 120,          // 120 stars on screen
            density: { enable: true },
          },
        },

        // No interactivity needed
        interactivity: {
          events: {
            onHover: { enable: false },
            onClick: { enable: false },
          },
        },

        // Performance
        detectRetina: true,
      }}

      // Styling — absolute position fills the whole screen
      style={{
        position: 'fixed',  // stays in place when scrolling
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,          // behind everything else
      }}
    />
  );
}

export default ParticlesBackground;