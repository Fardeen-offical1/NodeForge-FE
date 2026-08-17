import React from "react";

const STATS = [
  ["4", "Disciplines covered"],
  ["5", "Internship tracks open"],
  ["8+", "Public repos to review"],
  ["100%", "Projects with a real handoff"],
];

export default function StatsStrip() {
  return (
    <section className="stats-strip">
      <div className="container stats-grid">
        {STATS.map(([num, label]) => (
          <div className="stat" key={label}>
            <div className="stat-num">{num}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      <style>{`
        .stats-strip {
          border-bottom: 1px solid var(--panel-border);
          background: var(--bg-alt);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          padding: 40px 28px;
        }
        .stat {
          text-align: center;
          border-left: 1px solid var(--panel-border);
        }
        .stat:first-child { border-left: none; }
        .stat-num {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 34px;
          color: var(--ember);
          line-height: 1;
        }
        .stat-label {
          margin-top: 8px;
          font-size: 12.5px;
          color: var(--text-muted);
        }
        @media (max-width: 700px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 24px 0; }
          .stat:nth-child(3) { border-left: none; }
        }
      `}</style>
    </section>
  );
}
