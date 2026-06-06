'use client'
import { useEffect, useState } from 'react'

export default function WhatsAppFloat() {
  const [showTop, setShowTop] = useState(false)

  const phone  = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890'
  const fbPage = process.env.NEXT_PUBLIC_MESSENGER_PAGE  || 'me'
  const waMsg  = encodeURIComponent("Hi! I'd like to know more about your GHL services.")
  const waHref = `https://wa.me/${phone}?text=${waMsg}`
  const msHref = `https://m.me/${fbPage}`

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{`
        @keyframes wa-pulse {
          0%   { box-shadow: 0 0 0 0   rgba(37,211,102,.75); }
          70%  { box-shadow: 0 0 0 18px rgba(37,211,102,0);  }
          100% { box-shadow: 0 0 0 0   rgba(37,211,102,0);   }
        }
        .fab-wa  { animation: wa-pulse 2s ease-out infinite; }
        .fab-wa:hover  { animation: none; box-shadow: 0 6px 24px rgba(37,211,102,.5); }
        .fab-btn { transition: transform .18s ease, box-shadow .18s ease; display:flex; align-items:center; justify-content:center; border:none; cursor:pointer; text-decoration:none; flex-shrink:0; }
        .fab-btn:hover { transform: scale(1.10); }
      `}</style>

      <div style={{
        position: 'fixed',
        bottom: '28px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
      }}>

        {/* 1 ── WhatsApp */}
        <a href={waHref} target="_blank" rel="noopener noreferrer"
           aria-label="Chat on WhatsApp"
           className="fab-btn fab-wa"
           onClick={e => { e.stopPropagation(); window.open(waHref, '_blank', 'noopener,noreferrer') }}
           style={circle('#25D366')}>
          <WaIcon size={24} />
        </a>

        {/* 2 ── Messenger */}
        <a href={msHref} target="_blank" rel="noopener noreferrer"
           aria-label="Message on Messenger"
           className="fab-btn"
           onClick={e => { e.stopPropagation(); window.open(msHref, '_blank', 'noopener,noreferrer') }}
           style={{ ...circle(''), background: 'linear-gradient(135deg,#0078FF 0%,#A033FF 100%)', boxShadow: '0 4px 16px rgba(0,0,0,.35)' }}>
          <MessengerIcon />
        </a>

        {/* 3 ── Scroll-to-top (visible after scrolling 300 px) */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fab-btn"
          style={{
            ...circle('#7C3AED'),
            opacity: showTop ? 1 : 0.35,
            boxShadow: '0 4px 16px rgba(0,0,0,.35)',
          }}>
          <ChevronUp />
        </button>

      </div>
    </>
  )
}

/* ── helpers ── */
function circle(bg: string): React.CSSProperties {
  return {
    width: '46px', height: '46px', borderRadius: '50%', background: bg,
    boxShadow: '0 4px 16px rgba(0,0,0,.35)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, cursor: 'pointer',
  }
}

function WaIcon({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ pointerEvents: 'none' }}>
      <path d="M16 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.34.622 4.54 1.71 6.44L2.667 29.333l7.124-1.685A13.27 13.27 0 0016 29.333c7.364 0 13.333-5.969 13.333-13.333S23.364 2.667 16 2.667z" fill="#fff"/>
      <path d="M21.84 18.72c-.293-.147-1.733-.855-2.002-.951-.27-.099-.466-.147-.662.147-.196.293-.758.951-.929 1.147-.17.196-.34.22-.633.073-.293-.147-1.239-.456-2.361-1.456-.873-.779-1.462-1.74-1.633-2.034-.17-.294-.018-.452.128-.598.131-.131.293-.342.44-.513.146-.17.195-.293.293-.488.098-.196.049-.367-.025-.513-.073-.147-.662-1.589-.905-2.175-.238-.573-.48-.494-.662-.504l-.564-.01c-.195 0-.513.073-.781.366-.268.294-1.025 1.002-1.025 2.443 0 1.44 1.05 2.833 1.196 3.029.147.195 2.065 3.152 5.004 4.42.7.3 1.245.48 1.671.615.702.223 1.341.192 1.846.116.563-.083 1.733-.71 1.977-1.393.244-.683.244-1.27.17-1.393-.073-.122-.268-.195-.562-.342z" fill="#25D366"/>
    </svg>
  )
}

function MessengerIcon() {
  return (
    <svg viewBox="0 0 36 36" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ pointerEvents: 'none' }}>
      <path d="M18 2C9.163 2 2 8.71 2 17c0 4.505 1.978 8.542 5.148 11.393V33l4.797-2.638C13.476 30.77 15.68 31 18 31c8.837 0 16-6.71 16-15S26.837 2 18 2z" fill="url(#ms-g)"/>
      <path d="M19.5 21.5l-4-4.25-7.5 4.25 8.5-9 4 4.25 7.5-4.25-8.5 9z" fill="#fff"/>
      <defs>
        <linearGradient id="ms-g" x1="2" y1="17.5" x2="34" y2="17.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0078FF"/><stop offset="1" stopColor="#A033FF"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

function ChevronUp() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ pointerEvents: 'none' }}>
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  )
}
