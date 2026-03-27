import React from 'react';
import { useNavigate } from 'react-router-dom';

const languages = [
  { code: 'en', label: 'English', sub: 'Continue in English' },
  { code: 'kn', label: 'ಕನ್ನಡ', sub: 'ಕನ್ನಡದಲ್ಲಿ ಮುಂದುವರಿಯಿರಿ' },
  { code: 'hi', label: 'हिन्दी', sub: 'हिंदी में जारी रखें' },
  { code: 'te', label: 'తెలుగు', sub: 'తెలుగులో కొనసాగించు' },
];

function LanguageSelect({ onSelect }) {
  const navigate = useNavigate();

  const handleSelect = (code) => {
    onSelect(code);
    navigate('/chat');
  };

  return (
    <div className="screen" style={{
      alignItems: 'center',
      justifyContent: 'center',
      gap: 32,
      padding: 24
    }}>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <h1 style={{
          fontSize: 32,
          fontWeight: 700,
          background: 'linear-gradient(135deg, #6c63ff, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          SafeVoice
        </h1>
        <p style={{ color: '#9ca3af', marginTop: 8, fontSize: 14 }}>
          You are safe here. Choose your language.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        width: '100%',
        maxWidth: 400
      }}>
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            style={{
              background: '#1a1a2e',
              border: '1px solid #3a3a5c',
              borderRadius: 16,
              padding: '24px 16px',
              cursor: 'pointer',
              color: 'white',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#6c63ff'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#3a3a5c'}
          >
            <span style={{ fontSize: 28, fontWeight: 700 }}>{lang.label}</span>
            <span style={{ fontSize: 11, color: '#9ca3af' }}>{lang.sub}</span>
          </button>
        ))}
      </div>

      <p style={{ color: '#4b5563', fontSize: 12, textAlign: 'center', maxWidth: 300 }}>
        No login required. Nothing is stored. You are anonymous.
      </p>
    </div>
  );
}

export default LanguageSelect;