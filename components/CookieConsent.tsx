'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

const KEY = 'w2-consent';
export const OPEN_EVENT = 'w2:cookie-prefs';

const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const write = (v: string) => { try { localStorage.setItem(KEY, v); } catch { /* storage indisponível */ } };

/** Banner LGPD. O Google Analytics só carrega depois do aceite. */
export default function CookieConsent({ gaId }: { gaId?: string }) {
  const [consent, setConsent] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const c = read();
    setConsent(c);
    setShow(!c);
    const open = () => setShow(true);
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  const choose = (v: 'accept' | 'reject') => {
    write(v);
    setConsent(v);
    setShow(false);
  };

  return (
    <>
      {gaId && consent === 'accept' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      )}
      {show && (
        <div className="cookie" role="dialog" aria-label="Preferências de cookies">
          <p>Usamos cookies para medir a audiência e melhorar sua experiência. Você escolhe.</p>
          <div className="cookie__actions">
            <button type="button" className="pill" onClick={() => choose('reject')}>Só essenciais</button>
            <button type="button" className="pill pill--accent" onClick={() => choose('accept')}>Aceitar todos</button>
          </div>
        </div>
      )}
    </>
  );
}
