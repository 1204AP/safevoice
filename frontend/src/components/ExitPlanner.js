
// src/components/ExitPlanner.js
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:8000';

// Translations for static UI text
const UI_TEXT = {
  en: {
    title: 'Personalized Exit Planner',
    subtitle: 'Answer a few brief questions to help us build a confidential checklist for your safety and independence.',
    private: '100% Private',
    privateDesc: 'Your answers are stored locally on this phone. No one else can see them.',
    safety: 'Safety Focused',
    safetyDesc: "We'll prioritize immediate actions to keep you safe today.",
    start: 'Start Planning →',
    timer: 'Takes approximately 2 minutes. You can stop at any time.',
    headerSub: 'Private · Personalised · Step-by-step',
    thinking: 'Thinking of the right steps for you...',
    placeholder: 'Type your question or share more details...',
    footer: 'CONFIDENTIAL AI ASSISTANT · NO ACCOUNT REQUIRED · LOCAL ONLY',
    firstQ: "First, I want you to know — you're not alone, and you're brave for being here. Let me understand where you are right now:",
    firstOptions: [
      "I'm still living with my abuser",
      "I've left but I'm not safe yet",
      "I'm planning to leave soon",
      "I need help for someone else",
    ],
    findNearby: 'Find Safe Places Near Me',
    police: 'Police Station',
    shelter: 'Shelter',
    hospital: 'Hospital',
    legal: 'Free Legal Aid',
    locationTipLabel: '📍 Safe Places Near You',
    openMaps: 'Open in Maps →',
  },
  kn: {
    title: 'ವ್ಯಕ್ತಿಗತ ಸುರಕ್ಷಿತ ನಿರ್ಗಮನ ಯೋಜನೆ',
    subtitle: 'ನಿಮ್ಮ ಸ್ವಾತಂತ್ರ್ಯ ಮತ್ತು ಸುರಕ್ಷತೆಗಾಗಿ ಕೆಲವು ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ.',
    private: '100% ಖಾಸಗಿ',
    privateDesc: 'ನಿಮ್ಮ ಉತ್ತರಗಳು ಈ ಫೋನ್‌ನಲ್ಲಿ ಮಾತ್ರ ಸಂಗ್ರಹವಾಗುತ್ತವೆ.',
    safety: 'ಸುರಕ್ಷತೆ ಮೊದಲು',
    safetyDesc: 'ಇಂದು ನಿಮ್ಮನ್ನು ಸುರಕ್ಷಿತವಾಗಿಡಲು ತಕ್ಷಣದ ಕ್ರಮಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳೋಣ.',
    start: 'ಯೋಜನೆ ಪ್ರಾರಂಭಿಸಿ →',
    timer: 'ಸರಿಸುಮಾರು 2 ನಿಮಿಷ ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ.',
    headerSub: 'ಖಾಸಗಿ · ವ್ಯಕ್ತಿಗತ · ಹಂತ ಹಂತವಾಗಿ',
    thinking: 'ನಿಮಗಾಗಿ ಸರಿಯಾದ ಹೆಜ್ಜೆಗಳನ್ನು ಯೋಚಿಸುತ್ತಿದ್ದೇನೆ...',
    placeholder: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಅಥವಾ ವಿವರಗಳನ್ನು ಟೈಪ್ ಮಾಡಿ...',
    footer: 'ರಹಸ್ಯ AI ಸಹಾಯಕ · ಖಾತೆ ಅಗತ್ಯವಿಲ್ಲ · ಸ್ಥಳೀಯ ಮಾತ್ರ',
    firstQ: 'ಮೊದಲು, ನೀವು ಒಂಟಿಯಲ್ಲ ಎಂದು ತಿಳಿಯಿರಿ. ನೀವು ಈಗ ಎಲ್ಲಿದ್ದೀರಿ ಎಂದು ಹೇಳಿ:',
    firstOptions: [
      'ನಾನು ಇನ್ನೂ ಅವರೊಂದಿಗೆ ವಾಸಿಸುತ್ತಿದ್ದೇನೆ',
      'ನಾನು ಹೊರಟಿದ್ದೇನೆ ಆದರೆ ಇನ್ನೂ ಸುರಕ್ಷಿತವಲ್ಲ',
      'ಶೀಘ್ರದಲ್ಲೇ ಹೊರಡಲು ಯೋಜಿಸುತ್ತಿದ್ದೇನೆ',
      'ಇನ್ನೊಬ್ಬರಿಗೆ ಸಹಾಯ ಬೇಕು',
    ],
    findNearby: 'ಹತ್ತಿರದ ಸುರಕ್ಷಿತ ಸ್ಥಳಗಳು',
    police: 'ಪೊಲೀಸ್ ಠಾಣೆ',
    shelter: 'ಆಶ್ರಯ',
    hospital: 'ಆಸ್ಪತ್ರೆ',
    legal: 'ಉಚಿತ ಕಾನೂನು ನೆರವು',
    locationTipLabel: '📍 ಹತ್ತಿರದ ಸುರಕ್ಷಿತ ಸ್ಥಳಗಳು',
    openMaps: 'Maps ನಲ್ಲಿ ತೆರೆಯಿರಿ →',
  },
  hi: {
    title: 'व्यक्तिगत सुरक्षित निकास योजना',
    subtitle: 'अपनी सुरक्षा और स्वतंत्रता के लिए कुछ सवालों के जवाब दें।',
    private: '100% निजी',
    privateDesc: 'आपके जवाब सिर्फ इस फ़ोन में सुरक्षित हैं।',
    safety: 'सुरक्षा सबसे पहले',
    safetyDesc: 'आज आपको सुरक्षित रखने के लिए तुरंत कदम उठाएंगे।',
    start: 'योजना शुरू करें →',
    timer: 'लगभग 2 मिनट लगते हैं। आप कभी भी रुक सकती हैं।',
    headerSub: 'निजी · व्यक्तिगत · कदम दर कदम',
    thinking: 'आपके लिए सही कदम सोच रही हूं...',
    placeholder: 'अपना सवाल या जानकारी टाइप करें...',
    footer: 'गोपनीय AI सहायक · कोई खाता नहीं चाहिए · स्थानीय',
    firstQ: 'पहले, जानिए कि आप अकेली नहीं हैं। अभी आप किस स्थिति में हैं, बताइए:',
    firstOptions: [
      'मैं अभी भी उनके साथ रह रही हूं',
      'मैं निकल गई हूं पर अभी सुरक्षित नहीं',
      'जल्द ही निकलने की योजना है',
      'किसी और के लिए मदद चाहिए',
    ],
    findNearby: 'पास के सुरक्षित स्थान',
    police: 'पुलिस थाना',
    shelter: 'आश्रय',
    hospital: 'अस्पताल',
    legal: 'मुफ़्त कानूनी सहायता',
    locationTipLabel: '📍 पास के सुरक्षित स्थान',
    openMaps: 'Maps में खोलें →',
  },
  te: {
    title: 'వ్యక్తిగత సురక్షిత నిష్క్రమణ ప్రణాళిక',
    subtitle: 'మీ భద్రత మరియు స్వాతంత్ర్యం కోసం కొన్ని ప్రశ్నలకు సమాధానం ఇవ్వండి.',
    private: '100% ప్రైవేట్',
    privateDesc: 'మీ సమాధానాలు ఈ ఫోన్‌లో మాత్రమే నిల్వ అవుతాయి.',
    safety: 'భద్రత మొదట',
    safetyDesc: 'ఈరోజు మిమ్మల్ని సురక్షితంగా ఉంచడానికి తక్షణ చర్యలు తీసుకుందాం.',
    start: 'ప్రణాళిక ప్రారంభించండి →',
    timer: 'సుమారు 2 నిమిషాలు పడుతుంది.',
    headerSub: 'ప్రైవేట్ · వ్యక్తిగత · దశ దశగా',
    thinking: 'మీ కోసం సరైన అడుగులు ఆలోచిస్తున్నాను...',
    placeholder: 'మీ ప్రశ్న లేదా వివరాలు టైప్ చేయండి...',
    footer: 'రహస్య AI సహాయకుడు · ఖాతా అవసరం లేదు',
    firstQ: 'మొదట, మీరు ఒంటరిగా లేరు అని తెలుసుకోండి. మీరు ఇప్పుడు ఎక్కడ ఉన్నారో చెప్పండి:',
    firstOptions: [
      'నేను ఇంకా వారితో నివసిస్తున్నాను',
      'నేను వెళ్ళాను కానీ ఇంకా సురక్షితం కాదు',
      'త్వరలో వెళ్ళే ప్రణాళిక ఉంది',
      'వేరొకరికి సహాయం కావాలి',
    ],
    findNearby: 'దగ్గరలోని సురక్షిత స్థలాలు',
    police: 'పోలీస్ స్టేషన్',
    shelter: 'ఆశ్రయం',
    hospital: 'ఆస్పత్రి',
    legal: 'ఉచిత న్యాయ సహాయం',
    locationTipLabel: '📍 దగ్గరలోని సురక్షిత స్థలాలు',
    openMaps: 'Maps లో తెరవండి →',
  },
};

function ExitPlanner({ language }) {
  const t = UI_TEXT[language] || UI_TEXT.en;
  const [step, setStep] = useState('start');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [context, setContext] = useState({});
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [activeMapType, setActiveMapType] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startPlanning = () => {
    setStep('chat');
    setMessages([
      {
        role: 'assistant',
        type: 'welcome',
        content: t.firstQ,
      },
      {
        role: 'assistant',
        type: 'options',
        content: '',
        options: t.firstOptions,
        questionId: 'situation',
      },
    ]);
  };

  const fetchNearbyPlaces = async (placeType) => {
    setActiveMapType(placeType);
    if (!userLocation) {
      setLocationLoading(true);
      try {
        const pos = await new Promise((res, rej) =>
          navigator.geolocation.getCurrentPosition(res, rej, { timeout: 8000 })
        );
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        const res = await axios.post(`${API}/nearby-places`, { ...loc, placeType });
        setNearbyPlaces(res.data.places);
      } catch {
        // Fallback: Google Maps search without coordinates
        setNearbyPlaces([
          {
            label: 'Search on Google Maps',
            icon: '🔍',
            mapsUrl: `https://www.google.com/maps/search/${placeType === 'police' ? 'women+police+station+near+me' : placeType === 'shelter' ? 'one+stop+centre+near+me' : placeType === 'hospital' ? 'government+hospital+near+me' : 'district+legal+services+authority+near+me'}`,
            directionsUrl: null,
          },
        ]);
      }
      setLocationLoading(false);
    } else {
      setLocationLoading(true);
      try {
        const res = await axios.post(`${API}/nearby-places`, { ...userLocation, placeType });
        setNearbyPlaces(res.data.places);
      } catch {
        setNearbyPlaces([]);
      }
      setLocationLoading(false);
    }
  };

  const handleOptionSelect = async (option, questionId) => {
    const newContext = { ...context, [questionId]: option };
    setContext(newContext);
    const userMsg = { role: 'user', type: 'text', content: option };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setLoading(true);
    try {
      const res = await axios.post(`${API}/exit-plan-chat`, {
        language,
        context: newContext,
        lastAnswer: option,
        questionId,
        history: updatedMessages.slice(-10).map((m) => ({ role: m.role, content: m.content })),
      });
      const data = res.data;
      const newMsgs = [...updatedMessages, { role: 'assistant', type: 'pointwise', content: data.reply, locationTip: data.locationTip }];
      if (data.followUpQuestion && data.options) {
        newMsgs.push({
          role: 'assistant',
          type: 'options',
          content: data.followUpQuestion,
          options: data.options,
          questionId: data.nextQuestionId || 'followup_' + Date.now(),
        });
      }
      setMessages(newMsgs);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', type: 'text', content: language === 'kn' ? 'ಸಂಪರ್ಕ ಸಮಸ್ಯೆ. ತಕ್ಷಣ 181 ಕರೆ ಮಾಡಿ.' : language === 'hi' ? 'कनेक्शन समस्या। तुरंत 181 पर कॉल करें।' : "I'm having trouble connecting. Call 181 immediately if you're in danger." }]);
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
      const res = await axios.post(`${API}/exit-plan-chat`, {
        language,
        context,
        lastAnswer: text,
        questionId: 'freetext',
        history: updatedMessages.slice(-10).map((m) => ({ role: m.role, content: m.content })),
      });
      const data = res.data;
      const newMsgs = [...updatedMessages, { role: 'assistant', type: 'pointwise', content: data.reply, locationTip: data.locationTip }];
      if (data.followUpQuestion && data.options) {
        newMsgs.push({
          role: 'assistant',
          type: 'options',
          content: data.followUpQuestion,
          options: data.options,
          questionId: data.nextQuestionId || 'followup_' + Date.now(),
        });
      }
      setMessages(newMsgs);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', type: 'text', content: 'Something went wrong. Call 181.' }]);
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
    }),
    optionBtn: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      padding: '12px 14px',
      marginBottom: '8px',
      background: '#f0f9ff',
      border: '1.5px solid #bae6fd',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '13px',
      color: '#0369a1',
      fontWeight: '500',
      transition: 'all 0.15s',
      lineHeight: '1.4',
    },
  };

  // START SCREEN
  if (step === 'start') {
    return (
      <div style={{ ...s.wrap, alignItems: 'center', justifyContent: 'center', padding: '32px 24px', position: 'relative' }}>
        <div style={{ textAlign: 'center', maxWidth: '360px', width: '100%' }}>
          <div style={{ fontSize: '52px', marginBottom: '16px' }}>🛡️</div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>{t.title}</h2>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6' }}>{t.subtitle}</p>
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '18px', marginBottom: '22px', textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
              <span style={{ fontSize: '20px' }}>✅</span>
              <div>
                <div style={{ fontWeight: '600', fontSize: '13px', color: '#0f172a' }}>{t.private}</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{t.privateDesc}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ fontSize: '20px' }}>🛡️</span>
              <div>
                <div style={{ fontWeight: '600', fontSize: '13px', color: '#0f172a' }}>{t.safety}</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{t.safetyDesc}</div>
              </div>
            </div>
          </div>
          <button
            onClick={startPlanning}
            style={{ width: '100%', padding: '15px', background: '#0ea5e9', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer', letterSpacing: '0.2px' }}
          >
            {t.start}
          </button>
          <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '12px' }}>{t.timer}</p>
        </div>
        <div style={{ position: 'absolute', bottom: '12px', fontSize: '10px', color: '#cbd5e1', textAlign: 'center' }}>
          NO ACCOUNT REQUIRED · LOCAL-ONLY · CONFIDENTIAL & SECURE
        </div>
      </div>
    );
  }

  return (
    <div style={s.wrap}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '13px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '20px' }}>🚪</span>
        <div>
          <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Safe Exit Planner</div>
          <div style={{ fontSize: '11px', color: '#94a3b8' }}>{t.headerSub}</div>
        </div>
        <div style={{ marginLeft: 'auto', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '20px', padding: '4px 10px', fontSize: '11px', color: '#16a34a', fontWeight: '500' }}>
          🔒 Private Session
        </div>
      </div>

      {/* Location bar */}
      <div style={{ background: '#fffbeb', borderBottom: '1px solid #fde68a', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto' }}>
        <span style={{ fontSize: '11px', color: '#92400e', fontWeight: '600', whiteSpace: 'nowrap' }}>📍 {t.findNearby}:</span>
        {[
          { type: 'police', label: t.police, icon: '🚔' },
          { type: 'shelter', label: t.shelter, icon: '🏠' },
          { type: 'hospital', label: t.hospital, icon: '🏥' },
          { type: 'legal', label: t.legal, icon: '⚖️' },
        ].map((btn) => (
          <button
            key={btn.type}
            onClick={() => fetchNearbyPlaces(btn.type)}
            style={{
              whiteSpace: 'nowrap',
              padding: '5px 10px',
              background: activeMapType === btn.type ? '#f59e0b' : '#fff',
              border: '1px solid #fbbf24',
              borderRadius: '20px',
              fontSize: '11px',
              color: activeMapType === btn.type ? '#fff' : '#92400e',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {btn.icon} {btn.label}
          </button>
        ))}
      </div>

      {/* Nearby places panel */}
      {(nearbyPlaces.length > 0 || locationLoading) && (
        <div style={{ background: '#fffbeb', borderBottom: '1px solid #fde68a', padding: '10px 16px' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#92400e', marginBottom: '8px' }}>{t.locationTipLabel}</div>
          {locationLoading ? (
            <div style={{ fontSize: '12px', color: '#92400e' }}>Finding safe places near you...</div>
          ) : (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {nearbyPlaces.map((place, i) => (
                <a
                  key={i}
                  href={place.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 12px',
                    background: '#fff',
                    border: '1px solid #fbbf24',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#92400e',
                    textDecoration: 'none',
                    fontWeight: '500',
                  }}
                >
                  {place.icon} {place.label}
                  <span style={{ color: '#0ea5e9', fontSize: '11px' }}>{t.openMaps}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            {(msg.type === 'welcome' || msg.type === 'text') && (
              <div style={s.bubble(msg.role)}>{msg.content}</div>
            )}
            {msg.type === 'pointwise' && (
              <div style={{ maxWidth: '88%' }}>
                <div style={s.bubble('assistant')}>
                  <PointwiseRenderer content={msg.content} />
                </div>
                {msg.locationTip && (
                  <div style={{ marginTop: '8px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '10px 12px', fontSize: '12px', color: '#92400e' }}>
                    📍 {msg.locationTip}
                  </div>
                )}
              </div>
            )}
            {msg.type === 'options' && (
              <div style={{ maxWidth: '90%', width: '100%' }}>
                {msg.content ? (
                  <div style={{ ...s.bubble('assistant'), marginBottom: '10px' }}>{msg.content}</div>
                ) : null}
                {i === messages.length - 1 && (
                  <div>
                    {msg.options.map((opt, j) => (
                      <button
                        key={j}
                        style={s.optionBtn}
                        onClick={() => handleOptionSelect(opt, msg.questionId)}
                        disabled={loading}
                        onMouseOver={(e) => { e.currentTarget.style.background = '#e0f2fe'; e.currentTarget.style.borderColor = '#7dd3fc'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = '#f0f9ff'; e.currentTarget.style.borderColor = '#bae6fd'; }}
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
                <div key={i} style={{ width: '7px', height: '7px', background: '#0ea5e9', borderRadius: '50%', animation: `bounce 1.2s ${i * 0.2}s infinite` }} />
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
      <div style={{ textAlign: 'center', fontSize: '10px', color: '#cbd5e1', padding: '6px', background: '#fff' }}>
        {t.footer}
      </div>
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
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
            <div key={i} style={{ fontWeight: '700', color: '#0f172a', marginTop: '12px', marginBottom: '6px', fontSize: '13px', borderLeft: '3px solid #0ea5e9', paddingLeft: '8px' }}>
              {trimmed.replace(/\*\*/g, '')}
            </div>
          );
        }
        if (isNumbered) {
          const num = trimmed.match(/^(\d+)/)[0];
          const rest = trimmed.replace(/^\d+[.)]\s*/, '');
          return (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'flex-start' }}>
              <span style={{ background: '#0ea5e9', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', flexShrink: 0, marginTop: '2px' }}>{num}</span>
              <span style={{ fontSize: '13px', color: '#334155', lineHeight: '1.6' }}>{rest}</span>
            </div>
          );
        }
        if (isBullet) {
          return (
            <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px', paddingLeft: '4px' }}>
              <span style={{ color: '#0ea5e9', fontWeight: '700', fontSize: '14px', flexShrink: 0 }}>•</span>
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

export default ExitPlanner;