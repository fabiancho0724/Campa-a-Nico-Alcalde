import { useEffect, useRef } from 'react';
import { eventBus } from '../core/eventBus';
import { useNico } from '../state/nicoStore';

export default function NicoEmotionEngine() {
  const { emotion } = useNico();
  const inactivityTimerRef = useRef(null);
  const isRestingRef = useRef(false);

  useEffect(() => {
    // 15 seconds of no activity puts Nico to sleep
    const INACTIVITY_LIMIT = 15000;

    const resetInactivityTimer = () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }

      if (isRestingRef.current) {
        isRestingRef.current = false;
        eventBus.emit({ type: 'ACTIVE' });
      }

      inactivityTimerRef.current = setTimeout(() => {
        isRestingRef.current = true;
        eventBus.emit({ type: 'INACTIVITY' });
      }, INACTIVITY_LIMIT);
    };

    // Listeners for user activity
    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('click', resetInactivityTimer);
    window.addEventListener('keydown', resetInactivityTimer);
    window.addEventListener('scroll', resetInactivityTimer);

    // Initial start
    resetInactivityTimer();

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('click', resetInactivityTimer);
      window.removeEventListener('keydown', resetInactivityTimer);
      window.removeEventListener('scroll', resetInactivityTimer);
    };
  }, []);

  // Sync state reference
  useEffect(() => {
    if (emotion !== 'resting') {
      isRestingRef.current = false;
    } else {
      isRestingRef.current = true;
    }
  }, [emotion]);

  return null; // This is a logic-only background engine
}
