"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Logo from "./Logo";
import { NAV_LINKS } from "@/data/content";

export default function MobileMenu({
  open,
  onClose,
}: Readonly<{ open: boolean; onClose: () => void }>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const links = el.querySelectorAll(".mobile-menu__link > span");

    if (open) {
      gsap.set(el, { visibility: "visible" });
      gsap
        .timeline()
        .to(el, {
          clipPath: "inset(0% 0 0% 0)",
          duration: 0.7,
          ease: "power4.inOut",
        })
        .fromTo(
          links,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.8, ease: "power4.out", stagger: 0.06 },
          "-=0.25",
        );
    } else {
      gsap.to(el, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.55,
        ease: "power4.inOut",
        onComplete: () => gsap.set(el, { visibility: "hidden" }),
      });
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div ref={ref} className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
      <div style={{ position: "absolute", top: 20, left: "var(--gutter)" }}>
        <Logo />
      </div>
      <button type="button" className="mobile-menu__close" onClick={onClose}>
        Close
      </button>
      <nav aria-label="Mobile">
        <ul style={{ display: "grid", gap: "0.2em" }}>
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="mobile-menu__link" onClick={onClose}>
                <span>{l.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
