import { useEffect } from 'react';
import { useNico } from '../state/nicoStore';

export function useNicoEvents() {
  const { triggerEmotion } = useNico();

  useEffect(() => {
    // 1. Clics en botones o enlaces interactivos
    const handleGlobalClick = (e) => {
      const target = e.target;
      if (!target) return;
      const isInteractive = target.tagName === 'BUTTON' || 
                            target.closest('button') || 
                            target.classList?.contains('nav-tab') ||
                            target.closest('.nav-tab') ||
                            target.tagName === 'A' ||
                            target.closest('a');

      if (isInteractive) {
        triggerEmotion('happy', 1200);
      }
    };

    // 2. Éxitos y celebraciones
    const handleCelebrate = () => {
      triggerEmotion('happy', 3500);
    };

    // 3. Errores globales
    const handleError = () => {
      triggerEmotion('sad', 2000);
    };

    // 4. Cambios de pestaña/navegación
    const handleNavigate = () => {
      triggerEmotion('thinking', 1000);
    };

    window.addEventListener('click', handleGlobalClick);
    window.addEventListener('nico-celebrate', handleCelebrate);
    window.addEventListener('error', handleError);
    window.addEventListener('navigateTab', handleNavigate);

    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('nico-celebrate', handleCelebrate);
      window.removeEventListener('error', handleError);
      window.removeEventListener('navigateTab', handleNavigate);
    };
  }, [triggerEmotion]);
}
