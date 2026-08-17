import React, { useEffect, useState } from "react";

function timeAgo(dateStr) {
  if (!dateStr) return null;
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C#": "#178600",
  HTML: "#e34c26",
  CSS: "#563d7c",
  PHP: "#4F5D95",
  Dart: "#00B4AB",
};

function GitHubIcon({ size = 16 }) {
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

/**
 * Fetches one specific repo (owner/name) from the GitHub API and renders
 * it as a card. Falls back to a minimal link-only card if the API call
 * fails (rate-limited, repo made private, renamed, etc.) so a single
 * bad request never breaks the whole grid.
 */
export default function RepoCard({ owner, name, blurb }) {
  const [repo, setRepo] = useState(null);
  const [failed, setFailed] = useState(false);
  const url = `https://github.com/${owner}/${name}`;

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/repos/${owner}/${name}`)
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setRepo(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [owner, name]);

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="repo-card">
      <div className="repo-card-top">
        <GitHubIcon size={17} />
        <span className="repo-name">{name}</span>
      </div>

      <p className="repo-desc">
        {repo?.description || blurb || (failed ? "View this project on GitHub." : "Loading…")}
      </p>

      <div className="repo-meta">
        {repo?.language && (
          <span className="repo-lang">
            <span
              className="lang-dot"
              style={{ background: LANG_COLORS[repo.language] || "var(--ember)" }}
            />
            {repo.language}
          </span>
        )}
        {repo?.stargazers_count > 0 && (
          <span className="repo-stars">
            <StarIcon /> {repo.stargazers_count}
          </span>
        )}
        {repo && (
          <span className="repo-updated">
            Updated {timeAgo(repo.pushed_at || repo.updated_at)}
          </span>
        )}
        <span className="repo-owner">@{owner}</span>
      </div>

      <style>{`
        .repo-card {
          display: flex;
          flex-direction: column;
          background: var(--panel);
          border: 1px solid var(--panel-border);
          border-radius: 14px;
          padding: 26px;
          text-decoration: none;
          color: var(--text);
          transition: transform 0.15s ease, border-color 0.15s ease;
          height: 100%;
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
          flex: 1;
        }
        .repo-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          font-size: 12px;
          color: var(--text-faint);
          border-top: 1px solid var(--panel-border);
          padding-top: 14px;
        }
        .repo-lang, .repo-stars {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .lang-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .repo-owner {
          margin-left: auto;
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>
    </a>
  );
}
