import React from "react";
import NodeMark from "./NodeMark.jsx";

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container footer-inner">
        <div>
          <div className="brand">
            <NodeMark size={30} />
            <span>NODEFORGE</span>
          </div>
          <p className="footer-tag">Building software, one node at a time.</p>
        </div>

        <div className="footer-contact">
          <div className="eyebrow">GET IN TOUCH</div>
          <a href="mailto:contact.nodeforge1@gmail.com" className="footer-email">
            contact.nodeforge1@gmail.com
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        © {new Date().getFullYear()} Nodeforge. Software, forged right.
      </div>

      <style>{`
        .footer {
          border-top: 1px solid var(--panel-border);
          padding: 56px 0 28px 0;
          background: var(--bg-alt);
        }
        .footer .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 17px;
        }
        .footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 32px;
          margin-bottom: 40px;
        }
        .footer-tag {
          color: var(--text-faint);
          font-size: 14px;
          margin: 12px 0 0 0;
        }
        .footer-email {
          color: var(--ember-light);
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
        }
        .footer-bottom {
          color: var(--text-faint);
          font-size: 12.5px;
          border-top: 1px solid var(--panel-border);
          padding-top: 24px;
        }
      `}</style>
    </footer>
  );
}
