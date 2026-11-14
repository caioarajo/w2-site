'use client';

import { useCallback, useRef } from 'react';
import { useScrollProgress } from './useScrollProgress';

/** Texto que acende palavra por palavra conforme a rolagem. */
export default function Manifesto({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(/\s+/);

  const onProgress = useCallback((p: number) => {
    const el = ref.current;
    if (!el) return;
    const lit = Math.round(p * words.length);
    el.style.setProperty('--lit', String(lit));
    el.querySelectorAll<HTMLSpanElement>('.w').forEach((w, i) => w.classList.toggle('on', i < lit));
  }, [words.length]);

  useScrollProgress(ref, onProgress, { start: 0.8, end: 0.5 });

  return (
    <p className="manifesto__text" ref={ref}>
      {words.map((w, i) => (
        <span className="w" key={i}>{w} </span>
      ))}
    </p>
  );
}
