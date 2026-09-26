import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <>
        <div
          style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            width: 1200,
            height: 630,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
          }}
        >
          <h1
            style={{
              fontSize: '96px',
              fontWeight: '800',
              color: 'white',
              margin: '0 0 40px 0',
              textAlign: 'center',
            }}
          >
            Journly
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: 'white',
              textAlign: 'center',
              maxWidth: '800px',
              lineHeight: '1.4',
            }}
          >
            Pick a destination and a budget. Get a full trip plan.
          </p>
        </div>
      </>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}