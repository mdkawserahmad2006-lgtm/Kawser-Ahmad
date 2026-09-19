import React, { useEffect, useRef, useState } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const InteractiveAmbientLighting: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleIdRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates & trailing lerp coordinates ("আলো দৌড়াবে")
    let mouseX = width / 2;
    let mouseY = height / 2;
    let trailX = mouseX;
    let trailY = mouseY;
    let isMouseActive = false;
    let mouseVelocity = 0;
    let lastMouseX = mouseX;
    let lastMouseY = mouseY;

    // Recent trail history for comet/beam streak
    const history: Array<{ x: number; y: number; opacity: number; radius: number }> = [];

    const handleMouseMove = (e: MouseEvent) => {
      isMouseActive = true;
      mouseX = e.clientX;
      mouseY = e.clientY;

      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      mouseVelocity = Math.sqrt(dx * dx + dy * dy);
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    };

    const handleMouseLeave = () => {
      isMouseActive = false;
    };

    // Touch & Click ripple trigger ("বাইরে ক্লিক লাগবে সেখানে আলো জ্বলবে")
    const handlePointerDown = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // Update cursor position immediately on touch
      mouseX = x;
      mouseY = y;
      trailX = x;
      trailY = y;
      isMouseActive = true;

      const id = ++rippleIdRef.current;
      setRipples((prev) => [...prev.slice(-6), { id, x, y, size: 0 }]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 850);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth trailing physics (lerp)
      trailX += (mouseX - trailX) * 0.14;
      trailY += (mouseY - trailY) * 0.14;

      if (isMouseActive) {
        // Record trail points
        history.push({
          x: trailX,
          y: trailY,
          opacity: 0.45,
          radius: Math.min(180, 110 + mouseVelocity * 1.5),
        });

        if (history.length > 18) {
          history.shift();
        }
      } else {
        if (history.length > 0) history.shift();
      }

      // Draw light trail streaks
      for (let i = 0; i < history.length; i++) {
        const p = history[i];
        const progress = (i + 1) / history.length;
        const currentRadius = p.radius * (0.6 + progress * 0.4);

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          currentRadius
        );

        gradient.addColorStop(0, `rgba(56, 189, 248, ${0.12 * progress})`); // sky-400
        gradient.addColorStop(0.35, `rgba(6, 182, 212, ${0.08 * progress})`); // cyan-500
        gradient.addColorStop(0.7, `rgba(14, 116, 144, ${0.03 * progress})`); // cyan-700
        gradient.addColorStop(1, 'rgba(2, 6, 23, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Main active spotlight cursor glow
      if (isMouseActive) {
        const spotRadius = 140;
        const spotGradient = ctx.createRadialGradient(
          trailX,
          trailY,
          0,
          trailX,
          trailY,
          spotRadius
        );

        spotGradient.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
        spotGradient.addColorStop(0.3, 'rgba(6, 182, 212, 0.12)');
        spotGradient.addColorStop(0.65, 'rgba(2, 132, 199, 0.04)');
        spotGradient.addColorStop(1, 'rgba(2, 6, 23, 0)');

        ctx.fillStyle = spotGradient;
        ctx.beginPath();
        ctx.arc(trailX, trailY, spotRadius, 0, Math.PI * 2);
        ctx.fill();

        // Small focused center beam
        const coreGradient = ctx.createRadialGradient(
          trailX,
          trailY,
          0,
          trailX,
          trailY,
          24
        );
        coreGradient.addColorStop(0, 'rgba(224, 242, 254, 0.45)');
        coreGradient.addColorStop(0.5, 'rgba(56, 189, 248, 0.2)');
        coreGradient.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(trailX, trailY, 24, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('pointerdown', handlePointerDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* 
        Background Ambient Light Canvas:
        Placed at z-0 with pointer-events-none so it smoothly illuminates the dark canvas,
        section gutters, and borders behind the project cards without covering the product images.
      */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* 
        Phone Touch Click Light Bursts / Ripples:
        When clicked or tapped anywhere (especially outside cards), a bright cyan shockwave expands and glows!
      */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-20 overflow-hidden"
      >
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
              width: '180px',
              height: '180px',
            }}
          >
            {/* Outer expanding glow shockwave */}
            <div className="w-full h-full rounded-full bg-radial from-sky-400/50 via-cyan-500/25 to-transparent animate-ping opacity-75" />
            {/* Center flash spark */}
            <div className="absolute inset-4 rounded-full border-2 border-sky-300/80 shadow-[0_0_30px_rgba(56,189,248,0.9)] animate-pulse" />
          </div>
        ))}
      </div>
    </>
  );
};
