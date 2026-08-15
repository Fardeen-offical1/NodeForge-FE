import React from "react";

const FACTS = [
  ["Focus", "Frontend · Backend · .NET"],
  ["Studio type", "Remote-first"],
  ["Currently", "Training interns"],
  ["Approach", "Clean, deliberate engineering"],
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="eyebrow">ABOUT</div>
        <h2 className="h2">A small studio, built the way we build software.</h2>

        <div className="about-grid">
          <p className="section-body">
            Nodeforge is a software development studio. We design and ship
            frontend interfaces, backend systems, and .NET applications for
            real use — not proofs of concept. Every engagement is treated
            like a piece of infrastructure someone will depend on:
            considered, tested, and built to last past launch day.
          </p>
          <dl className="facts">
            {FACTS.map(([k, v]) => (
              <div className="fact" key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <style>{`
        .section-body {
          color: var(--text-muted);
          font-size: 17px;
          line-height: 1.75;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 56px;
          align-items: start;
        }
        .facts {
          display: grid;
          gap: 18px;
          margin: 0;
          border-left: 1px solid var(--panel-border);
          padding-left: 24px;
        }
        .fact dt {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11.5px;
          letter-spacing: 0.08em;
          color: var(--text-faint);
          margin-bottom: 4px;
        }
        .fact dd { margin: 0; font-size: 16px; font-weight: 500; }

        @media (max-width: 860px) {
          .about-grid { grid-template-columns: 1fr; }
          .facts {
            border-left: none;
            padding-left: 0;
            border-top: 1px solid var(--panel-border);
            padding-top: 20px;
          }
        }
      `}</style>
    </section>
  );
}
