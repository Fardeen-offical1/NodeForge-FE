import React, { useState } from "react";
import NodeMark from "./NodeMark.jsx";
import { submitApplication } from "../lib/api.js";

// Nodeforge WhatsApp number (Pakistan) in international format for wa.me links.
const WHATSAPP_NUMBER = "923450107426"; // 0345-0107426

const INITIAL = {
  name: "",
  email: "",
  phone: "",
  city: "",
  education: "",
  year: "",
  role: "Frontend Developer",
  skills: "",
  experience: "Beginner",
  portfolio: "",
  hours: "10–20 hrs/week",
  start: "Immediately",
  unpaidOk: "",
  why: "",
};

function buildWhatsAppMessage(f) {
  return (
    `New Nodeforge internship application\n\n` +
    `Name: ${f.name}\n` +
    `Email: ${f.email}\n` +
    `Phone: ${f.phone}\n` +
    `City: ${f.city || "-"}\n` +
    `Education: ${f.education || "-"} (${f.year || "-"})\n` +
    `Role: ${f.role}\n` +
    `Skills: ${f.skills || "-"}\n` +
    `Experience: ${f.experience}\n` +
    `Portfolio: ${f.portfolio || "-"}\n` +
    `Availability: ${f.hours}, starting ${f.start}\n` +
    `Unpaid OK: ${f.unpaidOk}\n` +
    `Why: ${f.why || "-"}`
  );
}

function whatsappLink(f) {
  const msg = encodeURIComponent(buildWhatsAppMessage(f));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

export default function ApplicationForm() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState("idle"); // idle | saving | done | error
  const [error, setError] = useState("");
  const [waLink, setWaLink] = useState("");

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.phone || !form.unpaidOk) {
      setError(
        "Please fill in your name, email, phone, and confirm the unpaid internship terms."
      );
      return;
    }
    setStatus("saving");
    try {
      // 1. Save to the Nodeforge backend.
      await submitApplication(form);
    } catch (err) {
      console.error(err);
      // We still let the applicant proceed to WhatsApp even if the
      // backend save fails, so their application isn't lost entirely.
    }

    // 2. Open WhatsApp with a pre-filled message to the Nodeforge number.
    const link = whatsappLink(form);
    setWaLink(link);
    window.open(link, "_blank", "noopener,noreferrer");
    setStatus("done");
  };

  if (status === "done") {
    return (
      <div className="form-done">
        <NodeMark size={40} />
        <h3>Application received</h3>
        <p>
          Thanks, {form.name.split(" ")[0] || "there"} — a WhatsApp chat
          should have opened with your details ready to send. If it didn't
          open automatically, use the button below.
        </p>
        <div className="form-done-actions">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            Send via WhatsApp
          </a>
          <button
            className="btn btn-ghost"
            onClick={() => {
              setForm(INITIAL);
              setStatus("idle");
            }}
          >
            Submit another response
          </button>
        </div>
        <style>{formCss}</style>
      </div>
    );
  }

  return (
    <form className="app-form" onSubmit={submit}>
      <div className="form-grid">
        <label className="field">
          <span>Full name *</span>
          <input value={form.name} onChange={update("name")} required />
        </label>
        <label className="field">
          <span>Email *</span>
          <input type="email" value={form.email} onChange={update("email")} required />
        </label>
        <label className="field">
          <span>Phone (WhatsApp) *</span>
          <input value={form.phone} onChange={update("phone")} required />
        </label>
        <label className="field">
          <span>City</span>
          <input value={form.city} onChange={update("city")} />
        </label>
        <label className="field">
          <span>Education / University</span>
          <input value={form.education} onChange={update("education")} />
        </label>
        <label className="field">
          <span>Current year / semester</span>
          <input value={form.year} onChange={update("year")} />
        </label>

        <label className="field">
          <span>Position applying for *</span>
          <select value={form.role} onChange={update("role")}>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>API Developer</option>
            <option>WordPress Developer</option>
            <option>.NET Developer</option>
          </select>
        </label>
        <label className="field">
          <span>Experience level</span>
          <select value={form.experience} onChange={update("experience")}>
            <option>Beginner</option>
            <option>0–6 months</option>
            <option>6–12 months</option>
            <option>1+ year</option>
          </select>
        </label>

        <label className="field span-2">
          <span>Relevant skills</span>
          <input
            placeholder="e.g. React, Node.js, C#, SQL, WordPress"
            value={form.skills}
            onChange={update("skills")}
          />
        </label>

        <label className="field span-2">
          <span>Portfolio / GitHub / LinkedIn</span>
          <input
            value={form.portfolio}
            onChange={update("portfolio")}
            placeholder="Optional, but recommended"
          />
        </label>

        <label className="field">
          <span>Hours available per week</span>
          <select value={form.hours} onChange={update("hours")}>
            <option>&lt; 10 hrs/week</option>
            <option>10–20 hrs/week</option>
            <option>20+ hrs/week</option>
          </select>
        </label>
        <label className="field">
          <span>When can you start?</span>
          <select value={form.start} onChange={update("start")}>
            <option>Immediately</option>
            <option>Within 2 weeks</option>
            <option>Within a month</option>
          </select>
        </label>

        <label className="field span-2">
          <span>Why do you want to intern at Nodeforge?</span>
          <textarea rows={4} value={form.why} onChange={update("why")} />
        </label>

        <div className="field span-2">
          <span>Are you okay with this being an unpaid internship? *</span>
          <div className="radio-row">
            <label>
              <input
                type="radio"
                name="unpaidOk"
                value="Yes"
                checked={form.unpaidOk === "Yes"}
                onChange={update("unpaidOk")}
              />
              Yes, I understand
            </label>
            <label>
              <input
                type="radio"
                name="unpaidOk"
                value="No"
                checked={form.unpaidOk === "No"}
                onChange={update("unpaidOk")}
              />
              No
            </label>
          </div>
        </div>
      </div>

      {error && <div className="form-error">{error}</div>}

      <button className="btn btn-primary form-submit" disabled={status === "saving"}>
        {status === "saving" ? "Submitting…" : "Submit application"}
      </button>
      <p className="form-note">
        Submitting opens WhatsApp with your details pre-filled to send to
        the Nodeforge team. Your response is also saved to our system.
        Fields marked * are required.
      </p>

      <style>{formCss}</style>
    </form>
  );
}

const formCss = `
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .span-2 { grid-column: span 2; }
  .field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 13.5px;
    color: var(--text-muted);
    font-weight: 500;
  }
  .field input,
  .field select,
  .field textarea {
    background: var(--bg-alt);
    border: 1px solid var(--panel-border);
    border-radius: 8px;
    padding: 11px 13px;
    color: var(--text);
    font-family: 'Inter', sans-serif;
    font-size: 14.5px;
    outline: none;
    resize: vertical;
  }
  .field input:focus,
  .field select:focus,
  .field textarea:focus {
    border-color: var(--ember);
  }
  .radio-row {
    display: flex;
    gap: 24px;
    margin-top: 4px;
  }
  .radio-row label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 400;
    color: var(--text);
  }
  .form-error {
    color: var(--ember-light);
    background: rgba(240,114,58,0.1);
    border: 1px solid rgba(240,114,58,0.3);
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 13.5px;
    margin-top: 24px;
  }
  .form-submit {
    margin-top: 28px;
    width: 100%;
  }
  .form-note {
    color: var(--text-faint);
    font-size: 12.5px;
    margin: 14px 0 0 0;
    text-align: center;
  }
  .form-done {
    text-align: center;
    padding: 40px 20px;
  }
  .form-done h3 {
    font-size: 24px;
    margin: 18px 0 10px 0;
  }
  .form-done p {
    color: var(--text-muted);
    margin: 0 0 24px 0;
    max-width: 440px;
    margin-left: auto;
    margin-right: auto;
  }
  .form-done-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }
  @media (max-width: 860px) {
    .form-grid { grid-template-columns: 1fr; }
    .span-2 { grid-column: span 1; }
  }
`;
