import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LanguageSelector from './components/LanguageSelector';
import ChatScreen from './components/ChatScreen';
import ExitPlanner from './components/ExitPlanner';
import AllyMode from './components/AllyMode';
import EvidenceVault from './components/EvidenceVault';
import Navigation from './components/Navigation';
import DisguiseMode from './components/DisguiseMode';

function App() {
  const [language, setLanguage] = useState(null);
  const [disguised, setDisguised] = useState(false);

  if (disguised) {
    return <DisguiseMode onReturn={() => setDisguised(false)} />;
  }

  if (!language) {
    return <LanguageSelector onSelect={setLanguage} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <Routes>
          <Route path="/" element={<ChatScreen language={language} />} />
          <Route path="/exit" element={<ExitPlanner language={language} />} />
          <Route path="/ally" element={<AllyMode language={language} />} />
          <Route path="/vault" element={<EvidenceVault language={language} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Navigation onDisguise={() => setDisguised(true)} />
    </div>
  );
}

export default App;