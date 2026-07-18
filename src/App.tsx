/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import LandingView from './components/LandingView';
import LoaderView from './components/LoaderView';
import AuraCardView from './components/AuraCardView';
import { generateAuraCard } from './data/catalog';
import { AuraCardData } from './types';

export default function App() {
  const [view, setView] = useState<'landing' | 'loading' | 'card'>('landing');
  const [username, setUsername] = useState('');
  const [subSeed, setSubSeed] = useState('primary_v1');
  const [cardData, setCardData] = useState<AuraCardData | null>(null);

  // Handles initial submission and loading trigger
  const handleStartAnalysis = (submittedUsername: string) => {
    setUsername(submittedUsername);
    setSubSeed('primary_v1'); // Reset to default seed for new users
    setView('loading');

    // Suspense theater duration: 4.5 seconds to build premium emotional anticipation
    setTimeout(() => {
      const data = generateAuraCard(submittedUsername, 'primary_v1');
      setCardData(data);
      setView('card');
    }, 4500);
  };

  // Resets state back to clean search landing page
  const handleReset = () => {
    setView('landing');
    setCardData(null);
    setUsername('');
    setSubSeed('primary_v1');
  };

  // Re-rolls the card with a fresh sub-seed (creating a fun loot-box mechanics feel)
  const handleReRoll = () => {
    setView('loading');
    const newSeed = Math.random().toString(36).substring(2, 9);
    setSubSeed(newSeed);

    setTimeout(() => {
      const data = generateAuraCard(username, newSeed);
      setCardData(data);
      setView('card');
    }, 4500);
  };

  return (
    <main 
      className="min-h-screen bg-[#050505] relative overflow-x-hidden"
      style={{
        background: 'radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 40%), #050505'
      }}
    >
      {view === 'landing' && <LandingView onSubmit={handleStartAnalysis} />}
      
      {view === 'loading' && <LoaderView />}
      
      {view === 'card' && cardData && (
        <AuraCardView
          data={cardData}
          onReset={handleReset}
          onReRoll={handleReRoll}
        />
      )}
    </main>
  );
}

