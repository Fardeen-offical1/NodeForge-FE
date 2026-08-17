import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import StatsStrip from "../components/StatsStrip.jsx";
import Trust from "../components/Trust.jsx";
import Reveal from "../components/Reveal.jsx";

const SERVICE_PREVIEW = [
  ["Frontend Development", "React interfaces, built with intent."],
  ["Backend Development", "APIs and systems that hold up."],
  ["API Development", "Custom builds and integrations."],
  ["WordPress Development", "Fast, maintainable, easy to update."],
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="eyebrow">WHAT WE BUILD</div>
            <h2 className="h2">Four disciplines, one studio.</h2>
          </Reveal>

          <div className="preview-grid">
            {SERVICE_PREVIEW.map(([title, desc], i) => (
              <Reveal delay={i * 0.06} key={title}>
                <div className="preview-card">
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="preview-cta">
              <Link to="/services" className="btn btn-ghost">
                See all services in detail →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal>
        <Trust />
      </Reveal>

      <section className="section cta-band">
        <div className="container cta-inner">
          <Reveal>
            <div>
              <h2 className="h2" style={{ marginBottom: 8 }}>
                Have a project — or want to learn by building one?
              </h2>
              <p className="section-sub" style={{ marginBottom: 0 }}>
                Start a conversation, or apply for one of our open internship tracks.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="cta-actions">
              <Link to="/contact" className="btn btn-primary">Get in touch</Link>
              <Link to="/internships" className="btn btn-ghost">View internships</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .preview-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-top: 40px;
        }
        .preview-card {
          background: var(--panel);
          border: 1px solid var(--panel-border);
          border-radius: 12px;
          padding: 22px;
          height: 100%;
        }
        .preview-card h3 {
          font-size: 15.5px;
          font-weight: 600;
          margin: 0 0 8px 0;
        }
        .preview-card p {
          font-size: 13px;
          color: var(--text-muted);
          margin: 0;
          line-height: 1.5;
        }
        .preview-cta {
          text-align: center;
          margin-top: 32px;
        }

        .cta-band {
          background: var(--bg-alt);
          border-top: 1px solid var(--panel-border);
        }
        .cta-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
        }
        .cta-actions {
          display: flex;
          gap: 12px;
          flex-shrink: 0;
        }

        @media (max-width: 860px) {
          .preview-grid { grid-template-columns: 1fr 1fr; }
          .cta-inner { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 560px) {
          .preview-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
