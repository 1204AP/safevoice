//src/components/DisguiseMode.js
import React, { useState } from 'react';

function DisguiseMode({ onReturn }) {
  const [display, setDisplay] = useState('0');
  const [tapCount, setTapCount] = useState(0);

  const handleButton = (val) => {
    // Secret: tap "." three times to return
    if (val === '.') {
      const newCount = tapCount + 1;
      setTapCount(newCount);
      if (newCount >= 3) { onReturn(); return; }
    } else {
      setTapCount(0);
    }
    setDisplay(prev => prev === '0' ? val : prev + val);
  };

  const buttons = ['7','8','9','÷','4','5','6','×','1','2','3','-','0','.','=','+'];

  return (
    <div style={{
      height: '100vh', background: '#1c1c1e', display: 'flex',
      flexDirection: 'column', justifyContent: 'flex-end', padding: '20px'
    }}>
      <div style={{
        background: '#2c2c2e', borderRadius: '12px', padding: '20px',
        textAlign: 'right', fontSize: '48px', color: '#fff', marginBottom: '20px',
        minHeight: '80px', wordBreak: 'break-all'
      }}>
        {display}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {buttons.map(btn => (
          <button key={btn} onClick={() => handleButton(btn)}
            style={{
              padding: '20px', fontSize: '22px', borderRadius: '50%',
              border: 'none', cursor: 'pointer',
              background: ['÷','×','-','+','='].includes(btn) ? '#ff9f0a' : '#3a3a3c',
              color: '#fff', fontWeight: '500'
            }}>
            {btn}
          </button>
        ))}
      </div>
      <p style={{ color: '#3a3a3c', fontSize: '10px', textAlign: 'center', marginTop: '16px' }}>
        Tap . three times to return
      </p>
    </div>
  );
}

export default DisguiseMode;