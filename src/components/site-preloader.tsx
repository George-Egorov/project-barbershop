"use client";

import { useLayoutEffect, useState, useSyncExternalStore } from "react";
import { SiteBrand } from "@/components/site-brand";
import type { SiteIdentity } from "@/data/content";

const MINIMUM_VISIBLE_TIME = 900;
const MAXIMUM_WAIT_TIME = 3600;
const EXIT_ANIMATION_TIME = 720;

type PreloaderPhase = "loading" | "leaving" | "hidden";
type HydratedSitePreloaderProps = {
  identity: SiteIdentity;
};

const subscribeToHydration = () => () => undefined;

function waitForHeroImage() {
  const heroImage = document.querySelector<HTMLImageElement>(
    ".hero-cinematic__image",
  );

  if (!heroImage) return Promise.resolve();

  if (heroImage.complete) {
    return typeof heroImage.decode === "function"
      ? heroImage.decode().catch(() => undefined)
      : Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const settle = () => {
      heroImage.removeEventListener("load", settle);
      heroImage.removeEventListener("error", settle);
      resolve();
    };

    heroImage.addEventListener("load", settle, { once: true });
    heroImage.addEventListener("error", settle, { once: true });
  });
}

function HydratedSitePreloader({ identity }: HydratedSitePreloaderProps) {
  const [phase, setPhase] = useState<PreloaderPhase>("loading");

  useLayoutEffect(() => {
    const rootElement = document.documentElement;
    const bodyElement = document.body;
    const startedAt = performance.now();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let isSettled = false;
    let minimumTimer: number | undefined;
    let exitTimer: number | undefined;

    rootElement.dataset.siteLoading = "true";
    bodyElement.classList.add("is-preloading");
    bodyElement.setAttribute("aria-busy", "true");

    const revealPage = () => {
      if (isSettled) return;
      isSettled = true;

      const elapsedTime = performance.now() - startedAt;
      const remainingTime = Math.max(0, MINIMUM_VISIBLE_TIME - elapsedTime);

      minimumTimer = window.setTimeout(() => {
        rootElement.dataset.siteReady = "true";
        delete rootElement.dataset.siteLoading;
        bodyElement.classList.remove("is-preloading");
        bodyElement.removeAttribute("aria-busy");
        window.dispatchEvent(new CustomEvent("barbershop:site-ready"));
        setPhase("leaving");

        exitTimer = window.setTimeout(
          () => setPhase("hidden"),
          prefersReducedMotion ? 80 : EXIT_ANIMATION_TIME,
        );
      }, remainingTime);
    };

    const fontReadyPromise = document.fonts?.ready ?? Promise.resolve();
    const maximumWaitTimer = window.setTimeout(revealPage, MAXIMUM_WAIT_TIME);

    void Promise.allSettled([fontReadyPromise, waitForHeroImage()]).then(
      revealPage,
    );

    return () => {
      isSettled = true;
      window.clearTimeout(maximumWaitTimer);
      if (minimumTimer) window.clearTimeout(minimumTimer);
      if (exitTimer) window.clearTimeout(exitTimer);
      delete rootElement.dataset.siteLoading;
      bodyElement.classList.remove("is-preloading");
      bodyElement.removeAttribute("aria-busy");
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className={`site-preloader site-preloader--${phase}`}
      role="status"
      aria-live="polite"
      aria-label="Загружаем страницу"
    >
      <div className="site-preloader__inner">
        <SiteBrand
          identity={identity}
          priority
          className="site-preloader__logo"
        />

        <div className="site-preloader__loading-scene" aria-hidden="true">
          <div className="site-preloader__skeleton">
            <span className="site-preloader__skeleton-line site-preloader__skeleton-line--wide" />
            <span className="site-preloader__skeleton-line" />
            <span className="site-preloader__skeleton-line site-preloader__skeleton-line--short" />
          </div>

          <span className="site-preloader__barber-pole">
            <span className="site-preloader__barber-pole-cap" />
            <span className="site-preloader__barber-pole-barrel" />
            <span className="site-preloader__barber-pole-cap" />
          </span>
        </div>

        <div className="site-preloader__footer">
          <span>Готовим пространство</span>
          <span className="site-preloader__counter">01 / 01</span>
        </div>

        <span className="site-preloader__progress" aria-hidden="true">
          <span />
        </span>
      </div>
    </div>
  );
}

type SitePreloaderProps = {
  identity: SiteIdentity;
};

export function SitePreloader({ identity }: SitePreloaderProps) {
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );

  return isHydrated ? <HydratedSitePreloader identity={identity} /> : null;
}
