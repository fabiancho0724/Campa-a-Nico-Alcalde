import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { eventBus } from '../core/eventBus';
import { nicoBrain } from '../core/nicoBrain';

const NicoContext = createContext(undefined);

export function NicoProvider({ children }) {
  const [emotion, setEmotion] = useState('idle');
  const [brainState, setBrainState] = useState(nicoBrain.state);
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

  useEffect(() => {
    const unsubscribe = eventBus.subscribe((event) => {
      const nextState = nicoBrain.react(event);
      setBrainState(nextState);
      
      if (event.type !== 'IDLE') {
        const duration = event.type === 'CELEBRATE' ? 3500 : event.type === 'ERROR' ? 2000 : 1200;
        triggerEmotion(nextState.emotion, duration);
      } else {
        setEmotion('idle');
      }
    });

    return () => unsubscribe();
  }, [triggerEmotion]);

  return (
    <NicoContext.Provider value={{ emotion, triggerEmotion, setEmotion, brainState }}>
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
