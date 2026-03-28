
// // src/App.js
// import React, { useState } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import LanguageSelector from './components/LanguageSelector';
// import ChatScreen from './components/ChatScreen';
// import ExitPlanner from './components/ExitPlanner';
// import AllyMode from './components/AllyMode';
// import EvidenceVault from './components/EvidenceVault';
// import Navigation from './components/Navigation';
// import DisguiseMode from './components/DisguiseMode';
// import Dashboard from './components/Dashboard';

// const LANG_LABELS = { en: 'EN', kn: 'ಕನ್ನಡ', hi: 'हिन्दी', te: 'తెలుగు' };

// function App() {
//   const [language, setLanguage] = useState(null);
//   const [disguised, setDisguised] = useState(false);

//   if (disguised) {
//     return <DisguiseMode onReturn={() => setDisguised(false)} />;
//   }

//   if (!language) {
//     return <LanguageSelector onSelect={setLanguage} />;
//   }

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: "'Segoe UI', sans-serif" }}>
//       {/* Top bar */}
//       <div style={{
//         background: '#fff',
//         borderBottom: '1px solid #e2e8f0',
//         padding: '0 24px',
//         height: '52px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         zIndex: 100,
//         flexShrink: 0,
//       }}>
//         {/* Center title (changes per route) */}
//         <div style={{ flex: 1, textAlign: 'center' }}>
//           <TopBarTitle />
//         </div>

//         {/* Right: Language + EXIT NOW */}
//         <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//           <button
//             onClick={() => setLanguage(null)}
//             style={{
//               background: '#f8fafc',
//               border: '1px solid #e2e8f0',
//               borderRadius: '8px',
//               padding: '5px 10px',
//               fontSize: '12px',
//               color: '#475569',
//               cursor: 'pointer',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '4px',
//             }}
//           >
//             🌐 {LANG_LABELS[language] || 'EN'}
//           </button>
//           <button
//             onClick={() => {
//               // Clear history and go to a neutral page
//               window.history.replaceState(null, '', window.location.pathname);
//               window.location.href = 'https://www.google.com';
//             }}
//             style={{
//               background: '#ef4444',
//               border: 'none',
//               borderRadius: '8px',
//               padding: '7px 14px',
//               fontSize: '13px',
//               fontWeight: '700',
//               color: '#fff',
//               cursor: 'pointer',
//               letterSpacing: '0.3px',
//             }}
//           >
//             ✕ EXIT NOW
//           </button>
//         </div>
//       </div>

//       {/* Body: sidebar + content */}
//       <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
//         <Navigation onDisguise={() => setDisguised(true)} />

//         <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
//           <Routes>
//             <Route path="/" element={<Dashboard language={language} />} />
//             <Route path="/chat" element={<ChatScreen language={language} />} />
//             <Route path="/vault" element={<EvidenceVault language={language} />} />
//             <Route path="/exit" element={<ExitPlanner language={language} />} />
//             <Route path="/ally" element={<AllyMode language={language} />} />
//             <Route path="/settings" element={<SettingsPage language={language} setLanguage={setLanguage} />} />
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Minimal top bar title (reads from location)
// function TopBarTitle() {
//   const path = window.location.pathname;
//   const titles = {
//     '/': 'SAFETY DASHBOARD',
//     '/chat': 'PRIVATE LEGAL HELP',
//     '/vault': 'EVIDENCE VAULT',
//     '/exit': 'SAFE EXIT PLANNER',
//     '/ally': 'ALLY MODE',
//     '/settings': 'SETTINGS',
//   };
//   return (
//     <span style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>
//       {titles[path] || 'SAFEVOICE'}
//     </span>
//   );
// }

// function SettingsPage({ language, setLanguage }) {
//   return (
//     <div style={{ padding: '32px', background: '#f8fafc', height: '100%', overflowY: 'auto' }}>
//       <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', marginBottom: '24px' }}>Settings</h2>
//       <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', marginBottom: '16px' }}>
//         <div style={{ fontWeight: '600', color: '#0f172a', marginBottom: '8px' }}>Language</div>
//         <div style={{ display: 'flex', gap: '8px' }}>
//           {[{ code: 'en', label: 'English' }, { code: 'kn', label: 'ಕನ್ನಡ' }, { code: 'hi', label: 'हिन्दी' }, { code: 'te', label: 'తెలుగు' }].map(l => (
//             <button
//               key={l.code}
//               onClick={() => setLanguage(l.code)}
//               style={{
//                 padding: '8px 16px',
//                 borderRadius: '8px',
//                 border: language === l.code ? '2px solid #0ea5e9' : '1px solid #e2e8f0',
//                 background: language === l.code ? '#eff6ff' : '#fff',
//                 color: language === l.code ? '#0ea5e9' : '#475569',
//                 fontWeight: language === l.code ? '600' : '400',
//                 cursor: 'pointer',
//                 fontSize: '13px',
//               }}
//             >
//               {l.label}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
//         <div style={{ fontWeight: '600', color: '#0f172a', marginBottom: '8px' }}>Privacy</div>
//         <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>
//           SafeVoice does not collect personal data. Everything is encrypted locally on your device. No account is required.
//         </p>
//         <button
//           onClick={() => { localStorage.clear(); window.location.reload(); }}
//           style={{ marginTop: '12px', padding: '9px 16px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', color: '#dc2626', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
//         >
//           🗑 Clear All Local Data
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;




// src/App.js
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LanguageSelector from './components/LanguageSelector';
import ChatScreen from './components/ChatScreen';
import ExitPlanner from './components/ExitPlanner';
import AllyMode from './components/AllyMode';
import EvidenceVault from './components/EvidenceVault';
import Navigation from './components/Navigation';
import DisguiseMode from './components/DisguiseMode';
import Dashboard from './components/Dashboard';

const LANG_LABELS = { en: 'EN', kn: 'ಕನ್ನಡ', hi: 'हिन्दी', te: 'తెలుగు' };

function App() {
  const [language, setLanguage] = useState(null);
  const [disguised, setDisguised] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (disguised) {
    return <DisguiseMode onReturn={() => setDisguised(false)} />;
  }

  if (!language) {
    return <LanguageSelector onSelect={setLanguage} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Top bar */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid #e2e8f0',
        padding: '0 16px',
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 200,
        flexShrink: 0,
        gap: '10px',
      }}>
        {/* Left: hamburger + logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setSidebarOpen(v => !v)}
            style={{
              background: sidebarOpen ? '#eff6ff' : 'none',
              border: sidebarOpen ? '1px solid #bfdbfe' : '1px solid transparent',
              borderRadius: '8px',
              width: '36px', height: '36px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px',
              cursor: 'pointer', padding: '6px', transition: 'all 0.2s',
            }}
            title="Toggle menu"
          >
            <span style={{ display: 'block', width: '18px', height: '2px', background: sidebarOpen ? '#0ea5e9' : '#475569', borderRadius: '2px', transition: 'all 0.2s', transform: sidebarOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
            <span style={{ display: 'block', width: '18px', height: '2px', background: sidebarOpen ? '#0ea5e9' : '#475569', borderRadius: '2px', opacity: sidebarOpen ? 0 : 1, transition: 'all 0.2s' }} />
            <span style={{ display: 'block', width: '18px', height: '2px', background: sidebarOpen ? '#0ea5e9' : '#475569', borderRadius: '2px', transition: 'all 0.2s', transform: sidebarOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '24px', height: '24px', background: '#0ea5e9', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
              🛡️
            </div>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>SafeVoice</span>
          </div>
        </div>

        {/* Center title */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <TopBarTitle />
        </div>

        {/* Right: Language + Disguise + EXIT NOW */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setLanguage(null)}
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '5px 10px',
              fontSize: '12px',
              color: '#475569',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            🌐 {LANG_LABELS[language] || 'EN'}
          </button>

          {/* Disguise mode — always in top bar, never hidden */}
          <button
            onClick={() => setDisguised(true)}
            style={{
              background: '#fef2f2',
              border: '1px solid #fca5a5',
              borderRadius: '8px',
              padding: '5px 10px',
              fontSize: '12px',
              color: '#dc2626',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
            title="Hide app"
          >
            🧮 Hide
          </button>

          <button
            onClick={() => {
              window.history.replaceState(null, '', window.location.pathname);
              window.location.href = 'https://www.google.com';
            }}
            style={{
              background: '#ef4444',
              border: 'none',
              borderRadius: '8px',
              padding: '7px 14px',
              fontSize: '13px',
              fontWeight: '700',
              color: '#fff',
              cursor: 'pointer',
              letterSpacing: '0.3px',
            }}
          >
            ✕ EXIT NOW
          </button>
        </div>
      </div>

      {/* Body: overlay sidebar + content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
        {/* Sidebar overlay backdrop */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'absolute', inset: 0, zIndex: 150,
              background: 'rgba(0,0,0,0.25)',
            }}
          />
        )}

        {/* Sidebar — slides in */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0,
          width: '200px', zIndex: 160,
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: sidebarOpen ? 'auto' : 'none',
        }}>
          <Navigation
            onDisguise={() => { setDisguised(true); setSidebarOpen(false); }}
            onClose={() => setSidebarOpen(false)}
          />
        </div>

        {/* Main content — always full width */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<Dashboard language={language} />} />
            <Route path="/chat" element={<ChatScreen language={language} />} />
            <Route path="/vault" element={<EvidenceVault language={language} />} />
            <Route path="/exit" element={<ExitPlanner language={language} />} />
            <Route path="/ally" element={<AllyMode language={language} />} />
            <Route path="/settings" element={<SettingsPage language={language} setLanguage={setLanguage} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function TopBarTitle() {
  const path = window.location.pathname;
  const titles = {
    '/': 'SAFETY DASHBOARD',
    '/chat': 'PRIVATE LEGAL HELP',
    '/vault': 'EVIDENCE VAULT',
    '/exit': 'SAFE EXIT PLANNER',
    '/ally': 'ALLY MODE',
    '/settings': 'SETTINGS',
  };
  return (
    <span style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>
      {titles[path] || 'SAFEVOICE'}
    </span>
  );
}

function SettingsPage({ language, setLanguage }) {
  return (
    <div style={{ padding: '32px', background: '#f8fafc', height: '100%', overflowY: 'auto' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', marginBottom: '24px' }}>Settings</h2>
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', marginBottom: '16px' }}>
        <div style={{ fontWeight: '600', color: '#0f172a', marginBottom: '8px' }}>Language</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[{ code: 'en', label: 'English' }, { code: 'kn', label: 'ಕನ್ನಡ' }, { code: 'hi', label: 'हिन्दी' }, { code: 'te', label: 'తెలుగు' }].map(l => (
            <button
              key={l.code}
              onClick={() => setLanguage(l.code)}
              style={{
                padding: '8px 16px', borderRadius: '8px',
                border: language === l.code ? '2px solid #0ea5e9' : '1px solid #e2e8f0',
                background: language === l.code ? '#eff6ff' : '#fff',
                color: language === l.code ? '#0ea5e9' : '#475569',
                fontWeight: language === l.code ? '600' : '400',
                cursor: 'pointer', fontSize: '13px',
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
        <div style={{ fontWeight: '600', color: '#0f172a', marginBottom: '8px' }}>Privacy</div>
        <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>
          SafeVoice does not collect personal data. Everything is encrypted locally on your device. No account is required.
        </p>
        <button
          onClick={() => { localStorage.clear(); window.location.reload(); }}
          style={{ marginTop: '12px', padding: '9px 16px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', color: '#dc2626', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
        >
          🗑 Clear All Local Data
        </button>
      </div>
    </div>
  );
}

export default App;