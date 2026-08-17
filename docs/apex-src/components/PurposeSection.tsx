"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PURPOSE } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const GALLERY = [
  { src: "/assets/design-studio.webp", alt: "Apex design studio" },
  { src: "/assets/front-three-quarter.webp", alt: "Apex Roadster front three-quarter" },
  { src: "/assets/wheel-aero-channel.webp", alt: "Wheel and aero channel" },
  { src: "/assets/interior-cockpit.webp", alt: "Cockpit detail" },
  { src: "/assets/silver-reflection.webp", alt: "Body reflection" },
];

/**
 * Purpose — pinned center headline while a media mosaic pans horizontally
 * (with vertical stagger) behind it, scrubbed by scroll.
 */
export default function PurposeSection() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const track = ".purpose__track";
      const getAmount = () => {
        const el = track && (document.querySelector(track) as HTMLElement | null);
        return el ? Math.max(0, el.scrollWidth - window.innerWidth) : 0;
      };

      gsap.to(track, {
        x: () => -getAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: () => `+=${getAmount()}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // vertical stagger: odd/even cards drift opposite directions
      gsap.utils.toArray<HTMLElement>(".purpose__card").forEach((card, i) => {
        gsap.to(card, {
          yPercent: i % 2 ? -12 : 12,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: () => `+=${getAmount()}`,
            scrub: true,
          },
        });
      });

      gsap.fromTo(
        ".purpose__line > span",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.09,
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="experience"
      data-theme="dark"
      aria-label="Our purpose"
      style={{
        position: "relative",
        height: "100vh",
        background: "var(--apex-black)",
        color: "var(--text-on-dark)",
        overflow: "clip",
      }}
    >
      {/* horizontal media mosaic behind */}
      <div
        className="purpose__track"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          display: "flex",
          gap: "clamp(16px, 2vw, 32px)",
          paddingInline: "8vw",
          alignItems: "center",
          willChange: "transform",
        }}
      >
        {GALLERY.map((g, i) => (
          <figure
            key={g.src + i}
            className="purpose__card"
            style={{
              flex: "none",
              width: i % 2 ? "clamp(240px, 26vw, 480px)" : "clamp(200px, 22vw, 420px)",
              aspectRatio: i % 2 ? "4/5" : "4/3",
              margin: 0,
              overflow: "hidden",
              opacity: 0.5,
              willChange: "transform",
            }}
          >
            <img src={g.src} alt={g.alt} loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </figure>
        ))}
      </div>

      {/* dark scrim for contrast */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(8,9,10,0.45)" }} />

      {/* pinned center copy */}
      <div
        className="container-x"
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <p className="micro-label" style={{ color: "var(--text-secondary-dark)", marginBottom: 40 }}>
          {PURPOSE.label}
        </p>
        <h2 className="display-m">
          {PURPOSE.headline.map((line) => (
            <span key={line} className="purpose__line" style={{ display: "block", overflow: "hidden" }}>
              <span style={{ display: "block" }}>{line}</span>
            </span>
          ))}
        </h2>
        <p className="body-l" style={{ color: "var(--text-secondary-dark)", maxWidth: "44ch", margin: "32px auto 36px" }}>
          {PURPOSE.body}
        </p>
        <a href="#journal" className="btn-pill" data-cursor>
          {PURPOSE.cta}
        </a>
      </div>
    </section>
  );
}
