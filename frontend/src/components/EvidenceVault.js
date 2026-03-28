// // src/components/EvidenceVault.js
// import React, { useState, useEffect, useRef } from 'react';

// const EMERGENCY_CONTACTS_KEY = 'sv_emergency_contacts';
// const VAULT_KEY = 'sv_vault';

// function EvidenceVault({ language }) {
//   const [entries, setEntries] = useState([]);
//   const [view, setView] = useState('log'); // 'log' | 'add' | 'emergency' | 'viewEntry'
//   const [addTab, setAddTab] = useState('note'); // 'note' | 'photo' | 'audio'
//   const [noteText, setNoteText] = useState('');
//   const [selectedEntry, setSelectedEntry] = useState(null);

//   // Emergency contacts
//   const [contacts, setContacts] = useState([]);
//   const [newName, setNewName] = useState('');
//   const [newPhone, setNewPhone] = useState('');

//   // Alarm
//   const [alarmActive, setAlarmActive] = useState(false);
//   const alarmRef = useRef(null);
//   const audioContextRef = useRef(null);

//   // Photo
//   const photoInputRef = useRef(null);
//   const cameraInputRef = useRef(null);

//   // Audio recording
//   const [recording, setRecording] = useState(false);
//   const [audioURL, setAudioURL] = useState('');
//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);

//   useEffect(() => {
//     const saved = localStorage.getItem(VAULT_KEY);
//     if (saved) setEntries(JSON.parse(saved));
//     const savedContacts = localStorage.getItem(EMERGENCY_CONTACTS_KEY);
//     if (savedContacts) setContacts(JSON.parse(savedContacts));
//   }, []);

//   const saveEntries = (updated) => {
//     setEntries(updated);
//     localStorage.setItem(VAULT_KEY, JSON.stringify(updated));
//   };

//   const saveContacts = (updated) => {
//     setContacts(updated);
//     localStorage.setItem(EMERGENCY_CONTACTS_KEY, JSON.stringify(updated));
//   };

//   // ── NOTE ──────────────────────────────────────────────
//   const addNoteEntry = () => {
//     if (!noteText.trim()) return;
//     const entry = {
//       id: Date.now(),
//       type: 'note',
//       date: new Date().toLocaleString(),
//       text: noteText,
//     };
//     saveEntries([entry, ...entries]);
//     setNoteText('');
//     setView('log');
//   };

//   // ── PHOTO ─────────────────────────────────────────────
//   const handlePhotoFile = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (ev) => {
//       const entry = {
//         id: Date.now(),
//         type: 'photo',
//         date: new Date().toLocaleString(),
//         dataURL: ev.target.result,
//         name: file.name,
//       };
//       saveEntries([entry, ...entries]);
//       setView('log');
//     };
//     reader.readAsDataURL(file);
//   };

//   // ── AUDIO RECORDING ───────────────────────────────────
//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mr = new MediaRecorder(stream);
//       mediaRecorderRef.current = mr;
//       chunksRef.current = [];
//       mr.ondataavailable = (e) => chunksRef.current.push(e.data);
//       mr.onstop = () => {
//         const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
//         const url = URL.createObjectURL(blob);
//         setAudioURL(url);
//         stream.getTracks().forEach((t) => t.stop());
//       };
//       mr.start();
//       setRecording(true);
//     } catch {
//       alert('Microphone access denied.');
//     }
//   };

//   const stopRecording = () => {
//     mediaRecorderRef.current?.stop();
//     setRecording(false);
//   };

//   const saveAudioEntry = () => {
//     if (!audioURL) return;
//     const entry = {
//       id: Date.now(),
//       type: 'audio',
//       date: new Date().toLocaleString(),
//       audioURL,
//     };
//     saveEntries([entry, ...entries]);
//     setAudioURL('');
//     setView('log');
//   };

//   // ── ALARM ─────────────────────────────────────────────
//   const toggleAlarm = () => {
//     if (alarmActive) {
//       if (alarmRef.current) {
//         alarmRef.current.stop();
//         alarmRef.current = null;
//       }
//       setAlarmActive(false);
//       return;
//     }
//     // Create loud siren using Web Audio API
//     try {
//       const ctx = new (window.AudioContext || window.webkitAudioContext)();
//       audioContextRef.current = ctx;
//       let on = true;
//       const interval = setInterval(() => {
//         const osc = ctx.createOscillator();
//         const gain = ctx.createGain();
//         osc.connect(gain);
//         gain.connect(ctx.destination);
//         gain.gain.value = 1.5;
//         osc.type = 'sawtooth';
//         osc.frequency.setValueAtTime(on ? 880 : 660, ctx.currentTime);
//         osc.start();
//         osc.stop(ctx.currentTime + 0.3);
//         on = !on;
//       }, 350);
//       alarmRef.current = {
//         stop: () => {
//           clearInterval(interval);
//           ctx.close();
//         },
//       };
//       setAlarmActive(true);
//     } catch {
//       alert('Audio not supported in this browser.');
//     }
//   };

//   // ── EMERGENCY CONTACTS ────────────────────────────────
//   const addContact = () => {
//     if (!newName.trim() || !newPhone.trim()) return;
//     const updated = [...contacts, { id: Date.now(), name: newName, phone: newPhone }];
//     saveContacts(updated);
//     setNewName('');
//     setNewPhone('');
//   };

//   const deleteContact = (id) => saveContacts(contacts.filter((c) => c.id !== id));

//   const callContact = (phone) => {
//     window.location.href = `tel:${phone}`;
//   };

//   const deleteEntry = (id) => saveEntries(entries.filter((e) => e.id !== id));

//   // ── STYLES ────────────────────────────────────────────
//   const s = {
//     wrap: {
//       height: '100%',
//       overflowY: 'auto',
//       background: '#f8fafc',
//       fontFamily: "'Segoe UI', sans-serif",
//     },
//     header: {
//       background: '#fff',
//       borderBottom: '1px solid #e2e8f0',
//       padding: '16px 20px',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '10px',
//       position: 'sticky',
//       top: 0,
//       zIndex: 10,
//     },
//     headerTitle: { fontSize: '16px', fontWeight: '600', color: '#0f172a' },
//     body: { padding: '16px 20px' },
//     tabs: {
//       display: 'flex',
//       gap: '8px',
//       marginBottom: '20px',
//       background: '#f1f5f9',
//       borderRadius: '10px',
//       padding: '4px',
//     },
//     tab: (active) => ({
//       flex: 1,
//       padding: '9px 4px',
//       borderRadius: '8px',
//       border: 'none',
//       cursor: 'pointer',
//       fontSize: '12px',
//       fontWeight: '500',
//       background: active ? '#fff' : 'transparent',
//       color: active ? '#0ea5e9' : '#64748b',
//       boxShadow: active ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
//       transition: 'all 0.2s',
//     }),
//     card: {
//       background: '#fff',
//       borderRadius: '12px',
//       border: '1px solid #e2e8f0',
//       padding: '16px',
//       marginBottom: '12px',
//     },
//     btn: (variant = 'primary') => ({
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '8px',
//       width: '100%',
//       padding: '13px',
//       borderRadius: '10px',
//       border: 'none',
//       cursor: 'pointer',
//       fontSize: '14px',
//       fontWeight: '600',
//       background:
//         variant === 'primary'
//           ? '#0ea5e9'
//           : variant === 'danger'
//           ? '#ef4444'
//           : variant === 'alarm'
//           ? alarmActive
//             ? '#dc2626'
//             : '#f97316'
//           : '#f1f5f9',
//       color: variant === 'ghost' ? '#64748b' : '#fff',
//       marginBottom: '10px',
//     }),
//     entryMeta: { fontSize: '11px', color: '#94a3b8', marginBottom: '6px' },
//     entryText: { fontSize: '13px', color: '#334155', lineHeight: '1.5' },
//     inputStyle: {
//       width: '100%',
//       padding: '11px 14px',
//       borderRadius: '9px',
//       border: '1.5px solid #e2e8f0',
//       fontSize: '14px',
//       color: '#0f172a',
//       outline: 'none',
//       background: '#fff',
//       marginBottom: '10px',
//       boxSizing: 'border-box',
//     },
//     iconBtn: {
//       background: 'none',
//       border: 'none',
//       cursor: 'pointer',
//       fontSize: '18px',
//       padding: '4px',
//     },
//   };

//   // ── RENDER ────────────────────────────────────────────
//   return (
//     <div style={s.wrap}>
//       {/* Header */}
//       <div style={s.header}>
//         {view !== 'log' && (
//           <button
//             style={{ ...s.iconBtn, fontSize: '20px', marginRight: '4px' }}
//             onClick={() => {
//               setView('log');
//               setAudioURL('');
//             }}
//           >
//             ←
//           </button>
//         )}
//         <span style={{ fontSize: '20px' }}>🔒</span>
//         <span style={s.headerTitle}>
//           {view === 'log'
//             ? 'Evidence Vault'
//             : view === 'add'
//             ? 'Capture Evidence'
//             : view === 'emergency'
//             ? 'Emergency Contacts'
//             : 'Entry Detail'}
//         </span>
//         {view === 'log' && (
//           <button
//             onClick={() => setView('emergency')}
//             style={{
//               marginLeft: 'auto',
//               background: '#fef2f2',
//               border: '1px solid #fca5a5',
//               borderRadius: '8px',
//               padding: '6px 12px',
//               fontSize: '12px',
//               color: '#dc2626',
//               fontWeight: '600',
//               cursor: 'pointer',
//             }}
//           >
//             🆘 Emergency
//           </button>
//         )}
//       </div>

//       <div style={s.body}>
//         {/* ── LOG VIEW ── */}
//         {view === 'log' && (
//           <>
//             <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '16px' }}>
//               Stored only on this device. Never uploaded. Never shared.
//             </p>

//             {/* Alarm */}
//             <button style={s.btn('alarm')} onClick={toggleAlarm}>
//               {alarmActive ? '🔕 Stop Alarm' : '🚨 Trigger Loud Alarm (Alert Neighbours)'}
//             </button>

//             {/* Add entry */}
//             <button style={s.btn('primary')} onClick={() => setView('add')}>
//               + Capture Evidence
//             </button>

//             {/* Entries */}
//             {entries.length === 0 ? (
//               <p style={{ color: '#94a3b8', textAlign: 'center', fontSize: '13px', marginTop: '32px' }}>
//                 No entries yet. Your vault is empty and private.
//               </p>
//             ) : (
//               entries.map((entry) => (
//                 <div
//                   key={entry.id}
//                   style={{ ...s.card, cursor: 'pointer' }}
//                   onClick={() => {
//                     setSelectedEntry(entry);
//                     setView('viewEntry');
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       alignItems: 'flex-start',
//                     }}
//                   >
//                     <div>
//                       <div style={s.entryMeta}>
//                         {entry.type === 'note' ? '📝' : entry.type === 'photo' ? '📷' : '🎙️'}{' '}
//                         {entry.date}
//                       </div>
//                       {entry.type === 'note' && (
//                         <p style={s.entryText}>{entry.text.slice(0, 80)}...</p>
//                       )}
//                       {entry.type === 'photo' && (
//                         <img
//                           src={entry.dataURL}
//                           alt="evidence"
//                           style={{ width: '80px', borderRadius: '6px', marginTop: '6px' }}
//                         />
//                       )}
//                       {entry.type === 'audio' && (
//                         <audio controls src={entry.audioURL} style={{ marginTop: '6px', width: '200px' }} />
//                       )}
//                     </div>
//                     <button
//                       style={{ ...s.iconBtn, color: '#ef4444' }}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         deleteEntry(entry.id);
//                       }}
//                     >
//                       🗑
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </>
//         )}

//         {/* ── ADD VIEW ── */}
//         {view === 'add' && (
//           <>
//             <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '16px' }}>
//               Securely document your experience. Your data never leaves this device.
//             </p>

//             {/* Sub-tabs */}
//             <div style={s.tabs}>
//               {['note', 'photo', 'audio'].map((t) => (
//                 <button key={t} style={s.tab(addTab === t)} onClick={() => setAddTab(t)}>
//                   {t === 'note' ? '📝 Note' : t === 'photo' ? '📷 Photo' : '🎙️ Audio'}
//                 </button>
//               ))}
//             </div>

//             {/* Note */}
//             {addTab === 'note' && (
//               <>
//                 <textarea
//                   value={noteText}
//                   onChange={(e) => setNoteText(e.target.value)}
//                   placeholder="Write what happened... short sentences help."
//                   rows={7}
//                   style={{
//                     ...s.inputStyle,
//                     resize: 'none',
//                     lineHeight: '1.6',
//                     marginBottom: '12px',
//                   }}
//                 />
//                 <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px' }}>
//                   ℹ️ Your writing is automatically formatted for clarity.
//                 </p>
//                 <button style={s.btn()} onClick={addNoteEntry}>
//                   Save Locally
//                 </button>
//               </>
//             )}

//             {/* Photo */}
//             {addTab === 'photo' && (
//               <>
//                 <input
//                   ref={cameraInputRef}
//                   type="file"
//                   accept="image/*"
//                   capture="environment"
//                   style={{ display: 'none' }}
//                   onChange={handlePhotoFile}
//                 />
//                 <input
//                   ref={photoInputRef}
//                   type="file"
//                   accept="image/*"
//                   style={{ display: 'none' }}
//                   onChange={handlePhotoFile}
//                 />
//                 <button
//                   style={s.btn()}
//                   onClick={() => cameraInputRef.current?.click()}
//                 >
//                   📸 Take Photo with Camera
//                 </button>
//                 <button
//                   style={{ ...s.btn('ghost') }}
//                   onClick={() => photoInputRef.current?.click()}
//                 >
//                   🖼️ Choose from Gallery
//                 </button>
//               </>
//             )}

//             {/* Audio */}
//             {addTab === 'audio' && (
//               <>
//                 {!recording && !audioURL && (
//                   <button style={s.btn()} onClick={startRecording}>
//                     🎙️ Start Recording
//                   </button>
//                 )}
//                 {recording && (
//                   <button style={s.btn('danger')} onClick={stopRecording}>
//                     ⏹ Stop Recording
//                   </button>
//                 )}
//                 {audioURL && (
//                   <>
//                     <audio controls src={audioURL} style={{ width: '100%', marginBottom: '12px' }} />
//                     <button style={s.btn()} onClick={saveAudioEntry}>
//                       💾 Save Recording
//                     </button>
//                     <button
//                       style={s.btn('ghost')}
//                       onClick={() => {
//                         setAudioURL('');
//                       }}
//                     >
//                       🔄 Re-record
//                     </button>
//                   </>
//                 )}
//               </>
//             )}

//             <div
//               style={{
//                 marginTop: '8px',
//                 textAlign: 'center',
//                 fontSize: '11px',
//                 color: '#94a3b8',
//               }}
//             >
//               STORED LOCALLY ONLY · ENCRYPTED · CONFIDENTIAL
//             </div>
//           </>
//         )}

//         {/* ── VIEW ENTRY ── */}
//         {view === 'viewEntry' && selectedEntry && (
//           <div style={s.card}>
//             <div style={s.entryMeta}>{selectedEntry.date}</div>
//             {selectedEntry.type === 'note' && (
//               <p style={{ ...s.entryText, whiteSpace: 'pre-wrap' }}>{selectedEntry.text}</p>
//             )}
//             {selectedEntry.type === 'photo' && (
//               <img
//                 src={selectedEntry.dataURL}
//                 alt="evidence"
//                 style={{ width: '100%', borderRadius: '8px' }}
//               />
//             )}
//             {selectedEntry.type === 'audio' && (
//               <audio controls src={selectedEntry.audioURL} style={{ width: '100%' }} />
//             )}
//             <button
//               style={{ ...s.btn('danger'), marginTop: '16px' }}
//               onClick={() => {
//                 deleteEntry(selectedEntry.id);
//                 setView('log');
//               }}
//             >
//               🗑 Delete Entry
//             </button>
//           </div>
//         )}

//         {/* ── EMERGENCY CONTACTS VIEW ── */}
//         {view === 'emergency' && (
//           <>
//             {/* Alarm button */}
//             <button style={s.btn('alarm')} onClick={toggleAlarm}>
//               {alarmActive ? '🔕 Stop Alarm' : '🚨 Trigger Loud Alarm (Alert Neighbours)'}
//             </button>

//             <div style={s.card}>
//               <div
//                 style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a', marginBottom: '12px' }}
//               >
//                 Add Emergency Contact
//               </div>
//               <input
//                 style={s.inputStyle}
//                 placeholder="Name (e.g. Sister, NGO Helpline)"
//                 value={newName}
//                 onChange={(e) => setNewName(e.target.value)}
//               />
//               <input
//                 style={s.inputStyle}
//                 placeholder="Phone number"
//                 value={newPhone}
//                 onChange={(e) => setNewPhone(e.target.value)}
//                 type="tel"
//               />
//               <button style={s.btn()} onClick={addContact}>
//                 + Add Contact
//               </button>
//             </div>

//             {/* Built-in helplines */}
//             {[
//               { name: 'Women Helpline', phone: '1091' },
//               { name: 'Police Emergency', phone: '100' },
//               { name: 'National Emergency', phone: '112' },
//               { name: 'iCall Mental Health', phone: '9152987821' },
//             ].map((c) => (
//               <div
//                 key={c.phone}
//                 style={{
//                   ...s.card,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <div>
//                   <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
//                     {c.name}
//                   </div>
//                   <div style={{ fontSize: '13px', color: '#0ea5e9' }}>{c.phone}</div>
//                 </div>
//                 <button
//                   onClick={() => callContact(c.phone)}
//                   style={{
//                     background: '#dcfce7',
//                     border: '1px solid #86efac',
//                     borderRadius: '8px',
//                     padding: '8px 14px',
//                     fontSize: '13px',
//                     color: '#16a34a',
//                     fontWeight: '600',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   📞 Call
//                 </button>
//               </div>
//             ))}

//             {/* User contacts */}
//             {contacts.map((c) => (
//               <div
//                 key={c.id}
//                 style={{
//                   ...s.card,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <div>
//                   <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
//                     {c.name}
//                   </div>
//                   <div style={{ fontSize: '13px', color: '#0ea5e9' }}>{c.phone}</div>
//                 </div>
//                 <div style={{ display: 'flex', gap: '6px' }}>
//                   <button
//                     onClick={() => callContact(c.phone)}
//                     style={{
//                       background: '#dcfce7',
//                       border: '1px solid #86efac',
//                       borderRadius: '8px',
//                       padding: '8px 12px',
//                       fontSize: '13px',
//                       color: '#16a34a',
//                       fontWeight: '600',
//                       cursor: 'pointer',
//                     }}
//                   >
//                     📞 Call
//                   </button>
//                   <button
//                     onClick={() => deleteContact(c.id)}
//                     style={{
//                       background: '#fef2f2',
//                       border: '1px solid #fca5a5',
//                       borderRadius: '8px',
//                       padding: '8px 10px',
//                       fontSize: '13px',
//                       color: '#dc2626',
//                       cursor: 'pointer',
//                     }}
//                   >
//                     🗑
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default EvidenceVault;






// src/components/EvidenceVault.js
import React, { useState, useEffect, useRef } from 'react';

const EMERGENCY_CONTACTS_KEY = 'sv_emergency_contacts';
const VAULT_KEY = 'sv_vault';

const UI_TEXT = {
  en: {
    title: 'Evidence Vault',
    sub: 'Stored only on this device. Never uploaded. Never shared.',
    alarm: '🚨 Trigger Loud Alarm (Alert Neighbours)',
    alarmOff: '🔕 Stop Alarm',
    capture: '+ Capture Evidence',
    emergency: '🆘 Emergency',
    emergencyTitle: 'Emergency Contacts',
    addContact: 'Add Emergency Contact',
    namePlaceholder: 'Name (e.g. Sister, NGO Helpline)',
    phonePlaceholder: 'Phone number',
    addBtn: '+ Add Contact',
    call: '📞 Call',
    note: '📝 Note',
    photo: '📷 Photo',
    audio: '🎙️ Audio',
    captureTitle: 'Capture Evidence',
    captureSub: 'Securely document your experience. Your data never leaves this device.',
    takePhoto: '📸 Take Photo (Camera)',
    gallery: '🖼️ Choose from Gallery',
    startRec: '🎙️ Start Recording',
    stopRec: '⏹ Stop Recording',
    saveRec: '💾 Save Recording',
    reRec: '🔄 Re-record',
    saveNote: '💾 Save Locally',
    notePlaceholder: 'Write what happened... short sentences help.',
    noteHint: 'ℹ️ Your writing is automatically formatted for clarity.',
    empty: 'No entries yet. Your vault is empty and private.',
    deleteEntry: '🗑 Delete Entry',
    builtInHelplines: 'Built-in Helplines',
    myContacts: 'My Emergency Contacts',
    encrypted: 'STORED LOCALLY ONLY · ENCRYPTED · CONFIDENTIAL',
  },
  kn: {
    title: 'ಸಾಕ್ಷ್ಯ ಭಂಡಾರ',
    sub: 'ಈ ಸಾಧನದಲ್ಲಿ ಮಾತ್ರ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ. ಎಂದಿಗೂ ಅಪ್‌ಲೋಡ್ ಆಗುವುದಿಲ್ಲ.',
    alarm: '🚨 ಜೋರಾದ ಅಲಾರಂ (ನೆರೆಮನೆಯವರಿಗೆ ಎಚ್ಚರಿಕೆ)',
    alarmOff: '🔕 ಅಲಾರಂ ನಿಲ್ಲಿಸಿ',
    capture: '+ ಸಾಕ್ಷ್ಯ ದಾಖಲಿಸಿ',
    emergency: '🆘 ತುರ್ತು',
    emergencyTitle: 'ತುರ್ತು ಸಂಪರ್ಕಗಳು',
    addContact: 'ತುರ್ತು ಸಂಪರ್ಕ ಸೇರಿಸಿ',
    namePlaceholder: 'ಹೆಸರು (ಉದಾ: ಅಕ್ಕ, NGO)',
    phonePlaceholder: 'ಫೋನ್ ನಂಬರ್',
    addBtn: '+ ಸಂಪರ್ಕ ಸೇರಿಸಿ',
    call: '📞 ಕರೆ',
    note: '📝 ಟಿಪ್ಪಣಿ',
    photo: '📷 ಫೋಟೋ',
    audio: '🎙️ ಆಡಿಯೋ',
    captureTitle: 'ಸಾಕ್ಷ್ಯ ದಾಖಲಿಸಿ',
    captureSub: 'ನಿಮ್ಮ ಅನುಭವವನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ದಾಖಲಿಸಿ.',
    takePhoto: '📸 ಕ್ಯಾಮೆರಾದಿಂದ ಫೋಟೋ',
    gallery: '🖼️ ಗ್ಯಾಲರಿಯಿಂದ ಆರಿಸಿ',
    startRec: '🎙️ ರೆಕಾರ್ಡಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ',
    stopRec: '⏹ ರೆಕಾರ್ಡಿಂಗ್ ನಿಲ್ಲಿಸಿ',
    saveRec: '💾 ರೆಕಾರ್ಡಿಂಗ್ ಉಳಿಸಿ',
    reRec: '🔄 ಮತ್ತೆ ರೆಕಾರ್ಡ್',
    saveNote: '💾 ಸ್ಥಳೀಯವಾಗಿ ಉಳಿಸಿ',
    notePlaceholder: 'ಏನಾಯಿತು ಎಂದು ಬರೆಯಿರಿ...',
    noteHint: 'ℹ️ ನಿಮ್ಮ ಬರವಣಿಗೆ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸ್ವರೂಪಿಸಲ್ಪಡುತ್ತದೆ.',
    empty: 'ಯಾವುದೇ ನಮೂದುಗಳಿಲ್ಲ. ನಿಮ್ಮ ಭಂಡಾರ ಖಾಲಿ ಮತ್ತು ಖಾಸಗಿ.',
    deleteEntry: '🗑 ನಮೂದು ಅಳಿಸಿ',
    builtInHelplines: 'ಅಂತರ್ನಿರ್ಮಿತ ಸಹಾಯವಾಣಿಗಳು',
    myContacts: 'ನನ್ನ ತುರ್ತು ಸಂಪರ್ಕಗಳು',
    encrypted: 'ಸ್ಥಳೀಯವಾಗಿ ಮಾತ್ರ · ಎನ್‌ಕ್ರಿಪ್ಟ್ · ರಹಸ್ಯ',
  },
  hi: {
    title: 'साक्ष्य तिजोरी',
    sub: 'सिर्फ इस डिवाइस पर। कभी अपलोड नहीं।',
    alarm: '🚨 तेज़ अलार्म बजाएं (पड़ोसियों को सतर्क करें)',
    alarmOff: '🔕 अलार्म बंद करें',
    capture: '+ साक्ष्य दर्ज करें',
    emergency: '🆘 आपातकाल',
    emergencyTitle: 'आपातकालीन संपर्क',
    addContact: 'आपातकालीन संपर्क जोड़ें',
    namePlaceholder: 'नाम (जैसे: बहन, NGO)',
    phonePlaceholder: 'फ़ोन नंबर',
    addBtn: '+ संपर्क जोड़ें',
    call: '📞 कॉल',
    note: '📝 नोट',
    photo: '📷 फोटो',
    audio: '🎙️ ऑडियो',
    captureTitle: 'साक्ष्य दर्ज करें',
    captureSub: 'अपना अनुभव सुरक्षित रूप से दस्तावेज़ करें।',
    takePhoto: '📸 कैमरे से फोटो',
    gallery: '🖼️ गैलरी से चुनें',
    startRec: '🎙️ रिकॉर्डिंग शुरू करें',
    stopRec: '⏹ रिकॉर्डिंग रोकें',
    saveRec: '💾 रिकॉर्डिंग सेव करें',
    reRec: '🔄 दोबारा रिकॉर्ड',
    saveNote: '💾 स्थानीय रूप से सेव करें',
    notePlaceholder: 'क्या हुआ लिखें...',
    noteHint: 'ℹ️ आपका लेखन स्वचालित रूप से स्पष्टता के लिए फ़ॉर्मेट होता है।',
    empty: 'अभी कोई प्रविष्टि नहीं। आपकी तिजोरी खाली और निजी है।',
    deleteEntry: '🗑 प्रविष्टि हटाएं',
    builtInHelplines: 'अंतर्निहित हेल्पलाइन',
    myContacts: 'मेरे आपातकालीन संपर्क',
    encrypted: 'सिर्फ स्थानीय · एन्क्रिप्टेड · गोपनीय',
  },
  te: {
    title: 'సాక్ష్యాల తిజోరీ',
    sub: 'ఈ పరికరంలో మాత్రమే నిల్వ. ఎప్పుడూ అప్‌లోడ్ కాదు.',
    alarm: '🚨 బిగ్గరగా అలారం (పొరుగువారికి హెచ్చరిక)',
    alarmOff: '🔕 అలారం ఆపండి',
    capture: '+ సాక్ష్యం నమోదు చేయండి',
    emergency: '🆘 అత్యవసరం',
    emergencyTitle: 'అత్యవసర సంప్రదింపులు',
    addContact: 'అత్యవసర సంప్రదింపు జోడించండి',
    namePlaceholder: 'పేరు (ఉదా: అక్క, NGO)',
    phonePlaceholder: 'ఫోన్ నంబర్',
    addBtn: '+ సంప్రదింపు జోడించండి',
    call: '📞 కాల్',
    note: '📝 నోట్',
    photo: '📷 ఫోటో',
    audio: '🎙️ ఆడియో',
    captureTitle: 'సాక్ష్యం నమోదు చేయండి',
    captureSub: 'మీ అనుభవాన్ని సురక్షితంగా నమోదు చేయండి.',
    takePhoto: '📸 కెమెరాతో ఫోటో',
    gallery: '🖼️ గ్యాలరీ నుండి ఎంచుకోండి',
    startRec: '🎙️ రికార్డింగ్ ప్రారంభించండి',
    stopRec: '⏹ రికార్డింగ్ ఆపండి',
    saveRec: '💾 రికార్డింగ్ సేవ్ చేయండి',
    reRec: '🔄 మళ్ళీ రికార్డ్',
    saveNote: '💾 స్థానికంగా సేవ్ చేయండి',
    notePlaceholder: 'ఏమి జరిగిందో రాయండి...',
    noteHint: 'ℹ️ మీ రాత స్వయంచాలకంగా స్పష్టతకు ఫార్మాట్ అవుతుంది.',
    empty: 'ఇంకా నమోదులు లేవు. మీ తిజోరీ ఖాళీగా మరియు ప్రైవేట్‌గా ఉంది.',
    deleteEntry: '🗑 నమోదు తొలగించండి',
    builtInHelplines: 'అంతర్నిర్మిత హెల్ప్‌లైన్లు',
    myContacts: 'నా అత్యవసర సంప్రదింపులు',
    encrypted: 'స్థానికంగా మాత్రమే · ఎన్‌క్రిప్టెడ్ · రహస్యం',
  },
};

function EvidenceVault({ language }) {
  const t = UI_TEXT[language] || UI_TEXT.en;
  const [entries, setEntries] = useState([]);
  const [view, setView] = useState('log');
  const [addTab, setAddTab] = useState('note');
  const [noteText, setNoteText] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [alarmActive, setAlarmActive] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const alarmRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraStreamRef = useRef(null);
  const galleryInputRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem(VAULT_KEY);
    if (saved) setEntries(JSON.parse(saved));
    const savedC = localStorage.getItem(EMERGENCY_CONTACTS_KEY);
    if (savedC) setContacts(JSON.parse(savedC));
  }, []);

  useEffect(() => {
    // Stop camera when leaving photo tab
    if (addTab !== 'photo' || view !== 'add') {
      stopCamera();
    }
  }, [addTab, view]);

  const saveEntries = (u) => { setEntries(u); localStorage.setItem(VAULT_KEY, JSON.stringify(u)); };
  const saveContacts = (u) => { setContacts(u); localStorage.setItem(EMERGENCY_CONTACTS_KEY, JSON.stringify(u)); };

  // ── ALARM ──
  const toggleAlarm = () => {
    if (alarmActive) {
      alarmRef.current?.stop();
      alarmRef.current = null;
      setAlarmActive(false);
      return;
    }
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      let on = true;
      const interval = setInterval(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        gain.gain.value = 1.8;
        osc.type = 'sawtooth';
        osc.frequency.value = on ? 960 : 700;
        osc.start();
        osc.stop(ctx.currentTime + 0.28);
        on = !on;
      }, 300);
      alarmRef.current = { stop: () => { clearInterval(interval); ctx.close(); } };
      setAlarmActive(true);
    } catch { alert('Audio not supported.'); }
  };

  // ── NOTE ──
  const addNoteEntry = () => {
    if (!noteText.trim()) return;
    saveEntries([{ id: Date.now(), type: 'note', date: new Date().toLocaleString(), text: noteText }, ...entries]);
    setNoteText('');
    setView('log');
  };

  // ── CAMERA (real camera using getUserMedia) ──
  const startCamera = async () => {
    setCameraError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      cameraStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setCameraError('Camera permission denied. Please allow camera access in your browser settings.');
      } else if (err.name === 'NotFoundError') {
        setCameraError('No camera found. Please use the gallery option to upload a photo.');
      } else {
        setCameraError('Could not access camera: ' + err.message);
      }
    }
  };

  const stopCamera = () => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((t) => t.stop());
      cameraStreamRef.current = null;
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const dataURL = canvas.toDataURL('image/jpeg', 0.85);
    saveEntries([{ id: Date.now(), type: 'photo', date: new Date().toLocaleString(), dataURL }, ...entries]);
    stopCamera();
    setView('log');
  };

  // ── GALLERY ──
  const handleGalleryFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      saveEntries([{ id: Date.now(), type: 'photo', date: new Date().toLocaleString(), dataURL: ev.target.result, name: file.name }, ...entries]);
      setView('log');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // ── AUDIO ──
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      chunksRef.current = [];
      mr.ondataavailable = (e) => chunksRef.current.push(e.data);
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioURL(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.start();
      setRecording(true);
    } catch { alert('Microphone access denied.'); }
  };

  const stopRecording = () => { mediaRecorderRef.current?.stop(); setRecording(false); };
  const saveAudioEntry = () => {
    if (!audioURL) return;
    saveEntries([{ id: Date.now(), type: 'audio', date: new Date().toLocaleString(), audioURL }, ...entries]);
    setAudioURL('');
    setView('log');
  };

  // ── CONTACTS ──
  const addContact = () => {
    if (!newName.trim() || !newPhone.trim()) return;
    saveContacts([...contacts, { id: Date.now(), name: newName, phone: newPhone }]);
    setNewName(''); setNewPhone('');
  };

  const BUILT_IN = [
    { name: 'Women Helpline', phone: '1091' },
    { name: 'Police Emergency', phone: '100' },
    { name: 'National Emergency', phone: '112' },
    { name: 'iCall Mental Health (TISS)', phone: '9152987821' },
    { name: 'Karnataka Vanitha Sahaya', phone: '18004258555' },
  ];

  const s = {
    wrap: { height: '100%', overflowY: 'auto', background: '#f8fafc', fontFamily: "'Segoe UI', sans-serif" },
    header: { background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '10px', position: 'sticky', top: 0, zIndex: 10 },
    body: { padding: '16px 20px' },
    card: { background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '14px 16px', marginBottom: '10px' },
    btn: (v = 'primary') => ({
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
      width: '100%', padding: '13px', borderRadius: '10px', border: 'none', cursor: 'pointer',
      fontSize: '14px', fontWeight: '600', marginBottom: '10px',
      background: v === 'primary' ? '#0ea5e9' : v === 'danger' ? '#ef4444' : v === 'alarm' ? (alarmActive ? '#dc2626' : '#f97316') : v === 'ghost' ? '#f1f5f9' : '#0ea5e9',
      color: v === 'ghost' ? '#64748b' : '#fff',
    }),
    tabs: { display: 'flex', gap: '6px', marginBottom: '18px', background: '#f1f5f9', borderRadius: '10px', padding: '4px' },
    tab: (a) => ({ flex: 1, padding: '9px 4px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '500', background: a ? '#fff' : 'transparent', color: a ? '#0ea5e9' : '#64748b', boxShadow: a ? '0 1px 3px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.2s' }),
    input: { width: '100%', padding: '11px 14px', borderRadius: '9px', border: '1.5px solid #e2e8f0', fontSize: '14px', color: '#0f172a', outline: 'none', background: '#fff', marginBottom: '10px', boxSizing: 'border-box' },
  };

  return (
    <div style={s.wrap}>
      {/* Header */}
      <div style={s.header}>
        {view !== 'log' && (
          <button onClick={() => { setView('log'); stopCamera(); setAudioURL(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', padding: '2px 6px' }}>←</button>
        )}
        <span style={{ fontSize: '20px' }}>🔒</span>
        <span style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
          {view === 'log' ? t.title : view === 'add' ? t.captureTitle : view === 'emergency' ? t.emergencyTitle : 'Entry Detail'}
        </span>
        {view === 'log' && (
          <button onClick={() => setView('emergency')} style={{ marginLeft: 'auto', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', color: '#dc2626', fontWeight: '700', cursor: 'pointer' }}>
            {t.emergency}
          </button>
        )}
      </div>

      <div style={s.body}>
        {/* ── LOG ── */}
        {view === 'log' && (
          <>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '14px' }}>{t.sub}</p>
            <button style={s.btn('alarm')} onClick={toggleAlarm}>{alarmActive ? t.alarmOff : t.alarm}</button>
            <button style={s.btn()} onClick={() => setView('add')}>{t.capture}</button>
            {entries.length === 0 ? (
              <p style={{ color: '#94a3b8', textAlign: 'center', fontSize: '13px', marginTop: '32px' }}>{t.empty}</p>
            ) : entries.map((entry) => (
              <div key={entry.id} style={{ ...s.card, cursor: 'pointer' }} onClick={() => { setSelectedEntry(entry); setView('viewEntry'); }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '6px' }}>
                      {entry.type === 'note' ? '📝' : entry.type === 'photo' ? '📷' : '🎙️'} {entry.date}
                    </div>
                    {entry.type === 'note' && <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5', margin: 0 }}>{entry.text.slice(0, 90)}...</p>}
                    {entry.type === 'photo' && <img src={entry.dataURL} alt="evidence" style={{ width: '72px', height: '72px', objectFit: 'cover', borderRadius: '8px' }} />}
                    {entry.type === 'audio' && <audio controls src={entry.audioURL} style={{ marginTop: '4px', width: '200px' }} onClick={(e) => e.stopPropagation()} />}
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); saveEntries(entries.filter((en) => en.id !== entry.id)); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '16px', padding: '2px 4px' }}>🗑</button>
                </div>
              </div>
            ))}
          </>
        )}

        {/* ── ADD ── */}
        {view === 'add' && (
          <>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '14px' }}>{t.captureSub}</p>
            <div style={s.tabs}>
              {[['note', t.note], ['photo', t.photo], ['audio', t.audio]].map(([key, label]) => (
                <button key={key} style={s.tab(addTab === key)} onClick={() => { setAddTab(key); if (key !== 'photo') stopCamera(); }}>
                  {label}
                </button>
              ))}
            </div>

            {addTab === 'note' && (
              <>
                <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder={t.notePlaceholder} rows={8}
                  style={{ ...s.input, resize: 'none', lineHeight: '1.6', marginBottom: '8px' }} />
                <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px' }}>{t.noteHint}</p>
                <button style={s.btn()} onClick={addNoteEntry}>{t.saveNote}</button>
              </>
            )}

            {addTab === 'photo' && (
              <>
                {/* Camera view */}
                {cameraActive && (
                  <div style={{ marginBottom: '12px' }}>
                    <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', borderRadius: '12px', background: '#000' }} />
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <button style={{ ...s.btn(), marginBottom: 0, flex: 1 }} onClick={capturePhoto}>📸 Capture</button>
                      <button style={{ ...s.btn('ghost'), marginBottom: 0, flex: 1 }} onClick={stopCamera}>✕ Cancel</button>
                    </div>
                  </div>
                )}

                {!cameraActive && (
                  <>
                    {cameraError && (
                      <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '10px 14px', marginBottom: '12px', fontSize: '12px', color: '#dc2626' }}>
                        {cameraError}
                      </div>
                    )}
                    <button style={s.btn()} onClick={startCamera}>{t.takePhoto}</button>
                    <input ref={galleryInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleGalleryFile} />
                    <button style={s.btn('ghost')} onClick={() => galleryInputRef.current?.click()}>{t.gallery}</button>
                  </>
                )}
              </>
            )}

            {addTab === 'audio' && (
              <>
                {!recording && !audioURL && <button style={s.btn()} onClick={startRecording}>{t.startRec}</button>}
                {recording && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', padding: '10px', background: '#fef2f2', borderRadius: '8px' }}>
                      <div style={{ width: '10px', height: '10px', background: '#ef4444', borderRadius: '50%', animation: 'pulse 1s infinite' }} />
                      <span style={{ fontSize: '13px', color: '#dc2626', fontWeight: '500' }}>Recording...</span>
                    </div>
                    <button style={s.btn('danger')} onClick={stopRecording}>{t.stopRec}</button>
                  </div>
                )}
                {audioURL && (
                  <>
                    <audio controls src={audioURL} style={{ width: '100%', marginBottom: '12px' }} />
                    <button style={s.btn()} onClick={saveAudioEntry}>{t.saveRec}</button>
                    <button style={s.btn('ghost')} onClick={() => setAudioURL('')}>{t.reRec}</button>
                  </>
                )}
              </>
            )}

            <div style={{ textAlign: 'center', fontSize: '10px', color: '#94a3b8', marginTop: '8px' }}>{t.encrypted}</div>
          </>
        )}

        {/* ── VIEW ENTRY ── */}
        {view === 'viewEntry' && selectedEntry && (
          <div style={s.card}>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '10px' }}>{selectedEntry.date}</div>
            {selectedEntry.type === 'note' && <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{selectedEntry.text}</p>}
            {selectedEntry.type === 'photo' && <img src={selectedEntry.dataURL} alt="evidence" style={{ width: '100%', borderRadius: '10px' }} />}
            {selectedEntry.type === 'audio' && <audio controls src={selectedEntry.audioURL} style={{ width: '100%' }} />}
            <button style={{ ...s.btn('danger'), marginTop: '16px' }} onClick={() => { saveEntries(entries.filter((e) => e.id !== selectedEntry.id)); setView('log'); }}>
              {t.deleteEntry}
            </button>
          </div>
        )}

        {/* ── EMERGENCY ── */}
        {view === 'emergency' && (
          <>
            <button style={s.btn('alarm')} onClick={toggleAlarm}>{alarmActive ? t.alarmOff : t.alarm}</button>

            <div style={s.card}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>{t.addContact}</div>
              <input style={s.input} placeholder={t.namePlaceholder} value={newName} onChange={(e) => setNewName(e.target.value)} />
              <input style={s.input} placeholder={t.phonePlaceholder} value={newPhone} onChange={(e) => setNewPhone(e.target.value)} type="tel" />
              <button style={{ ...s.btn(), marginBottom: 0 }} onClick={addContact}>{t.addBtn}</button>
            </div>

            <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '8px', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t.builtInHelplines}</div>
            {BUILT_IN.map((c) => (
              <ContactCard key={c.phone} name={c.name} phone={c.phone} callLabel={t.call} />
            ))}

            {contacts.length > 0 && (
              <>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', margin: '14px 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t.myContacts}</div>
                {contacts.map((c) => (
                  <ContactCard key={c.id} name={c.name} phone={c.phone} callLabel={t.call} onDelete={() => saveContacts(contacts.filter((x) => x.id !== c.id))} />
                ))}
              </>
            )}
          </>
        )}
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}

function ContactCard({ name, phone, callLabel, onDelete }) {
  return (
    <div style={{ background: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '12px 14px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>{name}</div>
        <div style={{ fontSize: '13px', color: '#0ea5e9', marginTop: '2px' }}>{phone}</div>
      </div>
      <div style={{ display: 'flex', gap: '6px' }}>
        <a href={`tel:${phone}`} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '7px 12px', background: '#dcfce7', border: '1px solid #86efac', borderRadius: '8px', fontSize: '12px', color: '#15803d', fontWeight: '700', textDecoration: 'none' }}>
          {callLabel}
        </a>
        {onDelete && (
          <button onClick={onDelete} style={{ padding: '7px 10px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', color: '#dc2626' }}>🗑</button>
        )}
      </div>
    </div>
  );
}

export default EvidenceVault;