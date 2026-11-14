'use client';

import { useCallback, useRef, useState } from 'react';
import { useScrollProgress } from './useScrollProgress';

export default function MethodSteps({ steps }: { steps: { title: string; text: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onProgress = useCallback((p: number) => {
    ref.current?.style.setProperty('--p', String(p));
    setActive(Math.min(steps.length, Math.floor(p * steps.length) + 1));
  }, [steps.length]);

  useScrollProgress(ref, onProgress, { start: 0.65, end: 0.65 });

  return (
    <div className="method__steps" ref={ref}>
      <span className="method__line" aria-hidden="true"><span /></span>
      <ol className="method__list">
        {steps.map((s, i) => (
          <li className={`method__step${i < active ? ' is-active' : ''}`} key={s.title}>
            <span className="method__n">{i + 1}</span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
