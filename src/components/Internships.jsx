import React from "react";
import ApplicationForm from "./ApplicationForm.jsx";

const ROLES = [
  { title: "Frontend Developer", stack: "React · JavaScript · HTML/CSS" },
  { title: "Backend Developer", stack: "Node.js · APIs · SQL" },
  { title: "API Developer", stack: "REST APIs · Integrations" },
  { title: "WordPress Developer", stack: "WordPress · PHP · MySQL" },
  { title: ".NET Developer", stack: "C# · ASP.NET · .NET Core" },
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 12.5l5 5L20 7"
        style={{ stroke: "var(--ember-light)" }}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Internships() {
  return (
    <section id="internships" className="section">
      <div className="container">
        <div className="eyebrow">OPEN POSITIONS</div>
        <h2 className="h2">Build your first real-world project with us.</h2>
        <p className="section-sub">
          Nodeforge is offering internships across five tracks. You'll work
          on real code, with real mentorship.
        </p>

        <div className="roles-row">
          {ROLES.map((r) => (
            <div className="role-pill" key={r.title}>
              <span className="dot" />
              <div>
                <div className="role-title">{r.title}</div>
                <div className="role-stack">{r.stack}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="badges">
          <div className="badge">
            <CheckIcon /> Certificate provided on completion
          </div>
          <div className="badge badge-muted">
            Unpaid internship — built for learning &amp; portfolio work
          </div>
        </div>

        <div className="form-wrap">
          <ApplicationForm />
        </div>
      </div>

      <style>{`
        .roles-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }
        .role-pill {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--panel);
          border: 1px solid var(--panel-border);
          border-radius: 10px;
          padding: 16px 18px;
        }
        .dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--ember);
          flex-shrink: 0;
        }
        .role-title { font-weight: 600; font-size: 15.5px; }
        .role-stack {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11.5px;
          color: var(--text-faint);
          margin-top: 2px;
        }
        .badges {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(240,114,58,0.1);
          border: 1px solid rgba(240,114,58,0.35);
          color: var(--ember-light);
          padding: 10px 16px;
          border-radius: 999px;
          font-size: 13.5px;
          font-weight: 500;
        }
        .badge-muted {
          background: transparent;
          border-color: var(--panel-border);
          color: var(--text-muted);
        }
        .form-wrap {
          background: var(--panel);
          border: 1px solid var(--panel-border);
          border-radius: 16px;
          padding: 36px;
        }
        @media (max-width: 1000px) {
          .roles-row { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 860px) {
          .roles-row { grid-template-columns: 1fr; }
          .form-wrap { padding: 24px 18px; }
        }
      `}</style>
    </section>
  );
}
