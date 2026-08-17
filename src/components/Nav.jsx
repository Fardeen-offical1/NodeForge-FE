import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NodeMark from "./NodeMark.jsx";
import { useTheme } from "../ThemeContext.jsx";

const LINKS = [
  ["About", "/about"],
  ["Services", "/services"],
  ["Work", "/work"],
  ["Process", "/process"],
  ["Internships", "/internships"],
  ["Contact", "/contact"],
];

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <line x1="12" y1="2.5" x2="12" y2="4.5" />
        <line x1="12" y1="19.5" x2="12" y2="21.5" />
        <line x1="2.5" y1="12" x2="4.5" y2="12" />
        <line x1="19.5" y1="12" x2="21.5" y2="12" />
        <line x1="4.9" y1="4.9" x2="6.3" y2="6.3" />
        <line x1="17.7" y1="17.7" x2="19.1" y2="19.1" />
        <line x1="4.9" y1="19.1" x2="6.3" y2="17.7" />
        <line x1="17.7" y1="6.3" x2="19.1" y2="4.9" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();

  const goInternships = () => {
    setOpen(false);
    navigate("/internships");
  };

  return (
    <header className="nav">
      <div className="container nav-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <NodeMark size={30} />
          <span>NODEFORGE</span>
        </NavLink>

        <nav className="links-desktop">
          {LINKS.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-right">
          <button
            className="theme-toggle"
            onClick={toggle}
            aria-label="Toggle light and dark mode"
            title="Toggle theme"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            className="btn btn-primary btn-sm hide-mobile"
            onClick={goInternships}
          >
            Apply for Internship
          </button>

          <button
            className="burger"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu">
          {LINKS.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {label}
            </NavLink>
          ))}
          <button
            className="btn btn-primary"
            style={{ marginTop: 8 }}
            onClick={goInternships}
          >
            Apply for Internship
          </button>
        </div>
      )}

      <style>{`
        .nav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: color-mix(in srgb, var(--bg) 82%, transparent);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--panel-border);
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          gap: 20px;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--text);
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 17px;
          letter-spacing: 0.02em;
          flex-shrink: 0;
        }
        .links-desktop {
          display: flex;
          gap: 30px;
          flex: 1;
          justify-content: center;
        }
        .links-desktop a {
          position: relative;
          color: var(--text-muted);
          text-decoration: none;
          font-size: 14.5px;
          font-weight: 500;
          transition: color 0.15s ease;
          padding: 4px 0;
        }
        .links-desktop a:hover { color: var(--text); }
        .links-desktop a.active { color: var(--text); }
        .links-desktop a.active::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -25px;
          height: 2px;
          background: var(--ember);
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .theme-toggle {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid var(--panel-border);
          background: var(--panel);
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
        }
        .theme-toggle:hover { border-color: var(--text-muted); }

        .burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }
        .burger span {
          width: 20px;
          height: 2px;
          background: var(--text);
          display: block;
        }
        .mobile-menu { display: none; }

        @media (max-width: 860px) {
          .links-desktop { display: none; }
          .burger { display: flex; }
          .mobile-menu {
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 12px 28px 20px 28px;
            border-top: 1px solid var(--panel-border);
          }
          .mobile-menu a {
            color: var(--text-muted);
            text-decoration: none;
            padding: 10px 0;
            font-size: 15px;
          }
          .mobile-menu a.active { color: var(--ember); }
        }
      `}</style>
    </header>
  );
}
