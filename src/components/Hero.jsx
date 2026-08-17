import React from "react";
import { useNavigate } from "react-router-dom";
import NodeField from "./NodeField.jsx";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section id="top" className="hero">
      <div className="hero-field">
        <NodeField count={26} seed={11} />
      </div>
      <div className="container hero-inner">
        <div className="eyebrow">SOFTWARE DEVELOPMENT STUDIO</div>
        <h1 className="hero-h1">
          Software,
          <br />
          <span className="accent-text">forged right.</span>
        </h1>
        <p className="hero-sub">
          Nodeforge builds reliable frontend, backend, API, WordPress, and
          .NET software — and trains the next wave of developers who'll
          build it with us.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => navigate("/internships")}>
            Apply for Internship
          </button>
          <button className="btn btn-ghost" onClick={() => navigate("/work")}>
            See our work
          </button>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          overflow: hidden;
          padding: 96px 0 88px 0;
          border-bottom: 1px solid var(--panel-border);
        }
        .hero-field {
          position: absolute;
          inset: 0;
          opacity: 0.9;
          pointer-events: none;
        }
        .hero-inner { position: relative; z-index: 1; }
        .hero-h1 {
          font-weight: 700;
          font-size: clamp(40px, 7vw, 76px);
          line-height: 1.04;
          letter-spacing: -0.02em;
          margin: 0 0 22px 0;
        }
        .accent-text { color: var(--ember); }
        .hero-sub {
          color: var(--text-muted);
          font-size: 18px;
          line-height: 1.6;
          max-width: 540px;
          margin: 0 0 36px 0;
        }
        .hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
      `}</style>
    </section>
  );
}
