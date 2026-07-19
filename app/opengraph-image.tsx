import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -150,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)',
          }}
        />

        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: '#f1f5f9',
            letterSpacing: '-0.02em',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          Threads Aura Card
        </div>

        <div
          style={{
            fontSize: 24,
            color: '#94a3b8',
            marginTop: 16,
            textAlign: 'center',
            maxWidth: 700,
          }}
        >
          What&apos;s your internet aura?
        </div>

        <div
          style={{
            marginTop: 40,
            display: 'flex',
            gap: 16,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              padding: '8px 20px',
              borderRadius: 999,
              background: 'rgba(168,85,247,0.2)',
              border: '1px solid rgba(168,85,247,0.3)',
              fontSize: 18,
              color: '#c084fc',
            }}
          >
            AI-Powered
          </div>
          <div
            style={{
              padding: '8px 20px',
              borderRadius: 999,
              background: 'rgba(16,185,129,0.2)',
              border: '1px solid rgba(16,185,129,0.3)',
              fontSize: 18,
              color: '#34d399',
            }}
          >
            Free
          </div>
          <div
            style={{
              padding: '8px 20px',
              borderRadius: 999,
              background: 'rgba(59,130,246,0.2)',
              border: '1px solid rgba(59,130,246,0.3)',
              fontSize: 18,
              color: '#60a5fa',
            }}
          >
            No Login
          </div>
        </div>

        <div
          style={{
            fontSize: 16,
            color: '#64748b',
            marginTop: 48,
          }}
        >
          threads-aura-card.vercel.app
        </div>

        <div
          style={{
            fontSize: 14,
            color: '#475569',
            marginTop: 8,
          }}
        >
          by Kuril Dev
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
