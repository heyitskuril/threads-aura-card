/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';
import { Download, Share2, RotateCcw, Copy, Check, Heart, ExternalLink } from 'lucide-react';
import { AuraCardData } from '../types';
import { RARITY_REGISTRY } from '../data/catalog';

interface AuraCardViewProps {
  data: AuraCardData;
  onReset: () => void;
  onReRoll: () => void;
}

export default function AuraCardView({ data, onReset, onReRoll }: AuraCardViewProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const config = RARITY_REGISTRY[data.tier];

  // Trigger confetti for Rare and above
  useEffect(() => {
    if (config.confetti) {
      const duration = config.intensity === 'ultra' ? 3.5 * 1000 : 2 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 100 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: NodeJS.Timeout = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 40 * (timeLeft / duration);
        // colors matching the gradient families
        const colors = 
          config.tier === 'Legendary' ? ['#f59e0b', '#fb923c', '#ea580c', '#fef3c7'] :
          config.tier === 'Mythic' ? ['#ec4899', '#8b5cf6', '#3b82f6', '#f472b6'] :
          ['#6366f1', '#3b82f6', '#1d4ed8'];

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors,
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors,
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [data.tier, config.confetti, config.intensity]);

  // Handle Parallax Tilt on Desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    const rX = (mouseY / (height / 2)) * -6; // Capped at 6 degrees
    const rY = (mouseX / (width / 2)) * 6;
    setTilt({ x: rX, y: rY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Download high resolution PNG
  const handleDownload = async () => {
    if (!cardRef.current || downloading) return;
    setDownloading(true);

    try {
      // Ensure fonts are loaded and temporary settings are perfectly configured for layout export
      const card = cardRef.current;
      
      // We will export with scale 2 to guarantee a pristine, razor-sharp output
      const canvas = await html2canvas(card, {
        useCORS: true,
        allowTaint: true,
        scale: 2.5, // 2.5x resolution for beautiful screenshot sharing
        backgroundColor: '#0B0B0F', // Solid dark backdrop matching theme
        logging: false,
        onclone: (documentClone) => {
          // Remove any temporary interactive hover styles on clone
          const cloneCard = documentClone.getElementById('aura-card-main-body');
          if (cloneCard) {
            cloneCard.style.transform = 'none';
          }
        }
      });

      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `${data.username.replace('@', '')}_aura_card.png`;
      link.href = image;
      link.click();
    } catch (err) {
      console.error('Failed to export Aura Card', err);
    } finally {
      setDownloading(false);
    }
  };

  // Copy Result Link
  const handleCopyLink = () => {
    const shareText = `My Threads internet aura is: ${data.title.name} (${data.tier} Tier) ✨ Get yours at ${window.location.origin}!`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Share Intent to Threads
  const handleShareThreads = () => {
    const caption = `My internet aura is: ${data.title.name} (${data.tier} Tier) ✨ ${data.insight} Discover yours at Threads Aura Card!`;
    const url = `https://threads.net/intent/post?text=${encodeURIComponent(caption)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // User initials for stylized avatar
  const initials = data.username.replace('@', '').substring(0, 2).toUpperCase();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 md:py-16 text-slate-100 font-sans">
      
      {/* Background glow orb tied to card tier */}
      <div 
        className="fixed inset-0 pointer-events-none transition-all duration-1000 ease-out z-0 opacity-20 filter blur-[150px]"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${config.glowColor.replace('0.15', '0.6').replace('0.18', '0.6').replace('0.3', '0.6').replace('0.45', '0.6').replace('0.6', '0.8')}, transparent 60%)`
        }}
      />

      <div className="w-full max-w-md z-10 text-center mb-6">
        <h2 className="text-xl font-display font-medium text-slate-400 mb-1">Your Vibe has Crystalized</h2>
        <p className="text-sm text-slate-500">Press download to save or post directly to your Threads feed.</p>
      </div>

      {/* Main Aura Card Render Frame */}
      <div
        id="aura-card-capture"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-[420px] aspect-[4/5] rounded-3xl p-8 relative select-none cursor-pointer transition-transform duration-300 ease-out z-10 bg-[#050505] overflow-hidden"
        style={{
          transform: isHovered ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)` : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
          boxShadow: isHovered ? `0 0 80px -15px ${config.glowColor}, inset 0 0 0 1px rgba(255,255,255,0.08)` : `0 0 60px -20px rgba(168, 85, 247, 0.3), inset 0 0 0 1px rgba(255,255,255,0.05)`
        }}
      >
        {/* Rarity stripe at the very top of the card */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A855F7] to-[#EC4899]" style={{ background: `linear-gradient(90deg, ${config.textColor.includes('emerald') ? '#10b981, #34d399' : config.textColor.includes('blue') ? '#3b82f6, #60a5fa' : config.textColor.includes('fuchsia') ? '#d946ef, #e879f9' : config.textColor.includes('amber') ? '#f59e0b, #fbbf24' : config.textColor.includes('pink') ? '#ec4899, #f472b6' : '#a855f7, #ec4899'})` }} />

        {/* Underlay glow gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-20 z-0`} />
        
        {/* Noise overlay for premium holographic/grainy feeling */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40 z-0" />

        {/* Card Border glow */}
        <div className={`absolute inset-0 rounded-3xl border border-white/10 pointer-events-none z-10 transition-all duration-500`} />

        {/* Inner Card Content */}
        <div id="aura-card-main-body" className="h-full flex flex-col justify-between relative z-10">
          
          {/* Card Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-widest font-mono font-medium text-slate-400">AURA CARD //</span>
              <span className={`text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded uppercase border bg-black/50 ${config.borderColor} ${config.textColor}`}>
                {data.tier}
              </span>
            </div>
            <span className="text-xs font-mono text-slate-500">{data.generatedAt}</span>
          </div>

          {/* User Profile Info */}
          <div className="flex items-center gap-3 mt-4">
            {/* Custom stylized initials avatar */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-sm tracking-wider border relative overflow-hidden bg-gradient-to-br ${config.gradient} ${config.borderColor}`}>
              <div className="absolute inset-0 bg-black/40" />
              <span className={`relative z-10 ${config.textColor}`}>{initials}</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold font-sans text-slate-200">{data.username}</span>
              <span className="text-[11px] text-slate-500 font-mono uppercase tracking-wider">Public Profile Vibe</span>
            </div>
          </div>

          {/* Core Aura Title with premium Sophisticated Dark text color gradient */}
          <div className="my-4 text-left">
            <div className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight mb-2 uppercase leading-none bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
              {data.title.name}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">{data.title.description}</p>
          </div>

          {/* Middle: 5 Score Metrics with beautiful neon glow bars */}
          <div className="space-y-2.5 my-2 text-left">
            {data.metrics.map((metric) => (
              <div key={metric.id} className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-sans">
                  <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                    <span>{metric.emoji}</span>
                    <span className="uppercase tracking-wider font-mono text-[10px]">{metric.label}</span>
                  </div>
                  <span className={`font-mono text-xs font-bold ${config.textColor}`}>
                    {metric.score}
                  </span>
                </div>
                {/* Horizontal custom glow bar */}
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden relative">
                  <div 
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${metric.score}%`,
                      background: config.tier === 'Secret' ? '#ffffff' : `linear-gradient(90deg, #8b5cf6, ${config.textColor.includes('emerald') ? '#10b981' : config.textColor.includes('blue') ? '#3b82f6' : config.textColor.includes('fuchsia') ? '#d946ef' : config.textColor.includes('amber') ? '#f59e0b' : config.textColor.includes('pink') ? '#ec4899' : '#a855f7'})`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Lower-middle: Badges Pill Chips */}
          <div className="flex flex-wrap gap-1.5 my-3">
            {data.badges.map((badge) => (
              <div 
                key={badge.name}
                className="flex items-center gap-1 text-[10px] font-medium font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 transition-all hover:scale-105"
                title={badge.description}
              >
                <span>{badge.emoji}</span>
                <span>{badge.name}</span>
              </div>
            ))}
          </div>

          {/* Bottom: Insight and Branding Signature */}
          <div className="mt-2 pt-3 border-t border-white/5 text-left">
            <p className="text-xs italic text-slate-400 font-sans leading-relaxed">
              "{data.insight}"
            </p>
          </div>

          {/* Tasfeful Signature Growth Loop */}
          <div className="mt-4 flex items-center justify-between text-[9px] font-mono text-slate-500 uppercase tracking-wider">
            <span>Created with Threads Aura Card</span>
            <span className="opacity-80">by Kuril Dev</span>
          </div>

        </div>
      </div>

      {/* Sharing & Control Actions Layout */}
      <div className="w-full max-w-[390px] mt-6 space-y-3 z-10">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-white hover:to-white text-slate-950 font-sans font-semibold py-3 px-4 rounded-xl transition-all shadow-lg active:scale-[0.98] cursor-pointer disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {downloading ? 'Rendering Image...' : 'Download Threads Aura Card (PNG)'}
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleShareThreads}
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-850 text-slate-200 font-sans font-medium py-3 px-4 rounded-xl border border-slate-800 transition-all active:scale-[0.98] cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-slate-400" />
            Post to Threads
          </button>
          
          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-850 text-slate-200 font-sans font-medium py-3 px-4 rounded-xl border border-slate-800 transition-all active:scale-[0.98] cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
            {copied ? 'Copied Vibe!' : 'Copy Link'}
          </button>
        </div>

        {/* Action button layout: Re-roll and Reset */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-900 text-xs">
          <button
            onClick={onReRoll}
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors py-1 cursor-pointer"
            title="Keep the username, but shuffle the seed to try and roll a rarer tier!"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Re-roll Aura Tier
          </button>

          <button
            onClick={onReset}
            className="text-slate-500 hover:text-slate-300 transition-colors py-1 font-medium cursor-pointer"
          >
            Analyze another profile →
          </button>
        </div>
      </div>

      {/* Subtle Founder Signature Overlay */}
      <footer className="mt-12 text-center text-xs text-slate-600 font-sans space-y-1.5">
        <p className="flex items-center justify-center gap-1">
          <span>Built with</span>
          <Heart className="w-3 h-3 text-red-500 fill-red-500" />
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
        <p className="text-[11px] text-slate-600">
          Follow creator on Threads:{' '}
          <a 
            href="https://threads.net/@heyitskuril" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-500 hover:text-slate-300 font-medium inline-flex items-center gap-0.5"
          >
            @heyitskuril <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </p>
      </footer>

    </div>
  );
}
