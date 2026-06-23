import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const NicoContext = createContext(undefined);

export function NicoProvider({ children }) {
  const [emotion, setEmotion] = useState('idle');
  const timerRef = useRef(null);

  const triggerEmotion = useCallback((newEmotion, duration = 2000) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setEmotion(newEmotion);
    timerRef.current = setTimeout(() => {
      setEmotion('idle');
      timerRef.current = null;
    }, duration);
  }, []);

  return (
    <NicoContext.Provider value={{ emotion, triggerEmotion, setEmotion }}>
      {children}
    </NicoContext.Provider>
  );
}

export function useNico() {
  const context = useContext(NicoContext);
  if (context === undefined) {
    throw new Error('useNico must be used within a NicoProvider');
  }
  return context;
}
