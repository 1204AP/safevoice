//src\components\Navigation.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navigation({ onDisguise }) {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: '/', icon: '💬', label: 'Chat' },
    { path: '/exit', icon: '🚪', label: 'Exit Plan' },
    { path: '/ally', icon: '🤝', label: 'Ally' },
    { path: '/vault', icon: '🔒', label: 'Vault' },
  ];

  return (
    <div style={{
      display: 'flex', background: '#0d0d1f', borderTop: '1px solid #1e1b4b',
      padding: '8px 0 12px'
    }}>
      {tabs.map(tab => (
        <button key={tab.path} onClick={() => navigate(tab.path)}
          style={{
            flex: 1, background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
            color: location.pathname === tab.path ? '#a78bfa' : '#475569',
            fontSize: '11px', padding: '4px'
          }}>
          <span style={{ fontSize: '20px' }}>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
      <button onClick={onDisguise}
        style={{
          flex: 1, background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
          color: '#475569', fontSize: '11px', padding: '4px'
        }}>
        <span style={{ fontSize: '20px' }}>🧮</span>
        Hide
      </button>
    </div>
  );
}

export default Navigation;