import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="page-hero page-hero--center wrap">
      <p className="kicker">Erro 404</p>
      <h1 className="h1">Essa ideia ainda<br />não saiu do papel.</h1>
      <p><Link className="pill pill--accent pill--lg" href="/">Voltar para a home</Link></p>
    </section>
  );
}
