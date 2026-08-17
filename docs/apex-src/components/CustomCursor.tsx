"use client";

import { useEffect, useRef } from "react";

/**
 * Fine outlined circular cursor with smooth delayed follow,
 * center dot, contextual labels, mix-blend difference.
 * Disabled on touch devices; native cursor restored on failure.
 */
export default function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;

    const root = rootRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!root || !ring || !dot || !label) return;

    document.body.classList.add("has-custom-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x, ringY = y;
    let raf = 0;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        root.style.opacity = "1";
        ringX = x; ringY = y;
      }

      const t = e.target as HTMLElement;
      const interactive = t.closest?.(
        "a, button, [data-cursor]",
      ) as HTMLElement | null;
      const labelTarget = t.closest?.("[data-cursor-label]") as HTMLElement | null;

      if (labelTarget) {
        root.classList.add("has-label");
        root.classList.remove("is-active");
        label.textContent = labelTarget.dataset.cursorLabel ?? "";
      } else if (interactive) {
        root.classList.add("is-active");
        root.classList.remove("has-label");
      } else {
        root.classList.remove("is-active", "has-label");
      }
    };

    const loop = () => {
      ringX += (x - ringX) * 0.16;
      ringY += (y - ringY) * 0.16;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    root.style.opacity = "0";
    root.style.transition = "opacity 300ms ease";
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className="apex-cursor" aria-hidden="true">
      <div ref={ringRef} className="apex-cursor__ring">
        <span ref={labelRef} className="apex-cursor__label" />
      </div>
      <div ref={dotRef} className="apex-cursor__dot" />
    </div>
  );
}
