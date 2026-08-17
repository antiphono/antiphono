"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "./Logo";
import { NAV_LINKS } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

/**
 * Thin minimal header. Transparent over the hero (white text over dark media),
 * switches to dark text + light backdrop over light sections via ScrollTrigger
 * on [data-theme] sections.
 */
export default function Header({ onMenuOpen }: Readonly<{ onMenuOpen: () => void }>) {
  const headerRef = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: 0,
        end: "max",
        onUpdate: () => {
          // Sample element under header center to pick theme
          const el = document.elementFromPoint(window.innerWidth / 2, 40);
          const section = el?.closest?.("[data-theme]");
          const t = section?.getAttribute("data-theme");
          setTheme(t === "light" ? "light" : "dark");
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const dark = theme === "dark";

  return (
    <header
      ref={headerRef}
      style={{
        position: "fixed",
        insetInline: 0,
        top: 0,
        zIndex: 100,
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: "var(--gutter)",
        color: dark ? "var(--text-on-dark)" : "var(--text-on-light)",
        transition: "color 400ms var(--ease-soft), background-color 400ms var(--ease-soft)",
        backgroundColor: "transparent",
      }}
    >
      <a href="#top" aria-label="Apex home" style={{ color: "inherit" }}>
        <Logo />
      </a>

      <nav aria-label="Primary" className="header-nav">
        <ul
          style={{
            display: "flex",
            gap: "clamp(20px, 2.4vw, 40px)",
            alignItems: "center",
          }}
        >
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="header-link">
                <span className="header-link__inner">
                  <span>{l.label}</span>
                  <span aria-hidden="true">{l.label}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <a href="#reserve" className="header-cta micro-label">
          Configure
        </a>
        <button
          type="button"
          className="header-burger"
          aria-label="Open menu"
          onClick={onMenuOpen}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
