"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

const desktopMotionQuery =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

function getLookbookTravel() {
  const availableHeight = Math.max(1, window.innerHeight);

  return Math.round(
    Math.max(availableHeight * 1.85, window.innerWidth * 1.05),
  );
}

const gridImageSizes = {
  portrait: "(max-width: 1023px) 100vw, 40vw",
  landscape: "(max-width: 1023px) 100vw, 62vw",
  square: "(max-width: 1023px) 100vw, 46vw",
} as const;

export function ExpandingLookbook({
  items,
}: {
  items: readonly {
    id: string;
    image: string;
    imageAlt: string;
    caption: string;
    format: "portrait" | "landscape" | "square";
  }[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const scheduleRefreshRef = useRef<() => void>(() => undefined);
  const featuredItem = items[0];
  const galleryItems = items.slice(1);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const chapter = root?.querySelector<HTMLElement>(
      ".lookbook-expansion__chapter",
    );

    if (!root || !chapter || !featuredItem) {
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

    scheduleRefreshRef.current = scheduleRefresh;
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
          ".lookbook-expansion__stage",
        );
        const frame = root.querySelector<HTMLElement>(
          ".lookbook-expansion__frame",
        );
        const image = root.querySelector<HTMLElement>(
          ".lookbook-expansion__image",
        );
        const caption = root.querySelector<HTMLElement>(
          ".lookbook-expansion__caption",
        );
        const scrollSteps = Array.from(
          root.querySelectorAll<HTMLElement>(
            ".lookbook-expansion__scroll-step",
          ),
        );

        if (!stage || !frame || !image || !caption || scrollSteps.length === 0) {
          return;
        }

        updateDesktopLayout = () => {
          const travel = getLookbookTravel();
          const stepHeight = Math.ceil(travel / scrollSteps.length);

          gsap.set(stage, {
            height: `${Math.max(1, window.innerHeight)}px`,
            minHeight: 0,
            position: "sticky",
            top: 0,
          });
          gsap.set(scrollSteps, { height: stepHeight });
        };

        updateDesktopLayout();

        gsap.set(frame, {
          "--lookbook-inset-x": "30%",
          "--lookbook-inset-y": "12%",
        });
        gsap.set(image, { scale: 1.2 });
        gsap.set(caption, { autoAlpha: 1, xPercent: 0 });

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: chapter,
              start: "top top",
              end: () => `+=${getLookbookTravel()}`,
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          })
          .to(frame, {
            "--lookbook-inset-x": "0%",
            "--lookbook-inset-y": "0%",
            duration: 1,
          })
          .to(
            image,
            {
              duration: 1,
              scale: 1,
            },
            0,
          )
          .to(
            caption,
            {
              autoAlpha: 0,
              duration: 1,
              xPercent: 72,
            },
            0,
          );
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
      scheduleRefreshRef.current = () => undefined;
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
  }, [featuredItem]);

  if (!featuredItem) {
    return null;
  }

  const refreshScrollTrigger = () => {
    scheduleRefreshRef.current();
  };

  return (
    <div ref={rootRef} className="lookbook-expansion">
      <div className="lookbook-expansion__chapter">
        <div className="lookbook-expansion__stage">
          <figure
            className={`lookbook-expansion__frame lookbook-expansion__frame--${featuredItem.format}`}
          >
            <div className="lookbook-expansion__media">
              <Image
                src={featuredItem.image}
                alt={featuredItem.imageAlt}
                fill
                sizes="(orientation: portrait) 150svh, 100vw"
                className="lookbook-expansion__image"
                onLoad={refreshScrollTrigger}
              />
            </div>
            <figcaption className="lookbook-expansion__caption">
              {featuredItem.caption}
            </figcaption>
          </figure>
        </div>

        <div className="lookbook-expansion__scroll-track" aria-hidden="true">
          <span className="lookbook-expansion__scroll-step" />
          <span className="lookbook-expansion__scroll-step" />
        </div>
      </div>

      <div className="lookbook-expansion__grid">
        {galleryItems.map((item, index) => (
          <figure
            key={item.id}
            className={`lookbook-expansion__grid-item lookbook-expansion__grid-item--${item.format}`}
          >
            <div className="lookbook-expansion__grid-media">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes={gridImageSizes[item.format]}
                className="lookbook-expansion__grid-image"
                onLoad={refreshScrollTrigger}
              />
            </div>
            <figcaption className="lookbook-expansion__grid-caption">
              <span
                className="lookbook-expansion__grid-index"
                aria-hidden="true"
              >
                {String(index + 2).padStart(2, "0")}
              </span>
              <span>{item.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
