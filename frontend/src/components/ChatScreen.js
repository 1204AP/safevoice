//ChatScreen.js
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:8000';

function ChatScreen({ language }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello. I am SafeVoice. You are safe here. Tell me what is happening — in your own words, in your language. I will help.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async (text) => {
    if (!text.trim()) return;
    const userMsg = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const history = newMessages.slice(-6).map(m => ({ role: m.role, content: m.content }));
      const res = await axios.post(`${API}/chat`, { message: text, language, history });
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again. If urgent, call 100.' }]);
    }
    setLoading(false);
  };

  const startVoice = () => {
    const langMap = { kn: 'kn-IN', en: 'en-IN', hi: 'hi-IN', te: 'te-IN' };
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = langMap[language] || 'en-IN';
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (e) => send(e.results[0][0].transcript);
    recognition.start();
  };

  const speak = (text) => {
    const langMap = { kn: 'kn-IN', en: 'en-IN', hi: 'hi-IN', te: 'te-IN' };
    const u = new SpeechSynthesisUtterance(text);
    u.lang = langMap[language] || 'en-IN';
    window.speechSynthesis.speak(u);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0f0f1a' }}>
      <div style={{ background: '#1e1b4b', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '22px' }}>🛡️</span>
        <div>
          <div style={{ color: '#a78bfa', fontWeight: 'bold' }}>SafeVoice</div>
          <div style={{ color: '#475569', fontSize: '11px' }}>Anonymous • Private • No trace</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '80%', padding: '12px 16px', borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: msg.role === 'user' ? '#4c1d95' : '#1e293b',
              color: '#e2e8f0', fontSize: '14px', lineHeight: '1.5'
            }}>
              {msg.content}
              {msg.role === 'assistant' && (
                <button onClick={() => speak(msg.content)}
                  style={{ display: 'block', marginTop: '6px', background: 'none', border: 'none', color: '#7c3aed', cursor: 'pointer', fontSize: '11px' }}>
                  🔊 Listen
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ color: '#475569', fontSize: '13px', padding: '8px' }}>SafeVoice is thinking...</div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ padding: '12px 16px', background: '#0d0d1f', display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
          placeholder="Type your message..."
          rows={2}
          style={{
            flex: 1, background: '#1e1b4b', border: '1px solid #4c1d95', borderRadius: '12px',
            padding: '10px 14px', color: '#fff', fontSize: '14px', resize: 'none', outline: 'none'
          }} />
        <button onClick={startVoice}
          style={{
            background: listening ? '#dc2626' : '#1e1b4b', border: '1px solid #4c1d95',
            borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', fontSize: '18px'
          }}>🎤</button>
        <button onClick={() => send(input)} disabled={loading}
          style={{
            background: '#7c3aed', border: 'none', borderRadius: '50%',
            width: '44px', height: '44px', cursor: 'pointer', fontSize: '18px'
          }}>➤</button>
      </div>
    </div>
  );
}

export default ChatScreen;