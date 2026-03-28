// // src/components/AllyMode.js
// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';

// const API = 'http://localhost:8000';

// const INITIAL_OPTIONS = [
//   "I've noticed physical signs (bruises, injuries)",
//   "Their partner controls their money or movement",
//   "They seem scared or withdrawn around their partner",
//   "They've told me something is wrong",
//   "I'm not sure — something just feels off",
// ];

// function AllyMode({ language }) {
//   const [started, setStarted] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [inputText, setInputText] = useState('');
//   const [context, setContext] = useState({});
//   const bottomRef = useRef(null);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const startAllyMode = () => {
//     setStarted(true);
//     setMessages([
//       {
//         role: 'assistant',
//         type: 'text',
//         content:
//           "I'm glad you're here — looking out for someone takes courage. Let me help you understand the situation and know exactly what to do. I'll ask a few questions and give you practical, specific steps.\n\nFirst — what have you noticed?",
//       },
//       {
//         role: 'assistant',
//         type: 'options',
//         content: '',
//         options: INITIAL_OPTIONS,
//         questionId: 'initial_observation',
//       },
//     ]);
//   };

//   const handleOptionSelect = async (option, questionId) => {
//     const newContext = { ...context, [questionId]: option };
//     setContext(newContext);

//     const userMsg = { role: 'user', type: 'text', content: option };
//     const updatedMessages = [...messages, userMsg];
//     setMessages(updatedMessages);
//     setLoading(true);

//     try {
//       const res = await axios.post(`${API}/ally-chat`, {
//         language,
//         context: newContext,
//         lastAnswer: option,
//         questionId,
//         history: updatedMessages.slice(-8).map((m) => ({ role: m.role, content: m.content })),
//       });

//       const data = res.data;
//       const newMsgs = [
//         ...updatedMessages,
//         { role: 'assistant', type: 'pointwise', content: data.reply },
//       ];
//       if (data.followUpQuestion && data.options) {
//         newMsgs.push({
//           role: 'assistant',
//           type: 'options',
//           content: data.followUpQuestion,
//           options: data.options,
//           questionId: data.nextQuestionId || 'followup_' + Date.now(),
//         });
//       }
//       setMessages(newMsgs);
//     } catch {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: 'assistant',
//           type: 'text',
//           content: "I couldn't connect right now. Call 1091 (Women Helpline) or 100 (Police) if there's immediate danger.",
//         },
//       ]);
//     }
//     setLoading(false);
//   };

//   const sendFreeText = async () => {
//     if (!inputText.trim()) return;
//     const text = inputText.trim();
//     setInputText('');

//     const userMsg = { role: 'user', type: 'text', content: text };
//     const updatedMessages = [...messages, userMsg];
//     setMessages(updatedMessages);
//     setLoading(true);

//     try {
//       const res = await axios.post(`${API}/ally-chat`, {
//         language,
//         context,
//         lastAnswer: text,
//         questionId: 'freetext',
//         history: updatedMessages.slice(-8).map((m) => ({ role: m.role, content: m.content })),
//       });

//       const data = res.data;
//       const newMsgs = [
//         ...updatedMessages,
//         { role: 'assistant', type: 'pointwise', content: data.reply },
//       ];
//       if (data.followUpQuestion && data.options) {
//         newMsgs.push({
//           role: 'assistant',
//           type: 'options',
//           content: data.followUpQuestion,
//           options: data.options,
//           questionId: data.nextQuestionId || 'followup_' + Date.now(),
//         });
//       }
//       setMessages(newMsgs);
//     } catch {
//       setMessages((prev) => [
//         ...prev,
//         { role: 'assistant', type: 'text', content: 'Something went wrong. Please try again.' },
//       ]);
//     }
//     setLoading(false);
//   };

//   const s = {
//     wrap: { height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc', fontFamily: "'Segoe UI', sans-serif" },
//     header: {
//       background: '#fff',
//       borderBottom: '1px solid #e2e8f0',
//       padding: '14px 20px',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '10px',
//     },
//     bubble: (role) => ({
//       maxWidth: '82%',
//       padding: '12px 16px',
//       borderRadius: role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
//       background: role === 'user' ? '#0ea5e9' : '#fff',
//       border: role === 'user' ? 'none' : '1px solid #e2e8f0',
//       color: role === 'user' ? '#fff' : '#0f172a',
//       fontSize: '14px',
//       lineHeight: '1.6',
//       boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
//       whiteSpace: 'pre-wrap',
//     }),
//     optionBtn: {
//       display: 'block',
//       width: '100%',
//       textAlign: 'left',
//       padding: '11px 14px',
//       marginBottom: '8px',
//       background: '#f0fdf4',
//       border: '1.5px solid #bbf7d0',
//       borderRadius: '10px',
//       cursor: 'pointer',
//       fontSize: '13px',
//       color: '#15803d',
//       fontWeight: '500',
//       transition: 'all 0.15s',
//     },
//   };

//   if (!started) {
//     return (
//       <div style={{ ...s.wrap, alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>
//         <div style={{ textAlign: 'center', maxWidth: '340px' }}>
//           <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤝</div>
//           <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>
//             Supporting Others
//           </h2>
//           <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px', lineHeight: '1.7' }}>
//             Essential guidance and resources for friends, family, and allies of survivors. I'll help you take the right steps — practically and safely.
//           </p>
//           <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '16px', marginBottom: '20px', textAlign: 'left' }}>
//             <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
//               <span style={{ fontSize: '18px' }}>💬</span>
//               <div>
//                 <div style={{ fontWeight: '600', fontSize: '13px', color: '#0f172a' }}>Conversation Scripts</div>
//                 <div style={{ fontSize: '12px', color: '#64748b' }}>Exactly what to say and how to say it.</div>
//               </div>
//             </div>
//             <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
//               <span style={{ fontSize: '18px' }}>📋</span>
//               <div>
//                 <div style={{ fontWeight: '600', fontSize: '13px', color: '#0f172a' }}>Practical Steps</div>
//                 <div style={{ fontSize: '12px', color: '#64748b' }}>Point-by-point actions you can take right now.</div>
//               </div>
//             </div>
//             <div style={{ display: 'flex', gap: '10px' }}>
//               <span style={{ fontSize: '18px' }}>🔒</span>
//               <div>
//                 <div style={{ fontWeight: '600', fontSize: '13px', color: '#0f172a' }}>Local Privacy Mode Active</div>
//                 <div style={{ fontSize: '12px', color: '#64748b' }}>Data stored locally on this device only.</div>
//               </div>
//             </div>
//           </div>
//           <button
//             onClick={startAllyMode}
//             style={{ width: '100%', padding: '14px', background: '#0ea5e9', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}
//           >
//             Get Guidance →
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={s.wrap}>
//       {/* Header */}
//       <div style={s.header}>
//         <span style={{ fontSize: '20px' }}>🤝</span>
//         <div>
//           <div style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>Ally Mode</div>
//           <div style={{ fontSize: '11px', color: '#94a3b8' }}>Supporting someone safely</div>
//         </div>
//         <div style={{
//           marginLeft: 'auto',
//           background: '#f0fdf4',
//           border: '1px solid #bbf7d0',
//           borderRadius: '20px',
//           padding: '4px 10px',
//           fontSize: '11px',
//           color: '#16a34a',
//           fontWeight: '500',
//         }}>
//           🔒 Local Privacy Mode Active
//         </div>
//       </div>

//       {/* Messages */}
//       <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             style={{
//               display: 'flex',
//               justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
//               flexDirection: 'column',
//               alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
//             }}
//           >
//             {(msg.type === 'text' || msg.type === 'welcome') && (
//               <div style={s.bubble(msg.role)}>{msg.content}</div>
//             )}

//             {msg.type === 'pointwise' && (
//               <div style={s.bubble(msg.role)}>
//                 <PointwiseRenderer content={msg.content} />
//               </div>
//             )}

//             {msg.type === 'options' && (
//               <div style={{ maxWidth: '90%', width: '100%' }}>
//                 {msg.content ? (
//                   <div style={{ ...s.bubble('assistant'), marginBottom: '10px' }}>{msg.content}</div>
//                 ) : null}
//                 {i === messages.length - 1 && (
//                   <div>
//                     {msg.options.map((opt, j) => (
//                       <button
//                         key={j}
//                         style={s.optionBtn}
//                         onClick={() => handleOptionSelect(opt, msg.questionId)}
//                         disabled={loading}
//                         onMouseOver={(e) => { e.currentTarget.style.background = '#dcfce7'; }}
//                         onMouseOut={(e) => { e.currentTarget.style.background = '#f0fdf4'; }}
//                       >
//                         {opt}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}

//         {loading && (
//           <div style={{ color: '#94a3b8', fontSize: '13px', padding: '4px 8px' }}>
//             SafeVoice is thinking...
//           </div>
//         )}
//         <div ref={bottomRef} />
//       </div>

//       {/* Input */}
//       <div style={{ padding: '12px 16px', background: '#fff', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
//         <textarea
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//           onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendFreeText(); } }}
//           placeholder="Describe what you've noticed, or ask anything..."
//           rows={2}
//           style={{ flex: 1, padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '14px', resize: 'none', outline: 'none', color: '#0f172a' }}
//         />
//         <button
//           onClick={sendFreeText}
//           disabled={loading}
//           style={{ background: '#0ea5e9', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', fontSize: '18px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//         >
//           ➤
//         </button>
//       </div>
//       <div style={{ textAlign: 'center', fontSize: '10px', color: '#cbd5e1', padding: '6px', background: '#fff' }}>
//         CONFIDENTIAL AI ASSISTANT · ALWAYS VERIFY LEGAL ADVICE WITH A PROFESSIONAL
//       </div>
//     </div>
//   );
// }

// function PointwiseRenderer({ content }) {
//   if (!content) return null;
//   const lines = content.split('\n').filter((l) => l.trim());
//   return (
//     <div>
//       {lines.map((line, i) => {
//         const isNumbered = /^\d+\./.test(line.trim());
//         const isBullet = /^[-•*]/.test(line.trim());
//         const isHeader = line.trim().startsWith('**') && line.trim().endsWith('**');
//         if (isHeader) {
//           return (
//             <div key={i} style={{ fontWeight: '700', color: '#0f172a', marginTop: '10px', marginBottom: '4px', fontSize: '13px' }}>
//               {line.replace(/\*\*/g, '')}
//             </div>
//           );
//         }
//         if (isNumbered || isBullet) {
//           return (
//             <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '7px', paddingLeft: '4px' }}>
//               <span style={{ color: '#16a34a', fontWeight: '700', minWidth: '18px', fontSize: '13px' }}>
//                 {isNumbered ? line.trim().match(/^\d+/)[0] + '.' : '•'}
//               </span>
//               <span style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5' }}>
//                 {line.replace(/^\d+\.|^[-•*]/, '').trim()}
//               </span>
//             </div>
//           );
//         }
//         return (
//           <p key={i} style={{ fontSize: '13px', color: '#334155', lineHeight: '1.6', marginBottom: '6px' }}>
//             {line}
//           </p>
//         );
//       })}
//     </div>
//   );
// }

// export default AllyMode;








// src/components/AllyMode.js
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:8000';

const UI_TEXT = {
  en: {
    title: 'Supporting Others',
    subtitle: 'Essential guidance for friends, family, and allies of survivors.',
    card1Title: 'Conversation Scripts',
    card1Desc: 'Exactly what to say — and what not to say.',
    card2Title: 'Practical Steps',
    card2Desc: 'Point-by-point actions you can take right now.',
    card3Title: 'Local Privacy Active',
    card3Desc: 'Data stored only on this device.',
    start: 'Get Guidance →',
    headerSub: 'Supporting someone safely',
    privacy: 'Local Privacy Mode Active',
    thinking: 'Thinking of the best way to help...',
    placeholder: 'Describe what you noticed, or ask anything...',
    footer: 'CONFIDENTIAL AI ASSISTANT · ALWAYS VERIFY LEGAL ADVICE WITH A PROFESSIONAL',
    doThisLabel: '✅ Do This Today',
    firstMsg: "I'm really glad you're here — looking out for someone takes a lot of courage and love. Let me help you understand what's happening and what you can actually do.\n\nFirst question — what's your relationship to this person?",
    firstOptions: [
      "She's my close friend",
      "She's my sister / family member",
      "She's my colleague / neighbour",
      "She's my daughter / younger relative",
    ],
  },
  kn: {
    title: 'ಇತರರನ್ನು ಬೆಂಬಲಿಸುವುದು',
    subtitle: 'ಸ್ನೇಹಿತರು, ಕುಟುಂಬ ಮತ್ತು ಸಹಯೋಗಿಗಳಿಗೆ ಅಗತ್ಯ ಮಾರ್ಗದರ್ಶನ.',
    card1Title: 'ಮಾತನಾಡುವ ಸ್ಕ್ರಿಪ್ಟ್‌ಗಳು',
    card1Desc: 'ನಿಖರವಾಗಿ ಏನು ಹೇಳಬೇಕು ಎಂಬುದು.',
    card2Title: 'ಪ್ರಾಯೋಗಿಕ ಹೆಜ್ಜೆಗಳು',
    card2Desc: 'ಈಗ ತೆಗೆದುಕೊಳ್ಳಬಹುದಾದ ಕ್ರಮಗಳು.',
    card3Title: 'ಸ್ಥಳೀಯ ಗೋಪ್ಯತೆ ಸಕ್ರಿಯ',
    card3Desc: 'ಡೇಟಾ ಈ ಸಾಧನದಲ್ಲಿ ಮಾತ್ರ ಸಂಗ್ರಹಿಸಲ್ಪಟ್ಟಿದೆ.',
    start: 'ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ →',
    headerSub: 'ಯಾರನ್ನಾದರೂ ಸುರಕ್ಷಿತವಾಗಿ ಬೆಂಬಲಿಸುವುದು',
    privacy: 'ಸ್ಥಳೀಯ ಗೋಪ್ಯತೆ ಮೋಡ್ ಸಕ್ರಿಯ',
    thinking: 'ಸಹಾಯ ಮಾಡಲು ಉತ್ತಮ ಮಾರ್ಗ ಯೋಚಿಸುತ್ತಿದ್ದೇನೆ...',
    placeholder: 'ನೀವು ಏನು ಗಮನಿಸಿದ್ದೀರಿ ಅಥವಾ ಯಾವ ಪ್ರಶ್ನೆ ಇದೆ...',
    footer: 'ರಹಸ್ಯ AI ಸಹಾಯಕ · ವೃತ್ತಿಪರರೊಂದಿಗೆ ಕಾನೂನು ಸಲಹೆ ಪರಿಶೀಲಿಸಿ',
    doThisLabel: '✅ ಇಂದು ಈ ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳಿ',
    firstMsg: 'ನೀವು ಇಲ್ಲಿದ್ದೀರಿ ಎಂದು ತುಂಬಾ ಸಂತೋಷ — ಯಾರನ್ನಾದರೂ ಕಾಳಜಿ ಮಾಡುವುದು ಧೈರ್ಯ ಮತ್ತು ಪ್ರೀತಿಯ ಕೆಲಸ. ನಿಮಗೆ ಸರಿಯಾದ ಮಾರ್ಗದರ್ಶನ ಕೊಡಲು, ಮೊದಲು ಹೇಳಿ — ಆ ವ್ಯಕ್ತಿಯೊಂದಿಗೆ ನಿಮ್ಮ ಸಂಬಂಧ ಏನು?',
    firstOptions: [
      'ಅವರು ನನ್ನ ಆತ್ಮೀಯ ಸ್ನೇಹಿತೆ',
      'ಅವರು ನನ್ನ ಅಕ್ಕ / ಕುಟುಂಬ',
      'ಅವರು ನನ್ನ ಸಹೋದ್ಯೋಗಿ / ನೆರೆಮನೆಯವರು',
      'ಅವರು ನನ್ನ ಮಗಳು / ಕಿರಿಯ ಸಂಬಂಧಿ',
    ],
  },
  hi: {
    title: 'दूसरों का साथ देना',
    subtitle: 'दोस्तों, परिवार और सहयोगियों के लिए जरूरी मार्गदर्शन।',
    card1Title: 'बातचीत की स्क्रिप्ट',
    card1Desc: 'बिल्कुल सही शब्द — क्या कहें, क्या न कहें।',
    card2Title: 'व्यावहारिक कदम',
    card2Desc: 'अभी लिए जा सकने वाले ठोस कदम।',
    card3Title: 'स्थानीय गोपनीयता सक्रिय',
    card3Desc: 'डेटा सिर्फ इस डिवाइस पर है।',
    start: 'मार्गदर्शन पाएं →',
    headerSub: 'किसी का सुरक्षित साथ देना',
    privacy: 'स्थानीय गोपनीयता मोड सक्रिय',
    thinking: 'मदद का सबसे अच्छा तरीका सोच रही हूं...',
    placeholder: 'आपने क्या देखा, या कोई सवाल है...',
    footer: 'गोपनीय AI सहायक · कानूनी सलाह किसी विशेषज्ञ से जाँचें',
    doThisLabel: '✅ आज यह करें',
    firstMsg: 'मुझे खुशी है कि आप यहाँ हैं — किसी की परवाह करना हिम्मत और प्यार का काम है। आपको सही मार्गदर्शन देने के लिए, पहले बताइए — उस व्यक्ति से आपका क्या रिश्ता है?',
    firstOptions: [
      'वो मेरी करीबी दोस्त है',
      'वो मेरी बहन / परिवार की सदस्य है',
      'वो मेरी सहकर्मी / पड़ोसी है',
      'वो मेरी बेटी / छोटी रिश्तेदार है',
    ],
  },
  te: {
    title: 'ఇతరులకు మద్దతు ఇవ్వడం',
    subtitle: 'స్నేహితులు, కుటుంబం మరియు సహాయకుల కోసం అవసరమైన మార్గదర్శకం.',
    card1Title: 'సంభాషణ స్క్రిప్ట్‌లు',
    card1Desc: 'ఖచ్చితంగా ఏమి చెప్పాలో తెలుసుకోండి.',
    card2Title: 'ఆచరణాత్మక చర్యలు',
    card2Desc: 'ఇప్పుడే తీసుకోగలిగే నిర్దిష్ట చర్యలు.',
    card3Title: 'స్థానిక గోప్యత సక్రియం',
    card3Desc: 'డేటా ఈ పరికరంలో మాత్రమే నిల్వ అవుతుంది.',
    start: 'మార్గదర్శకం పొందండి →',
    headerSub: 'ఒకరిని సురక్షితంగా సహాయం చేయడం',
    privacy: 'స్థానిక గోప్యత మోడ్ సక్రియం',
    thinking: 'సహాయానికి ఉత్తమ మార్గం ఆలోచిస్తున్నాను...',
    placeholder: 'మీరు ఏమి గమనించారు లేదా ప్రశ్న ఉంటే...',
    footer: 'రహస్య AI సహాయకుడు · నిపుణులతో చట్టపరమైన సలహా నిర్ధారించుకోండి',
    doThisLabel: '✅ ఈరోజు ఇది చేయండి',
    firstMsg: 'మీరు ఇక్కడ ఉన్నారు అంటే చాలా సంతోషం — ఒకరిని పట్టించుకోవడం ధైర్యం మరియు ప్రేమ. మీకు సరైన మార్గదర్శకం ఇవ్వడానికి, ముందు చెప్పండి — ఆ వ్యక్తితో మీ సంబంధం ఏమిటి?',
    firstOptions: [
      'ఆమె నా親密ైన స్నేహితురాలు',
      'ఆమె నా అక్క / కుటుంబ సభ్యురాలు',
      'ఆమె నా సహోద్యోగి / పొరుగువారు',
      'ఆమె నా కూతురు / చిన్న బంధువు',
    ],
  },
};

function AllyMode({ language }) {
  const t = UI_TEXT[language] || UI_TEXT.en;
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [context, setContext] = useState({});
  const [doThisCard, setDoThisCard] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startAllyMode = () => {
    setStarted(true);
    setMessages([
      { role: 'assistant', type: 'text', content: t.firstMsg },
      { role: 'assistant', type: 'options', content: '', options: t.firstOptions, questionId: 'relationship' },
    ]);
  };

  const handleOptionSelect = async (option, questionId) => {
    const newContext = { ...context, [questionId]: option };
    setContext(newContext);
    const userMsg = { role: 'user', type: 'text', content: option };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setLoading(true);
    try {
      const res = await axios.post(`${API}/ally-chat`, {
        language,
        context: newContext,
        lastAnswer: option,
        questionId,
        history: updatedMessages.slice(-10).map((m) => ({ role: m.role, content: m.content })),
      });
      const data = res.data;
      if (data.doThis) setDoThisCard(data.doThis);
      const newMsgs = [...updatedMessages, { role: 'assistant', type: 'pointwise', content: data.reply }];
      if (data.followUpQuestion && data.options) {
        newMsgs.push({ role: 'assistant', type: 'options', content: data.followUpQuestion, options: data.options, questionId: data.nextQuestionId || 'followup_' + Date.now() });
      }
      setMessages(newMsgs);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', type: 'text', content: language === 'kn' ? 'ಸಂಪರ್ಕ ಸಮಸ್ಯೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.' : language === 'hi' ? 'कनेक्शन में समस्या। कृपया दोबारा कोशिश करें।' : 'Connection issue. Please try again.' }]);
    }
    setLoading(false);
  };

  const sendFreeText = async () => {
    if (!inputText.trim()) return;
    const text = inputText.trim();
    setInputText('');
    const userMsg = { role: 'user', type: 'text', content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setLoading(true);
    try {
      const res = await axios.post(`${API}/ally-chat`, {
        language,
        context,
        lastAnswer: text,
        questionId: 'freetext',
        history: updatedMessages.slice(-10).map((m) => ({ role: m.role, content: m.content })),
      });
      const data = res.data;
      if (data.doThis) setDoThisCard(data.doThis);
      const newMsgs = [...updatedMessages, { role: 'assistant', type: 'pointwise', content: data.reply }];
      if (data.followUpQuestion && data.options) {
        newMsgs.push({ role: 'assistant', type: 'options', content: data.followUpQuestion, options: data.options, questionId: data.nextQuestionId || 'followup_' + Date.now() });
      }
      setMessages(newMsgs);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', type: 'text', content: 'Something went wrong. Please try again.' }]);
    }
    setLoading(false);
  };

  const s = {
    wrap: { height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc', fontFamily: "'Segoe UI', sans-serif" },
    bubble: (role) => ({
      maxWidth: '82%',
      padding: '13px 16px',
      borderRadius: role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
      background: role === 'user' ? '#0ea5e9' : '#fff',
      border: role === 'user' ? 'none' : '1px solid #e2e8f0',
      color: role === 'user' ? '#fff' : '#0f172a',
      fontSize: '14px',
      lineHeight: '1.65',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      whiteSpace: 'pre-wrap',
    }),
    optionBtn: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      padding: '12px 14px',
      marginBottom: '8px',
      background: '#f0fdf4',
      border: '1.5px solid #bbf7d0',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '13px',
      color: '#15803d',
      fontWeight: '500',
      transition: 'all 0.15s',
      lineHeight: '1.4',
    },
  };

  if (!started) {
    return (
      <div style={{ ...s.wrap, alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '360px', width: '100%' }}>
          <div style={{ fontSize: '52px', marginBottom: '16px' }}>🤝</div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>{t.title}</h2>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px', lineHeight: '1.7' }}>{t.subtitle}</p>
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '18px', marginBottom: '22px', textAlign: 'left' }}>
            {[
              { icon: '💬', title: t.card1Title, desc: t.card1Desc },
              { icon: '📋', title: t.card2Title, desc: t.card2Desc },
              { icon: '🔒', title: t.card3Title, desc: t.card3Desc },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: i < 2 ? '14px' : '0' }}>
                <span style={{ fontSize: '20px' }}>{c.icon}</span>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '13px', color: '#0f172a' }}>{c.title}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={startAllyMode}
            style={{ width: '100%', padding: '15px', background: '#0ea5e9', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}
          >
            {t.start}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={s.wrap}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '13px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '20px' }}>🤝</span>
        <div>
          <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>{t.title}</div>
          <div style={{ fontSize: '11px', color: '#94a3b8' }}>{t.headerSub}</div>
        </div>
        <div style={{ marginLeft: 'auto', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '20px', padding: '4px 10px', fontSize: '11px', color: '#16a34a', fontWeight: '500' }}>
          🔒 {t.privacy}
        </div>
      </div>

      {/* doThis card — sticky */}
      {doThisCard && (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderBottom: '1px solid #bbf7d0', padding: '10px 16px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#15803d', whiteSpace: 'nowrap' }}>{t.doThisLabel}</span>
          <p style={{ fontSize: '13px', color: '#15803d', margin: 0, lineHeight: '1.5' }}>{doThisCard}</p>
        </div>
      )}

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            {(msg.type === 'text' || msg.type === 'welcome') && (
              <div style={s.bubble(msg.role)}>{msg.content}</div>
            )}
            {msg.type === 'pointwise' && (
              <div style={{ ...s.bubble('assistant'), maxWidth: '88%' }}>
                <PointwiseRenderer content={msg.content} />
              </div>
            )}
            {msg.type === 'options' && (
              <div style={{ maxWidth: '90%', width: '100%' }}>
                {msg.content ? <div style={{ ...s.bubble('assistant'), marginBottom: '10px' }}>{msg.content}</div> : null}
                {i === messages.length - 1 && (
                  <div>
                    {msg.options.map((opt, j) => (
                      <button
                        key={j}
                        style={s.optionBtn}
                        onClick={() => handleOptionSelect(opt, msg.questionId)}
                        disabled={loading}
                        onMouseOver={(e) => { e.currentTarget.style.background = '#dcfce7'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = '#f0fdf4'; }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: '7px', height: '7px', background: '#22c55e', borderRadius: '50%', animation: `bounce 1.2s ${i * 0.2}s infinite` }} />
              ))}
            </div>
            <span style={{ color: '#94a3b8', fontSize: '13px' }}>{t.thinking}</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '12px 16px', background: '#fff', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendFreeText(); } }}
          placeholder={t.placeholder}
          rows={2}
          style={{ flex: 1, padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '14px', resize: 'none', outline: 'none', color: '#0f172a', background: '#f8fafc' }}
        />
        <button
          onClick={sendFreeText}
          disabled={loading}
          style={{ background: '#0ea5e9', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', fontSize: '18px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
        >
          ➤
        </button>
      </div>
      <div style={{ textAlign: 'center', fontSize: '10px', color: '#cbd5e1', padding: '6px', background: '#fff' }}>{t.footer}</div>
      <style>{`@keyframes bounce { 0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)} }`}</style>
    </div>
  );
}

function PointwiseRenderer({ content }) {
  if (!content) return null;
  const lines = content.split('\n').filter((l) => l.trim());
  return (
    <div>
      {lines.map((line, i) => {
        const trimmed = line.trim();
        const isNumbered = /^\d+[.)]\s/.test(trimmed);
        const isBullet = /^[-•*]\s/.test(trimmed);
        const isHeader = trimmed.startsWith('**') && trimmed.endsWith('**');
        if (isHeader) {
          return (
            <div key={i} style={{ fontWeight: '700', color: '#0f172a', marginTop: '12px', marginBottom: '6px', fontSize: '13px', borderLeft: '3px solid #22c55e', paddingLeft: '8px' }}>
              {trimmed.replace(/\*\*/g, '')}
            </div>
          );
        }
        if (isNumbered) {
          const num = trimmed.match(/^(\d+)/)[0];
          const rest = trimmed.replace(/^\d+[.)]\s*/, '');
          return (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'flex-start' }}>
              <span style={{ background: '#22c55e', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', flexShrink: 0, marginTop: '2px' }}>{num}</span>
              <span style={{ fontSize: '13px', color: '#334155', lineHeight: '1.6' }}>{rest}</span>
            </div>
          );
        }
        if (isBullet) {
          return (
            <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px', paddingLeft: '4px' }}>
              <span style={{ color: '#22c55e', fontWeight: '700', fontSize: '14px', flexShrink: 0 }}>•</span>
              <span style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5' }}>{trimmed.replace(/^[-•*]\s/, '')}</span>
            </div>
          );
        }
        return (
          <p key={i} style={{ fontSize: '13px', color: '#334155', lineHeight: '1.65', marginBottom: '8px' }}>{trimmed}</p>
        );
      })}
    </div>
  );
}

export default AllyMode;