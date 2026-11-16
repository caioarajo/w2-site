import Link from 'next/link';
import { nav, site, whatsappUrl } from '@/lib/content';
import CookiePrefsButton from './CookiePrefsButton';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <Logo weight={300} withTagline className="site-footer__logo" />
      </div>

      <div className="site-footer__grid wrap">
        <div>
          <h2 className="site-footer__title">Estratégia de agência grande.<br />Agilidade de estúdio.</h2>
        </div>
        <div>
          <h3>Contato</h3>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">{site.phone}</a>
          <p>{site.address}</p>
        </div>
        <div>
          <h3>Redes</h3>
          {site.social.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label} ↗</a>
          ))}
        </div>
        <div>
          <h3>Agência</h3>
          {nav.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
          <Link href="/privacidade">Privacidade</Link>
        </div>
      </div>

      <div className="site-footer__bottom wrap">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <CookiePrefsButton />
        <a href="#conteudo">Topo ↑</a>
      </div>
    </footer>
  );
}
