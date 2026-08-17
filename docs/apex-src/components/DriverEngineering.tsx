"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DRIVER } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Split editorial — large architectural visual left, compact copy block right.
 */
export default function DriverEngineering() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".driver__media",
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.35,
          ease: "power4.inOut",
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        },
      );
      gsap.fromTo(
        ".driver__media img",
        { scale: 1.08 },
        {
          scale: 1,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        },
      );
      gsap.fromTo(
        ".driver__reveal",
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: ".driver__copy", start: "top 74%" },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="design"
      data-theme="light"
      aria-label="Engineered around the driver"
      style={{
        background: "var(--apex-white)",
        paddingBlock: "clamp(100px, 16vh, 200px)",
      }}
    >
      <div
        className="container-x driver__grid"
        style={{
          display: "grid",
          gridTemplateColumns: "7fr 5fr",
          gap: "clamp(40px, 6vw, 120px)",
          alignItems: "center",
        }}
      >
        <figure className="driver__media media-mask" style={{ margin: 0, aspectRatio: "4 / 5", overflow: "hidden" }}>
          <img
            src={DRIVER.media}
            alt={DRIVER.mediaAlt}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </figure>

        <div className="driver__copy" style={{ maxWidth: "46ch" }}>
          <p className="micro-label driver__reveal" style={{ color: "var(--text-secondary-light)", marginBottom: 28 }}>
            {DRIVER.label}
          </p>
          <h2 className="heading-m driver__reveal" style={{ marginBottom: 28 }}>
            {DRIVER.headline}
          </h2>
          <p className="body-l driver__reveal" style={{ marginBottom: 24 }}>
            {DRIVER.body}
          </p>
          <p className="driver__reveal" style={{ color: "var(--text-secondary-light)", marginBottom: 36 }}>
            {DRIVER.secondary}
          </p>
          <a href="#technology" className="btn-pill btn-pill--dark driver__reveal" data-cursor>
            {DRIVER.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
