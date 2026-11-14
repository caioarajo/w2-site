'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { nav, site, whatsappUrl } from '@/lib/content';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 30);
      setHidden(y > lastY.current && y > 300);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-lock', open);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);
  const cls = ['site-header', solid && 'is-solid', hidden && !open && 'is-hidden', open && 'menu-open'].filter(Boolean).join(' ');

  return (
    <header className={cls}>
      <Link href="/" className="brand" aria-label={`${site.name} — início`} onClick={close}>
        <span className="brand__mark">W2</span>
        <span className="brand__name">Comunicação<br />&amp; Consultoria</span>
      </Link>

      <nav className={`site-nav${open ? ' is-open' : ''}`} id="site-nav" aria-label="Principal">
        <ul className="menu">
          {nav.map((item) => (
            <li key={item.href}><Link href={item.href} onClick={close}>{item.label}</Link></li>
          ))}
        </ul>
        <div className="site-nav__foot">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
        </div>
      </nav>

      <div className="site-header__actions">
        <Link href="/#contato" className="pill pill--accent" data-cursor="Vamos?">Fale com a W2</Link>
        <button
          className="burger"
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span />
        </button>
      </div>
    </header>
  );
}
