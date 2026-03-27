//AllyMode.js
import React, { useState } from 'react';
import axios from 'axios';

function AllyMode({ language }) {
  const [observation, setObservation] = useState('');
  const [guidance, setGuidance] = useState('');
  const [loading, setLoading] = useState(false);

  const getGuidance = async () => {
    if (!observation.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/ally', { observation, language });
      setGuidance(res.data.guidance);
    } catch { setGuidance('Could not load guidance. Call 1091 for help.'); }
    setLoading(false);
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '20px', background: '#0f0f1a' }}>
      <h2 style={{ color: '#a78bfa', marginBottom: '6px' }}>🤝 Ally Mode</h2>
      <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '24px' }}>
        Do you suspect someone you know is being abused? Describe what you've noticed and I'll tell you exactly what to do.
      </p>

      <textarea value={observation} onChange={e => setObservation(e.target.value)}
        placeholder="Example: My neighbour has bruises often and her husband shouts at her. She seems scared..."
        rows={5}
        style={{
          width: '100%', background: '#1e1b4b', border: '1px solid #4c1d95', borderRadius: '10px',
          padding: '14px', color: '#fff', fontSize: '14px', resize: 'none', outline: 'none'
        }} />

      <button onClick={getGuidance} disabled={loading}
        style={{ width: '100%', padding: '14px', background: '#7c3aed', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '16px', cursor: 'pointer', marginTop: '12px' }}>
        {loading ? 'Getting guidance...' : 'How Can I Help?'}
      </button>

      {guidance && (
        <div style={{ marginTop: '24px', background: '#1e1b4b', borderRadius: '12px', padding: '16px' }}>
          <h3 style={{ color: '#a78bfa', marginBottom: '12px' }}>What You Can Do</h3>
          <p style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{guidance}</p>
        </div>
      )}
    </div>
  );
}

export default AllyMode;