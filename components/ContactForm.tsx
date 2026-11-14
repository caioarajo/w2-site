'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { sendContact, type ContactState } from '@/app/actions';
import { interests } from '@/lib/content';

const initial: ContactState = { ok: false, message: '' };

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const [interest, setInterest] = useState(interests[0]);
  const formRef = useRef<HTMLFormElement>(null);

  // Botões "Solicitar proposta" dos planos pré-selecionam o interesse
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-plan]');
      if (el?.dataset.plan && interests.includes(el.dataset.plan)) setInterest(el.dataset.plan);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
      setInterest(interests[0]);
      const w = window as unknown as { gtag?: (...a: unknown[]) => void };
      w.gtag?.('event', 'generate_lead');
    }
  }, [state]);

  const err = state.errors ?? {};

  return (
    <form className="form" action={action} ref={formRef} noValidate>
      <div className="form__row">
        <label className={`field${err.nome ? ' has-error' : ''}`}>
          <input type="text" name="nome" placeholder=" " required autoComplete="name" />
          <span>Nome*</span>
        </label>
        <label className="field">
          <input type="text" name="empresa" placeholder=" " autoComplete="organization" />
          <span>Empresa</span>
        </label>
      </div>
      <div className="form__row">
        <label className={`field${err.email ? ' has-error' : ''}`}>
          <input type="email" name="email" placeholder=" " required autoComplete="email" />
          <span>E-mail*</span>
        </label>
        <label className="field">
          <input type="tel" name="telefone" placeholder=" " autoComplete="tel" />
          <span>WhatsApp</span>
        </label>
      </div>

      <fieldset className="chips">
        <legend>Tenho interesse em</legend>
        {interests.map((opt) => (
          <label className="chip" key={opt}>
            <input type="radio" name="interesse" value={opt} checked={interest === opt} onChange={() => setInterest(opt)} />
            <span>{opt}</span>
          </label>
        ))}
      </fieldset>

      <label className="field field--area">
        <textarea name="mensagem" rows={3} placeholder=" " />
        <span>Conte um pouco do seu objetivo</span>
      </label>

      <label className="hp" aria-hidden="true">Site<input type="text" name="site" tabIndex={-1} autoComplete="off" /></label>

      <label className={`check${err.lgpd ? ' has-error' : ''}`}>
        <input type="checkbox" name="lgpd" value="1" required />
        <span>Concordo com a <a href="/privacidade">política de privacidade</a>.</span>
      </label>

      <button type="submit" className="pill pill--lg form__submit" disabled={pending}>
        {pending ? 'Enviando…' : 'Enviar mensagem'} <span aria-hidden="true">→</span>
      </button>
      <p className="form__status" role="status" aria-live="polite">
        {state.message}
        {Object.values(err).length > 0 && <> {Object.values(err).join(' ')}</>}
      </p>
    </form>
  );
}
