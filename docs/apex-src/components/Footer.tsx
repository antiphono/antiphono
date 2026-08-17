"use client";

import Logo from "./Logo";
import { FOOTER } from "@/data/content";

export default function Footer() {
  const toTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      data-theme="dark"
      style={{
        background: "var(--deep-black)",
        color: "var(--text-on-dark)",
        paddingBlock: "clamp(64px, 10vh, 120px) 40px",
      }}
    >
      <div className="container-x">
        <div
          className="footer__grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
            gap: "clamp(32px, 4vw, 64px)",
            paddingBottom: 64,
            borderBottom: "1px solid var(--hairline-dark)",
          }}
        >
          <div>
            <Logo />
            <p className="small" style={{ color: "var(--text-secondary-dark)", marginTop: 20 }}>
              {FOOTER.legal}
            </p>
          </div>

          {FOOTER.groups.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <h3 className="micro-label" style={{ color: "var(--text-secondary-dark)", marginBottom: 20 }}>
                {g.title}
              </h3>
              <ul style={{ display: "grid", gap: 12 }}>
                {g.links.map((l) => (
                  <li key={l}>
                    <a href="#top" className="footer__link small">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="micro-label" style={{ color: "var(--text-secondary-dark)", marginBottom: 20 }}>
              Follow
            </h3>
            <ul style={{ display: "flex", gap: 12 }}>
              {FOOTER.social.map((s) => (
                <li key={s}>
                  <a href="#top" className="footer__social" aria-label={s} data-cursor>
                    {s[0]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 32,
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <p className="small" style={{ color: "var(--text-secondary-dark)" }}>
            {FOOTER.finalLine}
          </p>
          <button type="button" onClick={toTop} className="footer__top" aria-label="Back to top" data-cursor>
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
