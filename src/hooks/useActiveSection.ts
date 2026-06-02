'use client';

import { useEffect, useRef, useState } from 'react';

export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState('');
  const ref = useRef(ids);

  useEffect(() => {
    const elements = ref.current
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      // Zona: desde ~15% bajo el borde superior del viewport hasta 30% desde arriba.
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}
