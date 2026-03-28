// // src/components/Navigation.js
// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// function Navigation({ onDisguise }) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const tabs = [
//     { path: '/', icon: '🏠', label: 'Home' },
//     { path: '/chat', icon: '💬', label: 'Legal Chat' },
//     { path: '/vault', icon: '🔒', label: 'Vault' },
//     { path: '/exit', icon: '⚡', label: 'Safe Exit' },
//     { path: '/settings', icon: '⚙️', label: 'Settings' },
//   ];

//   const isActive = (path) => {
//     if (path === '/') return location.pathname === '/';
//     if (path === '/chat') return location.pathname === '/' || location.pathname === '/chat';
//     return location.pathname === path;
//   };

//   return (
//     <div style={{
//       width: '180px',
//       minWidth: '180px',
//       background: '#fff',
//       borderRight: '1px solid #e2e8f0',
//       display: 'flex',
//       flexDirection: 'column',
//       height: '100%',
//       fontFamily: "'Segoe UI', sans-serif",
//     }}>
//       {/* Logo */}
//       <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid #f1f5f9' }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//           <div style={{ width: '28px', height: '28px', background: '#0ea5e9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
//             🛡️
//           </div>
//           <span style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>SafeVoice</span>
//         </div>
//       </div>

//       {/* Nav items */}
//       <div style={{ flex: 1, padding: '12px 8px' }}>
//         {tabs.map((tab) => (
//           <button
//             key={tab.path}
//             onClick={() => navigate(tab.path)}
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '10px',
//               width: '100%',
//               padding: '10px 12px',
//               borderRadius: '8px',
//               border: 'none',
//               cursor: 'pointer',
//               background: isActive(tab.path) ? '#eff6ff' : 'transparent',
//               color: isActive(tab.path) ? '#0ea5e9' : '#64748b',
//               fontSize: '13px',
//               fontWeight: isActive(tab.path) ? '600' : '400',
//               marginBottom: '2px',
//               textAlign: 'left',
//               transition: 'all 0.15s',
//             }}
//             onMouseOver={(e) => { if (!isActive(tab.path)) e.currentTarget.style.background = '#f8fafc'; }}
//             onMouseOut={(e) => { if (!isActive(tab.path)) e.currentTarget.style.background = 'transparent'; }}
//           >
//             <span style={{ fontSize: '16px' }}>{tab.icon}</span>
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Bottom: Ally Mode + Disguise */}
//       <div style={{ padding: '8px', borderTop: '1px solid #f1f5f9' }}>
//         <button
//           onClick={() => navigate('/ally')}
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '10px',
//             width: '100%',
//             padding: '10px 12px',
//             borderRadius: '8px',
//             border: 'none',
//             cursor: 'pointer',
//             background: location.pathname === '/ally' ? '#eff6ff' : 'transparent',
//             color: location.pathname === '/ally' ? '#0ea5e9' : '#64748b',
//             fontSize: '13px',
//             fontWeight: location.pathname === '/ally' ? '600' : '400',
//             marginBottom: '6px',
//             textAlign: 'left',
//           }}
//         >
//           <span style={{ fontSize: '16px' }}>🤝</span>
//           Ally Mode
//         </button>

//         <button
//           onClick={onDisguise}
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '10px',
//             width: '100%',
//             padding: '10px 12px',
//             borderRadius: '8px',
//             border: '1px solid #fca5a5',
//             cursor: 'pointer',
//             background: '#fef2f2',
//             color: '#dc2626',
//             fontSize: '12px',
//             fontWeight: '600',
//             textAlign: 'left',
//           }}
//         >
//           <span style={{ fontSize: '16px' }}>🧮</span>
//           Disguise Mode
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Navigation;







// src/components/Navigation.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navigation({ onDisguise, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: '/', icon: '🏠', label: 'Home' },
    { path: '/chat', icon: '💬', label: 'Legal Chat' },
    { path: '/vault', icon: '🔒', label: 'Vault' },
    { path: '/exit', icon: '⚡', label: 'Safe Exit' },
    { path: '/ally', icon: '🤝', label: 'Ally Mode' },
    { path: '/settings', icon: '⚙️', label: 'Settings' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path;
  };

  const go = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <div style={{
      width: '200px',
      background: '#fff',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      fontFamily: "'Segoe UI', sans-serif",
      boxShadow: '4px 0 16px rgba(0,0,0,0.1)',
    }}>
      {/* Logo + close */}
      <div style={{ padding: '16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', background: '#0ea5e9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
            🛡️
          </div>
          <span style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>SafeVoice</span>
        </div>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '18px', padding: '2px', lineHeight: 1 }}
          title="Close menu"
        >
          ✕
        </button>
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => go(tab.path)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              padding: '11px 12px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              background: isActive(tab.path) ? '#eff6ff' : 'transparent',
              color: isActive(tab.path) ? '#0ea5e9' : '#64748b',
              fontSize: '13px',
              fontWeight: isActive(tab.path) ? '600' : '400',
              marginBottom: '2px',
              textAlign: 'left',
              transition: 'all 0.15s',
            }}
            onMouseOver={(e) => { if (!isActive(tab.path)) e.currentTarget.style.background = '#f8fafc'; }}
            onMouseOut={(e) => { if (!isActive(tab.path)) e.currentTarget.style.background = 'transparent'; }}
          >
            <span style={{ fontSize: '16px' }}>{tab.icon}</span>
            {tab.label}
            {isActive(tab.path) && (
              <span style={{ marginLeft: 'auto', width: '5px', height: '5px', background: '#0ea5e9', borderRadius: '50%' }} />
            )}
          </button>
        ))}
      </div>

      {/* Bottom info */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center', lineHeight: '1.6' }}>
          🔒 Private · No data collected<br />
          Use EXIT NOW to leave instantly
        </div>
      </div>
    </div>
  );
}

export default Navigation;