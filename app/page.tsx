'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import LandingView from './components/LandingView';
import LoaderView from './components/LoaderView';
import AuraCardView from './components/AuraCardView';
import { saveResult, getResult } from './data/storage';
import type { AuraCardData } from './types';

function PageContent() {
  const [view, setView] = useState<'landing' | 'loading' | 'card'>('landing');
  const [username, setUsername] = useState('');
  const [cardData, setCardData] = useState<AuraCardData | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const fetchCard = async (
    submittedUsername: string,
    isReroll: boolean,
  ): Promise<AuraCardData | null> => {
    try {
      const url = isReroll
        ? `/api/profile/${encodeURIComponent(submittedUsername)}?reroll=1`
        : `/api/profile/${encodeURIComponent(submittedUsername)}`;
      const res = await fetch(url);
      if (res.status === 404) {
        const body = await res.json();
        setError(body.error || `We couldn't find a Threads profile for "@${submittedUsername}".`);
        setView('landing');
        return null;
      }
      if (res.status === 503) {
        setError('AI analysis unavailable: Gemini API key not configured by the developer.');
        setView('landing');
        return null;
      }
      if (res.status === 502) {
        const body = await res.json().catch(() => ({}));
        setError(`AI analysis failed: ${body.debug || 'Gemini API error. Please try again.'}`);
        setView('landing');
        return null;
      }
      if (!res.ok) {
        setError('Something went wrong. Please try again.');
        setView('landing');
        return null;
      }
      return await res.json();
    } catch {
      setError('Network error. Check your connection and try again.');
      setView('landing');
      return null;
    }
  };

  const handleStartAnalysis = async (submittedUsername: string) => {
    setError(null);

    const cached = getResult(submittedUsername);
    if (cached) {
      setUsername(submittedUsername);
      setCardData(cached);
      setView('card');
      return;
    }

    setUsername(submittedUsername);
    setView('loading');

    const data = await fetchCard(submittedUsername, false);
    if (!data) return;

    saveResult(submittedUsername, data);
    setCardData(data);
    setView('card');
  };

  const handleReset = () => {
    setView('landing');
    setCardData(null);
    setUsername('');
    setError(null);
  };

  const handleReRoll = async () => {
    setError(null);
    setView('loading');

    const data = await fetchCard(username, true);
    if (!data) return;

    saveResult(username, data);
    setCardData(data);
    setView('card');
  };

  return (
    <main
      className="min-h-screen bg-[#050505] relative overflow-x-hidden"
      style={{
        background: 'radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 40%), #050505'
      }}
    >
      <div key={view} className="animate-view-fade-in">
        {view === 'landing' && (
          <LandingView onSubmit={handleStartAnalysis} externalError={error} />
        )}

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
