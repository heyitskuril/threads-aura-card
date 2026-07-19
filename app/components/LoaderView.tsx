'use client';

import { useState, useEffect } from 'react';

const ANALYSIS_STEPS = [
  'Establishing connection to Threads timeline...',
  'Fetching public profile signatures...',
  'Reading recent public conversation threads...',
  'Analyzing syntax and punctuation cadence...',
  'Measuring creative energy frequencies...',
  'Calculating chaos and mischief levels...',
  'Checking for main character presence...',
  'Weaving thread patterns into metrics...',
  'Polishing card edges & rare holographic layers...',
];

export default function LoaderView() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % ANALYSIS_STEPS.length);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0B0B0F] z-50 flex flex-col items-center justify-center gap-12 p-6 text-slate-100 font-sans overflow-hidden" style={{ margin: 0 }}>

      <div className="absolute w-[300px] h-[300px] rounded-full bg-indigo-500/10 blur-[100px] top-1/4 left-1/4 animate-pulse duration-10000" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-emerald-500/10 blur-[100px] bottom-1/4 right-1/4 animate-pulse duration-10000 delay-2000" />

      <div className="relative flex items-center justify-center">
        <div className="absolute w-56 h-56 rounded-full border border-indigo-500/20 animate-ping opacity-40 duration-3000" />
        <div className="absolute w-44 h-44 rounded-full border border-emerald-500/20 animate-ping opacity-30 duration-3000 delay-1000" />

        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 blur-md opacity-30 animate-pulse duration-1000" />

        <div className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-400 shadow-2xl shadow-indigo-500/40 animate-spin duration-10000 relative">
          <div className="absolute inset-0.5 rounded-full bg-slate-950/80 backdrop-blur-sm flex items-center justify-center">
            <span className="text-xl">✨</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-sm text-center space-y-4">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-display font-medium text-slate-200 tracking-tight">
            Reading your Aura
          </h3>
          <span className="inline-flex items-center gap-1 mt-1">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-bounce [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce" />
          </span>
        </div>

        <div className="h-12 flex items-center justify-center">
          <p className="text-sm text-slate-400 font-mono text-center tracking-wide leading-relaxed px-4 transition-all duration-300">
            {ANALYSIS_STEPS[stepIndex]}
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 left-12 right-12 flex items-center justify-between text-[10px] font-mono text-slate-600">
        <span>AURA_SCANNER_v1.0.4</span>
        <span>SCANNING_TIMELINE_CADENCE</span>
      </div>

    </div>
  );
}
