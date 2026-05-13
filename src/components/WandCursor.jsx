// src/components/WandCursor.jsx
// Emoji cursor — tiny wand that follows mouse

import { useEffect, useRef, useState } from 'react';

const createSparkle = (x, y) => ({
  id: Math.random(),
  x: x + (Math.random() - 0.5) * 24,
  y: y + (Math.random() - 0.5) * 24,
  size: Math.random() * 6 + 3,
  color: ['#c9a84c', '#f0d080', '#ffffff', '#a0c0ff'][
    Math.floor(Math.random() * 4)
  ],
});

function WandCursor() {

  const [mousePos, setMousePos]   = useState({ x: -100, y: -100 });
  const [sparkles, setSparkles]   = useState([]);
  const lastSparkleTime           = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const now = Date.now();
      if (now - lastSparkleTime.current > 60) {
        lastSparkleTime.current = now;
        const s = createSparkle(e.clientX, e.clientY);
        setSparkles(prev => [...prev, s]);
        setTimeout(() => {
          setSparkles(prev => prev.filter(p => p.id !== s.id));
        }, 500);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Skip on touch devices
  if (navigator.maxTouchPoints > 0) return null;

  return (
    <>
      {/* 🪄 Tiny wand emoji that follows cursor */}
      <div
        style={{
          position:      'fixed',
          left:           mousePos.x,
          top:            mousePos.y,
          fontSize:       '18px',       /* small emoji size */
          transform:      'translate(-2px, -18px)', /* tip of wand = click point */
          pointerEvents:  'none',
          zIndex:         99999,
          userSelect:     'none',
          lineHeight:     1,
        }}
      >
         ⚡
      </div>

      {/* ✨ Sparkle trail */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          style={{
            position:      'fixed',
            left:           sparkle.x,
            top:            sparkle.y,
            width:          sparkle.size,
            height:         sparkle.size,
            borderRadius:  '50%',
            background:     sparkle.color,
            boxShadow:     `0 0 ${sparkle.size}px ${sparkle.color}`,
            transform:     'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex:         99997,
            animation:     'sparkle-fade 0.5s ease forwards',
          }}
        />
      ))}

      <style>{`
        @keyframes sparkle-fade {
          0%   { opacity: 1; transform: translate(-50%, -50%) scale(1);   }
          100% { opacity: 0; transform: translate(-50%, -80%) scale(0.2); }
        }
      `}</style>
    </>
  );
}

export default WandCursor;