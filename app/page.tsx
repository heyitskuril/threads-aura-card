'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import LandingView from './components/LandingView';
import LoaderView from './components/LoaderView';
import AuraCardView from './components/AuraCardView';
import { generateAuraCard } from './data/catalog';
import { saveResult, getResult } from './data/storage';
import type { AuraCardData, ProfileData } from './types';

function PageContent() {
  const [view, setView] = useState<'landing' | 'loading' | 'card'>('landing');
  const [username, setUsername] = useState('');
  const [subSeed, setSubSeed] = useState('primary_v1');
  const [cardData, setCardData] = useState<AuraCardData | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const u = searchParams.get('u');
    if (u) {
      const cached = getResult(u);
      if (cached) {
        setUsername(u);
        setCardData(cached);
        setView('card');
      }
    }
  }, [searchParams]);

  const doGenerate = async (submittedUsername: string, seed: string) => {
    const data = generateAuraCard(submittedUsername, seed);
    data.profile = profileData || undefined;
    saveResult(submittedUsername, data);
    setCardData(data);
    setView('card');
  };

  const fetchProfile = async (submittedUsername: string): Promise<ProfileData | null> => {
    try {
      const res = await fetch(`/api/profile/${encodeURIComponent(submittedUsername)}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  };

  const handleStartAnalysis = async (submittedUsername: string) => {
    const cached = getResult(submittedUsername);
    if (cached) {
      setUsername(submittedUsername);
      setCardData(cached);
      setView('card');
      return;
    }

    setUsername(submittedUsername);
    setSubSeed('primary_v1');
    setView('loading');

    const profile = await fetchProfile(submittedUsername);
    setProfileData(profile);

    setTimeout(() => doGenerate(submittedUsername, 'primary_v1'), 4500);
  };

  const handleReset = () => {
    setView('landing');
    setCardData(null);
    setUsername('');
    setSubSeed('primary_v1');
    setProfileData(null);
  };

  const handleReRoll = async () => {
    setView('loading');
    const newSeed = Math.random().toString(36).substring(2, 9);
    setSubSeed(newSeed);

    const profile = await fetchProfile(username);
    setProfileData(profile);

    setTimeout(() => doGenerate(username, newSeed), 4500);
  };

  return (
    <main
      className="min-h-screen bg-[#050505] relative overflow-x-hidden"
      style={{
        background: 'radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 40%), #050505'
      }}
    >
      <div key={view} className="animate-view-fade-in">
        {view === 'landing' && <LandingView onSubmit={handleStartAnalysis} />}

        {view === 'loading' && <LoaderView />}

        {view === 'card' && cardData && (
          <AuraCardView
            data={cardData}
            onReset={handleReset}
            onReRoll={handleReRoll}
          />
        )}
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PageContent />
    </Suspense>
  );
}
