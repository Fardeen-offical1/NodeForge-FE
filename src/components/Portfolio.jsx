import React, { useEffect, useState } from "react";

const GITHUB_USERNAME = "fardeen-offical";
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function LanguageDot({ lang }) {
  const colors = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    "C#": "#178600",
    HTML: "#e34c26",
    CSS: "#563d7c",
    PHP: "#4F5D95",
    Go: "#00ADD8",
    Dart: "#00B4AB",
    Jupyter: "#DA5B0B",
    "Jupyter Notebook": "#DA5B0B",
    Shell: "#89e051",
  };
  const color = colors[lang] || "var(--ember)";
  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: color,
        marginRight: 6,
      }}
    />
  );
}

function GitHubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" />
    </svg>
  );
}

export default function Portfolio() {
  const [state, setState] = useState({ status: "loading", repos: [] });

  useEffect(() => {
    let cancelled = false;

    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const repos = (Array.isArray(data) ? data : [])
          .filter((r) => !r.fork)
          .sort((a, b) => {
            // Prioritize starred repos, then most recently updated
            if (b.stargazers_count !== a.stargazers_count) {
              return b.stargazers_count - a.stargazers_count;
            }
            return new Date(b.updated_at) - new Date(a.updated_at);
          })
          .slice(0, 6);
        setState({ status: "done", repos });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error", repos: [] });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="work" className="section section-alt">
      <div className="container">
        <div className="eyebrow">OUR WORK</div>
        <h2 className="h2">Code you can actually go look at.</h2>
        <p className="section-sub">
          A live pull from our GitHub — no cherry-picked screenshots. What's
          below is whatever's currently public on our profile.
        </p>

        {state.status === "loading" && (
          <div className="portfolio-grid">
            {[0, 1, 2].map((i) => (
              <div className="repo-card skeleton" key={i}>
                <div className="skel-line w-60" />
                <div className="skel-line w-90" />
                <div className="skel-line w-40" />
              </div>
            ))}
          </div>
        )}

        {state.status === "error" && (
          <div className="portfolio-fallback">
            <p>
              Couldn't load repositories right now — GitHub may be rate
              limiting anonymous requests. You can browse everything
              directly instead.
            </p>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <GitHubIcon size={16} />
              &nbsp; View GitHub Profile
            </a>
          </div>
        )}

        {state.status === "done" && state.repos.length === 0 && (
          <div className="portfolio-fallback">
            <p>No public repositories to show here yet — check back soon.</p>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <GitHubIcon size={16} />
              &nbsp; View GitHub Profile
            </a>
          </div>
        )}

        {state.status === "done" && state.repos.length > 0 && (
          <>
            <div className="portfolio-grid">
              {state.repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-card"
                >
                  <div className="repo-card-top">
                    <GitHubIcon size={18} />
                    <span className="repo-name">{repo.name}</span>
                  </div>
                  <p className="repo-desc">
                    {repo.description || "No description provided."}
                  </p>
                  <div className="repo-meta">
                    {repo.language && (
                      <span className="repo-lang">
                        <LanguageDot lang={repo.language} />
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="repo-stars">
                        <StarIcon /> {repo.stargazers_count}
                      </span>
                    )}
                    <span className="repo-updated">
                      Updated {timeAgo(repo.pushed_at || repo.updated_at)}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <div className="portfolio-cta">
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <GitHubIcon size={16} />
                &nbsp; See everything on GitHub
              </a>
            </div>
          </>
        )}
      </div>

      <style>{`
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .repo-card {
          display: block;
          background: var(--panel);
          border: 1px solid var(--panel-border);
          border-radius: 14px;
          padding: 26px;
          text-decoration: none;
          color: var(--text);
          transition: transform 0.15s ease, border-color 0.15s ease;
        }
        .repo-card:hover {
          transform: translateY(-3px);
          border-color: var(--ember);
        }
        .repo-card-top {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          color: var(--text-muted);
        }
        .repo-name {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 16.5px;
          color: var(--text);
        }
        .repo-desc {
          color: var(--text-muted);
          font-size: 13.5px;
          line-height: 1.55;
          margin: 0 0 20px 0;
          min-height: 42px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .repo-meta {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          font-size: 12px;
          color: var(--text-faint);
          border-top: 1px solid var(--panel-border);
          padding-top: 14px;
        }
        .repo-lang, .repo-stars {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .skeleton {
          pointer-events: none;
        }
        .skel-line {
          height: 12px;
          border-radius: 6px;
          background: var(--panel-border);
          margin-bottom: 12px;
          animation: skel-pulse 1.4s ease-in-out infinite;
        }
        .w-60 { width: 60%; }
        .w-90 { width: 90%; }
        .w-40 { width: 40%; margin-bottom: 0; }
        @keyframes skel-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .portfolio-fallback {
          background: var(--panel);
          border: 1px solid var(--panel-border);
          border-radius: 14px;
          padding: 36px;
          text-align: center;
        }
        .portfolio-fallback p {
          color: var(--text-muted);
          margin: 0 0 20px 0;
          font-size: 14.5px;
        }
        .portfolio-fallback .btn,
        .portfolio-cta .btn {
          display: inline-flex;
          align-items: center;
        }

        .portfolio-cta {
          margin-top: 28px;
          text-align: center;
        }

        @media (max-width: 860px) {
          .portfolio-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
