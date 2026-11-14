import { cases, clients, hubs, numbers, plans, steps } from '@/lib/content';
import Reveal from '@/components/Reveal';
import LogoMark from '@/components/LogoMark';
import Manifesto from '@/components/Manifesto';
import HubsScroller from '@/components/HubsScroller';
import CasesCarousel from '@/components/CasesCarousel';
import Counter from '@/components/Counter';
import MethodSteps from '@/components/MethodSteps';
import ContactForm from '@/components/ContactForm';

const tapeWords = ['Estratégia', 'Branding', 'Mídia', 'Performance', 'Conteúdo', 'Imprensa', 'Eventos'];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero__grid wrap">
          <div className="hero__copy">
            <Reveal as="p" className="kicker">Agência full-service · Publicidade · Consultoria</Reveal>
            <h1 className="hero__title">
              <span className="line"><span>Comunicação</span></span>
              <span className="line"><span>que gera</span></span>
              <span className="line"><span><em>valor</em><b className="dot">.</b></span></span>
            </h1>
            <Reveal as="p" className="hero__lead" delay={300}>
              A W2 junta o pensamento estratégico das grandes agências com a proximidade de quem conhece o seu
              negócio pelo nome. Da marca ao resultado.
            </Reveal>
            <Reveal className="hero__cta" delay={450}>
              <a className="pill pill--accent pill--lg" href="#contato" data-cursor="Bora">Diagnóstico gratuito</a>
              <a className="pill pill--lg" href="#trabalhos">Ver trabalhos</a>
            </Reveal>
          </div>
          <LogoMark />
        </div>
        <a className="hero__scroll" href="#manifesto" aria-label="Rolar para baixo"><span /></a>
      </section>

      {/* FITA */}
      <div className="tape" aria-hidden="true">
        <div className="tape__row">
          {[0, 1].map((k) => tapeWords.map((w) => (
            <span key={`${k}-${w}`}>{w}<i>✳</i></span>
          )))}
        </div>
      </div>

      {/* MANIFESTO */}
      <section className="manifesto wrap" id="manifesto">
        <p className="kicker">Manifesto</p>
        <Manifesto text="Acreditamos que toda empresa merece estratégia de gente grande. Que criatividade sem resultado é só enfeite, e resultado sem marca não dura. Por isso a W2 é pequena por escolha: para que quem pensa a sua estratégia seja quem senta com você. Sem camadas. Sem enrolação. Com dados na mesa e ideias que movem negócios." />
      </section>

      {/* SERVIÇOS */}
      <HubsScroller hubs={hubs} />

      {/* TRABALHOS */}
      <CasesCarousel cases={cases} />

      {/* NÚMEROS */}
      <section className="numbers wrap" aria-label="Números">
        {numbers.map((n) => (
          <div className="numbers__item" key={n.label}>
            <strong><Counter to={n.value} />{n.suffix}</strong>
            <span>{n.label}</span>
          </div>
        ))}
      </section>

      {/* MÉTODO */}
      <section className="method wrap" id="metodo">
        <div className="method__aside">
          <p className="kicker">Como trabalhamos</p>
          <h2 className="h2">Método W2</h2>
          <p className="muted">Cinco etapas, um objetivo: transformar comunicação em resultado de negócio.</p>
        </div>
        <MethodSteps steps={steps} />
      </section>

      {/* PLANOS */}
      <section className="plans" id="planos">
        <header className="wrap plans__head">
          <p className="kicker">Formatos de contratação</p>
          <h2 className="h2">Do projeto pontual<br />à agência completa.</h2>
        </header>
        <div className="plans__grid wrap">
          {plans.map((p, i) => (
            <Reveal as="article" key={p.name} delay={i * 100} className={`plan${p.featured ? ' plan--featured' : ''}`}>
              {p.featured && <span className="plan__tag">Mais escolhido</span>}
              <h3>{p.name}</h3>
              <p className="plan__desc">{p.desc}</p>
              <ul>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
              <a href="#contato" data-plan={`Plano ${p.name}`} className={`pill${p.featured ? ' pill--accent' : ''}`}>
                Solicitar proposta
              </a>
            </Reveal>
          ))}
        </div>
        <p className="plans__note wrap">Também fazemos <strong>projetos avulsos</strong>: identidade visual, site, campanha, evento ou consultoria pontual.</p>
      </section>

      {/* CLIENTES */}
      <section className="clients wrap">
        <p className="kicker">Quem confia na W2</p>
        <ul className="clients__grid">
          {clients.map((c, i) => <Reveal as="li" key={c} delay={i * 50}>{c}</Reveal>)}
        </ul>
      </section>

      {/* CONTATO */}
      <section className="contact" id="contato">
        <div className="contact__grid wrap">
          <div>
            <p className="kicker">Vamos conversar</p>
            <h2 className="contact__title">Tem um desafio?<br /><em>A gente adora.</em></h2>
            <p className="muted">Conte sobre sua empresa. Em até 1 dia útil, respondemos com uma proposta de diagnóstico gratuito.</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
