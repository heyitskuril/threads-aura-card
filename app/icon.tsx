import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f172a',
          borderRadius: 8,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#a855f7" opacity="0.3" />
          <circle cx="12" cy="12" r="6" fill="#a855f7" opacity="0.6" />
          <circle cx="12" cy="12" r="3" fill="#c084fc" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
