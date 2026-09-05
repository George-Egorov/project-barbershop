"use client";

import gsap from "gsap";
import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";

type MagneticLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function MagneticLink({
  href,
  children,
  className = "",
}: MagneticLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const linkElement = linkRef.current;
    const contentElement = contentRef.current;
    if (!linkElement || !contentElement) return;

    const canUseMagneticEffect = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches;
    if (!canUseMagneticEffect) return;

    const moveContentX = gsap.quickTo(contentElement, "x", {
      duration: 0.55,
      ease: "power3.out",
    });
    const moveContentY = gsap.quickTo(contentElement, "y", {
      duration: 0.55,
      ease: "power3.out",
    });

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = linkElement.getBoundingClientRect();
      const horizontalProgress =
        (event.clientX - bounds.left) / bounds.width - 0.5;
      const verticalProgress =
        (event.clientY - bounds.top) / bounds.height - 0.5;

      moveContentX(horizontalProgress * 24);
      moveContentY(verticalProgress * 18);
    };

    const handlePointerLeave = () => {
      moveContentX(0);
      moveContentY(0);
    };

    linkElement.addEventListener("pointermove", handlePointerMove);
    linkElement.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      linkElement.removeEventListener("pointermove", handlePointerMove);
      linkElement.removeEventListener("pointerleave", handlePointerLeave);
      gsap.killTweensOf(contentElement);
    };
  }, []);

  return (
    <a
      ref={linkRef}
      href={href}
      className={`magnetic-link ${className}`.trim()}
    >
      <span ref={contentRef} className="magnetic-link__content">
        {children}
      </span>
    </a>
  );
}
