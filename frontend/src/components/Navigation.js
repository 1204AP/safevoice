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

function Navigation({ onDisguise }) {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: '/', icon: '🏠', label: 'Home' },
    { path: '/chat', icon: '💬', label: 'Legal Chat' },
    { path: '/vault', icon: '🔒', label: 'Vault' },
    { path: '/exit', icon: '⚡', label: 'Safe Exit' },
    { path: '/settings', icon: '⚙️', label: 'Settings' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/chat') return location.pathname === '/' || location.pathname === '/chat';
    return location.pathname === path;
  };

  return (
    <div style={{
      width: '180px',
      minWidth: '180px',
      background: '#fff',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', background: '#0ea5e9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
            🛡️
          </div>
          <span style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>SafeVoice</span>
        </div>
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, padding: '12px 8px' }}>
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              padding: '10px 12px',
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
          </button>
        ))}
      </div>

      {/* Bottom: Ally Mode + Disguise */}
      <div style={{ padding: '8px', borderTop: '1px solid #f1f5f9' }}>
        <button
          onClick={() => navigate('/ally')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            padding: '10px 12px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            background: location.pathname === '/ally' ? '#eff6ff' : 'transparent',
            color: location.pathname === '/ally' ? '#0ea5e9' : '#64748b',
            fontSize: '13px',
            fontWeight: location.pathname === '/ally' ? '600' : '400',
            marginBottom: '6px',
            textAlign: 'left',
          }}
        >
          <span style={{ fontSize: '16px' }}>🤝</span>
          Ally Mode
        </button>

        <button
          onClick={onDisguise}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1px solid #fca5a5',
            cursor: 'pointer',
            background: '#fef2f2',
            color: '#dc2626',
            fontSize: '12px',
            fontWeight: '600',
            textAlign: 'left',
          }}
        >
          <span style={{ fontSize: '16px' }}>🧮</span>
          Disguise Mode
        </button>
      </div>
    </div>
  );
}

export default Navigation;