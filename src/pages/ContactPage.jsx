import React from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 6h18v12H3V6z M3 6l9 7 9-7"
        stroke="var(--ember)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--ember)">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8.9-.1.2-.3.2-.6.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5s-.6-1.5-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="eyebrow">CONTACT</div>
          <h2 className="h2">Let's talk about what you're building.</h2>
          <p className="section-sub">
            Reach out directly — we typically respond within a business day.
            For internship applications, use the dedicated internships page
            instead so nothing gets lost.
          </p>
        </Reveal>

        <div className="contact-grid">
          <Reveal delay={0.05}>
            <a href="mailto:contact.nodeforge1@gmail.com" className="contact-card">
              <MailIcon />
              <div>
                <div className="contact-label">Email</div>
                <div className="contact-value">contact.nodeforge1@gmail.com</div>
              </div>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href="https://wa.me/923450107426"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <WhatsAppIcon />
              <div>
                <div className="contact-label">WhatsApp</div>
                <div className="contact-value">+92 345 0107426</div>
              </div>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="contact-footer-note">
            Looking to intern with us instead?{" "}
            <Link to="/internships">See open tracks →</Link>
          </div>
        </Reveal>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
          margin: 40px 0;
          max-width: 720px;
        }
        .contact-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: var(--panel);
          border: 1px solid var(--panel-border);
          border-radius: 14px;
          padding: 26px;
          text-decoration: none;
          color: var(--text);
          transition: transform 0.15s ease, border-color 0.15s ease;
        }
        .contact-card:hover {
          transform: translateY(-2px);
          border-color: var(--ember);
        }
        .contact-label {
          font-size: 12.5px;
          color: var(--text-faint);
          margin-bottom: 4px;
        }
        .contact-value {
          font-size: 15px;
          font-weight: 600;
        }
        .contact-footer-note {
          color: var(--text-muted);
          font-size: 14px;
        }
        .contact-footer-note a {
          color: var(--ember);
          text-decoration: none;
          font-weight: 500;
        }

        @media (max-width: 640px) {
          .contact-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
