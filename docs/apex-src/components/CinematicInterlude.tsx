"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INTERLUDE_FILM } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Full-bleed cinematic transition film. Enters as an inset ultrawide band
 * with rounded corners, then scroll-scales to full-bleed (pinned), releases.
 */
export default function CinematicInterlude() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const media = ".cine__media";
      gsap.set(media, {
        clipPath: "inset(12% 8% 12% 8% round 18px)",
        scale: 0.94,
      });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "+=120%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        })
        .to(media, {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          scale: 1,
          ease: "none",
        })
        .to(media, { scale: 1.04, ease: "none" });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      data-theme="dark"
      aria-label="Apex Roadster film"
      style={{ position: "relative", height: "100vh", overflow: "clip", background: "var(--deep-black)" }}
    >
      <div className="cine__media" style={{ position: "absolute", inset: 0, willChange: "clip-path, transform" }}>
        <video
          src={INTERLUDE_FILM.video}
          poster={INTERLUDE_FILM.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </section>
  );
}
