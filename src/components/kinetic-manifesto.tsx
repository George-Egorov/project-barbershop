"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

const desktopMotionQuery =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

function getManifestoTravel(wordCount: number) {
  const availableHeight = Math.max(1, window.innerHeight);
  const heightDrivenBeat = availableHeight * 0.92;
  const widthDrivenBeat = Math.min(window.innerWidth * 0.46, availableHeight * 1.2);
  const beatTravel = Math.max(heightDrivenBeat, widthDrivenBeat);

  return Math.round(beatTravel * (Math.max(1, wordCount) + 0.65));
}

export function KineticManifesto({
  words,
  statement,
}: {
  words: readonly string[];
  statement: string;
}) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root || words.length === 0) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    let disposed = false;
    let refreshFrame: number | null = null;
    let updateDesktopLayout: (() => void) | null = null;
    const media = gsap.matchMedia();

    const scheduleRefresh = () => {
      if (disposed || updateDesktopLayout === null || refreshFrame !== null) {
        return;
      }

      refreshFrame = window.requestAnimationFrame(() => {
        refreshFrame = null;

        if (disposed) {
          return;
        }

        updateDesktopLayout?.();
        ScrollTrigger.refresh();
      });
    };

    window.addEventListener("load", scheduleRefresh);
    window.addEventListener("resize", scheduleRefresh, { passive: true });
    window.addEventListener("orientationchange", scheduleRefresh);
    window.visualViewport?.addEventListener("resize", scheduleRefresh, {
      passive: true,
    });
    document.fonts.addEventListener("loadingdone", scheduleRefresh);
    void document.fonts.ready.then(scheduleRefresh);

    media.add(desktopMotionQuery, () => {
      const context = gsap.context(() => {
        const stage = root.querySelector<HTMLElement>(
          ".kinetic-manifesto__stage",
        );
        const wordTextElements = Array.from(
          root.querySelectorAll<HTMLElement>(
            ".kinetic-manifesto__word-text",
          ),
        );
        const scrollSteps = Array.from(
          root.querySelectorAll<HTMLElement>(
            ".kinetic-manifesto__scroll-step",
          ),
        );
        const statementElement = root.querySelector<HTMLElement>(
          ".kinetic-manifesto__statement",
        );

        if (
          !stage ||
          wordTextElements.length === 0 ||
          scrollSteps.length === 0
        ) {
          return;
        }

        updateDesktopLayout = () => {
          const travel = getManifestoTravel(wordTextElements.length);
          const stepHeight = Math.ceil(travel / scrollSteps.length);

          gsap.set(stage, {
            height: `${Math.max(1, window.innerHeight)}px`,
            minHeight: 0,
            top: 0,
          });
          gsap.set(scrollSteps, { height: stepHeight });
        };

        updateDesktopLayout();

        const getWordTravel = () =>
          Math.max(160, Math.round(stage.clientHeight * 0.34));

        gsap.set(wordTextElements, {
          opacity: 0,
          scale: 0.68,
          transformOrigin: "50% 50%",
          y: getWordTravel,
          yPercent: 0,
        });
        gsap.set(wordTextElements[0], {
          opacity: 1,
          scale: 0.78,
          y: 0,
        });

        if (statementElement) {
          gsap.set(statementElement, {
            opacity: 0.38,
            yPercent: 28,
          });
        }

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${getManifestoTravel(wordTextElements.length)}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        timeline.to(wordTextElements[0], {
          duration: 0.95,
          scale: 1.08,
        });

        wordTextElements.slice(1).forEach((wordElement, index) => {
          const previousWord = wordTextElements[index];
          const transitionStart = (index + 1) * 1.75;

          timeline
            .to(
              previousWord,
              {
                opacity: 0,
                duration: 0.72,
                scale: 1.34,
                y: () => -getWordTravel(),
              },
              transitionStart,
            )
            .fromTo(
              wordElement,
              {
                opacity: 0,
                scale: 0.68,
                y: () => getWordTravel(),
                yPercent: 0,
              },
              {
                opacity: 1,
                duration: 0.72,
                scale: 0.92,
                y: 0,
              },
              transitionStart + 0.04,
            )
            .to(
              wordElement,
              {
                duration: 0.9,
                scale: 1.08,
              },
              transitionStart + 0.76,
            );
        });

        const finalWordStart = (wordTextElements.length - 1) * 1.75;

        timeline.to(
          wordTextElements.at(-1)!,
          {
            duration: 0.85,
            scale: 1.16,
          },
          finalWordStart + 1.7,
        );

        if (statementElement) {
          timeline.to(
            statementElement,
            {
              opacity: 1,
              duration: 1.15,
              yPercent: 0,
            },
            finalWordStart + 1.15,
          );
        }
      }, root);

      scheduleRefresh();

      return () => {
        updateDesktopLayout = null;
        context.revert();
      };
    });

    scheduleRefresh();

    return () => {
      disposed = true;
      updateDesktopLayout = null;
      media.revert();
      window.removeEventListener("load", scheduleRefresh);
      window.removeEventListener("resize", scheduleRefresh);
      window.removeEventListener("orientationchange", scheduleRefresh);
      window.visualViewport?.removeEventListener("resize", scheduleRefresh);
      document.fonts.removeEventListener("loadingdone", scheduleRefresh);

      if (refreshFrame !== null) {
        window.cancelAnimationFrame(refreshFrame);
      }
    };
  }, [words]);

  return (
    <section
      ref={rootRef}
      className="kinetic-manifesto"
      aria-labelledby="manifesto-title"
    >
      <div className="kinetic-manifesto__stage">
        <p className="kinetic-manifesto__eyebrow">
          <span>01</span>
          <span>Манифест</span>
        </p>
        <h2 id="manifesto-title" className="kinetic-manifesto__words">
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="kinetic-manifesto__word"
            >
              <span className="kinetic-manifesto__word-text">{word}</span>
            </span>
          ))}
        </h2>
        <p className="kinetic-manifesto__statement">{statement}</p>
      </div>

      <div className="kinetic-manifesto__scroll-track" aria-hidden="true">
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="kinetic-manifesto__scroll-step"
          />
        ))}
      </div>
    </section>
  );
}
