export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--clr-bg)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '3px solid var(--clr-border)',
          borderTopColor: 'var(--clr-primary)',
          animation: 'spin 0.7s linear infinite',
        }}/>
        <span style={{ fontSize: '0.875rem', color: 'var(--clr-text-3)', fontWeight: 500 }}>Loading…</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  )
}
