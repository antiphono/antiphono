"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RESERVATION } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reservation — oversized contact composition with a magnetic circular CTA
 * that expands/inverts on hover and returns gently. Keyboard accessible.
 */
export default function ReservationSection() {
  const rootRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".res__line > span",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.05,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        },
      );
      gsap.fromTo(
        [".res__body", ".res__cta", ".res__secondary"],
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: rootRef.current, start: "top 62%" },
        },
      );
    }, rootRef);

    // magnetic effect on the circular CTA
    const cta = ctaRef.current;
    if (!cta) return () => ctx.revert();

    const xTo = gsap.quickTo(cta, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(cta, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const r = cta.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      const radius = 140;
      if (dist < radius) {
        const pull = (1 - dist / radius) * 0.35;
        xTo(dx * pull);
        yTo(dy * pull);
      } else {
        xTo(0);
        yTo(0);
      }
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    cta.addEventListener("mouseleave", onLeave);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", onMove);
      cta.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="reserve"
      data-theme="light"
      aria-label="Request access"
      style={{
        background: "var(--apex-white)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingBlock: "clamp(120px, 18vh, 220px)",
      }}
    >
      <div
        className="container-x"
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "clamp(40px, 6vw, 120px)",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div>
          <h2 className="display-l" style={{ marginBottom: 40 }}>
            {RESERVATION.headline.map((line, i) => (
              <span key={line} className="res__line" style={{ display: "block", overflow: "hidden" }}>
                <span
                  style={{
                    display: "block",
                    // ghost the middle word for the alternating solid/outline treatment
                    WebkitTextStroke: i === 0 ? "1.5px currentColor" : undefined,
                    color: i === 0 ? "transparent" : undefined,
                  }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h2>
          <p className="body-l res__body" style={{ color: "var(--text-secondary-light)", maxWidth: "42ch", marginBottom: 32 }}>
            {RESERVATION.body}
          </p>
          <a href="#reserve" className="res__secondary micro-label" data-cursor
            style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>
            {RESERVATION.secondaryLink}
          </a>
        </div>

        <div className="res__cta" style={{ display: "flex", justifyContent: "center" }}>
          <a ref={ctaRef} href="#reserve" className="circle-cta" data-cursor aria-label={RESERVATION.circularCta}>
            {RESERVATION.circularCta}
          </a>
        </div>
      </div>
    </section>
  );
}
