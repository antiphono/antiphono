"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MATERIAL } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Material / detail interlude — soft abstract visual breathing space between
 * major content blocks. Subtle scale/parallax only.
 */
export default function MaterialInterlude() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".material__img",
        { scale: 1.12 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      data-theme="dark"
      aria-label="Material detail"
      style={{ height: "70vh", overflow: "clip", background: "var(--deep-black)" }}
    >
      <img
        className="material__img"
        src={MATERIAL.media}
        alt={MATERIAL.mediaAlt}
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", willChange: "transform" }}
      />
    </section>
  );
}
