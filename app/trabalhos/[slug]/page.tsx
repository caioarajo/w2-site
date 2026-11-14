import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import { cases } from '@/lib/content';
import Reveal from '@/components/Reveal';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = cases.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: `${c.title} — ${c.client}`,
    description: `${c.category}: ${c.result}. ${c.challenge}`,
    alternates: { canonical: `/trabalhos/${c.slug}` },
  };
}

export default async function CasePage({ params }: Params) {
  const { slug } = await params;
  const idx = cases.findIndex((x) => x.slug === slug);
  if (idx === -1) notFound();
  const c = cases[idx];
  const next = cases[(idx + 1) % cases.length];

  return (
    <article className="case-page" style={{ '--case': c.color } as CSSProperties}>
      <header className="page-hero wrap">
        <p className="kicker">{c.client} · {c.category}</p>
        <h1 className="h1">{c.title}</h1>
        <p className="case-page__result">{c.result}</p>
      </header>

      <div className="case-page__cover wrap" aria-hidden="true">
        <div><span>{c.client}</span></div>
      </div>

      <section className="case-page__body wrap">
        <Reveal className="case-page__block">
          <h2>Desafio</h2>
          <p>{c.challenge}</p>
        </Reveal>
        <Reveal className="case-page__block" delay={100}>
          <h2>Solução</h2>
          <p>{c.solution}</p>
        </Reveal>
        <Reveal className="case-page__block" delay={200}>
          <h2>Entregas</h2>
          <ul className="hub__list">{c.deliverables.map((d) => <li key={d}>{d}</li>)}</ul>
        </Reveal>
      </section>

      <section className="case-page__metrics wrap">
        {c.metrics.map((m) => (
          <Reveal key={m.label} className="numbers__item">
            <strong>{m.value}</strong>
            <span>{m.label}</span>
          </Reveal>
        ))}
      </section>

      <p className="wrap hint">Case ilustrativo para o protótipo.</p>

      <Link href={`/trabalhos/${next.slug}`} className="case-page__next" data-cursor="Próximo" style={{ '--case': next.color } as CSSProperties}>
        <span className="kicker">Próximo case</span>
        <strong>{next.title}</strong>
      </Link>
    </article>
  );
}
