
// // src/components/ChatScreen.js
// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';

// const API = 'http://localhost:8000';

// const UI_TEXT = {
//   en: {
//     sessionActive: 'Private Session Active',
//     sessionTitle: 'Secure Session Active',
//     sessionSub: 'Your messages are processed locally and not stored on our servers. Remember to clear your browser history or use Exit Now if interrupted.',
//     saveConv: '💾 SAVE CONVERSATION',
//     saveVault: '💾 SAVE TO VAULT',
//     copySteps: '📋 COPY STEPS',
//     listen: '🔊 LISTEN',
//     localSupport: '📍 LOCAL SUPPORT',
//     thinking: 'SafeVoice is thinking...',
//     placeholder: "Type safely — keep messages short",
//     footer: 'CONFIDENTIAL AI ASSISTANT · ALWAYS VERIFY LEGAL ADVICE WITH A PROFESSIONAL',
//     sidebar: 'Safety & Legal Tips',
//     savedMsg: 'Saved to Vault!',
//     quickQs: [
//       'What is a restraining order?',
//       'Can I take my children with me?',
//       'How to document evidence safely?',
//       'Free legal aid near me',
//     ],
//     sidebarTips: [
//       { icon: '💸', title: 'What is Financial Abuse?', body: 'Controlling your access to money, preventing you from working, or making you ask for every penny are red flags of abuse.' },
//       { icon: '📸', title: 'Evidence Privacy', body: "Always save sensitive screenshots to the SafeVoice Vault rather than your phone's photo gallery." },
//       { icon: '📞', title: 'Local Support Lines', body: 'If you need immediate shelter or a human to talk to, we have vetted local organisations available.' },
//       { icon: '⚡', title: 'Quick Tip', body: "If you're in immediate danger, please call 112. This chat is for legal information and guidance only." },
//     ],
//     welcomeMsg: "I'm here with you. Tell me what's happening — I'm not just going to give you a list of helplines. I actually want to help you understand your situation and your rights. What's going on?",
//   },
//   kn: {
//     sessionActive: 'ಖಾಸಗಿ ಸೆಷನ್ ಸಕ್ರಿಯ',
//     sessionTitle: 'ಸುರಕ್ಷಿತ ಸೆಷನ್ ಸಕ್ರಿಯ',
//     sessionSub: 'ನಿಮ್ಮ ಸಂದೇಶಗಳು ಸ್ಥಳೀಯವಾಗಿ ಪ್ರಕ್ರಿಯೆಗೊಳ್ಳುತ್ತವೆ ಮತ್ತು ನಮ್ಮ ಸರ್ವರ್‌ಗಳಲ್ಲಿ ಸಂಗ್ರಹಿಸಲ್ಪಡುವುದಿಲ್ಲ.',
//     saveConv: '💾 ಸಂಭಾಷಣೆ ಉಳಿಸಿ',
//     saveVault: '💾 ಭಂಡಾರಕ್ಕೆ ಉಳಿಸಿ',
//     copySteps: '📋 ಹೆಜ್ಜೆಗಳು ನಕಲಿಸಿ',
//     listen: '🔊 ಕೇಳಿ',
//     localSupport: '📍 ಸ್ಥಳೀಯ ಬೆಂಬಲ',
//     thinking: 'SafeVoice ಯೋಚಿಸುತ್ತಿದೆ...',
//     placeholder: 'ಸುರಕ್ಷಿತವಾಗಿ ಟೈಪ್ ಮಾಡಿ...',
//     footer: 'ರಹಸ್ಯ AI ಸಹಾಯಕ · ಕಾನೂನು ಸಲಹೆಯನ್ನು ವೃತ್ತಿಪರರೊಂದಿಗೆ ಪರಿಶೀಲಿಸಿ',
//     sidebar: 'ಸುರಕ್ಷತೆ ಮತ್ತು ಕಾನೂನು ಸಲಹೆಗಳು',
//     savedMsg: 'ಭಂಡಾರಕ್ಕೆ ಉಳಿಸಲಾಗಿದೆ!',
//     quickQs: [
//       'ನಿರ್ಬಂಧ ಆದೇಶ ಏನು?',
//       'ನಾನು ಮಕ್ಕಳನ್ನು ಕರೆದೊಯ್ಯಬಹುದೇ?',
//       'ಸಾಕ್ಷ್ಯ ಹೇಗೆ ದಾಖಲಿಸುವುದು?',
//       'ಉಚಿತ ಕಾನೂನು ನೆರವು ಹತ್ತಿರ',
//     ],
//     sidebarTips: [
//       { icon: '💸', title: 'ಆರ್ಥಿಕ ದುರ್ಬಳಕೆ ಎಂದರೇನು?', body: 'ಹಣಕ್ಕೆ ನಿಮ್ಮ ಪ್ರವೇಶ ನಿಯಂತ್ರಿಸುವುದು, ಕೆಲಸ ಮಾಡದಂತೆ ತಡೆಯುವುದು ದುರ್ಬಳಕೆ.' },
//       { icon: '📸', title: 'ಸಾಕ್ಷ್ಯ ಗೋಪ್ಯತೆ', body: 'ಸಂವೇದನಾಶೀಲ ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳನ್ನು SafeVoice Vault ನಲ್ಲಿ ಉಳಿಸಿ.' },
//       { icon: '📞', title: 'ಸ್ಥಳೀಯ ಬೆಂಬಲ ರೇಖೆಗಳು', body: 'ತಕ್ಷಣ ಆಶ್ರಯ ಅಗತ್ಯವಿದ್ದರೆ 181 ಕರೆ ಮಾಡಿ.' },
//       { icon: '⚡', title: 'ತ್ವರಿತ ಸಲಹೆ', body: 'ತಕ್ಷಣದ ಅಪಾಯದಲ್ಲಿದ್ದರೆ 112 ಕರೆ ಮಾಡಿ.' },
//     ],
//     welcomeMsg: 'ನಾನು ನಿಮ್ಮೊಂದಿಗಿದ್ದೇನೆ. ಏನಾಗುತ್ತಿದೆ ಎಂದು ಹೇಳಿ — ನಾನು ಕೇವಲ ಹೆಲ್ಪ್‌ಲೈನ್ ನಂಬರ್ ಕೊಡುವವಳಲ್ಲ. ನಿಮ್ಮ ಸ್ಥಿತಿ ಮತ್ತು ಹಕ್ಕುಗಳನ್ನು ಅರ್ಥ ಮಾಡಿಕೊಳ್ಳಲು ನಿಜವಾಗಿ ಸಹಾಯ ಮಾಡಲು ಬಯಸುತ್ತೇನೆ. ಏನಾಗುತ್ತಿದೆ?',
//   },
//   hi: {
//     sessionActive: 'निजी सत्र सक्रिय',
//     sessionTitle: 'सुरक्षित सत्र सक्रिय',
//     sessionSub: 'आपके संदेश स्थानीय रूप से संसाधित होते हैं और हमारे सर्वर पर संग्रहीत नहीं होते।',
//     saveConv: '💾 बातचीत सेव करें',
//     saveVault: '💾 तिजोरी में सेव करें',
//     copySteps: '📋 कदम कॉपी करें',
//     listen: '🔊 सुनें',
//     localSupport: '📍 स्थानीय सहायता',
//     thinking: 'SafeVoice सोच रही है...',
//     placeholder: 'सुरक्षित रूप से टाइप करें...',
//     footer: 'गोपनीय AI सहायक · कानूनी सलाह किसी विशेषज्ञ से जाँचें',
//     sidebar: 'सुरक्षा और कानूनी सुझाव',
//     savedMsg: 'तिजोरी में सेव हो गया!',
//     quickQs: [
//       'रेस्ट्रेनिंग ऑर्डर क्या है?',
//       'क्या मैं बच्चों को ले जा सकती हूं?',
//       'साक्ष्य कैसे दर्ज करें?',
//       'नजदीकी मुफ़्त कानूनी सहायता',
//     ],
//     sidebarTips: [
//       { icon: '💸', title: 'आर्थिक शोषण क्या है?', body: 'पैसों पर नियंत्रण, काम करने से रोकना, हर पैसे के लिए मांगना — ये सब शोषण है।' },
//       { icon: '📸', title: 'साक्ष्य गोपनीयता', body: 'संवेदनशील स्क्रीनशॉट SafeVoice Vault में सेव करें।' },
//       { icon: '📞', title: 'स्थानीय सहायता लाइनें', body: 'तत्काल आश्रय चाहिए तो 181 पर कॉल करें।' },
//       { icon: '⚡', title: 'त्वरित सुझाव', body: 'तत्काल खतरे में हों तो 112 पर कॉल करें।' },
//     ],
//     welcomeMsg: 'मैं आपके साथ हूं। बताइए क्या हो रहा है — मैं सिर्फ हेल्पलाइन नंबर नहीं दूंगी। मैं सच में आपकी स्थिति और आपके अधिकारों को समझने में मदद करना चाहती हूं। क्या हो रहा है?',
//   },
//   te: {
//     sessionActive: 'ప్రైవేట్ సెషన్ సక్రియం',
//     sessionTitle: 'సురక్షిత సెషన్ సక్రియం',
//     sessionSub: 'మీ సందేశాలు స్థానికంగా ప్రాసెస్ అవుతాయి, మా సర్వర్లలో నిల్వ కావు.',
//     saveConv: '💾 సంభాషణ సేవ్ చేయండి',
//     saveVault: '💾 తిజోరీలో సేవ్ చేయండి',
//     copySteps: '📋 దశలు కాపీ చేయండి',
//     listen: '🔊 వినండి',
//     localSupport: '📍 స్థానిక మద్దతు',
//     thinking: 'SafeVoice ఆలోచిస్తోంది...',
//     placeholder: 'సురక్షితంగా టైప్ చేయండి...',
//     footer: 'రహస్య AI సహాయకుడు · నిపుణులతో చట్టపరమైన సలహా నిర్ధారించుకోండి',
//     sidebar: 'భద్రత మరియు చట్టపరమైన చిట్కాలు',
//     savedMsg: 'తిజోరీలో సేవ్ అయింది!',
//     quickQs: [
//       'నిరోధక ఉత్తర్వు అంటే ఏమిటి?',
//       'నేను పిల్లలను తీసుకెళ్ళవచ్చా?',
//       'సాక్ష్యాలు ఎలా నమోదు చేయాలి?',
//       'దగ్గరలో ఉచిత న్యాయ సహాయం',
//     ],
//     sidebarTips: [
//       { icon: '💸', title: 'ఆర్థిక దుర్వినియోగం అంటే ఏమిటి?', body: 'డబ్బుపై నియంత్రణ, పని చేయకుండా నిరోధించడం — ఇవి దుర్వినియోగం.' },
//       { icon: '📸', title: 'సాక్ష్య గోప్యత', body: 'సంవేదనశీల స్క్రీన్‌షాట్లను SafeVoice Vault లో సేవ్ చేయండి.' },
//       { icon: '📞', title: 'స్థానిక మద్దతు లైన్లు', body: 'తక్షణ ఆశ్రయం కోసం 181 కు కాల్ చేయండి.' },
//       { icon: '⚡', title: 'శీఘ్ర చిట్కా', body: 'తక్షణ ప్రమాదంలో ఉంటే 112 కు కాల్ చేయండి.' },
//     ],
//     welcomeMsg: 'నేను మీతో ఉన్నాను. ఏమి జరుగుతోందో చెప్పండి — నేను కేవలం హెల్ప్‌లైన్ నంబర్లు మాత్రమే ఇవ్వను. మీ పరిస్థితి మరియు హక్కులు అర్థం చేసుకోవడంలో నిజంగా సహాయం చేయాలని ఉంది. ఏమి జరుగుతోంది?',
//   },
// };

// function parseLegalMessage(content) {
//   return (content.includes('LEGAL SUMMARY') || content.includes('IMMEDIATE SAFETY') || content.includes('Legal Summary') || content.includes('Immediate Safety'));
// }

// function StructuredMessage({ content }) {
//   const lines = content.split('\n');
//   const sections = [];
//   let current = { type: 'text', lines: [] };
//   for (const line of lines) {
//     if (/LEGAL SUMMARY|Legal Summary|ಕಾನೂನು ಸಾರಾಂಶ|कानूनी सारांश|చట్టపరమైన సారాంశం/i.test(line)) {
//       if (current.lines.length) sections.push(current);
//       current = { type: 'legal', lines: [] };
//     } else if (/IMMEDIATE SAFETY|Immediate Safety|ತಕ್ಷಣದ ಸುರಕ್ಷತೆ|तुरंत सुरक्षा|తక్షణ భద్రత/i.test(line)) {
//       if (current.lines.length) sections.push(current);
//       current = { type: 'steps', lines: [] };
//     } else if (/NEXT RECOMMENDED|What to do NEXT|ಮುಂದಿನ ಕ್ರಮ|अगला कदम|తదుపరి చర్య/i.test(line)) {
//       if (current.lines.length) sections.push(current);
//       current = { type: 'next', lines: [] };
//     } else {
//       current.lines.push(line);
//     }
//   }
//   if (current.lines.length) sections.push(current);
//   return (
//     <div>
//       {sections.map((sec, i) => {
//         if (sec.type === 'text') {
//           const text = sec.lines.join('\n').trim();
//           if (!text) return null;
//           return <p key={i} style={{ fontSize: '14px', color: '#334155', lineHeight: '1.65', marginBottom: '10px' }}>{text}</p>;
//         }
//         if (sec.type === 'legal') {
//           return (
//             <div key={i} style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
//               <div style={{ fontSize: '11px', fontWeight: '700', color: '#0369a1', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>📋 Legal Summary</div>
//               <p style={{ fontSize: '13px', color: '#0c4a6e', lineHeight: '1.6', margin: 0 }}>{sec.lines.join(' ').trim()}</p>
//             </div>
//           );
//         }
//         if (sec.type === 'steps') {
//           const steps = sec.lines.filter(l => l.trim()).map(l => l.replace(/^\d+[.)]\s*/, '').trim()).filter(Boolean);
//           return (
//             <div key={i} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
//               <div style={{ fontSize: '11px', fontWeight: '700', color: '#15803d', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>✅ Immediate Safety Steps</div>
//               {steps.map((step, j) => (
//                 <div key={j} style={{ display: 'flex', gap: '10px', marginBottom: '7px' }}>
//                   <span style={{ background: '#22c55e', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', flexShrink: 0, marginTop: '2px' }}>{j + 1}</span>
//                   <span style={{ fontSize: '13px', color: '#15803d', lineHeight: '1.5' }}>{step}</span>
//                 </div>
//               ))}
//             </div>
//           );
//         }
//         if (sec.type === 'next') {
//           return (
//             <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
//               <span style={{ fontSize: '12px', color: '#64748b' }}>⚡ Next Recommended Action</span>
//               <span style={{ fontSize: '12px', color: '#0ea5e9', fontWeight: '500' }}>{sec.lines.join(' ').trim()}</span>
//             </div>
//           );
//         }
//         return null;
//       })}
//     </div>
//   );
// }

// function ChatScreen({ language }) {
//   const t = UI_TEXT[language] || UI_TEXT.en;
//   const [messages, setMessages] = useState([
//     { role: 'assistant', content: t.welcomeMsg },
//   ]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [listening, setListening] = useState(false);
//   const bottomRef = useRef(null);

//   // Reset welcome message when language changes
//   useEffect(() => {
//     setMessages([{ role: 'assistant', content: (UI_TEXT[language] || UI_TEXT.en).welcomeMsg }]);
//   }, [language]);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const send = async (text) => {
//     if (!text.trim()) return;
//     const userMsg = { role: 'user', content: text };
//     const newMessages = [...messages, userMsg];
//     setMessages(newMessages);
//     setInput('');
//     setLoading(true);
//     try {
//       const history = newMessages.slice(-8).map((m) => ({ role: m.role, content: m.content }));
//       const res = await axios.post(`${API}/chat`, { message: text, language, history });
//       setMessages((prev) => [...prev, { role: 'assistant', content: res.data.reply }]);
//     } catch {
//       setMessages((prev) => [...prev, { role: 'assistant', content: language === 'kn' ? 'ಸಂಪರ್ಕ ಸಮಸ್ಯೆ. ತಕ್ಷಣ 100 ಕರೆ ಮಾಡಿ.' : language === 'hi' ? 'कनेक्शन समस्या। तुरंत 100 पर कॉल करें।' : 'Something went wrong. If urgent, call 100.' }]);
//     }
//     setLoading(false);
//   };

//   const startVoice = () => {
//     const langMap = { kn: 'kn-IN', en: 'en-IN', hi: 'hi-IN', te: 'te-IN' };
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) { alert('Voice input not supported in this browser.'); return; }
//     const recognition = new SpeechRecognition();
//     recognition.lang = langMap[language] || 'en-IN';
//     recognition.onstart = () => setListening(true);
//     recognition.onend = () => setListening(false);
//     recognition.onresult = (e) => send(e.results[0][0].transcript);
//     recognition.onerror = () => setListening(false);
//     recognition.start();
//   };

//   const speak = (text) => {
//     const langMap = { kn: 'kn-IN', en: 'en-IN', hi: 'hi-IN', te: 'te-IN' };
//     window.speechSynthesis.cancel();

//     const u = new SpeechSynthesisUtterance(text);
//     u.lang = langMap[language] || 'en-IN';
//     u.rate = 0.9;
//     u.pitch = 1.1;

//     // Pick a female voice
//     const trySpeak = () => {
//       const voices = window.speechSynthesis.getVoices();
//       if (voices.length === 0) {
//         // Voices not loaded yet — speak without selecting (browser picks default)
//         window.speechSynthesis.speak(u);
//         return;
//       }

//       const langCode = langMap[language] || 'en-IN';

//       // Try to find female voice matching language
//       let selectedVoice =
//         voices.find(v => v.lang === langCode && /female|woman|zira|hazel|susan|karen|samantha|moira|victoria|tessa|heera|priya|veena/i.test(v.name)) ||
//         voices.find(v => v.lang === langCode) ||
//         voices.find(v => v.lang.startsWith(langCode.split('-')[0]) && /female|woman|zira|hazel|susan|karen|samantha|moira|victoria|tessa|heera|priya|veena/i.test(v.name)) ||
//         voices.find(v => v.lang.startsWith(langCode.split('-')[0])) ||
//         voices.find(v => /female|woman|zira|hazel|susan|karen|samantha|moira|victoria|tessa/i.test(v.name)) ||
//         voices[0];

//       if (selectedVoice) u.voice = selectedVoice;
//       window.speechSynthesis.speak(u);
//     };

//     // Voices may not be loaded immediately — wait if needed
//     if (window.speechSynthesis.getVoices().length > 0) {
//       trySpeak();
//     } else {
//       window.speechSynthesis.onvoiceschanged = () => {
//         trySpeak();
//         window.speechSynthesis.onvoiceschanged = null;
//       };
//       // Fallback if onvoiceschanged never fires
//       setTimeout(trySpeak, 1000);
//     }
//   };

//   const saveToVault = (content) => {
//     const entries = JSON.parse(localStorage.getItem('sv_vault') || '[]');
//     entries.unshift({ id: Date.now(), type: 'note', date: new Date().toLocaleString(), text: content });
//     localStorage.setItem('sv_vault', JSON.stringify(entries));
//     alert(t.savedMsg);
//   };

//   return (
//     <div style={{ display: 'flex', height: '100%', background: '#f8fafc', fontFamily: "'Segoe UI', sans-serif" }}>
//       {/* Main */}
//       <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
//         {/* Top bar */}
//         <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
//           <div style={{ background: '#eff6ff', borderRadius: '8px', padding: '5px 10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
//             <span style={{ color: '#3b82f6', fontSize: '12px' }}>🔒</span>
//             <span style={{ fontSize: '11px', color: '#1d4ed8', fontWeight: '500' }}>{t.sessionActive}</span>
//           </div>
//           <span style={{ fontSize: '15px', color: '#0f172a', fontWeight: '700' }}>{t.sessionTitle}</span>
//           <button
//             style={{ marginLeft: 'auto', background: '#0ea5e9', border: 'none', borderRadius: '8px', padding: '7px 14px', fontSize: '12px', color: '#fff', fontWeight: '600', cursor: 'pointer' }}
//             onClick={() => saveToVault(messages.map(m => `[${m.role}] ${m.content}`).join('\n\n'))}
//           >
//             {t.saveConv}
//           </button>
//         </div>
//         <div style={{ background: '#fff', padding: '8px 20px', borderBottom: '1px solid #e2e8f0' }}>
//           <p style={{ fontSize: '11px', color: '#64748b', margin: 0, textAlign: 'center' }}>{t.sessionSub}</p>
//         </div>

//         {/* Messages */}
//         <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
//           {messages.map((msg, i) => (
//             <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
//               {msg.role === 'user' ? (
//                 <div style={{ maxWidth: '70%', background: '#0ea5e9', borderRadius: '18px 18px 4px 18px', padding: '12px 16px', color: '#fff', fontSize: '14px', lineHeight: '1.6' }}>
//                   {msg.content}
//                 </div>
//               ) : (
//                 <div style={{ maxWidth: '82%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px 18px 18px 4px', padding: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
//                   {parseLegalMessage(msg.content) ? (
//                     <StructuredMessage content={msg.content} />
//                   ) : (
//                     <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.65', margin: 0, whiteSpace: 'pre-wrap' }}>{msg.content}</p>
//                   )}
//                   <div style={{ display: 'flex', gap: '10px', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #f1f5f9', flexWrap: 'wrap' }}>
//                     <button onClick={() => saveToVault(msg.content)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '11px' }}>{t.saveVault}</button>
//                     <button onClick={() => navigator.clipboard?.writeText(msg.content)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '11px' }}>{t.copySteps}</button>
//                     <button onClick={() => speak(msg.content)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '11px' }}>{t.listen}</button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//           {loading && (
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <div style={{ display: 'flex', gap: '4px' }}>
//                 {[0, 1, 2].map((i) => (
//                   <div key={i} style={{ width: '7px', height: '7px', background: '#0ea5e9', borderRadius: '50%', animation: `bounce 1.2s ${i * 0.2}s infinite` }} />
//                 ))}
//               </div>
//               <span style={{ color: '#94a3b8', fontSize: '13px' }}>{t.thinking}</span>
//             </div>
//           )}
//           <div ref={bottomRef} />
//         </div>

//         {/* Quick questions */}
//         <div style={{ padding: '6px 16px 4px', display: 'flex', gap: '6px', overflowX: 'auto', background: '#fff', borderTop: '1px solid #f1f5f9' }}>
//           {t.quickQs.map((q, i) => (
//             <button key={i} onClick={() => send(q)}
//               style={{ whiteSpace: 'nowrap', padding: '6px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', fontSize: '11px', color: '#475569', cursor: 'pointer', marginTop: '4px', marginBottom: '4px' }}>
//               {q}
//             </button>
//           ))}
//         </div>

//         {/* Input */}
//         <div style={{ padding: '12px 16px', background: '#fff', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
//           <textarea
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
//             placeholder={t.placeholder}
//             rows={2}
//             style={{ flex: 1, padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '14px', resize: 'none', outline: 'none', color: '#0f172a', background: '#f8fafc' }}
//           />
//           <button onClick={startVoice}
//             style={{ background: listening ? '#ef4444' : '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', fontSize: '18px', flexShrink: 0 }}>
//             🎤
//           </button>
//           <button onClick={() => send(input)} disabled={loading}
//             style={{ background: '#0ea5e9', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', fontSize: '18px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//             ➤
//           </button>
//         </div>
//         <div style={{ textAlign: 'center', fontSize: '10px', color: '#cbd5e1', padding: '5px', background: '#fff' }}>{t.footer}</div>
//       </div>

//       {/* Sidebar */}
//       <div style={{ width: '210px', background: '#fff', borderLeft: '1px solid #e2e8f0', overflowY: 'auto', flexShrink: 0 }}>
//         <div style={{ padding: '13px 16px', borderBottom: '1px solid #e2e8f0' }}>
//           <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t.sidebar}</div>
//         </div>
//         {t.sidebarTips.map((tip, i) => (
//           <div key={i} style={{ padding: '13px 16px', borderBottom: '1px solid #f1f5f9' }}>
//             <div style={{ display: 'flex', gap: '8px', marginBottom: '5px' }}>
//               <span style={{ fontSize: '15px' }}>{tip.icon}</span>
//               <span style={{ fontSize: '12px', fontWeight: '600', color: '#0f172a', lineHeight: '1.3' }}>{tip.title}</span>
//             </div>
//             <p style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.5', margin: 0 }}>{tip.body}</p>
//           </div>
//         ))}
//       </div>

//       <style>{`@keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}`}</style>
//     </div>
//   );
// }

// export default ChatScreen;





// src/components/ChatScreen.js
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:8000';

const UI_TEXT = {
  en: {
    sessionActive: 'Private Session Active',
    sessionTitle: 'Secure Session Active',
    sessionSub: 'Your messages are processed locally and not stored on our servers. Remember to clear your browser history or use Exit Now if interrupted.',
    saveConv: '💾 SAVE CONVERSATION',
    saveVault: '💾 SAVE TO VAULT',
    copySteps: '📋 COPY STEPS',
    listen: '🔊 LISTEN',
    localSupport: '📍 LOCAL SUPPORT',
    thinking: 'SafeVoice is thinking...',
    placeholder: "Type safely — keep messages short",
    footer: 'CONFIDENTIAL AI ASSISTANT · ALWAYS VERIFY LEGAL ADVICE WITH A PROFESSIONAL',
    sidebar: 'Safety & Legal Tips',
    savedMsg: 'Saved to Vault!',
    quickQs: [
      'What is a restraining order?',
      'Can I take my children with me?',
      'How to document evidence safely?',
      'Free legal aid near me',
    ],
    sidebarTips: [
      { icon: '💸', title: 'What is Financial Abuse?', body: 'Controlling your access to money, preventing you from working, or making you ask for every penny are red flags of abuse.' },
      { icon: '📸', title: 'Evidence Privacy', body: "Always save sensitive screenshots to the SafeVoice Vault rather than your phone's photo gallery." },
      { icon: '📞', title: 'Local Support Lines', body: 'If you need immediate shelter or a human to talk to, we have vetted local organisations available.' },
      { icon: '⚡', title: 'Quick Tip', body: "If you're in immediate danger, please call 112. This chat is for legal information and guidance only." },
    ],
    welcomeMsg: "I'm here with you. Tell me what's happening — I'm not just going to give you a list of helplines. I actually want to help you understand your situation and your rights. What's going on?",
  },
  kn: {
    sessionActive: 'ಖಾಸಗಿ ಸೆಷನ್ ಸಕ್ರಿಯ',
    sessionTitle: 'ಸುರಕ್ಷಿತ ಸೆಷನ್ ಸಕ್ರಿಯ',
    sessionSub: 'ನಿಮ್ಮ ಸಂದೇಶಗಳು ಸ್ಥಳೀಯವಾಗಿ ಪ್ರಕ್ರಿಯೆಗೊಳ್ಳುತ್ತವೆ ಮತ್ತು ನಮ್ಮ ಸರ್ವರ್‌ಗಳಲ್ಲಿ ಸಂಗ್ರಹಿಸಲ್ಪಡುವುದಿಲ್ಲ.',
    saveConv: '💾 ಸಂಭಾಷಣೆ ಉಳಿಸಿ',
    saveVault: '💾 ಭಂಡಾರಕ್ಕೆ ಉಳಿಸಿ',
    copySteps: '📋 ಹೆಜ್ಜೆಗಳು ನಕಲಿಸಿ',
    listen: '🔊 ಕೇಳಿ',
    localSupport: '📍 ಸ್ಥಳೀಯ ಬೆಂಬಲ',
    thinking: 'SafeVoice ಯೋಚಿಸುತ್ತಿದೆ...',
    placeholder: 'ಸುರಕ್ಷಿತವಾಗಿ ಟೈಪ್ ಮಾಡಿ...',
    footer: 'ರಹಸ್ಯ AI ಸಹಾಯಕ · ಕಾನೂನು ಸಲಹೆಯನ್ನು ವೃತ್ತಿಪರರೊಂದಿಗೆ ಪರಿಶೀಲಿಸಿ',
    sidebar: 'ಸುರಕ್ಷತೆ ಮತ್ತು ಕಾನೂನು ಸಲಹೆಗಳು',
    savedMsg: 'ಭಂಡಾರಕ್ಕೆ ಉಳಿಸಲಾಗಿದೆ!',
    quickQs: [
      'ನಿರ್ಬಂಧ ಆದೇಶ ಏನು?',
      'ನಾನು ಮಕ್ಕಳನ್ನು ಕರೆದೊಯ್ಯಬಹುದೇ?',
      'ಸಾಕ್ಷ್ಯ ಹೇಗೆ ದಾಖಲಿಸುವುದು?',
      'ಉಚಿತ ಕಾನೂನು ನೆರವು ಹತ್ತಿರ',
    ],
    sidebarTips: [
      { icon: '💸', title: 'ಆರ್ಥಿಕ ದುರ್ಬಳಕೆ ಎಂದರೇನು?', body: 'ಹಣಕ್ಕೆ ನಿಮ್ಮ ಪ್ರವೇಶ ನಿಯಂತ್ರಿಸುವುದು, ಕೆಲಸ ಮಾಡದಂತೆ ತಡೆಯುವುದು ದುರ್ಬಳಕೆ.' },
      { icon: '📸', title: 'ಸಾಕ್ಷ್ಯ ಗೋಪ್ಯತೆ', body: 'ಸಂವೇದನಾಶೀಲ ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳನ್ನು SafeVoice Vault ನಲ್ಲಿ ಉಳಿಸಿ.' },
      { icon: '📞', title: 'ಸ್ಥಳೀಯ ಬೆಂಬಲ ರೇಖೆಗಳು', body: 'ತಕ್ಷಣ ಆಶ್ರಯ ಅಗತ್ಯವಿದ್ದರೆ 181 ಕರೆ ಮಾಡಿ.' },
      { icon: '⚡', title: 'ತ್ವರಿತ ಸಲಹೆ', body: 'ತಕ್ಷಣದ ಅಪಾಯದಲ್ಲಿದ್ದರೆ 112 ಕರೆ ಮಾಡಿ.' },
    ],
    welcomeMsg: 'ನಾನು ನಿಮ್ಮೊಂದಿಗಿದ್ದೇನೆ. ಏನಾಗುತ್ತಿದೆ ಎಂದು ಹೇಳಿ — ನಾನು ಕೇವಲ ಹೆಲ್ಪ್‌ಲೈನ್ ನಂಬರ್ ಕೊಡುವವಳಲ್ಲ. ನಿಮ್ಮ ಸ್ಥಿತಿ ಮತ್ತು ಹಕ್ಕುಗಳನ್ನು ಅರ್ಥ ಮಾಡಿಕೊಳ್ಳಲು ನಿಜವಾಗಿ ಸಹಾಯ ಮಾಡಲು ಬಯಸುತ್ತೇನೆ. ಏನಾಗುತ್ತಿದೆ?',
  },
  hi: {
    sessionActive: 'निजी सत्र सक्रिय',
    sessionTitle: 'सुरक्षित सत्र सक्रिय',
    sessionSub: 'आपके संदेश स्थानीय रूप से संसाधित होते हैं और हमारे सर्वर पर संग्रहीत नहीं होते।',
    saveConv: '💾 बातचीत सेव करें',
    saveVault: '💾 तिजोरी में सेव करें',
    copySteps: '📋 कदम कॉपी करें',
    listen: '🔊 सुनें',
    localSupport: '📍 स्थानीय सहायता',
    thinking: 'SafeVoice सोच रही है...',
    placeholder: 'सुरक्षित रूप से टाइप करें...',
    footer: 'गोपनीय AI सहायक · कानूनी सलाह किसी विशेषज्ञ से जाँचें',
    sidebar: 'सुरक्षा और कानूनी सुझाव',
    savedMsg: 'तिजोरी में सेव हो गया!',
    quickQs: [
      'रेस्ट्रेनिंग ऑर्डर क्या है?',
      'क्या मैं बच्चों को ले जा सकती हूं?',
      'साक्ष्य कैसे दर्ज करें?',
      'नजदीकी मुफ़्त कानूनी सहायता',
    ],
    sidebarTips: [
      { icon: '💸', title: 'आर्थिक शोषण क्या है?', body: 'पैसों पर नियंत्रण, काम करने से रोकना, हर पैसे के लिए मांगना — ये सब शोषण है।' },
      { icon: '📸', title: 'साक्ष्य गोपनीयता', body: 'संवेदनशील स्क्रीनशॉट SafeVoice Vault में सेव करें।' },
      { icon: '📞', title: 'स्थानीय सहायता लाइनें', body: 'तत्काल आश्रय चाहिए तो 181 पर कॉल करें।' },
      { icon: '⚡', title: 'त्वरित सुझाव', body: 'तत्काल खतरे में हों तो 112 पर कॉल करें।' },
    ],
    welcomeMsg: 'मैं आपके साथ हूं। बताइए क्या हो रहा है — मैं सिर्फ हेल्पलाइन नंबर नहीं दूंगी। मैं सच में आपकी स्थिति और आपके अधिकारों को समझने में मदद करना चाहती हूं। क्या हो रहा है?',
  },
  te: {
    sessionActive: 'ప్రైవేట్ సెషన్ సక్రియం',
    sessionTitle: 'సురక్షిత సెషన్ సక్రియం',
    sessionSub: 'మీ సందేశాలు స్థానికంగా ప్రాసెస్ అవుతాయి, మా సర్వర్లలో నిల్వ కావు.',
    saveConv: '💾 సంభాషణ సేవ్ చేయండి',
    saveVault: '💾 తిజోరీలో సేవ్ చేయండి',
    copySteps: '📋 దశలు కాపీ చేయండి',
    listen: '🔊 వినండి',
    localSupport: '📍 స్థానిక మద్దతు',
    thinking: 'SafeVoice ఆలోచిస్తోంది...',
    placeholder: 'సురక్షితంగా టైప్ చేయండి...',
    footer: 'రహస్య AI సహాయకుడు · నిపుణులతో చట్టపరమైన సలహా నిర్ధారించుకోండి',
    sidebar: 'భద్రత మరియు చట్టపరమైన చిట్కాలు',
    savedMsg: 'తిజోరీలో సేవ్ అయింది!',
    quickQs: [
      'నిరోధక ఉత్తర్వు అంటే ఏమిటి?',
      'నేను పిల్లలను తీసుకెళ్ళవచ్చా?',
      'సాక్ష్యాలు ఎలా నమోదు చేయాలి?',
      'దగ్గరలో ఉచిత న్యాయ సహాయం',
    ],
    sidebarTips: [
      { icon: '💸', title: 'ఆర్థిక దుర్వినియోగం అంటే ఏమిటి?', body: 'డబ్బుపై నియంత్రణ, పని చేయకుండా నిరోధించడం — ఇవి దుర్వినియోగం.' },
      { icon: '📸', title: 'సాక్ష్య గోప్యత', body: 'సంవేదనశీల స్క్రీన్‌షాట్లను SafeVoice Vault లో సేవ్ చేయండి.' },
      { icon: '📞', title: 'స్థానిక మద్దతు లైన్లు', body: 'తక్షణ ఆశ్రయం కోసం 181 కు కాల్ చేయండి.' },
      { icon: '⚡', title: 'శీఘ్ర చిట్కా', body: 'తక్షణ ప్రమాదంలో ఉంటే 112 కు కాల్ చేయండి.' },
    ],
    welcomeMsg: 'నేను మీతో ఉన్నాను. ఏమి జరుగుతోందో చెప్పండి — నేను కేవలం హెల్ప్‌లైన్ నంబర్లు మాత్రమే ఇవ్వను. మీ పరిస్థితి మరియు హక్కులు అర్థం చేసుకోవడంలో నిజంగా సహాయం చేయాలని ఉంది. ఏమి జరుగుతోంది?',
  },
};

function parseLegalMessage(content) {
  return (content.includes('LEGAL SUMMARY') || content.includes('IMMEDIATE SAFETY') || content.includes('Legal Summary') || content.includes('Immediate Safety'));
}

function StructuredMessage({ content }) {
  const lines = content.split('\n');
  const sections = [];
  let current = { type: 'text', lines: [] };
  for (const line of lines) {
    if (/LEGAL SUMMARY|Legal Summary|ಕಾನೂನು ಸಾರಾಂಶ|कानूनी सारांश|చట్టపరమైన సారాంశం/i.test(line)) {
      if (current.lines.length) sections.push(current);
      current = { type: 'legal', lines: [] };
    } else if (/IMMEDIATE SAFETY|Immediate Safety|ತಕ್ಷಣದ ಸುರಕ್ಷತೆ|तुरंत सुरक्षा|తక్షణ భద్రత/i.test(line)) {
      if (current.lines.length) sections.push(current);
      current = { type: 'steps', lines: [] };
    } else if (/NEXT RECOMMENDED|What to do NEXT|ಮುಂದಿನ ಕ್ರಮ|अगला कदम|తదుపరి చర్య/i.test(line)) {
      if (current.lines.length) sections.push(current);
      current = { type: 'next', lines: [] };
    } else {
      current.lines.push(line);
    }
  }
  if (current.lines.length) sections.push(current);
  return (
    <div>
      {sections.map((sec, i) => {
        if (sec.type === 'text') {
          const text = sec.lines.join('\n').trim();
          if (!text) return null;
          return <p key={i} style={{ fontSize: '14px', color: '#334155', lineHeight: '1.65', marginBottom: '10px' }}>{text}</p>;
        }
        if (sec.type === 'legal') {
          return (
            <div key={i} style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#0369a1', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>📋 Legal Summary</div>
              <p style={{ fontSize: '13px', color: '#0c4a6e', lineHeight: '1.6', margin: 0 }}>{sec.lines.join(' ').trim()}</p>
            </div>
          );
        }
        if (sec.type === 'steps') {
          const steps = sec.lines.filter(l => l.trim()).map(l => l.replace(/^\d+[.)]\s*/, '').trim()).filter(Boolean);
          return (
            <div key={i} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#15803d', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>✅ Immediate Safety Steps</div>
              {steps.map((step, j) => (
                <div key={j} style={{ display: 'flex', gap: '10px', marginBottom: '7px' }}>
                  <span style={{ background: '#22c55e', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', flexShrink: 0, marginTop: '2px' }}>{j + 1}</span>
                  <span style={{ fontSize: '13px', color: '#15803d', lineHeight: '1.5' }}>{step}</span>
                </div>
              ))}
            </div>
          );
        }
        if (sec.type === 'next') {
          return (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>⚡ Next Recommended Action</span>
              <span style={{ fontSize: '12px', color: '#0ea5e9', fontWeight: '500' }}>{sec.lines.join(' ').trim()}</span>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

// ── Fixed TTS: uses actual available voices from the browser ──────────────────
function speak(text, language) {
  // Map language codes to preferred voice name substrings (from actual available voices)
  const VOICE_PREFS = {
    en: [
      'Google UK English Female',  // best female English
      'Google US English',
      'Microsoft Zira',            // female US English
      'Microsoft Mark',
      'Microsoft David',
    ],
    hi: [
      'Google हिन्दी',             // exact name from the list
      'Google Hindi',
    ],
    kn: [],  // no Kannada voice in standard browsers — will fall back to en
    te: [],  // no Telugu voice — will fall back to en
  };

  window.speechSynthesis.cancel();

  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.92;
  u.pitch = 1.05;

  const trySpeak = () => {
    const voices = window.speechSynthesis.getVoices();
    const prefs = VOICE_PREFS[language] || VOICE_PREFS.en;
    let selected = null;

    // Try preferences in order
    for (const pref of prefs) {
      selected = voices.find(v => v.name === pref || v.name.includes(pref));
      if (selected) break;
    }

    // Fallback: any voice matching the lang code
    if (!selected) {
      const langCode = { en: 'en', hi: 'hi', kn: 'kn', te: 'te' }[language] || 'en';
      selected = voices.find(v => v.lang.startsWith(langCode));
    }

    // Final fallback: Google UK English Female or first available
    if (!selected) {
      selected = voices.find(v => v.name === 'Google UK English Female') ||
                 voices.find(v => v.name === 'Microsoft Zira - English (United States)') ||
                 voices[0];
    }

    if (selected) u.voice = selected;
    window.speechSynthesis.speak(u);
  };

  if (window.speechSynthesis.getVoices().length > 0) {
    trySpeak();
  } else {
    window.speechSynthesis.onvoiceschanged = () => {
      trySpeak();
      window.speechSynthesis.onvoiceschanged = null;
    };
    setTimeout(trySpeak, 800);
  }
}

function ChatScreen({ language }) {
  const t = UI_TEXT[language] || UI_TEXT.en;
  const [messages, setMessages] = useState([
    { role: 'assistant', content: t.welcomeMsg },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    setMessages([{ role: 'assistant', content: (UI_TEXT[language] || UI_TEXT.en).welcomeMsg }]);
  }, [language]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (text) => {
    if (!text.trim()) return;
    const userMsg = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const history = newMessages.slice(-8).map((m) => ({ role: m.role, content: m.content }));
      const res = await axios.post(`${API}/chat`, { message: text, language, history });
      setMessages((prev) => [...prev, { role: 'assistant', content: res.data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: language === 'kn' ? 'ಸಂಪರ್ಕ ಸಮಸ್ಯೆ. ತಕ್ಷಣ 100 ಕರೆ ಮಾಡಿ.' : language === 'hi' ? 'कनेक्शन समस्या। तुरंत 100 पर कॉल करें।' : 'Something went wrong. If urgent, call 100.' }]);
    }
    setLoading(false);
  };

  const startVoice = () => {
    const langMap = { kn: 'kn-IN', en: 'en-IN', hi: 'hi-IN', te: 'te-IN' };
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { alert('Voice input not supported in this browser.'); return; }
    const recognition = new SpeechRecognition();
    recognition.lang = langMap[language] || 'en-IN';
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (e) => send(e.results[0][0].transcript);
    recognition.onerror = () => setListening(false);
    recognition.start();
  };

  const saveToVault = (content) => {
    const entries = JSON.parse(localStorage.getItem('sv_vault') || '[]');
    entries.unshift({ id: Date.now(), type: 'note', date: new Date().toLocaleString(), text: content });
    localStorage.setItem('sv_vault', JSON.stringify(entries));
    alert(t.savedMsg);
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: '#f8fafc', fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <div style={{ background: '#eff6ff', borderRadius: '8px', padding: '5px 10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ color: '#3b82f6', fontSize: '12px' }}>🔒</span>
            <span style={{ fontSize: '11px', color: '#1d4ed8', fontWeight: '500' }}>{t.sessionActive}</span>
          </div>
          <span style={{ fontSize: '15px', color: '#0f172a', fontWeight: '700' }}>{t.sessionTitle}</span>
          <button
            style={{ marginLeft: 'auto', background: '#0ea5e9', border: 'none', borderRadius: '8px', padding: '7px 14px', fontSize: '12px', color: '#fff', fontWeight: '600', cursor: 'pointer' }}
            onClick={() => saveToVault(messages.map(m => `[${m.role}] ${m.content}`).join('\n\n'))}
          >
            {t.saveConv}
          </button>
        </div>
        <div style={{ background: '#fff', padding: '8px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <p style={{ fontSize: '11px', color: '#64748b', margin: 0, textAlign: 'center' }}>{t.sessionSub}</p>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              {msg.role === 'user' ? (
                <div style={{ maxWidth: '70%', background: '#0ea5e9', borderRadius: '18px 18px 4px 18px', padding: '12px 16px', color: '#fff', fontSize: '14px', lineHeight: '1.6' }}>
                  {msg.content}
                </div>
              ) : (
                <div style={{ maxWidth: '82%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px 18px 18px 4px', padding: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                  {parseLegalMessage(msg.content) ? (
                    <StructuredMessage content={msg.content} />
                  ) : (
                    <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.65', margin: 0, whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                  )}
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #f1f5f9', flexWrap: 'wrap' }}>
                    <button onClick={() => saveToVault(msg.content)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '11px' }}>{t.saveVault}</button>
                    <button onClick={() => navigator.clipboard?.writeText(msg.content)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '11px' }}>{t.copySteps}</button>
                    <button onClick={() => speak(msg.content, language)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '11px' }}>{t.listen}</button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ width: '7px', height: '7px', background: '#0ea5e9', borderRadius: '50%', animation: `bounce 1.2s ${i * 0.2}s infinite` }} />
                ))}
              </div>
              <span style={{ color: '#94a3b8', fontSize: '13px' }}>{t.thinking}</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick questions */}
        <div style={{ padding: '6px 16px 4px', display: 'flex', gap: '6px', overflowX: 'auto', background: '#fff', borderTop: '1px solid #f1f5f9' }}>
          {t.quickQs.map((q, i) => (
            <button key={i} onClick={() => send(q)}
              style={{ whiteSpace: 'nowrap', padding: '6px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', fontSize: '11px', color: '#475569', cursor: 'pointer', marginTop: '4px', marginBottom: '4px' }}>
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '12px 16px', background: '#fff', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder={t.placeholder}
            rows={2}
            style={{ flex: 1, padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '14px', resize: 'none', outline: 'none', color: '#0f172a', background: '#f8fafc' }}
          />
          <button onClick={startVoice}
            style={{ background: listening ? '#ef4444' : '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', fontSize: '18px', flexShrink: 0 }}>
            🎤
          </button>
          <button onClick={() => send(input)} disabled={loading}
            style={{ background: '#0ea5e9', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', fontSize: '18px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            ➤
          </button>
        </div>
        <div style={{ textAlign: 'center', fontSize: '10px', color: '#cbd5e1', padding: '5px', background: '#fff' }}>{t.footer}</div>
      </div>

      {/* Sidebar */}
      <div style={{ width: '210px', background: '#fff', borderLeft: '1px solid #e2e8f0', overflowY: 'auto', flexShrink: 0 }}>
        <div style={{ padding: '13px 16px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t.sidebar}</div>
        </div>
        {t.sidebarTips.map((tip, i) => (
          <div key={i} style={{ padding: '13px 16px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '5px' }}>
              <span style={{ fontSize: '15px' }}>{tip.icon}</span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#0f172a', lineHeight: '1.3' }}>{tip.title}</span>
            </div>
            <p style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.5', margin: 0 }}>{tip.body}</p>
          </div>
        ))}
      </div>

      <style>{`@keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}`}</style>
    </div>
  );
}

export default ChatScreen;