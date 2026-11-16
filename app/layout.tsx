import type { Metadata, Viewport } from 'next';
import { Manrope, Unbounded } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/content';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CookieConsent from '@/components/CookieConsent';
import Cursor from '@/components/Cursor';
import { isHomolog, isIndexable, isProduction } from '@/lib/env';

const display = Unbounded({ subsets: ['latin'], weight: ['400', '600', '800'], variable: '--font-display', display: 'swap' });
const body = Manrope({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-body', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Agência de publicidade e consultoria`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: site.name,
    title: site.name,
    description: 'Estratégia de agência grande. Agilidade de estúdio.',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
  // Só indexa em produção com domínio oficial (NEXT_PUBLIC_SITE_URL).
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = { themeColor: '#0b0b10' };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/w2-icone-512.png`,
  image: `${site.url}/brand/w2-logo-para-fundo-claro.png`,
  email: site.email,
  telephone: site.phone,
  address: site.address,
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        <Cursor />
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <CookieConsent gaId={isProduction ? process.env.NEXT_PUBLIC_GA_ID : undefined} />
        {isHomolog && <div className="env-badge" role="note">Homologação</div>}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
