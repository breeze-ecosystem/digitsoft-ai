/**
 * DigitSoft AI Landing Page
 * Home Page
 * Placeholder - Full landing page will be implemented later
 */

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '2rem',
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        DigitSoft AI
      </h1>
      <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
        Alternative africaine auto-hébergée à Claude/ChatGPT
      </p>
      <p style={{ marginTop: '2rem', opacity: 0.7 }}>
        Coming Soon 🚀
      </p>
    </main>
  );
}
