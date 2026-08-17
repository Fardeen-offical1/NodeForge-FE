import React from "react";
import RepoCard from "../components/RepoCard.jsx";
import Reveal from "../components/Reveal.jsx";

const GITHUB_ACCOUNTS = ["fardeen-offical", "Fardeen-offical1", "fardeen-773"];

const REPOS = [
  {
    owner: "fardeen-offical",
    name: "TaskTarker",
    blurb: "A task tracking application project.",
  },
  {
    owner: "fardeen-offical",
    name: "Hospital-managemnet-System",
    blurb: "A hospital management system project.",
  },
  {
    owner: "Fardeen-offical1",
    name: "myportfilo",
    blurb: "Personal developer portfolio site.",
  },
  {
    owner: "Fardeen-offical1",
    name: "Task-Flow-Project",
    blurb: "A distributed task-management system project.",
  },
  {
    owner: "Fardeen-offical1",
    name: "MISPortal",
    blurb: "A management information system portal.",
  },
  {
    owner: "fardeen-773",
    name: "Ai-Coding-Assistant-",
    blurb: "An AI-assisted coding tool project.",
  },
  {
    owner: "fardeen-773",
    name: "Hostel-Management-System",
    blurb: "A hostel management system project.",
  },
  {
    owner: "fardeen-773",
    name: "ResumeBuilderSite",
    blurb: "A resume-building web app.",
  },
];

function GitHubIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

export default function WorkPage() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="eyebrow">OUR WORK</div>
          <h2 className="h2">Code you can actually go look at.</h2>
          <p className="section-sub">
            A selection of projects pulled live from GitHub — descriptions,
            languages, and stars come straight from the repos themselves,
            not written by us.
          </p>
        </Reveal>

        <div className="work-grid">
          {REPOS.map((r, i) => (
            <Reveal delay={(i % 4) * 0.05} key={`${r.owner}/${r.name}`}>
              <RepoCard owner={r.owner} name={r.name} blurb={r.blurb} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="profiles-row">
            <span className="profiles-label">More on GitHub:</span>
            {GITHUB_ACCOUNTS.map((acc) => (
              <a
                key={acc}
                href={`https://github.com/${acc}`}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-link"
              >
                <GitHubIcon /> @{acc}
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        .work-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin: 40px 0;
        }
        .profiles-row {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
          justify-content: center;
          border-top: 1px solid var(--panel-border);
          padding-top: 28px;
        }
        .profiles-label {
          font-size: 13px;
          color: var(--text-faint);
        }
        .profile-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: var(--text-muted);
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 500;
        }
        .profile-link:hover { color: var(--ember); }

        @media (max-width: 1000px) {
          .work-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .work-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
