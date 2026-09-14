import React, { useState, useEffect } from 'react';

interface WatermarkBackdropProps {
  watermarkUrl: string;
}

export const WatermarkBackdrop: React.FC<WatermarkBackdropProps> = ({ watermarkUrl }) => {
  const [scrollScale, setScrollScale] = useState(1);
  const [scrollTranslateY, setScrollTranslateY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset;
          const maxScroll = Math.max(
            document.documentElement.scrollHeight - window.innerHeight,
            1200
          );
          const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

          // As the user scrolls down, scale smoothly from 1.00 up to 1.48
          const newScale = 1 + progress * 0.48;
          // Gentle parallax lift as page progresses
          const newTranslateY = progress * 40;

          setScrollScale(newScale);
          setScrollTranslateY(newTranslateY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial call
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const effectiveUrl = watermarkUrl || 'https://i.postimg.cc/wMj3ZDyt/Chat-GPT-Image-Aug-3-2026-11-21-40-AM-removebg-preview.png';

  return (
    <div
      id="dynamic-watermark-backdrop"
      className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Surrounding Ambient Radial Studio Glows */}
      <div className="absolute w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] bg-sky-500/18 rounded-full blur-[130px] -top-10" />
      <div className="absolute w-[650px] h-[650px] sm:w-[850px] sm:h-[850px] bg-blue-600/15 rounded-full blur-[150px] bottom-0" />
      <div className="absolute w-[450px] h-[450px] bg-cyan-400/18 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Ambient background soft vignette placed BEHIND the image so it doesn't darken the watermark */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_#020814_92%)] opacity-50" />

      {/* 
        The Watermark Silhouette:
        - Fixed throughout the whole website (from Hero down to Footer)
        - High clarity & vivid visibility (opacity 0.32 - 0.38)
        - Radiant cyan & sky-blue neon glow aura
        - Dynamically expands as visitor scrolls anywhere down the site
      */}
      <div
        className="relative w-[340px] h-[480px] sm:w-[500px] sm:h-[650px] md:w-[640px] md:h-[800px] lg:w-[800px] lg:h-[960px] will-change-transform flex items-center justify-center"
        style={{
          transform: `scale(${scrollScale}) translateY(${scrollTranslateY}px)`,
          transition: 'transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        <img
          src={effectiveUrl}
          alt="Md Kawser Ahmad Watermark Backdrop"
          className="w-full h-full object-contain object-center opacity-30 sm:opacity-35 filter contrast-125 saturate-115 drop-shadow-[0_0_45px_rgba(56,189,248,0.5)] drop-shadow-[0_0_90px_rgba(14,165,233,0.35)]"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== window.location.origin + '/profile.png') {
              target.src = '/profile.png';
            }
          }}
        />
      </div>
    </div>
  );
};
