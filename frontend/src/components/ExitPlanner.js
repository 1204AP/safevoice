//src\components\ExitPlanner.js
import React, { useState } from 'react';
import axios from 'axios';

function ExitPlanner({ language }) {
  const [form, setForm] = useState({ has_children: false, has_income: false, has_trusted_person: false });
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/exit-plan', { ...form, language });
      setPlan(res.data.plan);
    } catch { setPlan('Could not generate plan. Call 181 for immediate help.'); }
    setLoading(false);
  };

  const Toggle = ({ field, label }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: '#1e1b4b', borderRadius: '10px', marginBottom: '10px' }}>
      <span style={{ color: '#e2e8f0', fontSize: '14px' }}>{label}</span>
      <button onClick={() => setForm(f => ({ ...f, [field]: !f[field] }))}
        style={{ background: form[field] ? '#7c3aed' : '#374151', border: 'none', borderRadius: '20px', width: '48px', height: '26px', cursor: 'pointer', transition: 'background 0.2s' }} />
    </div>
  );

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '20px', background: '#0f0f1a' }}>
      <h2 style={{ color: '#a78bfa', marginBottom: '6px' }}>🚪 Safe Exit Planner</h2>
      <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '24px' }}>Tell me about your situation and I'll create a personalised plan.</p>

      <Toggle field="has_children" label="I have children" />
      <Toggle field="has_income" label="I have independent income" />
      <Toggle field="has_trusted_person" label="I have a trusted friend or family member" />

      <button onClick={generate} disabled={loading}
        style={{ width: '100%', padding: '14px', background: '#7c3aed', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '16px', cursor: 'pointer', marginTop: '8px' }}>
        {loading ? 'Creating your plan...' : 'Generate My Exit Plan'}
      </button>

      {plan && (
        <div style={{ marginTop: '24px', background: '#1e1b4b', borderRadius: '12px', padding: '16px' }}>
          <h3 style={{ color: '#a78bfa', marginBottom: '12px' }}>Your Plan</h3>
          <p style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{plan}</p>
        </div>
      )}
    </div>
  );
}

export default ExitPlanner;