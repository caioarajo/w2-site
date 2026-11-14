import type { Metadata } from 'next';
import { site } from '@/lib/content';

export const metadata: Metadata = { title: 'Política de privacidade', alternates: { canonical: '/privacidade' } };

export default function Privacidade() {
  return (
    <article>
      <header className="page-hero wrap">
        <p className="kicker">LGPD</p>
        <h1 className="h1">Política de privacidade</h1>
      </header>
      <div className="prose wrap">
        <p><em>Modelo para revisão jurídica antes da publicação.</em></p>
        <h2>Quais dados coletamos</h2>
        <p>Nome, empresa, e-mail, telefone e a mensagem que você envia pelo formulário de contato. Com o seu consentimento, também coletamos dados de navegação por meio de cookies de análise (Google Analytics).</p>
        <h2>Para que usamos</h2>
        <p>Para responder ao seu contato, enviar propostas comerciais e entender como o site é usado.</p>
        <h2>Com quem compartilhamos</h2>
        <p>Apenas com fornecedores necessários à operação, como hospedagem, envio de e-mail e análise de audiência. Não vendemos dados.</p>
        <h2>Seus direitos</h2>
        <p>Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento pelo e-mail <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
        <h2>Cookies</h2>
        <p>Você pode mudar sua escolha em “Preferências de cookies”, no rodapé.</p>
      </div>
    </article>
  );
}
