/** Marca W2 animada em SVG puro (traço desenhado via CSS) + texto orbital. */
export default function LogoMark() {
  return (
    <div className="mark" aria-hidden="true">
      <svg className="mark__w" viewBox="0 0 400 400">
        <circle className="mark__ring" cx="200" cy="200" r="186" pathLength={1} />
        {/* letras reduzidas para caber com folga dentro do anel */}
        <g transform="translate(200 200) scale(.78) translate(-200 -198)">
          {/* W */}
          <polyline className="mark__stroke" points="38,135 86,272 140,176 194,272 242,135" pathLength={1} />
          {/* 2 — mesmo traço do W */}
          <path
            className="mark__stroke mark__stroke--two"
            d="M272 164 C272 138 292 124 315 124 C340 124 358 141 358 164 C358 190 336 206 272 272 L362 272"
            pathLength={1}
          />
        </g>
        {/* ponto laranja apoiado no anel */}
        <circle className="mark__dot" cx="331" cy="331" r="17" />
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
