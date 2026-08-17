"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { HERO } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Full-bleed hero — supplied Apex video, masked/scale reveal on load,
 * masked line-by-line copy entrance, bottom metadata row.
 */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25 });

      tl.fromTo(
        ".hero__media-mask",
        { clipPath: "inset(8% 6% 8% 6%)", scale: 1.04 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.5,
          ease: "power4.inOut",
        },
      )
        .fromTo(
          ".hero__video",
          { scale: 1.12 },
          { scale: 1, duration: 1.9, ease: "power3.out" },
          0,
        )
        .fromTo(
          ".hero__line > span",
          { yPercent: 110 },
          { yPercent: 0, duration: 1.05, ease: "power4.out", stagger: 0.09 },
          0.55,
        )
        .fromTo(
          [".hero__support", ".hero__meta", ".hero__cta"],
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.09,
          },
          0.95,
        );
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="roadster"
      data-theme="dark"
      aria-label="Apex Roadster hero"
      style={{
        position: "relative",
        height: "100svh",
        minHeight: 560,
        background: "var(--deep-black)",
        color: "var(--text-on-dark)",
        overflow: "clip",
      }}
    >
      <div
        className="hero__media-mask"
        style={{ position: "absolute", inset: 0, willChange: "clip-path" }}
      >
        <video
          className="hero__video"
          src={HERO.video}
          poster={HERO.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 60%",
            willChange: "transform",
          }}
        />
        {/* subtle legibility treatment — keep video bright */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(8,9,10,0.52), rgba(8,9,10,0) 42%)",
          }}
        />
      </div>

      <div
        className="container-x"
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingBottom: "clamp(32px, 5vh, 64px)",
        }}
      >
        <p className="micro-label hero__line" style={{ overflow: "hidden", marginBottom: 20 }}>
          <span style={{ display: "block" }}>{HERO.eyebrow}</span>
        </p>

        <h1
          className="display-l"
          style={{ maxWidth: "14ch", marginBottom: 24 }}
        >
          <span className="hero__line" style={{ display: "block", overflow: "hidden" }}>
            <span style={{ display: "block" }}>{HERO.line}</span>
          </span>
        </h1>

        <p
          className="body-l hero__support"
          style={{
            color: "var(--text-secondary-dark)",
            maxWidth: "42ch",
            marginBottom: 32,
          }}
        >
          {HERO.support}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <a href="#vision" className="hero__cta btn-pill" data-cursor>
            {HERO.cta}
          </a>
          <ul
            className="hero__meta micro-label"
            style={{
              display: "flex",
              gap: "clamp(16px, 3vw, 48px)",
              color: "var(--text-secondary-dark)",
            }}
          >
            {HERO.meta.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
