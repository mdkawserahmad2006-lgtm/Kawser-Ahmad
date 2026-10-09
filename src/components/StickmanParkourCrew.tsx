import React, { useEffect, useState } from 'react';
import { Play, Pause, Sparkles, Compass } from 'lucide-react';

declare global {
  interface Window {
    stickmanParkour?: any;
    initStickmanParkour?: () => any;
  }
}

export const StickmanParkourCrew: React.FC = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Initialize stickman engine if not already active
    const tryInit = () => {
      if (typeof window !== 'undefined' && window.initStickmanParkour) {
        window.initStickmanParkour();
      }
    };

    tryInit();
    const timer = setTimeout(tryInit, 600);

    // Refresh DOM platform scanning when components finish mounting
    const scanTimer = setTimeout(() => {
      if (window.stickmanParkour && typeof window.stickmanParkour.scanDOM === 'function') {
        window.stickmanParkour.scanDOM();
      }
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(scanTimer);
    };
  }, []);

  const handleAction = (actionName: string) => {
    if (window.stickmanParkour && typeof window.stickmanParkour.action === 'function') {
      window.stickmanParkour.action(actionName);
    }
  };

  const togglePause = () => {
    if (window.stickmanParkour) {
      if (isRunning) {
        if (typeof window.stickmanParkour.stop === 'function') {
          window.stickmanParkour.stop();
        }
        setIsRunning(false);
      } else {
        if (typeof window.stickmanParkour.resume === 'function') {
          window.stickmanParkour.resume();
        }
        setIsRunning(true);
      }
    }
  };

  return (
    <div
      id="stickman-crew-widget"
      className="fixed bottom-4 left-4 z-40 select-none font-sans"
    >
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-sky-500/30 shadow-[0_0_20px_rgba(0,255,204,0.15)] hover:border-cyan-400/60 transition-all">
        {/* Animated 3-Stickmen Indicators (Cyan, Amber, Purple) */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-2.5 py-1 rounded-full hover:bg-sky-500/10 transition-colors cursor-pointer group"
          title="Stickman Parkour Crew Active"
        >
          <div className="flex items-center -space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00ffcc] shadow-[0_0_8px_#00ffcc] animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffaa00] shadow-[0_0_8px_#ffaa00] animate-pulse delay-75" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#aa55ff] shadow-[0_0_8px_#aa55ff] animate-pulse delay-150" />
          </div>
          <span className="text-[11px] font-bold text-white tracking-wide group-hover:text-cyan-300 transition-colors">
            Stickman Crew
          </span>
        </button>

        {/* Quick Quick Actions */}
        <div className="flex items-center gap-1 pr-1">
          {/* Summon / Jump to view */}
          <button
            onClick={() => handleAction('summon')}
            className="px-2 py-0.5 rounded-full bg-cyan-500/15 hover:bg-cyan-500/30 text-cyan-300 text-[10px] font-bold border border-cyan-400/30 transition-all flex items-center gap-1 cursor-pointer active:scale-95"
            title="Summon 3 Stickmen to Center Screen"
          >
            <Compass className="w-3 h-3 text-cyan-300" />
            <span className="hidden sm:inline">Summon</span>
          </button>

          {/* Ninja Flip */}
          <button
            onClick={() => handleAction('flip')}
            className="px-2 py-0.5 rounded-full bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 text-[10px] font-bold border border-amber-400/30 transition-all flex items-center gap-1 cursor-pointer active:scale-95"
            title="Do Synchronized Ninja Flip"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span className="hidden sm:inline">Flip</span>
          </button>

          {/* Spiderman Web Up */}
          <button
            onClick={() => handleAction('web')}
            className="px-2 py-0.5 rounded-full bg-purple-500/15 hover:bg-purple-500/30 text-purple-300 text-[10px] font-bold border border-purple-400/30 transition-all flex items-center gap-1 cursor-pointer active:scale-95"
            title="Spider-Man Web Shoot Upwards"
          >
            <span className="text-[11px]">🕸️</span>
            <span className="hidden sm:inline">Web Up</span>
          </button>

          {/* Pause / Play */}
          <button
            onClick={togglePause}
            className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            title={isRunning ? 'Pause Stickman Crew' : 'Resume Stickman Crew'}
          >
            {isRunning ? (
              <Pause className="w-3 h-3 text-emerald-400" />
            ) : (
              <Play className="w-3 h-3 text-amber-400" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Info Tooltip */}
      {isExpanded && (
        <div className="absolute bottom-11 left-0 w-64 p-3 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-sky-400/40 shadow-2xl text-xs space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-sky-500/20 pb-1.5">
            <span className="font-bold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              Interactive Stickman Crew
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            • <strong className="text-cyan-300">দৌড়ানো:</strong> এগুলো কার্সারের সাথে সাথে সারা ওয়েবসাইট জুড়ে দৌড়াবে।
          </p>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            • <strong className="text-amber-300">ক্লিক জাম্প:</strong> যেকোনো কার্ড বা স্থানে ক্লিক করলে সেখানে লাফিয়ে পড়বে।
          </p>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            • <strong className="text-purple-300">স্পাইডারম্যান ওয়েব:</strong> কার্সার নিচে থেকে উপরে তুললে বা উপরে ক্লিক করলে তারা ওয়েব শুট করে উপরে উঠবে!
          </p>
          <div className="pt-1.5 border-t border-sky-500/20 flex gap-1.5">
            <button
              onClick={() => handleAction('dance')}
              className="flex-1 py-1 rounded-lg bg-[#072448] hover:bg-[#0c376e] text-cyan-300 text-[10px] font-bold text-center border border-sky-500/30"
            >
              Dance
            </button>
            <button
              onClick={() => handleAction('wave')}
              className="flex-1 py-1 rounded-lg bg-[#072448] hover:bg-[#0c376e] text-amber-300 text-[10px] font-bold text-center border border-amber-500/30"
            >
              Wave
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
