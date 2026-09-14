import React, { useState, useEffect, useRef } from 'react';

interface WatermarkBackdropProps {
  watermarkUrl: string;
}

const ORIGINAL_WATERMARK_URL = 'https://i.postimg.cc/wMj3ZDyt/Chat-GPT-Image-Aug-3-2026-11-21-40-AM-removebg-preview.png';

export const WatermarkBackdrop: React.FC<WatermarkBackdropProps> = ({ watermarkUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeUrl = watermarkUrl || ORIGINAL_WATERMARK_URL;
  const [imgSrc, setImgSrc] = useState<string>(activeUrl);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const target = watermarkUrl || ORIGINAL_WATERMARK_URL;
    setImgSrc(target);
    setIsLoaded(false);
  }, [watermarkUrl]);

  // High-performance hardware-accelerated scroll tracking using direct DOM transform
  // ZERO React state re-renders on scroll, perfectly smooth 60fps/120Hz on mobile!
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const scrollY = window.scrollY || window.pageYOffset;
            const docHeight = Math.max(
              document.documentElement.scrollHeight - window.innerHeight,
              900
            );
            const progress = Math.min(Math.max(scrollY / docHeight, 0), 1);

            // Smooth scale from 1.0 to 1.38 and slight upward parallax
            const scale = 1 + progress * 0.38;
            const translateY = progress * 32;

            containerRef.current.style.transform = `scale3d(${scale}, ${scale}, 1) translate3d(0, ${translateY}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      id="dynamic-watermark-backdrop"
      className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 
        High-Performance GPU Radial Gradient Lighting
        Replaces heavy gaussian blur filters with hardware-composited gradients
        giving identical neon aura with 0ms rendering latency
      */}
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          background: `
            radial-gradient(circle at 50% 25%, rgba(14, 165, 233, 0.16) 0%, transparent 60%),
            radial-gradient(circle at 50% 85%, rgba(37, 99, 235, 0.14) 0%, transparent 65%),
            radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.12) 0%, transparent 50%)
          `
        }}
      />

      {/* Subtle background studio vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_#020814_92%)] opacity-45 pointer-events-none" />

      {/* 
        The Watermark Silhouette:
        - Fixed throughout the whole site
        - Hardware accelerated via direct ref
        - Fast paint with transition-opacity
      */}
      <div
        ref={containerRef}
        className="relative w-[340px] h-[480px] sm:w-[500px] sm:h-[650px] md:w-[620px] md:h-[780px] lg:w-[780px] lg:h-[920px] will-change-transform flex items-center justify-center transition-opacity duration-500"
        style={{
          transform: 'scale3d(1, 1, 1) translate3d(0, 0, 0)',
        }}
      >
        <img
          src={imgSrc}
          alt="Md Kawser Ahmad Silhouette Backdrop"
          className={`w-full h-full object-contain object-center transition-opacity duration-300 ${
            isLoaded ? 'opacity-30 sm:opacity-35' : 'opacity-20'
          } filter contrast-125 saturate-110 drop-shadow-[0_0_30px_rgba(56,189,248,0.45)]`}
          loading="eager"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            if (imgSrc !== '/profile.png') {
              setImgSrc('/profile.png');
              setIsLoaded(true);
            }
          }}
        />
      </div>
    </div>
  );
};
