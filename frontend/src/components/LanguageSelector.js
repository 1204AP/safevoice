//src\components\LanguageSelector.js
import React from 'react';

const languages = [
  { code: 'kn', label: 'ಕನ್ನಡ', sub: 'Kannada' },
  { code: 'en', label: 'English', sub: 'English' },
  { code: 'hi', label: 'हिन्दी', sub: 'Hindi' },
  { code: 'te', label: 'తెలుగు', sub: 'Telugu' },
];

function LanguageSelector({ onSelect }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '100vh', background: '#0f0f1a', padding: '20px'
    }}>
      <div style={{ fontSize: '48px', marginBottom: '12px' }}>🛡️</div>
      <h1 style={{ color: '#a78bfa', fontSize: '28px', marginBottom: '8px' }}>SafeVoice</h1>
      <p style={{ color: '#94a3b8', marginBottom: '40px', textAlign: 'center', fontSize: '14px' }}>
        Anonymous • Private • No login required
      </p>
      <p style={{ color: '#e2e8f0', marginBottom: '24px', fontSize: '16px' }}>
        Choose your language / ನಿಮ್ಮ ಭಾಷೆ ಆರಿಸಿ
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%', maxWidth: '320px' }}>
        {languages.map(lang => (
          <button key={lang.code} onClick={() => onSelect(lang.code)}
            style={{
              background: '#1e1b4b', border: '2px solid #4c1d95', borderRadius: '12px',
              padding: '20px', cursor: 'pointer', color: '#fff', fontSize: '20px',
              fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
              transition: 'all 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.borderColor = '#7c3aed'}
            onMouseOut={e => e.currentTarget.style.borderColor = '#4c1d95'}
          >
            {lang.label}
            <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'normal' }}>{lang.sub}</span>
          </button>
        ))}
      </div>
      <p style={{ color: '#475569', fontSize: '11px', marginTop: '40px', textAlign: 'center' }}>
        No data is stored. No account needed. You are safe here.
      </p>
    </div>
  );
}

export default LanguageSelector;