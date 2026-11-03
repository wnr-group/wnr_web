"use client";

import { useState, type FormEvent } from "react";
import { projectTypes, site } from "@/lib/content";
import { Arrow } from "@/components/ui/Icons";

const budgets = ["< ₹10L", "₹10–25L", "₹25–75L", "₹75L+", "Not sure yet"];
const timelines = ["As soon as possible", "Within 3 months", "3–6 months", "Exploring"];

/* No backend is assumed: on submit we compose a structured email.
   Swap `handleSubmit` for an API route / form service when ready. */
export function ContactForm() {
  const [interests, setInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("");
  const [sent, setSent] = useState(false);

  const toggle = (v: string) => setInterests((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [
      `Name: ${f.get("name")}`,
      `Email: ${f.get("email")}`,
      `Company: ${f.get("company") || "—"}`,
      `Interested in: ${interests.join(", ") || "—"}`,
      `Budget: ${budget || "—"}`,
      `Timeline: ${f.get("timeline")}`,
      "",
      `${f.get("message")}`,
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`New project — ${f.get("company") || f.get("name")}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="cform__done" role="status">
        <span className="label label--dot">Brief composed</span>
        <p className="t-d2">
          Thank you. <span className="em">We&apos;ll reply</span> within one working day.
        </p>
        <p className="t-body">
          Your email app should have opened with the brief. If it didn&apos;t, write to{" "}
          <a className="link-line" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
        <button className="link-line" onClick={() => setSent(false)}>
          Edit the brief
        </button>
      </div>
    );
  }

  return (
    <form className="cform" onSubmit={handleSubmit}>
      <fieldset className="cform__set">
        <legend className="label">
          <span className="t-ultra">01</span> What can we help with?
        </legend>
        <div className="cform__chips">
          {projectTypes.map((t) => (
            <button
              type="button"
              key={t}
              className={`cform__chip ${interests.includes(t) ? "is-on" : ""}`}
              aria-pressed={interests.includes(t)}
              onClick={() => toggle(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="cform__set">
        <legend className="label">
          <span className="t-ultra">02</span> About you
        </legend>
        <div className="cform__row">
          <label className="field">
            <span>Name</span>
            <input name="name" required autoComplete="name" placeholder="Your full name" />
          </label>
          <label className="field">
            <span>Work email</span>
            <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
          </label>
        </div>
        <label className="field">
          <span>Company</span>
          <input name="company" autoComplete="organization" placeholder="Company or project name" />
        </label>
      </fieldset>

      <fieldset className="cform__set">
        <legend className="label">
          <span className="t-ultra">03</span> The project
        </legend>
        <label className="field">
          <span>Tell us about it</span>
          <textarea name="message" required rows={5} placeholder="What are you building, and what does success look like?" />
        </label>
        <div className="cform__row">
          <div className="field">
            <span>Budget</span>
            <div className="cform__chips cform__chips--sm" role="radiogroup" aria-label="Budget">
              {budgets.map((b) => (
                <button
                  type="button"
                  role="radio"
                  aria-checked={budget === b}
                  key={b}
                  className={`cform__chip ${budget === b ? "is-on" : ""}`}
                  onClick={() => setBudget(b)}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
          <label className="field">
            <span>Timeline</span>
            <select name="timeline" defaultValue={timelines[1]}>
              {timelines.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>

      <div className="cform__submit">
        <button type="submit" className="btn btn--ultra">
          <span>Get a free consultation</span>
          <span className="btn__icon">
            <Arrow />
          </span>
        </button>
        <span className="mono cform__note">Replies within one working day.</span>
      </div>
    </form>
  );
}
