'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { Case } from '@/lib/content';

/** Carrossel com scroll-snap nativo + botões e barra de progresso. */
export default function CasesCarousel({ cases }: { cases: Case[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
      setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft > max - 8 });
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.case');
    const gap = parseFloat(getComputedStyle(el).columnGap) || 20;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 360) + gap), behavior: 'smooth' });
  };

  return (
    <section className="work" id="trabalhos">
      <header className="work__head wrap">
        <div>
          <p className="kicker">Trabalhos</p>
          <h2 className="h2">Cases que falam<br />por nós.</h2>
        </div>
        <div className="work__nav">
          <button type="button" className="round" onClick={() => go(-1)} disabled={edges.start} aria-label="Case anterior">←</button>
          <button type="button" className="round" onClick={() => go(1)} disabled={edges.end} aria-label="Próximo case">→</button>
        </div>
      </header>

      <div className="work__track" ref={track} tabIndex={0} aria-label="Lista de cases">
        {cases.map((c) => (
          <Link href={`/trabalhos/${c.slug}`} className="case" key={c.slug} data-cursor="Ver" style={{ '--case': c.color } as CSSProperties}>
            <div className="case__media">
              <span className="case__mono" aria-hidden="true">{c.client}</span>
              <span className="case__cat">{c.category}</span>
            </div>
            <div className="case__body">
              <h3>{c.title}</h3>
              <p>{c.client} — {c.result}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="work__bar wrap" aria-hidden="true">
        <span style={{ transform: `scaleX(${Math.max(0.08, progress)})` }} />
      </div>
    </section>
  );
}
