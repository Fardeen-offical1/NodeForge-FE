import React from "react";
import { Link } from "react-router-dom";
import NodeMark from "../components/NodeMark.jsx";

export default function NotFoundPage() {
  return (
    <section className="section notfound">
      <div className="container notfound-inner">
        <NodeMark size={56} />
        <div className="notfound-code">404</div>
        <h2 className="h2">This node isn't connected to anything.</h2>
        <p className="section-sub" style={{ margin: "0 auto 32px auto" }}>
          The page you're looking for doesn't exist, or moved.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>

      <style>{`
        .notfound-inner {
          text-align: center;
          padding: 60px 0;
        }
        .notfound-code {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 72px;
          color: var(--ember);
          margin: 20px 0 8px 0;
          line-height: 1;
        }
        .notfound h2 { max-width: none; }
      `}</style>
    </section>
  );
}
