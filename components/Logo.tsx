import { logo300, logo400, type LogoPaths } from '@/lib/logo-paths';

type Props = {
  /** 300 = traço fino (tamanhos grandes) · 400 = um pouco mais forte (tamanhos pequenos) */
  weight?: 300 | 400;
  /** Mostra o fio e "comunicação e consultoria" ao lado do símbolo. */
  withTagline?: boolean;
  className?: string;
  /** Texto para leitores de tela. Passe null quando a logo for decorativa. */
  title?: string | null;
};

/**
 * Logo oficial W2 (versão 05.3): "w" na cor do texto + "2" em azul-cobalto.
 * Letras em vetor, geradas por scripts/build-logo.mjs.
 */
export default function Logo({ weight = 400, withTagline = false, className = '', title = 'W2 Comunicação e Consultoria' }: Props) {
  const p: LogoPaths = weight === 300 ? logo300 : logo400;
  const symbol = (
    <svg
      className="logo__symbol"
      viewBox={`0 0 ${p.width} ${p.height}`}
      {...(title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true })}
    >
      <path className="logo__w" d={p.w} />
      <path className="logo__two" d={p.two} />
    </svg>
  );

  if (!withTagline) return <span className={`logo ${className}`}>{symbol}</span>;

  return (
    <span className={`logo logo--lockup ${className}`}>
      {symbol}
      <span className="logo__tagline" aria-hidden="true">comunicação<br />e consultoria</span>
    </span>
  );
}
