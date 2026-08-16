import React from "react";

const ITEMS = [
  {
    title: "Frontend Development",
    desc: "User-facing interfaces that feel fast and get out of the way. We build with React and modern tooling, with real attention to accessibility and performance — not just how it looks.",
    features: [
      "Responsive, mobile-first UI",
      "React & modern JavaScript",
      "Performance & accessibility",
    ],
    stack: "React · JavaScript · HTML/CSS",
  },
  {
    title: "Backend Development",
    desc: "The systems behind the interface: APIs, business logic, and data that hold up under real usage. Clear structure, sane error handling, no shortcuts that cause problems later.",
    features: [
      "REST API design & development",
      "Database design (SQL)",
      "Authentication & security basics",
    ],
    stack: "Node.js · REST APIs · SQL",
  },
  {
    title: "API Development & Integration",
    desc: "Whether you need a new API built from scratch or an existing one connected to your app, we design integrations that are documented, predictable, and easy to maintain.",
    features: [
      "Custom REST API development",
      "Third-party API integration",
      "API documentation",
    ],
    stack: "REST · JSON · Webhooks",
  },
  {
    title: "WordPress Development",
    desc: "From business sites to custom-themed builds, we set up WordPress the right way — fast-loading, easy for you to update yourself, and built on clean, maintainable code.",
    features: [
      "Custom themes & page builds",
      "Plugin setup & customization",
      "Speed & SEO basics",
    ],
    stack: "WordPress · PHP · MySQL",
  },
];

export default function Services() {
  return (
    <section id="services" className="section section-alt">
      <div className="container">
        <div className="eyebrow">WHAT WE BUILD</div>
        <h2 className="h2">Four disciplines, one studio.</h2>
        <p className="section-sub">
          From the interface someone clicks through to the system running
          quietly behind it — we cover the full stack, including the
          platforms most small businesses actually run on.
        </p>

        <div className="services-grid">
          {ITEMS.map((it) => (
            <div className="card" key={it.title}>
              <div className="card-node">
                <svg width="36" height="36" viewBox="0 0 100 100">
                  <line x1="30" y1="25" x2="30" y2="75" style={{ stroke: "var(--ember-light)" }} strokeWidth="4" strokeLinecap="round" />
                  <line x1="70" y1="25" x2="70" y2="75" style={{ stroke: "var(--ember-light)" }} strokeWidth="4" strokeLinecap="round" />
                  <line x1="30" y1="25" x2="70" y2="75" style={{ stroke: "var(--ember-light)" }} strokeWidth="4" strokeLinecap="round" />
                  <circle cx="50" cy="50" r="9" style={{ fill: "var(--ember)" }} />
                </svg>
              </div>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
              <ul className="feature-list">
                {it.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="stack">{it.stack}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 22px;
        }
        .card {
          background: var(--panel);
          border: 1px solid var(--panel-border);
          border-radius: 14px;
          padding: 32px 28px;
        }
        .card-node { margin-bottom: 18px; }
        .card h3 {
          font-size: 20px;
          margin: 0 0 10px 0;
          font-weight: 600;
        }
        .card p {
          color: var(--text-muted);
          font-size: 14.5px;
          line-height: 1.65;
          margin: 0 0 18px 0;
        }
        .feature-list {
          list-style: none;
          margin: 0 0 20px 0;
          padding: 0;
          display: grid;
          gap: 8px;
        }
        .feature-list li {
          font-size: 13.5px;
          color: var(--text);
          padding-left: 18px;
          position: relative;
        }
        .feature-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 7px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--ember);
        }
        .stack {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--text-faint);
          border-top: 1px solid var(--panel-border);
          padding-top: 14px;
        }
        @media (max-width: 860px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
