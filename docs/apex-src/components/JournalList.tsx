"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JOURNAL } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Journal — minimal editorial news list. Hairline rows: date / category pill /
 * title. Hover shifts title. "VIEW ALL" pill below.
 */
export default function JournalList() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".journal__row",
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: rootRef.current, start: "top 72%" },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="journal"
      data-theme="light"
      aria-label="Journal"
      style={{ background: "var(--apex-white)", paddingBlock: "clamp(100px, 16vh, 200px)" }}
    >
      <div className="container-x">
        <h2 className="display-m" style={{ marginBottom: 64 }}>
          {JOURNAL.heading}
        </h2>

        <ul>
          {JOURNAL.items.map((item) => (
            <li key={item.title} className="journal__row" style={{ borderTop: "1px solid var(--hairline-light)" }}>
              <a href="#journal" className="journal__link" data-cursor
                style={{
                  display: "grid",
                  gridTemplateColumns: "140px auto 1fr auto",
                  alignItems: "center",
                  gap: "clamp(16px, 3vw, 48px)",
                  paddingBlock: "clamp(20px, 3vh, 32px)",
                }}
              >
                <span className="small" style={{ color: "var(--text-secondary-light)", fontVariantNumeric: "tabular-nums" }}>
                  {item.date}
                </span>
                <span className="journal__pill micro-label">{item.category}</span>
                <span className="journal__title body-l">{item.title}</span>
                <span className="journal__arrow" aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>

        <div style={{ textAlign: "center", marginTop: 56 }}>
          <a href="#journal" className="btn-pill btn-pill--dark" data-cursor>
            {JOURNAL.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
