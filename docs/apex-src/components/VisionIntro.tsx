"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VISION } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Light intro — massive stacked headline left, floating media upper-right
 * with parallax, compact body copy. Masked line reveal on enter.
 */
export default function VisionIntro() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".vision__line > span",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.05,
          ease: "power4.out",
          stagger: 0.09,
          scrollTrigger: { trigger: rootRef.current, start: "top 72%" },
        },
      );
      gsap.fromTo(
        [".vision__body", ".vision__label"],
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: rootRef.current, start: "top 66%" },
        },
      );
      gsap.fromTo(
        ".vision__float",
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.3,
          ease: "power4.inOut",
          scrollTrigger: { trigger: rootRef.current, start: "top 60%" },
        },
      );
      // gentle parallax on the floating media
      gsap.to(".vision__float", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="vision"
      data-theme="light"
      aria-label="Vision"
      style={{
        position: "relative",
        background: "var(--apex-white)",
        paddingBlock: "clamp(120px, 20vh, 220px)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "clip",
      }}
    >
      <div className="container-x" style={{ position: "relative", width: "100%" }}>
        <p className="micro-label vision__label" style={{ color: "var(--text-secondary-light)", marginBottom: 40 }}>
          {VISION.label}
        </p>

        <h2 className="display-l" style={{ maxWidth: "9ch" }}>
          {VISION.headline.map((line) => (
            <span key={line} className="vision__line" style={{ display: "block", overflow: "hidden" }}>
              <span style={{ display: "block" }}>{line}</span>
            </span>
          ))}
        </h2>

        <p
          className="body-l vision__body"
          style={{
            color: "var(--text-secondary-light)",
            maxWidth: "40ch",
            marginTop: 48,
          }}
        >
          {VISION.body}
        </p>

        {/* floating media upper-right */}
        <figure
          className="vision__float"
          aria-hidden="false"
          style={{
            position: "absolute",
            top: "8%",
            right: "var(--gutter)",
            width: "clamp(180px, 20vw, 340px)",
            aspectRatio: "4 / 3",
            margin: 0,
            willChange: "clip-path, transform",
          }}
        >
          <img
            src={VISION.media}
            alt={VISION.mediaAlt}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </figure>
      </div>
    </section>
  );
}
