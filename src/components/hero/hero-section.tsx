"use client";

import gsap from "gsap";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { ArrowRightIcon } from "@/components/icons";

type HeroSectionProps = {
  eyebrow: string;
  titleLines: readonly [string, string];
  description: string;
  bookingLabel: string;
  metaItems: readonly [string, string];
};

export function HeroSection({
  eyebrow,
  titleLines,
  description,
  bookingLabel,
  metaItems,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const focusLayerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const sectionElement = sectionRef.current;
    const mediaElement = mediaRef.current;
    const focusLayerElement = focusLayerRef.current;
    const glowElement = glowRef.current;
    const grainElement = grainRef.current;
    const titleElement = titleRef.current;
    if (
      !sectionElement ||
      !mediaElement ||
      !focusLayerElement ||
      !glowElement ||
      !grainElement ||
      !titleElement
    ) {
      return;
    }

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    let heroTimeline: gsap.core.Timeline | undefined;
    let fallbackTimer: number | undefined;
    let hasPlayedHeroTimeline = false;

    const context = gsap.context(() => {
      if (!reducedMotionQuery.matches) {
        heroTimeline = gsap.timeline({
          paused: true,
          defaults: { ease: "power4.out" },
        });

        gsap.set(titleElement, { "--hero-title-shadow-opacity": 0 });

        heroTimeline
          .fromTo(
            mediaElement,
            {
              scale: 1.1,
              filter: "saturate(0.58) brightness(0.46)",
            },
            {
              scale: 1.045,
              filter: "saturate(0.82) brightness(0.82)",
              duration: 2.4,
            },
          )
          .fromTo(
            glowElement,
            { autoAlpha: 0, scale: 1.14 },
            { autoAlpha: 0.72, scale: 1, duration: 2.2 },
            0.78,
          )
          .fromTo(
            grainElement,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 1.9 },
            0.95,
          )
          .fromTo(
            ".hero-cinematic__eyebrow",
            { y: 18, autoAlpha: 0, filter: "blur(14px)" },
            { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.9 },
            0.3,
          )
          .fromTo(
            ".hero-cinematic__line-text",
            { yPercent: 112, autoAlpha: 0, filter: "blur(14px)" },
            {
              yPercent: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 1.05,
              stagger: 0.16,
            },
            0.48,
          )
          .to(
            titleElement,
            {
              "--hero-title-shadow-opacity": 0.35,
              duration: 0.82,
              ease: "power2.out",
            },
            1.7,
          )
          .fromTo(
            ".hero-cinematic__support > *",
            { y: 24, autoAlpha: 0, filter: "blur(14px)" },
            {
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.9,
              stagger: 0.1,
            },
            0.9,
          )
          .fromTo(
            ".hero-cinematic__meta",
            { y: 16, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8 },
            1.16,
          );
      } else {
        gsap.set([glowElement, grainElement], { autoAlpha: 1 });
        gsap.set(titleElement, { "--hero-title-shadow-opacity": 0.35 });
      }
    }, sectionElement);

    const playHeroTimeline = () => {
      if (hasPlayedHeroTimeline) return;
      hasPlayedHeroTimeline = true;
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      heroTimeline?.play(0);
    };

    if (!reducedMotionQuery.matches && heroTimeline) {
      if (document.documentElement.dataset.siteReady === "true") {
        window.requestAnimationFrame(playHeroTimeline);
      } else {
        window.addEventListener("barbershop:site-ready", playHeroTimeline, {
          once: true,
        });
        fallbackTimer = window.setTimeout(playHeroTimeline, 4200);
      }
    }

    let removePointerInteraction = () => undefined;

    if (!reducedMotionQuery.matches && pointerQuery.matches) {
      let sectionBounds = sectionElement.getBoundingClientRect();
      let targetX = 0;
      let targetY = 0;
      let targetScale = 1;
      let currentX = 0;
      let currentY = 0;
      let currentScale = 1;
      let isPointerInside = false;
      let isTickerActive = false;
      let pointerLeaveTimer: number | undefined;

      const updateSectionBounds = () => {
        sectionBounds = sectionElement.getBoundingClientRect();
      };

      const renderPointerDepth = () => {
        currentX += (targetX - currentX) * 0.038;
        currentY += (targetY - currentY) * 0.038;
        currentScale += (targetScale - currentScale) * 0.012;

        gsap.set(focusLayerElement, {
          x: currentX * -112,
          y: currentY * -76,
          scale: currentScale,
          transformOrigin: `${50 + currentX * 100}% ${50 + currentY * 100}%`,
          force3D: true,
        });

        const hasSettled =
          Math.abs(targetX - currentX) < 0.0005 &&
          Math.abs(targetY - currentY) < 0.0005 &&
          Math.abs(targetScale - currentScale) < 0.0005;

        if (!isPointerInside && hasSettled) {
          gsap.ticker.remove(renderPointerDepth);
          isTickerActive = false;
        }
      };

      const startPointerDepth = () => {
        if (isTickerActive) return;
        isTickerActive = true;
        gsap.ticker.add(renderPointerDepth);
      };

      const handlePointerEnter = () => {
        if (pointerLeaveTimer) {
          window.clearTimeout(pointerLeaveTimer);
          pointerLeaveTimer = undefined;
        }

        isPointerInside = true;
        targetScale = 1.055;
        updateSectionBounds();
        startPointerDepth();
      };

      const handlePointerMove = (event: PointerEvent) => {
        targetX = Math.min(
          0.5,
          Math.max(
            -0.5,
            (event.clientX - sectionBounds.left) / sectionBounds.width - 0.5,
          ),
        );
        targetY = Math.min(
          0.5,
          Math.max(
            -0.5,
            (event.clientY - sectionBounds.top) / sectionBounds.height - 0.5,
          ),
        );
        targetScale = 1.065 + Math.hypot(targetX, targetY) * 0.025;
        startPointerDepth();
      };

      const handlePointerLeave = () => {
        if (pointerLeaveTimer) window.clearTimeout(pointerLeaveTimer);

        pointerLeaveTimer = window.setTimeout(() => {
          pointerLeaveTimer = undefined;
          isPointerInside = false;
          targetX = 0;
          targetY = 0;
          targetScale = 1;
          startPointerDepth();
        }, 650);
      };

      sectionElement.addEventListener("pointerenter", handlePointerEnter);
      sectionElement.addEventListener("pointermove", handlePointerMove);
      sectionElement.addEventListener("pointerleave", handlePointerLeave);
      window.addEventListener("resize", updateSectionBounds, { passive: true });
      removePointerInteraction = () => {
        sectionElement.removeEventListener("pointerenter", handlePointerEnter);
        sectionElement.removeEventListener("pointermove", handlePointerMove);
        sectionElement.removeEventListener("pointerleave", handlePointerLeave);
        window.removeEventListener("resize", updateSectionBounds);
        if (pointerLeaveTimer) window.clearTimeout(pointerLeaveTimer);
        gsap.ticker.remove(renderPointerDepth);
        gsap.set(focusLayerElement, { clearProps: "transform,transformOrigin" });
      };
    }

    return () => {
      removePointerInteraction();
      window.removeEventListener("barbershop:site-ready", playHeroTimeline);
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="top" className="hero-cinematic">
      <div ref={mediaRef} className="hero-cinematic__media">
        <div ref={focusLayerRef} className="hero-cinematic__media-focus">
          <Image
            src="/images/craft.webp"
            alt="Крупный план точной работы барбера ножницами"
            fill
            preload
            sizes="(orientation: portrait) 150svh, 100vw"
            className="hero-cinematic__image"
          />
        </div>
      </div>

      <div ref={glowRef} className="hero-cinematic__glow" aria-hidden="true" />
      <div
        ref={grainRef}
        className="hero-cinematic__grain"
        aria-hidden="true"
      />

      <div className="hero-cinematic__content page-shell">
        <p className="hero-cinematic__eyebrow">{eyebrow}</p>

        <h1 ref={titleRef} className="hero-cinematic__title">
          {titleLines.map((line) => (
            <span key={line} className="hero-cinematic__line">
              <span className="hero-cinematic__line-text">{line}</span>
            </span>
          ))}
        </h1>

        <div className="hero-cinematic__support">
          <p className="hero-cinematic__description">{description}</p>
          <div className="hero-cinematic__actions">
            <a href="#booking" className="button-primary">
              <span className="button-primary__label">{bookingLabel}</span>
              <ArrowRightIcon className="button-primary__icon" />
            </a>
            <a href="#services" className="text-link">
              <span>Смотреть услуги</span>
              <ArrowRightIcon className="text-link__icon" />
            </a>
          </div>
          <p className="hero-cinematic__reassurance">
            Без звонка / в удобное время
          </p>
        </div>

        <div className="hero-cinematic__meta" aria-hidden="true">
          {metaItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
