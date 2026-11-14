'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Hub } from '@/lib/content';
import { useScrollProgress } from './useScrollProgress';

/**
 * Desktop: seção alta + conteúdo sticky; a rolagem vertical move os cards na horizontal.
 * Mobile / movimento reduzido: carrossel horizontal nativo com scroll-snap.
 */
export default function HubsScroller({ hubs }: { hubs: Hub[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [stickyH, setStickyH] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 961px) and (prefers-reduced-motion: no-preference)');
    const measure = () => {
      setPinned(mq.matches);
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
      // a área presa tem só a altura do conteúdo (sem sobrar tela vazia embaixo)
      if (sticky.current) setStickyH(sticky.current.offsetHeight);
    };
    measure();
    mq.addEventListener('change', measure);
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => {
      mq.removeEventListener('change', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  const onProgress = useCallback((p: number) => {
    if (!pinned) return;
    if (track.current) track.current.style.transform = `translate3d(${-p * distance}px,0,0)`;
    if (bar.current) bar.current.style.transform = `scaleX(${p})`;
  }, [pinned, distance]);

  useScrollProgress(section, onProgress, { mode: 'sticky', stickyHeight: stickyH });

  useEffect(() => {
    if (!pinned && track.current) track.current.style.transform = '';
  }, [pinned]);

  return (
    <section
      className={`hubs${pinned ? ' is-pinned' : ''}`}
      id="servicos"
      ref={section}
      style={pinned && stickyH ? ({ height: `${stickyH + distance}px`, '--sticky-h': `${stickyH}px` } as React.CSSProperties) : undefined}
    >
      <div className="hubs__sticky" ref={sticky}>
        <header className="hubs__head wrap">
          <p className="kicker">O que fazemos</p>
          <h2 className="h2">Seis hubs.<br />Uma agência inteira.</h2>
          <div className="hubs__progress" aria-hidden="true"><span ref={bar} /></div>
        </header>
        <div className="hubs__viewport">
          <div className="hubs__track" ref={track}>
            {hubs.map((hub, i) => (
              <article className="hub" key={hub.slug} id={`hub-${hub.slug}`}>
                <span className="hub__n">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="hub__title">{hub.title}</h3>
                <p className="hub__desc">{hub.desc}</p>
                <ul className="hub__list">
                  {hub.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
