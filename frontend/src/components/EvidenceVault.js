//src\components\EvidenceVault.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EvidenceVault({ language }) {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState('');
  const [complaint, setComplaint] = useState('');
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('log');

  useEffect(() => {
    const saved = localStorage.getItem('sv_vault');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  const save = (updated) => {
    setEntries(updated);
    localStorage.setItem('sv_vault', JSON.stringify(updated));
  };

  const addEntry = () => {
    if (!text.trim()) return;
    const entry = { id: Date.now(), date: new Date().toLocaleString(), text };
    save([entry, ...entries]);
    setText('');
  };

  const deleteEntry = (id) => save(entries.filter(e => e.id !== id));

  const formatComplaint = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/format-complaint', { entries, language });
      setComplaint(res.data.complaint);
      setView('complaint');
    } catch { setComplaint('Could not format. Please try again.'); }
    setLoading(false);
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '20px', background: '#0f0f1a' }}>
      <h2 style={{ color: '#a78bfa', marginBottom: '6px' }}>🔒 Evidence Vault</h2>
      <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '16px' }}>
        Stored only on this device. Never uploaded. Never shared.
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {['log', 'complaint'].map(v => (
          <button key={v} onClick={() => setView(v)}
            style={{ flex: 1, padding: '10px', background: view === v ? '#7c3aed' : '#1e1b4b', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer', fontSize: '13px' }}>
            {v === 'log' ? '📝 My Log' : '📄 FIR Draft'}
          </button>
        ))}
      </div>

      {view === 'log' && (
        <>
          <textarea value={text} onChange={e => setText(e.target.value)}
            placeholder="Describe what happened, with as much detail as you remember..."
            rows={4}
            style={{ width: '100%', background: '#1e1b4b', border: '1px solid #4c1d95', borderRadius: '10px', padding: '14px', color: '#fff', fontSize: '14px', resize: 'none', outline: 'none', marginBottom: '10px' }} />
          <button onClick={addEntry}
            style={{ width: '100%', padding: '12px', background: '#7c3aed', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '15px', cursor: 'pointer', marginBottom: '20px' }}>
            + Add Entry
          </button>

          {entries.length > 0 && (
            <>
              <button onClick={formatComplaint} disabled={loading}
                style={{ width: '100%', padding: '12px', background: '#1e3a5f', border: '1px solid #1d4ed8', borderRadius: '10px', color: '#93c5fd', fontSize: '14px', cursor: 'pointer', marginBottom: '16px' }}>
                {loading ? 'Formatting...' : '📄 Format as FIR Complaint'}
              </button>
              {entries.map(entry => (
                <div key={entry.id} style={{ background: '#1e1b4b', borderRadius: '10px', padding: '14px', marginBottom: '10px' }}>
                  <div style={{ color: '#7c3aed', fontSize: '11px', marginBottom: '6px' }}>🕐 {entry.date}</div>
                  <p style={{ color: '#e2e8f0', fontSize: '13px', lineHeight: '1.5' }}>{entry.text}</p>
                  <button onClick={() => deleteEntry(entry.id)}
                    style={{ marginTop: '8px', background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '11px' }}>
                    🗑 Delete
                  </button>
                </div>
              ))}
            </>
          )}
          {entries.length === 0 && (
            <p style={{ color: '#475569', textAlign: 'center', fontSize: '13px', marginTop: '40px' }}>No entries yet. Your log is empty and private.</p>
          )}
        </>
      )}

      {view === 'complaint' && (
        <div style={{ background: '#1e1b4b', borderRadius: '12px', padding: '16px' }}>
          <p style={{ color: '#e2e8f0', fontSize: '13px', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
            {complaint || 'Go to My Log and click "Format as FIR Complaint" first.'}
          </p>
        </div>
      )}
    </div>
  );
}

export default EvidenceVault;