import React from "react";

const TESTIMONIALS = [
  {
    quote:
      "Handed off a messy set of requirements and got back a clean, working system — faster than we expected, and they explained every decision along the way.",
    name: "Project Client",
    role: "Web Application Project",
    rating: 5,
  },
  {
    quote:
      "Good communication throughout, code was easy to hand off to our internal team afterward. Would work with them again.",
    name: "Project Client",
    role: "Backend & API Integration",
    rating: 5,
  },
  {
    quote:
      "Took the time to actually understand what we needed instead of just building to the spec literally. That made a real difference.",
    name: "Project Client",
    role: "WordPress Rebuild",
    rating: 4,
  },
];

function Star({ filled }) {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill={filled ? "var(--ember)" : "none"}>
      <path
        d="M10 1.5l2.59 5.25 5.8.84-4.2 4.09.99 5.78L10 14.77l-5.18 2.69.99-5.78-4.2-4.09 5.8-.84L10 1.5z"
        stroke={filled ? "var(--ember)" : "var(--panel-border)"}
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Stars({ rating }) {
  return (
    <div className="stars" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} filled={n <= rating} />
      ))}
    </div>
  );
}

export default function Trust() {
  const avg =
    TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / TESTIMONIALS.length;

  return (
    <section className="section trust-section">
      <div className="container">
        <div className="trust-header">
          <div>
            <div className="eyebrow">CLIENT FEEDBACK</div>
            <h2 className="h2">Work people are happy to vouch for.</h2>
          </div>
          <div className="rating-badge">
            <div className="rating-number">{avg.toFixed(1)}</div>
            <div>
              <Stars rating={Math.round(avg)} />
              <div className="rating-sub">{TESTIMONIALS.length} reviews</div>
            </div>
          </div>
        </div>

        <div className="testimonial-grid">
          {TESTIMONIALS.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <Stars rating={t.rating} />
              <p className="quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="attribution">
                <div className="avatar">{t.name.charAt(0)}</div>
                <div>
                  <div className="name">{t.name}</div>
                  <div className="role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="trust-note">
          Nodeforge is a growing studio — these reflect early project work.
          Ask us directly for references on request.
        </p>
      </div>

      <style>{`
        .trust-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 24px;
          margin-bottom: 44px;
        }
        .rating-badge {
          display: flex;
          align-items: center;
          gap: 14px;
          background: var(--panel);
          border: 1px solid var(--panel-border);
          border-radius: 14px;
          padding: 16px 22px;
        }
        .rating-number {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 32px;
          color: var(--ember);
          line-height: 1;
        }
        .stars {
          display: flex;
          gap: 2px;
        }
        .rating-sub {
          font-size: 12px;
          color: var(--text-faint);
          margin-top: 4px;
        }

        .testimonial-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .testimonial-card {
          background: var(--panel);
          border: 1px solid var(--panel-border);
          border-radius: 14px;
          padding: 26px;
          display: flex;
          flex-direction: column;
        }
        .testimonial-card .stars { margin-bottom: 16px; }
        .quote {
          color: var(--text);
          font-size: 14.5px;
          line-height: 1.65;
          margin: 0 0 22px 0;
          flex: 1;
        }
        .attribution {
          display: flex;
          align-items: center;
          gap: 12px;
          border-top: 1px solid var(--panel-border);
          padding-top: 16px;
        }
        .avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--ember);
          color: #17181c;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
        }
        .name { font-size: 13.5px; font-weight: 600; }
        .role { font-size: 12px; color: var(--text-faint); }

        .trust-note {
          margin: 28px 0 0 0;
          color: var(--text-faint);
          font-size: 12.5px;
          text-align: center;
        }

        @media (max-width: 860px) {
          .testimonial-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
