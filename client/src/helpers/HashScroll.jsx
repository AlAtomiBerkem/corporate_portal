import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function HashScroll() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const targetSelector = location.hash;
    const targetId = targetSelector.slice(1);

    const tryScroll = () => {
      const el = document.getElementById(targetId) || document.querySelector(targetSelector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
      }
      return false;
    };

    if (tryScroll()) return;

    let attempts = 0;
    const maxAttempts = 40;
    const intervalMs = 50;

    const interval = setInterval(() => {
      attempts += 1;
      if (tryScroll() || attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [location]);

  return null;
}

export default HashScroll;

