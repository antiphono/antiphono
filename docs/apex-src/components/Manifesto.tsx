"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MANIFESTO } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Dark manifesto — oversized centered uppercase headline with three layered
 * floating images parallaxing at differential scroll rates around the type.
 */
export default function Manifesto() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mani__line > span",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: { trigger: rootRef.current, start: "top 68%" },
        },
      );
      gsap.fromTo(
        [".mani__body", ".mani__statement", ".mani__label"],
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: rootRef.current, start: "top 60%" },
        },
      );

      // differential parallax on the three floating images
      const floats: Array<[string, number]> = [
        [".mani__img--wide", -18],
        [".mani__img--small", -34],
        [".mani__img--vertical", -10],
      ];
      floats.forEach(([sel, amt]) => {
        gsap.to(sel, {
          yPercent: amt,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.fromTo(
          sel,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.3,
            ease: "power4.inOut",
            scrollTrigger: { trigger: rootRef.current, start: "top 62%" },
          },
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      data-theme="dark"
      aria-label="Apex manifesto"
      style={{
        position: "relative",
        background: "var(--apex-black)",
        color: "var(--text-on-dark)",
        minHeight: "150vh",
        paddingBlock: "clamp(140px, 24vh, 280px)",
        overflow: "clip",
      }}
    >
      <div className="container-x" style={{ position: "relative", textAlign: "center" }}>
        <p className="micro-label mani__label" style={{ color: "var(--text-secondary-dark)", marginBottom: 56 }}>
          {MANIFESTO.label}
        </p>

        <h2 className="display-l" style={{ position: "relative", zIndex: 2 }}>
          {MANIFESTO.headline.map((line) => (
            <span key={line} className="mani__line" style={{ display: "block", overflow: "hidden" }}>
              <span style={{ display: "block" }}>{line}</span>
            </span>
          ))}
        </h2>

        <div style={{ maxWidth: "52ch", margin: "56px auto 0", position: "relative", zIndex: 2 }}>
          <p className="body-l mani__body" style={{ color: "var(--text-secondary-dark)" }}>
            {MANIFESTO.body}
          </p>
          <p className="heading-m mani__statement" style={{ marginTop: 32 }}>
            {MANIFESTO.statement}
          </p>
        </div>

        {/* layered floating imagery */}
        <figure
          className="mani__img mani__img--wide"
          style={{
            position: "absolute", left: "2%", bottom: "4%",
            width: "clamp(280px, 38vw, 760px)", aspectRatio: "16/9",
            margin: 0, zIndex: 1, willChange: "transform, clip-path",
          }}
        >
          <img src={MANIFESTO.mediaWide} alt={MANIFESTO.mediaWideAlt} loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </figure>
        <figure
          className="mani__img mani__img--small"
          style={{
            position: "absolute", right: "6%", top: "2%",
            width: "clamp(160px, 18vw, 340px)", aspectRatio: "4/3",
            margin: 0, zIndex: 1, willChange: "transform, clip-path",
          }}
        >
          <img src={MANIFESTO.mediaSmall} alt={MANIFESTO.mediaSmallAlt} loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </figure>
        <figure
          className="mani__img mani__img--vertical"
          style={{
            position: "absolute", right: "16%", bottom: "10%",
            width: "clamp(140px, 15vw, 280px)", aspectRatio: "3/4",
            margin: 0, zIndex: 1, willChange: "transform, clip-path",
          }}
        >
          <img src={MANIFESTO.mediaVertical} alt={MANIFESTO.mediaVerticalAlt} loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </figure>
      </div>
    </section>
  );
}
