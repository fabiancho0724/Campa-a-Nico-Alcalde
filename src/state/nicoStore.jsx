import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { eventBus } from '../core/eventBus';
import { nicoBrain } from '../core/nicoBrain';

const NicoContext = createContext(undefined);

// Helper to get Level Names based on user level
export const getLevelName = (lvl) => {
  if (lvl >= 50) return "Transformador de Ciudad";
  if (lvl >= 20) return "Embajador de Tunja";
  if (lvl >= 10) return "Líder Comunitario";
  if (lvl >= 5) return "Constructor de Ideas";
  return "Ciudadano Participante";
};

// Map task completion to insignia titles
export const INSIGNIA_MAP = {
  first_proposal: { id: "prop_maker", title: "Creador Ciudadano", desc: "Por enviar tu primera propuesta para Tunja." },
  volunteer: { id: "compromiso", title: "Compromiso Social", desc: "Por inscribirte como voluntario de campaña." },
  profile_completed: { id: "verificado", title: "Perfil Verificado", desc: "Por completar todos tus datos de usuario." },
  welcome: { id: "novato", title: "Bienvenida Nico", desc: "Por completar el onboarding interactivo inicial." }
};

export function NicoProvider({ children }) {
  const [emotion, setEmotion] = useState('idle');
  const [brainState, setBrainState] = useState(nicoBrain.state);
  const timerRef = useRef(null);

  // --- Extended Gamification & Notifications State ---
  const [xp, setXp] = useState(() => {
    const stored = localStorage.getItem('nico-xp');
    return stored ? parseInt(stored, 10) : 0;
  });
  const [level, setLevel] = useState(() => {
    const stored = localStorage.getItem('nico-level');
    return stored ? parseInt(stored, 10) : 1;
  });
  const [completedTasks, setCompletedTasks] = useState(() => {
    const stored = localStorage.getItem('nico-completed-tasks');
    return stored ? JSON.parse(stored) : [];
  });
  const [unlockedInsignias, setUnlockedInsignias] = useState(() => {
    const stored = localStorage.getItem('nico-unlocked-insignias');
    return stored ? JSON.parse(stored) : [];
  });
  const [notifications, setNotifications] = useState([]);
  const [onboardingStep, setOnboardingStep] = useState(null); // null when inactive, 1-5 when active

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

  // --- Notifications Helper ---
  const addNotification = useCallback((title, message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, title, message, type }]);
    
    // Auto-remove notification after 5.5s
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5500);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // --- XP and Level Up Engine ---
  const addXP = useCallback((amount) => {
    setXp(prevXp => {
      const newXp = prevXp + amount;
      localStorage.setItem('nico-xp', newXp.toString());
      
      // Level progression threshold: level * 200 XP required to level up
      let currentLevel = level;
      let xpNeeded = currentLevel * 200;
      let tempXp = newXp;
      let leveledUp = false;

      while (tempXp >= xpNeeded) {
        tempXp -= xpNeeded;
        currentLevel += 1;
        xpNeeded = currentLevel * 200;
        leveledUp = true;
      }

      if (leveledUp) {
        setLevel(currentLevel);
        localStorage.setItem('nico-level', currentLevel.toString());
        
        // Notify user about level up
        const levelName = getLevelName(currentLevel);
        addNotification("🎉 ¡Subiste de Nivel!", `Alcanzaste el Nivel ${currentLevel} - ${levelName}`, "success");
        
        // Dispatch sound and confetti event
        window.dispatchEvent(new CustomEvent('nico-celebrate', {
          detail: { message: `¡Felicidades! Subiste al Nivel ${currentLevel}: ${levelName}` }
        }));
        
        eventBus.emit({ type: 'CELEBRATE' });
      } else {
        // Simple pop notification for XP gained
        addNotification("+ XP", `Has recibido +${amount} puntos de experiencia`, "xp");
      }

      return newXp;
    });
  }, [level, addNotification]);

  // --- Unlocking Insignias ---
  const unlockInsignia = useCallback((insigniaKey) => {
    const insignia = INSIGNIA_MAP[insigniaKey];
    if (!insignia) return;

    setUnlockedInsignias(prev => {
      if (prev.includes(insignia.id)) return prev;
      
      const nextInsignias = [...prev, insignia.id];
      localStorage.setItem('nico-unlocked-insignias', JSON.stringify(nextInsignias));
      
      addNotification("🏆 ¡Insignia Desbloqueada!", `${insignia.title}: ${insignia.desc}`, "achievement");
      
      // Dispatch celebration event
      window.dispatchEvent(new CustomEvent('nico-celebrate', {
        detail: { message: `¡Has obtenido la insignia: ${insignia.title}!` }
      }));
      eventBus.emit({ type: 'CELEBRATE' });
      
      return nextInsignias;
    });
  }, [addNotification]);

  // --- Completing Tasks ---
  const completeTask = useCallback((taskId) => {
    setCompletedTasks(prev => {
      if (prev.includes(taskId)) return prev;
      
      const nextTasks = [...prev, taskId];
      localStorage.setItem('nico-completed-tasks', JSON.stringify(nextTasks));

      // Task rewards configuration
      if (taskId === 'welcome') {
        addXP(50);
        unlockInsignia('welcome');
      } else if (taskId === 'first_proposal') {
        addXP(150);
        unlockInsignia('first_proposal');
      } else if (taskId === 'volunteer') {
        addXP(200);
        unlockInsignia('volunteer');
      } else if (taskId === 'profile_completed') {
        addXP(100);
        unlockInsignia('profile_completed');
      } else {
        addXP(30); // Default reward for other tasks
      }

      return nextTasks;
    });
  }, [addXP, unlockInsignia]);

  // --- Onboarding Tutorial Actions ---
  const startOnboarding = useCallback(() => {
    setOnboardingStep(1);
    eventBus.emit({ type: 'GREET' });
  }, []);

  const nextOnboardingStep = useCallback(() => {
    setOnboardingStep(prev => {
      if (prev === null) return null;
      if (prev >= 5) {
        completeTask('welcome');
        eventBus.emit({ type: 'CELEBRATE' });
        return null;
      }
      eventBus.emit({ type: 'EXPLAIN' });
      return prev + 1;
    });
  }, [completeTask]);

  const prevOnboardingStep = useCallback(() => {
    setOnboardingStep(prev => {
      if (prev === null || prev <= 1) return prev;
      eventBus.emit({ type: 'EXPLAIN' });
      return prev - 1;
    });
  }, []);

  const endOnboarding = useCallback(() => {
    setOnboardingStep(null);
    eventBus.emit({ type: 'ACTIVE' });
  }, []);

  // --- System nervousness subscriber ---
  useEffect(() => {
    const unsubscribe = eventBus.subscribe((event) => {
      const nextState = nicoBrain.react(event);
      setBrainState(nextState);
      
      if (event.type !== 'IDLE') {
        let duration = 2000;
        if (event.type === 'CELEBRATE' || event.type === 'GREET') {
          duration = 3500;
        } else if (event.type === 'ERROR') {
          duration = 2000;
        } else {
          duration = 1500;
        }
        triggerEmotion(nextState.emotion, duration);
      } else {
        setEmotion('idle');
      }
    });

    return () => unsubscribe();
  }, [triggerEmotion]);

  return (
    <NicoContext.Provider value={{ 
      emotion, 
      triggerEmotion, 
      setEmotion, 
      brainState,
      xp,
      level,
      completedTasks,
      unlockedInsignias,
      notifications,
      onboardingStep,
      addXP,
      completeTask,
      unlockInsignia,
      addNotification,
      removeNotification,
      startOnboarding,
      nextOnboardingStep,
      prevOnboardingStep,
      endOnboarding
    }}>
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
