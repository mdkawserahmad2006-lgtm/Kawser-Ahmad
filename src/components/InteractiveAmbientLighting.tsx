import React, { useEffect, useRef, useState } from 'react';

/**
 * Desktop-only subtle ambient cursor light.
 * Completely disabled on mobile phones and touch devices as requested by the user.
 */
export const InteractiveAmbientLighting: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    // Strictly verify desktop device with hover & fine mouse pointer
    const checkIsDesktop = () => {
      const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const isWideEnough = window.innerWidth >= 1024;
      setIsDesktop(hasHover && isWideEnough);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

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

    let mouseX = width / 2;
    let mouseY = height / 2;
    let trailX = mouseX;
    let trailY = mouseY;
    let isMouseActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      isMouseActive = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      isMouseActive = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth subtle interpolation
      trailX += (mouseX - trailX) * 0.12;
      trailY += (mouseY - trailY) * 0.12;

      if (isMouseActive) {
        const spotRadius = 160;
        const spotGradient = ctx.createRadialGradient(
          trailX,
          trailY,
          0,
          trailX,
          trailY,
          spotRadius
        );

        spotGradient.addColorStop(0, 'rgba(56, 189, 248, 0.14)');
        spotGradient.addColorStop(0.4, 'rgba(6, 182, 212, 0.06)');
        spotGradient.addColorStop(0.8, 'rgba(2, 132, 199, 0.02)');
        spotGradient.addColorStop(1, 'rgba(2, 6, 23, 0)');

        ctx.fillStyle = spotGradient;
        ctx.beginPath();
        ctx.arc(trailX, trailY, spotRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDesktop]);

  // If mobile phone or touch screen, return null completely (no lighting, no ripples)
  if (!isDesktop) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 hidden lg:block"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
