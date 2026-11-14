'use client';

import { createElement, useEffect, useRef, useState, type ElementType, type ReactNode, type CSSProperties } from 'react';

type Props = {
  as?: ElementType;
  className?: string;
  delay?: number;
  children: ReactNode;
};

/** Revela o elemento ao entrar na tela (IntersectionObserver, sem bibliotecas). */
export default function Reveal({ as = 'div', className = '', delay = 0, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      className: `reveal${visible ? ' is-in' : ''}${className ? ' ' + className : ''}`,
      style: { '--delay': `${delay}ms` } as CSSProperties,
    },
    children,
  );
}
