'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Chama `onProgress(p)` (0 → 1) conforme o elemento atravessa a viewport.
 * start/end: fração da altura da tela onde o topo/fundo do elemento marca 0 e 1.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  onProgress: (p: number) => void,
  {
    start = 0.8,
    end = 0.4,
    mode = 'through',
    stickyHeight,
  }: { start?: number; end?: number; mode?: 'through' | 'sticky'; stickyHeight?: number } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p: number;
      if (mode === 'sticky') {
        // seção alta com conteúdo sticky: 0 quando o topo encosta no topo da tela,
        // 1 quando o fim da seção alcança o fim do conteúdo preso (altura dele, ou a tela inteira)
        const h = stickyHeight || vh;
        const total = r.height - h;
        const offset = Math.min(0, vh - h); // conteúdo mais alto que a tela fica preso pelo fundo
        p = total > 0 ? (offset - r.top) / total : 0;
      } else {
        const from = vh * start;
        const to = vh * end - r.height;
        p = (from - r.top) / (from - to);
      }
      onProgress(Math.min(1, Math.max(0, p)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, onProgress, start, end, mode, stickyHeight]);
}
