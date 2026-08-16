import React from "react";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    desc: "We start by understanding what you actually need — the problem, the users, the constraints — before any code gets written.",
  },
  {
    n: "02",
    title: "Design & Plan",
    desc: "We map out the structure: pages, data, and APIs. You see the plan before we build, so there are no surprises later.",
  },
  {
    n: "03",
    title: "Build",
    desc: "Frontend, backend, or WordPress — built in focused stages, with progress you can actually see along the way.",
  },
  {
    n: "04",
    title: "Deploy & Support",
    desc: "We ship it, make sure it holds up in the real world, and stay reachable after launch — not just until the invoice clears.",
  },
];

export default function Process() {
  return (
    <section id="process" className="section">
      <div className="container">
        <div className="eyebrow">HOW WE WORK</div>
        <h2 className="h2">A process that stays out of your way.</h2>
        <p className="section-sub">
          Four stages, in order — each one feeding the next.
        </p>

        <div className="process-grid">
          {STEPS.map((s, i) => (
            <div className="step" key={s.n}>
              <div className="step-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {i < STEPS.length - 1 && <div className="step-line" />}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .step {
          position: relative;
          padding: 0 24px 0 0;
        }
        .step:first-child { padding-left: 0; }
        .step-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: var(--ember-light);
          margin-bottom: 16px;
          font-weight: 500;
        }
        .step h3 {
          font-size: 18px;
          margin: 0 0 10px 0;
          font-weight: 600;
        }
        .step p {
          color: var(--text-muted);
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
        }
        .step-line {
          display: none;
        }
        @media (min-width: 861px) {
          .step:not(:last-child)::after {
            content: "";
            position: absolute;
            top: 7px;
            right: 0;
            width: 24px;
            height: 1px;
            background: var(--panel-border);
          }
        }
        @media (max-width: 860px) {
          .process-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .step { padding: 0; }
        }
      `}</style>
    </section>
  );
}
