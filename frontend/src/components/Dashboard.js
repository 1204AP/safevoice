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
import React from 'react';
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

function Dashboard({ language }) {
  const navigate = useNavigate();

  const vaultEntries = (() => {
    try {
      return JSON.parse(localStorage.getItem('sv_vault') || '[]');
    } catch { return []; }
  })();

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: '#f8fafc', fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 24px' }}>

        {/* Hero card */}
        <div style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
          border: '1px solid #bfdbfe',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
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
              <button
                style={{ background: 'none', border: 'none', color: '#0ea5e9', fontSize: '12px', fontWeight: '600', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }}
              >
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
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

          {/* Common Questions */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px' }}>
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

        {/* Bottom privacy bar */}
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '10px', color: '#cbd5e1' }}>SafeVoice does not collect personal data. Everything is encrypted locally.</span>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => navigate('/settings')} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '11px', cursor: 'pointer' }}>Security Settings</button>
            <button onClick={() => {}} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '11px', cursor: 'pointer' }}>Disguise Mode</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;