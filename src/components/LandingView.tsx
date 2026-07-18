/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Layers, Share2, HelpCircle, ArrowRight, Heart, AtSign, Search, Zap, CheckCircle, Shield } from 'lucide-react';

interface LandingViewProps {
  onSubmit: (username: string) => void;
}

export default function LandingView({ onSubmit }: LandingViewProps) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = username.trim().replace(/^@/, '');
    if (!cleanUsername) {
      setError('Please enter a username to reveal your aura!');
      return;
    }
    setError('');
    onSubmit(cleanUsername);
  };

  const faqData = [
    {
      q: "Is this a real personality test?",
      a: "No! Threads Aura Card is an entertainment experience. It analyzes your public posting frequencies, length, tone, and conversation types to build a beautifully personalized, collectible artifact. It is for fun and self-expression."
    },
    {
      q: "Do you store my personal data?",
      a: "We only read public profile signals to run our evaluation. No accounts or password credentials are requested, and we do not persist any private personal information. Your account safety is 100% guaranteed."
    },
    {
      q: "Can I regenerate or re-roll my card?",
      a: "Absolutely! If you enter your username again or hit the 'Re-roll' action button on your result card, the system will adjust the sub-seed so you can attempt to unlock different metric ratios or roll an extremely rare tier like Legendary, Mythic, or Secret!"
    },
    {
      q: "Is there any charge to use Threads Aura Card?",
      a: "No, Threads Aura Card is completely free and accessible. There are zero paywalls, subscription models, or locked features. It is built as an open tribute to the Threads developer community."
    }
  ];

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Background slow-moving ambient gradient blob */}
      <div className="absolute top-0 inset-x-0 h-[600px] overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-emerald-500/5 blur-[120px]" />
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 relative z-10">
        
        {/* Header / Brand Mark */}
        <header className="flex justify-between items-center mb-16 md:mb-24">
          <div className="flex items-center">
            <div className="w-2.5 h-2.5 bg-[#A855F7] rounded-full mr-3 animate-pulse" />
            <span className="font-display font-bold tracking-tight text-xl uppercase bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
              THREADS AURA CARD
            </span>
          </div>
          <span className="text-[11px] font-mono tracking-wider text-slate-500 uppercase">
            V1.0.4 — SECRET TIER UNLOCKED
          </span>
        </header>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-24 md:mb-32">
          
          {/* Hero Left: Text & Search Input */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide">
              <Zap className="w-3 h-3" />
              <span>THE THREADS VIBE CHECKER</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight leading-[1.08] text-slate-100">
              What is your <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                internet aura?
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
              Enter your Threads username to distill your online profile cadence, humor, and creative energy into a beautiful, collectible glassmorphic card.
            </p>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="max-w-md pt-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500">
                    <AtSign className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="yourusername"
                    className="w-full pl-10 pr-4 py-3.5 bg-slate-900/60 hover:bg-slate-900/90 focus:bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none transition-all text-sm font-sans"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 hover:brightness-110 active:scale-[0.98] text-white font-semibold px-6 py-3.5 rounded-2xl transition-all text-sm shadow-lg shadow-indigo-500/10 cursor-pointer"
                >
                  <span>Reveal My Aura</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              {error && (
                <p className="text-red-400 text-xs text-left mt-2.5 ml-1 font-medium flex items-center gap-1">
                  <span>⚠️</span> {error}
                </p>
              )}
            </form>
          </div>

          {/* Hero Right: Stacked Preview Cards (Social Proof) */}
          <div className="lg:col-span-5 relative h-[380px] sm:h-[450px] w-full max-w-md mx-auto flex items-center justify-center">
            
            {/* Card 1: Common (Left Stack) */}
            <div className="absolute left-[5%] rotate-[-6deg] scale-90 opacity-60 z-10 transition-transform duration-500 hover:scale-95 hover:rotate-[-2deg] hover:opacity-80">
              <div className="w-[220px] aspect-[4/5] rounded-2xl bg-gradient-to-br from-slate-900 to-zinc-950 border border-slate-800 p-4 shadow-2xl relative overflow-hidden">
                <div className="h-full flex flex-col justify-between text-left font-mono">
                  <div className="flex justify-between items-center text-[8px] text-slate-500">
                    <span>AURA CARD</span>
                    <span className="px-1 py-0.2 rounded border border-slate-700 uppercase bg-black text-[7px]">Common</span>
                  </div>
                  <div className="my-2">
                    <span className="text-[10px] text-slate-500 block">@familiar_guy</span>
                    <span className="text-sm font-display font-bold text-slate-100 leading-tight">The Familiar Neighbor</span>
                  </div>
                  <div className="space-y-1.5 text-[8px]">
                    <div className="flex justify-between text-slate-400"><span>🍃 Calm Vibe</span><span>84</span></div>
                    <div className="h-1 bg-slate-850 rounded-full overflow-hidden"><div className="h-full w-[84%] bg-slate-500" /></div>
                    <div className="flex justify-between text-slate-400"><span>🤝 Community</span><span>72</span></div>
                    <div className="h-1 bg-slate-850 rounded-full overflow-hidden"><div className="h-full w-[72%] bg-slate-500" /></div>
                  </div>
                  <div className="text-[8px] text-slate-500 border-t border-slate-900 pt-1.5 mt-1 truncate">
                    "A warm, dependable neighbor..."
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Legendary (Center Stack) */}
            <div className="absolute scale-100 z-30 shadow-2xl shadow-amber-500/10 transition-transform duration-500 hover:scale-105">
              <div className="w-[240px] aspect-[4/5] rounded-2xl bg-gradient-to-br from-amber-950 via-slate-900 to-orange-950 border border-amber-500/40 p-5 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:12px_12px]" />
                <div className="h-full flex flex-col justify-between text-left relative z-10">
                  <div className="flex justify-between items-center text-[9px] font-mono">
                    <span className="text-slate-400">AURA CARD //</span>
                    <span className="px-1.5 py-0.2 rounded border border-amber-500/30 uppercase bg-black text-[7px] text-amber-400 font-bold">Legendary</span>
                  </div>
                  <div className="my-2">
                    <span className="text-[11px] text-slate-400 font-sans block">@heyitskuril</span>
                    <span className="text-base font-display font-bold bg-gradient-to-r from-slate-100 to-amber-200 bg-clip-text text-transparent leading-tight block">The Digital Alchemist</span>
                  </div>
                  <div className="space-y-2 text-[9px]">
                    <div className="flex justify-between text-slate-300"><span>🎨 Creative Soul</span><span>96</span></div>
                    <div className="h-1 bg-slate-950 rounded-full overflow-hidden border border-white/5"><div className="h-full w-[96%] bg-amber-400" /></div>
                    <div className="flex justify-between text-slate-300"><span>💡 Idea Machine</span><span>92</span></div>
                    <div className="h-1 bg-slate-950 rounded-full overflow-hidden border border-white/5"><div className="h-full w-[92%] bg-amber-400" /></div>
                  </div>
                  <div className="text-[8px] text-slate-400 border-t border-slate-900 pt-2 italic truncate">
                    "Turning simple text posts into gold-standard conversations."
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Epic (Right Stack) */}
            <div className="absolute right-[5%] rotate-[6deg] scale-90 opacity-60 z-20 transition-transform duration-500 hover:scale-95 hover:rotate-[2deg] hover:opacity-80">
              <div className="w-[220px] aspect-[4/5] rounded-2xl bg-gradient-to-br from-fuchsia-950 via-zinc-950 to-purple-950 border border-fuchsia-500/30 p-4 shadow-2xl relative overflow-hidden">
                <div className="h-full flex flex-col justify-between text-left font-mono">
                  <div className="flex justify-between items-center text-[8px] text-slate-400">
                    <span>AURA CARD</span>
                    <span className="px-1 py-0.2 rounded border border-fuchsia-500/30 uppercase bg-black text-[7px] text-fuchsia-400 font-bold">Epic</span>
                  </div>
                  <div className="my-2">
                    <span className="text-[10px] text-slate-500 block">@creative_mind</span>
                    <span className="text-sm font-display font-bold text-slate-100 leading-tight">The Chaos Conductor</span>
                  </div>
                  <div className="space-y-1.5 text-[8px]">
                    <div className="flex justify-between text-slate-400"><span>🌪️ Chaos Energy</span><span>88</span></div>
                    <div className="h-1 bg-slate-850 rounded-full overflow-hidden"><div className="h-full w-[88%] bg-fuchsia-400" /></div>
                    <div className="flex justify-between text-slate-400"><span>🎭 Humor Index</span><span>85</span></div>
                    <div className="h-1 bg-slate-850 rounded-full overflow-hidden"><div className="h-full w-[85%] bg-fuchsia-400" /></div>
                  </div>
                  <div className="text-[8px] text-slate-400 border-t border-slate-900 pt-1.5 mt-1 truncate">
                    "Orchestrating brilliant, hilarious internet moments."
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* How It Works Strip */}
        <section className="mb-24 md:mb-32">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl font-display font-bold text-slate-200">How Threads Aura Card works</h2>
            <p className="text-slate-400 text-sm mt-2">Zero integration, zero passwords, completely safe evaluation flow.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
            <div className="p-6 bg-slate-900/20 rounded-2xl border border-slate-850 relative">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center mx-auto mb-4 text-indigo-400 border border-slate-800">
                <span className="font-mono text-sm font-bold">01</span>
              </div>
              <h3 className="font-display font-semibold text-slate-200 text-base mb-1">Enter Username</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Provide your public username. No login or authorization required.</p>
            </div>

            <div className="p-6 bg-slate-900/20 rounded-2xl border border-slate-850 relative">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center mx-auto mb-4 text-purple-400 border border-slate-800">
                <span className="font-mono text-sm font-bold">02</span>
              </div>
              <h3 className="font-display font-semibold text-slate-200 text-base mb-1">AI Vibe Analysis</h3>
              <p className="text-xs text-slate-400 leading-relaxed">We evaluate public profile signals, posting frequency, and conversation types.</p>
            </div>

            <div className="p-6 bg-slate-900/20 rounded-2xl border border-slate-850 relative">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center mx-auto mb-4 text-emerald-400 border border-slate-800">
                <span className="font-mono text-sm font-bold">03</span>
              </div>
              <h3 className="font-display font-semibold text-slate-200 text-base mb-1">Get Your Artifact</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Download a gorgeous high-fidelity 1080×1350 portrait card to post back to Threads.</p>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="mb-24 md:mb-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="p-6 bg-slate-900/20 rounded-2xl border border-slate-850 space-y-3">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            <h4 className="font-display font-bold text-slate-200 text-base">AI-Powered Pattern</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Reads public signals with sophisticated, respectful pattern logic to formulate precise score metrics.</p>
          </div>

          <div className="p-6 bg-slate-900/20 rounded-2xl border border-slate-850 space-y-3">
            <Layers className="w-6 h-6 text-purple-400" />
            <h4 className="font-display font-bold text-slate-200 text-base">Collectible Rarity</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Each card has a calculated Rarity Tier (Common up to the ultra-elusive 0.1% Secret tier) with unique visual treatments.</p>
          </div>

          <div className="p-6 bg-slate-900/20 rounded-2xl border border-slate-850 space-y-3">
            <Share2 className="w-6 h-6 text-emerald-400" />
            <h4 className="font-display font-bold text-slate-200 text-base">Built to Post</h4>
            <p className="text-xs text-slate-400 leading-relaxed">One-click downloads a premium high-contrast card size that looks flawless when posted to Threads, IG, or X.</p>
          </div>

          <div className="p-6 bg-slate-900/20 rounded-2xl border border-slate-850 space-y-3">
            <Shield className="w-6 h-6 text-pink-400" />
            <h4 className="font-display font-bold text-slate-200 text-base">Safe and Lightweight</h4>
            <p className="text-xs text-slate-400 leading-relaxed">No tracking, cookies, ads, or authorization permissions. Only utilizes completely public profile indicators.</p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto mb-24 md:mb-32 text-left">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1 text-xs text-slate-500 font-mono mb-2 uppercase tracking-widest">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Common questions</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-200">Got questions? We got answers.</h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-slate-900/20 border border-slate-850 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-display font-medium text-slate-200 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="text-sm md:text-base">{faq.q}</span>
                  <span className={`text-slate-400 transition-transform duration-300 ${activeFaq === idx ? 'rotate-45' : ''}`}>
                    ＋
                  </span>
                </button>
                
                {activeFaq === idx && (
                  <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-slate-400 leading-relaxed border-t border-slate-850/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer (Minimalist Site-wide) */}
        <footer className="mt-16 md:mt-24 pt-8 border-t border-slate-900 text-center text-xs text-slate-600 font-sans space-y-3">
          <p className="flex items-center justify-center gap-1.5">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
            <span>by</span>
            <a 
              href="https://kuril.dev" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-semibold text-slate-400 hover:text-slate-200 transition-colors underline decoration-slate-700 underline-offset-2"
            >
              Kuril Dev
            </a>
          </p>
          <p className="max-w-md mx-auto leading-relaxed text-[11px] text-slate-600">
            A solo developer building fun, useful, and shareable internet experiences. 
            Follow along on Threads: <a href="https://threads.net/@heyitskuril" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-300 font-medium font-mono">@heyitskuril</a>
          </p>
        </footer>

      </div>
    </div>
  );
}
