import { logo300 } from '@/lib/logo-paths';

/**
 * Marca animada da abertura: o anel se desenha, o contorno do "w2" oficial é traçado
 * e depois as letras são preenchidas ("w" claro, "2" azul). Texto orbital girando em volta.
 */
const SIZE = 220; // largura das letras dentro do anel (viewBox 400)
const scale = SIZE / logo300.width;
const tx = 200 - SIZE / 2;
const ty = 200 - (logo300.height * scale) / 2;

export default function LogoMark() {
  return (
    <div className="mark" aria-hidden="true">
      <svg className="mark__w" viewBox="0 0 400 400">
        <circle className="mark__ring" cx="200" cy="200" r="186" pathLength={1} />
        <g transform={`translate(${tx} ${ty}) scale(${scale})`}>
          <path className="mark__glyph mark__glyph--w" d={logo300.w} pathLength={1} />
          <path className="mark__glyph mark__glyph--two" d={logo300.two} pathLength={1} />
        </g>
      </svg>
      <svg className="mark__orbit" viewBox="0 0 200 200">
        <defs>
          <path id="orbit" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
        </defs>
        <text>
          <textPath href="#orbit">estratégia • criação • mídia • digital • conteúdo • relações • </textPath>
        </text>
      </svg>
    </div>
  );
}
