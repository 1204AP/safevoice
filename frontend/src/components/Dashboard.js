
// // src/components/Dashboard.js
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const TOOLS = [
//   {
//     path: '/chat',
//     icon: '💬',
//     title: 'Legal Chat',
//     desc: 'Ask questions about rights, custody, and restraining orders.',
//     color: '#eff6ff',
//     border: '#bfdbfe',
//     iconBg: '#3b82f6',
//   },
//   {
//     path: '/vault',
//     icon: '🔒',
//     title: 'Evidence Vault',
//     desc: 'Securely store photos, audio, and notes for future legal use.',
//     color: '#f0fdf4',
//     border: '#bbf7d0',
//     iconBg: '#22c55e',
//   },
//   {
//     path: '/exit',
//     icon: '⚡',
//     title: 'Exit Planner',
//     desc: 'Create a personalised, step-by-step safety and relocation plan.',
//     color: '#fefce8',
//     border: '#fde68a',
//     iconBg: '#f59e0b',
//   },
//   {
//     path: '/ally',
//     icon: '🤝',
//     title: 'Ally Mode',
//     desc: 'Resources for friends and family supporting a survivor.',
//     color: '#fdf4ff',
//     border: '#e9d5ff',
//     iconBg: '#a855f7',
//   },
// ];

// const QUICK_QUESTIONS = [
//   'How do I file for a restraining order?',
//   'Can I take my children if I leave today?',
//   'My partner controls all our finances.',
//   'What qualifies as digital harassment?',
//   'I need to find a local shelter immediately.',
//   'How to document verbal abuse safely?',
// ];

// function Dashboard({ language }) {
//   const navigate = useNavigate();

//   const vaultEntries = (() => {
//     try {
//       return JSON.parse(localStorage.getItem('sv_vault') || '[]');
//     } catch { return []; }
//   })();

//   return (
//     <div style={{ height: '100%', overflowY: 'auto', background: '#f8fafc', fontFamily: "'Segoe UI', sans-serif" }}>
//       <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 24px' }}>

//         {/* Hero card */}
//         <div style={{
//           background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
//           border: '1px solid #bfdbfe',
//           borderRadius: '16px',
//           padding: '24px',
//           marginBottom: '28px',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'flex-start',
//         }}>
//           <div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
//               <span style={{ fontSize: '12px', color: '#1d4ed8' }}>🔒</span>
//               <span style={{ fontSize: '12px', color: '#1d4ed8', fontWeight: '500' }}>Private Session Active</span>
//             </div>
//             <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>
//               You're in a safe space.
//             </h1>
//             <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', maxWidth: '400px' }}>
//               SafeVoice provides anonymous legal guidance and secure tools. Everything you do here is stored only on this device and can be hidden instantly. How can we support you today?
//             </p>
//           </div>
//           <div style={{ fontSize: '64px', opacity: 0.15 }}>🛡️</div>
//         </div>

//         {/* Essential Tools */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
//           <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Essential Tools</h2>
//           <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quick Access</span>
//         </div>

//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '28px' }}>
//           {TOOLS.map((tool) => (
//             <div
//               key={tool.path}
//               style={{ background: tool.color, border: `1px solid ${tool.border}`, borderRadius: '12px', padding: '16px', cursor: 'pointer', transition: 'transform 0.15s' }}
//               onClick={() => navigate(tool.path)}
//               onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//               onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//             >
//               <div style={{ width: '36px', height: '36px', background: tool.iconBg, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', marginBottom: '10px' }}>
//                 {tool.icon}
//               </div>
//               <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>{tool.title}</div>
//               <div style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.4', marginBottom: '10px' }}>{tool.desc}</div>
//               <button
//                 style={{ background: 'none', border: 'none', color: '#0ea5e9', fontSize: '12px', fontWeight: '600', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }}
//               >
//                 Open Tool ›
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Privacy bar */}
//         <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 20px', display: 'flex', justifyContent: 'space-around', marginBottom: '28px' }}>
//           {[
//             '🔒 Always use Incognito / Private browser mode.',
//             '⚡ The EXIT NOW button hides this app instantly.',
//             '🛡️ Your evidence is encrypted locally on this phone.',
//           ].map((tip, i) => (
//             <span key={i} style={{ fontSize: '11px', color: '#64748b' }}>{tip}</span>
//           ))}
//         </div>

//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
//           {/* Local Activity */}
//           <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
//               <span style={{ fontSize: '14px' }}>📍</span>
//               <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Local Activity</span>
//             </div>
//             {vaultEntries.length === 0 ? (
//               <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', padding: '16px 0' }}>No vault entries yet.</p>
//             ) : (
//               vaultEntries.slice(0, 2).map((entry) => (
//                 <div key={entry.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '8px', background: '#f8fafc', borderRadius: '8px' }}>
//                   <div>
//                     <div style={{ fontSize: '12px', fontWeight: '500', color: '#334155' }}>
//                       {entry.type === 'note' ? '📝' : entry.type === 'photo' ? '📷' : '🎙️'} {entry.type === 'note' ? entry.text?.slice(0, 30) + '...' : entry.type === 'audio' ? 'Audio recording' : 'Photo'}
//                     </div>
//                     <div style={{ fontSize: '11px', color: '#94a3b8' }}>{entry.date}</div>
//                   </div>
//                   <button onClick={() => navigate('/vault')} style={{ fontSize: '11px', color: '#0ea5e9', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}>View</button>
//                 </div>
//               ))
//             )}
//             <button onClick={() => navigate('/vault')} style={{ width: '100%', padding: '9px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px', color: '#64748b', cursor: 'pointer', marginTop: '8px', fontWeight: '500' }}>
//               Open Vault
//             </button>
//           </div>

//           {/* Common Questions */}
//           <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
//               <span style={{ fontSize: '14px' }}>💬</span>
//               <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Common Questions</span>
//             </div>
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
//               {QUICK_QUESTIONS.map((q, i) => (
//                 <button
//                   key={i}
//                   onClick={() => navigate('/chat')}
//                   style={{ padding: '8px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '11px', color: '#334155', cursor: 'pointer', textAlign: 'left', lineHeight: '1.4' }}
//                 >
//                   {q}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Safe Exit Countdown */}
//         <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//           <div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
//               <span>⚡</span>
//               <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Safe Exit Countdown</span>
//             </div>
//             <span style={{ fontSize: '12px', color: '#64748b' }}>Plan your departure in under 5 minutes.</span>
//           </div>
//           <button
//             onClick={() => navigate('/exit')}
//             style={{ background: '#0ea5e9', border: 'none', borderRadius: '10px', padding: '10px 20px', color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
//           >
//             Start Planner →
//           </button>
//         </div>

//         {/* Footer */}
//         <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//           <div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
//               <span style={{ fontSize: '14px' }}>🛡️</span>
//               <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>SafeVoice</span>
//             </div>
//             <p style={{ fontSize: '11px', color: '#94a3b8' }}>Privacy-first legal support for safety and independence.</p>
//           </div>
//           <div style={{ display: 'flex', gap: '24px' }}>
//             <div>
//               <div style={{ fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Quick Links</div>
//               <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.8', cursor: 'pointer' }} onClick={() => navigate('/chat')}>Home</div>
//               <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.8', cursor: 'pointer' }} onClick={() => navigate('/ally')}>Ally Mode</div>
//             </div>
//             <div>
//               <div style={{ fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Safety</div>
//               <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.8' }}>Clear Browser History after use.</div>
//               <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.8' }}>Data stored locally on this device only.</div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom privacy bar */}
//         <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <span style={{ fontSize: '10px', color: '#cbd5e1' }}>SafeVoice does not collect personal data. Everything is encrypted locally.</span>
//           <div style={{ display: 'flex', gap: '12px' }}>
//             <button onClick={() => navigate('/settings')} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '11px', cursor: 'pointer' }}>Security Settings</button>
//             <button onClick={() => {}} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '11px', cursor: 'pointer' }}>Disguise Mode</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;






// src/components/Dashboard.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const TOOLS = [
  {
    path: '/chat',
    icon: '💬',
    title: 'Legal Chat',
    desc: 'Ask questions about rights, custody, and restraining orders.',
    color: '#eff6ff',
    border: '#bfdbfe',
    iconBg: '#3b82f6',
  },
  {
    path: '/vault',
    icon: '🔒',
    title: 'Evidence Vault',
    desc: 'Securely store photos, audio, and notes for future legal use.',
    color: '#f0fdf4',
    border: '#bbf7d0',
    iconBg: '#22c55e',
  },
  {
    path: '/exit',
    icon: '⚡',
    title: 'Exit Planner',
    desc: 'Create a personalised, step-by-step safety and relocation plan.',
    color: '#fefce8',
    border: '#fde68a',
    iconBg: '#f59e0b',
  },
  {
    path: '/ally',
    icon: '🤝',
    title: 'Ally Mode',
    desc: 'Resources for friends and family supporting a survivor.',
    color: '#fdf4ff',
    border: '#e9d5ff',
    iconBg: '#a855f7',
  },
];

const QUICK_QUESTIONS = [
  'How do I file for a restraining order?',
  'Can I take my children if I leave today?',
  'My partner controls all our finances.',
  'What qualifies as digital harassment?',
  'I need to find a local shelter immediately.',
  'How to document verbal abuse safely?',
];

const LEGAL_TIPS = [
  '📋 PWDVA 2005 covers physical, emotional, sexual & economic abuse — all equally valid in court.',
  '🏠 You can stay in your home even if it\'s in his name — file a Residence Order.',
  '💰 Streedhan (gifts given to you) legally belongs to you. In-laws keeping it = IPC 406 offense.',
  '👶 Leaving with your children is NOT kidnapping. Courts prefer mothers for children under 5.',
  '📞 File FIR at ANY police station in India — not just your local one.',
  '⚖️ Free lawyer available via DLSA — call 1516. No income limit.',
  '🏥 Go to a govt hospital for MLC (Medico-Legal Certificate) — most powerful court evidence.',
  '📱 Audio recordings of threats are legal if you are party to the conversation.',
  '🕐 No time limit on PWDVA or 498A — you can file even after 20+ years of marriage.',
  '🔒 One Stop Centre (181) does NOT disclose your location to anyone without your consent.',
];

// SOS contacts — expanded to include NGOs & helpers
const SOS_CONTACTS = [
  { name: '🚨 National Emergency', number: '112', category: 'Emergency' },
  { name: '👮 Women Police Helpline', number: '1091', category: 'Police' },
  { name: '🏠 One Stop Centre (OSC)', number: '181', category: 'Shelter & Support' },
  { name: '👶 Childline', number: '1098', category: 'Children' },
  { name: '⚖️ Free Legal Aid (NALSA)', number: '1516', category: 'Legal' },
  { name: '🧠 iCall Mental Health (TISS)', number: '9152987821', category: 'Mental Health' },
  { name: '🤝 Vandrevala Foundation', number: '18602662345', category: 'Mental Health' },
  { name: '🌸 Karnataka Vanitha Sahaya', number: '18004258555', category: 'Karnataka NGO' },
  { name: '💜 Vimochana Bangalore', number: '08025496487', category: 'Bangalore NGO' },
  { name: '🕊️ Samara Bangalore', number: '08026607659', category: 'Bangalore NGO' },
  { name: '🚑 Ambulance', number: '108', category: 'Medical' },
];

function SOSModal({ onClose }) {
  const [search, setSearch] = useState('');
  const filtered = SOS_CONTACTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  // Group by category
  const grouped = filtered.reduce((acc, c) => {
    if (!acc[c.category]) acc[c.category] = [];
    acc[c.category].push(c);
    return acc;
  }, {});

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center'
    }} onClick={onClose}>
      <div
        style={{
          background: '#fff', borderRadius: '24px 24px 0 0', width: '100%', maxWidth: '600px',
          maxHeight: '80vh', display: 'flex', flexDirection: 'column', overflow: 'hidden',
          boxShadow: '0 -8px 32px rgba(0,0,0,0.3)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #dc2626, #ef4444)',
          padding: '20px 20px 16px', display: 'flex', alignItems: 'center', gap: '12px'
        }}>
          <div style={{
            width: '44px', height: '44px', background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px'
          }}>🆘</div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#fff' }}>Emergency Contacts</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>Tap any contact to call immediately</div>
          </div>
          <button onClick={onClose} style={{
            marginLeft: 'auto', background: 'rgba(255,255,255,0.2)', border: 'none',
            borderRadius: '50%', width: '32px', height: '32px', color: '#fff', fontSize: '16px', cursor: 'pointer'
          }}>✕</button>
        </div>

        {/* Search */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search contacts, NGOs, helplines..."
            style={{
              width: '100%', padding: '10px 14px', borderRadius: '10px',
              border: '1.5px solid #e2e8f0', fontSize: '13px', outline: 'none',
              background: '#f8fafc', color: '#0f172a', boxSizing: 'border-box'
            }}
            autoFocus
          />
        </div>

        {/* Contact list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px 20px' }}>
          {Object.entries(grouped).map(([category, contacts]) => (
            <div key={category}>
              <div style={{
                fontSize: '10px', fontWeight: '700', color: '#94a3b8',
                textTransform: 'uppercase', letterSpacing: '0.8px',
                padding: '10px 0 6px'
              }}>{category}</div>
              {contacts.map(c => (
                <a
                  key={c.number}
                  href={`tel:${c.number}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 14px', background: '#fff', border: '1.5px solid #fee2e2',
                    borderRadius: '12px', marginBottom: '8px', textDecoration: 'none',
                    transition: 'all 0.15s', cursor: 'pointer',
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.borderColor = '#fca5a5'; }}
                  onMouseOut={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#fee2e2'; }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>{c.name}</div>
                    <div style={{ fontSize: '13px', color: '#dc2626', fontWeight: '700', marginTop: '2px' }}>{c.number}</div>
                  </div>
                  <div style={{
                    background: '#dc2626', borderRadius: '10px', padding: '8px 14px',
                    fontSize: '12px', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '4px'
                  }}>
                    📞 CALL
                  </div>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LocationTracker() {
  const [status, setStatus] = useState('idle'); // idle | tracking | shared | error
  const [coords, setCoords] = useState(null);
  const [copied, setCopied] = useState(false);
  const watchRef = useRef(null);

  const startTracking = () => {
    if (!navigator.geolocation) { setStatus('error'); return; }
    setStatus('tracking');
    watchRef.current = navigator.geolocation.watchPosition(
      pos => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude, acc: Math.round(pos.coords.accuracy) });
        setStatus('shared');
      },
      () => setStatus('error'),
      { enableHighAccuracy: true, maximumAge: 10000 }
    );
  };

  const stopTracking = () => {
    if (watchRef.current) navigator.geolocation.clearWatch(watchRef.current);
    setStatus('idle'); setCoords(null);
  };

  const copyLocation = () => {
    if (!coords) return;
    const url = `https://maps.google.com/?q=${coords.lat},${coords.lng}`;
    navigator.clipboard?.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const openInMaps = () => {
    if (!coords) return;
    window.open(`https://maps.google.com/?q=${coords.lat},${coords.lng}`, '_blank');
  };

  return (
    <div style={{
      background: status === 'shared' ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)' : '#fff',
      border: `1.5px solid ${status === 'shared' ? '#86efac' : status === 'error' ? '#fca5a5' : '#e2e8f0'}`,
      borderRadius: '12px', padding: '16px 18px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <span style={{ fontSize: '20px' }}>📍</span>
        <div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Location Sharing</div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>
            {status === 'idle' && 'Share your live location with emergency contacts'}
            {status === 'tracking' && 'Acquiring GPS signal...'}
            {status === 'shared' && coords && `Live · Accuracy ±${coords.acc}m`}
            {status === 'error' && 'Location access denied'}
          </div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          {status === 'idle' && (
            <button onClick={startTracking} style={{
              background: '#0ea5e9', border: 'none', borderRadius: '8px',
              padding: '7px 14px', fontSize: '12px', color: '#fff', fontWeight: '600', cursor: 'pointer'
            }}>Enable →</button>
          )}
          {(status === 'tracking' || status === 'shared') && (
            <button onClick={stopTracking} style={{
              background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px',
              padding: '7px 14px', fontSize: '12px', color: '#dc2626', fontWeight: '600', cursor: 'pointer'
            }}>Stop</button>
          )}
          {status === 'error' && (
            <button onClick={startTracking} style={{
              background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px',
              padding: '7px 14px', fontSize: '12px', color: '#475569', fontWeight: '600', cursor: 'pointer'
            }}>Retry</button>
          )}
        </div>
      </div>

      {status === 'shared' && coords && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={copyLocation} style={{
            flex: 1, padding: '8px', background: copied ? '#dcfce7' : '#f0fdf4',
            border: '1px solid #86efac', borderRadius: '8px', fontSize: '12px',
            color: '#15803d', fontWeight: '600', cursor: 'pointer'
          }}>
            {copied ? '✅ Copied!' : '📋 Copy Link'}
          </button>
          <button onClick={openInMaps} style={{
            flex: 1, padding: '8px', background: '#f0f9ff', border: '1px solid #bae6fd',
            borderRadius: '8px', fontSize: '12px', color: '#0369a1', fontWeight: '600', cursor: 'pointer'
          }}>
            🗺️ Open Maps
          </button>
          <div style={{
            width: '100%', fontSize: '11px', color: '#16a34a', padding: '6px 10px',
            background: 'rgba(22,163,74,0.08)', borderRadius: '6px', textAlign: 'center'
          }}>
            🟢 Sharing live location — send the copied link to your trusted contact
          </div>
        </div>
      )}

      {status === 'error' && (
        <div style={{ fontSize: '11px', color: '#dc2626', background: '#fef2f2', padding: '8px 10px', borderRadius: '6px' }}>
          Please allow location access in your browser settings, then retry.
        </div>
      )}
    </div>
  );
}

function Dashboard({ language }) {
  const navigate = useNavigate();
  const [showSOS, setShowSOS] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const tipsRef = useRef(null);

  // Close tips when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (tipsRef.current && !tipsRef.current.contains(e.target)) setShowTips(false);
    };
    if (showTips) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showTips]);

  const vaultEntries = (() => {
    try { return JSON.parse(localStorage.getItem('sv_vault') || '[]'); }
    catch { return []; }
  })();

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: '#f8fafc', fontFamily: "'Segoe UI', sans-serif", position: 'relative' }}>
      {showSOS && <SOSModal onClose={() => setShowSOS(false)} />}

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 24px' }}>

        {/* Hero card */}
        <div style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
          border: '1px solid #bfdbfe', borderRadius: '16px', padding: '24px',
          marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: '#1d4ed8' }}>🔒</span>
              <span style={{ fontSize: '12px', color: '#1d4ed8', fontWeight: '500' }}>Private Session Active</span>
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>
              You're in a safe space.
            </h1>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', maxWidth: '400px' }}>
              SafeVoice provides anonymous legal guidance and secure tools. Everything you do here is stored only on this device and can be hidden instantly. How can we support you today?
            </p>
          </div>
          <div style={{ fontSize: '64px', opacity: 0.15 }}>🛡️</div>
        </div>

        {/* Essential Tools */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Essential Tools</h2>
          <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quick Access</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '28px' }}>
          {TOOLS.map((tool) => (
            <div
              key={tool.path}
              style={{ background: tool.color, border: `1px solid ${tool.border}`, borderRadius: '12px', padding: '16px', cursor: 'pointer', transition: 'transform 0.15s' }}
              onClick={() => navigate(tool.path)}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ width: '36px', height: '36px', background: tool.iconBg, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', marginBottom: '10px' }}>
                {tool.icon}
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>{tool.title}</div>
              <div style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.4', marginBottom: '10px' }}>{tool.desc}</div>
              <button style={{ background: 'none', border: 'none', color: '#0ea5e9', fontSize: '12px', fontWeight: '600', cursor: 'pointer', padding: 0 }}>
                Open Tool ›
              </button>
            </div>
          ))}
        </div>

        {/* Privacy bar */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 20px', display: 'flex', justifyContent: 'space-around', marginBottom: '28px' }}>
          {[
            '🔒 Always use Incognito / Private browser mode.',
            '⚡ The EXIT NOW button hides this app instantly.',
            '🛡️ Your evidence is encrypted locally on this phone.',
          ].map((tip, i) => (
            <span key={i} style={{ fontSize: '11px', color: '#64748b' }}>{tip}</span>
          ))}
        </div>

        {/* Location Tracking + Local Activity */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          {/* Location Tracking */}
          <LocationTracker />

          {/* Local Activity */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ fontSize: '14px' }}>📍</span>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Local Activity</span>
            </div>
            {vaultEntries.length === 0 ? (
              <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', padding: '16px 0' }}>No vault entries yet.</p>
            ) : (
              vaultEntries.slice(0, 2).map((entry) => (
                <div key={entry.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '8px', background: '#f8fafc', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '500', color: '#334155' }}>
                      {entry.type === 'note' ? '📝' : entry.type === 'photo' ? '📷' : '🎙️'} {entry.type === 'note' ? entry.text?.slice(0, 30) + '...' : entry.type === 'audio' ? 'Audio recording' : 'Photo'}
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{entry.date}</div>
                  </div>
                  <button onClick={() => navigate('/vault')} style={{ fontSize: '11px', color: '#0ea5e9', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}>View</button>
                </div>
              ))
            )}
            <button onClick={() => navigate('/vault')} style={{ width: '100%', padding: '9px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px', color: '#64748b', cursor: 'pointer', marginTop: '8px', fontWeight: '500' }}>
              Open Vault
            </button>
          </div>
        </div>

        {/* Common Questions */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span style={{ fontSize: '14px' }}>💬</span>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Common Questions</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            {QUICK_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => navigate('/chat')}
                style={{ padding: '8px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '11px', color: '#334155', cursor: 'pointer', textAlign: 'left', lineHeight: '1.4' }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Safe Exit Countdown */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span>⚡</span>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Safe Exit Countdown</span>
            </div>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Plan your departure in under 5 minutes.</span>
          </div>
          <button
            onClick={() => navigate('/exit')}
            style={{ background: '#0ea5e9', border: 'none', borderRadius: '10px', padding: '10px 20px', color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
          >
            Start Planner →
          </button>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span style={{ fontSize: '14px' }}>🛡️</span>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>SafeVoice</span>
            </div>
            <p style={{ fontSize: '11px', color: '#94a3b8' }}>Privacy-first legal support for safety and independence.</p>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Quick Links</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.8', cursor: 'pointer' }} onClick={() => navigate('/chat')}>Home</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.8', cursor: 'pointer' }} onClick={() => navigate('/ally')}>Ally Mode</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Safety</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.8' }}>Clear Browser History after use.</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.8' }}>Data stored locally on this device only.</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '10px', color: '#cbd5e1' }}>SafeVoice does not collect personal data. Everything is encrypted locally.</span>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => navigate('/settings')} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '11px', cursor: 'pointer' }}>Security Settings</button>
            <button onClick={() => {}} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '11px', cursor: 'pointer' }}>Disguise Mode</button>
          </div>
        </div>
      </div>

      {/* ── SOS Button — fixed bottom right ── */}
      <button
        onClick={() => setShowSOS(true)}
        style={{
          position: 'fixed', bottom: '28px', right: '28px', zIndex: 1000,
          width: '72px', height: '72px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #dc2626, #ef4444)',
          border: '4px solid #fff', boxShadow: '0 4px 20px rgba(220,38,38,0.5)',
          color: '#fff', fontSize: '13px', fontWeight: '900',
          cursor: 'pointer', letterSpacing: '0.5px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px',
          animation: 'sosPulse 2s infinite',
        }}
      >
        <span style={{ fontSize: '20px', lineHeight: 1 }}>🆘</span>
        <span style={{ fontSize: '11px', fontWeight: '800' }}>SOS</span>
      </button>

      {/* ── Legal Tips — 3-dot toggle, fixed bottom right above SOS ── */}
      <div ref={tipsRef} style={{ position: 'fixed', bottom: '112px', right: '28px', zIndex: 1000 }}>
        <button
          onClick={() => setShowTips(v => !v)}
          title="Legal Tips"
          style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: showTips ? '#0ea5e9' : '#fff',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
            cursor: 'pointer', fontSize: '18px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: showTips ? '#fff' : '#475569',
            transition: 'all 0.2s',
          }}
        >
          ⋯
        </button>
        {showTips && (
          <div style={{
            position: 'absolute', bottom: '48px', right: 0,
            width: '310px', background: '#fff',
            border: '1px solid #e2e8f0', borderRadius: '14px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.14)', overflow: 'hidden',
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
              padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>⚖️ Quick Legal Tips</span>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>India · PWDVA 2005</span>
            </div>
            <div style={{ maxHeight: '340px', overflowY: 'auto', padding: '10px 14px 14px' }}>
              {LEGAL_TIPS.map((tip, i) => (
                <div key={i} style={{
                  fontSize: '12px', color: '#334155', lineHeight: '1.5',
                  padding: '7px 0', borderBottom: i < LEGAL_TIPS.length - 1 ? '1px solid #f1f5f9' : 'none'
                }}>
                  {tip}
                </div>
              ))}
            </div>
            <div style={{ padding: '10px 14px', background: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
              <button onClick={() => { navigate('/chat'); setShowTips(false); }} style={{
                width: '100%', padding: '8px', background: '#0ea5e9', border: 'none',
                borderRadius: '8px', fontSize: '12px', color: '#fff', fontWeight: '600', cursor: 'pointer'
              }}>Ask for detailed legal help →</button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes sosPulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(220,38,38,0.5); transform: scale(1); }
          50% { box-shadow: 0 4px 32px rgba(220,38,38,0.8); transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;