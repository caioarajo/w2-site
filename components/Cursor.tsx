'use client';

import { useEffect, useRef, useState } from 'react';

/** Cursor customizado (só em dispositivos com mouse). Cresce sobre elementos com data-cursor. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const el = ref.current!;
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;

    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      el.classList.add('is-on');
      const target = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor]');
      el.classList.toggle('is-big', !!target);
      setLabel(target?.dataset.cursor ?? '');
    };
    const leave = () => el.classList.remove('is-on');

    raf = requestAnimationFrame(loop);
    window.addEventListener('pointermove', move);
    document.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span className="cursor__dot"><span className="cursor__label">{label}</span></span>
    </div>
  );
}
