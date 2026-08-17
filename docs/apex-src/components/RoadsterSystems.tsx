"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SYSTEMS } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Roadster Systems — sticky split-screen feature cards. Left full-bleed media,
 * right light content card (index, media, circular action, title, description,
 * metadata). Cards stack vertically and pin; media crossfades between items.
 * NOT a 4-column grid.
 */
export default function RoadsterSystems() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".system-card");
      cards.forEach((card) => {
        const media = card.querySelector(".system-card__media img");
        const reveals = card.querySelectorAll(".system-card__reveal");

        gsap.fromTo(
          card.querySelector(".system-card__media"),
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: { trigger: card, start: "top 72%" },
          },
        );
        if (media) {
          gsap.fromTo(
            media,
            { scale: 1.1 },
            {
              scale: 1,
              duration: 1.5,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 72%" },
            },
          );
        }
        gsap.fromTo(
          reveals,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: card, start: "top 66%" },
          },
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="technology"
      data-theme="light"
      aria-label="Roadster systems"
      style={{ background: "var(--apex-white)", paddingBlock: "clamp(100px, 14vh, 180px)" }}
    >
      <div className="container-x">
        <p className="micro-label" style={{ color: "var(--text-secondary-light)", marginBottom: 64 }}>
          {SYSTEMS.label}
        </p>

        <div style={{ display: "grid", gap: "clamp(48px, 8vh, 96px)" }}>
          {SYSTEMS.features.map((f, i) => (
            <article
              key={f.title}
              className="system-card"
              data-cursor-label="Explore"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                minHeight: "72vh",
                border: "1px solid var(--hairline-light)",
                background: i % 2 ? "var(--pure-white)" : "var(--apex-white)",
              }}
            >
              {/* media side */}
              <div
                className="system-card__media"
                style={{ position: "relative", overflow: "hidden", order: i % 2 ? 2 : 1, minHeight: 320 }}
              >
                <img
                  src={f.media}
                  alt={f.mediaAlt}
                  loading="lazy"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* content side */}
              <div
                style={{
                  order: i % 2 ? 1 : 2,
                  padding: "clamp(28px, 4vw, 64px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span className="micro-label system-card__reveal" style={{ color: "var(--text-secondary-light)" }}>
                    Feature
                  </span>
                  <span className="micro-label system-card__reveal" style={{ color: "var(--text-secondary-light)" }}>
                    ( {f.index} )
                  </span>
                </div>

                <div style={{ textAlign: "center", marginBlock: "auto" }}>
                  <h3 className="heading-l system-card__reveal" style={{ marginBottom: 24 }}>
                    {f.title}
                  </h3>
                  <p
                    className="body-l system-card__reveal"
                    style={{ color: "var(--text-secondary-light)", maxWidth: "34ch", margin: "0 auto" }}
                  >
                    {f.description}
                  </p>
                  <div style={{ marginTop: 32 }}>
                    <button type="button" className="circle-action system-card__reveal" aria-label={`Explore ${f.title}`}>
                      <span>Read<br />More</span>
                    </button>
                  </div>
                </div>

                <ul
                  className="micro-label system-card__reveal"
                  style={{
                    display: "flex", justifyContent: "space-between",
                    color: "var(--text-secondary-light)",
                    borderTop: "1px solid var(--hairline-light)", paddingTop: 20,
                  }}
                >
                  <li>{f.meta[0]}</li>
                  <li>{f.meta[1]}</li>
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
