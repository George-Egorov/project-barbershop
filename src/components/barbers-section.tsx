"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { ArrowRightIcon } from "@/components/icons";

type BarbersSectionProps = {
  team: readonly {
    id: string;
    index: string;
    role: string;
    focus: string;
    description: string;
    image: string;
    imageAlt: string;
  }[];
};

const cardCompositions = ["portrait", "landscape", "closeup"] as const;
const desktopMotionQuery =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

function clampProgress(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smootherStep(value: number) {
  const progress = clampProgress(value);

  return progress ** 3 * (progress * (progress * 6 - 15) + 10);
}

function getEdgeRunway(viewportHeight: number) {
  return Math.min(544, Math.max(240, viewportHeight * 0.48));
}

export function BarbersSection({ team }: BarbersSectionProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLSpanElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  const totalLabel = String(team.length).padStart(2, "0");
  const firstIndex = team[0]?.index ?? "00";

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const progressFill = progressFillRef.current;
    const progressText = progressTextRef.current;

    if (!stage || !viewport || !track) return;

    let disposed = false;
    let measureFrame: number | null = null;
    let desktopProgressFrame: number | null = null;
    let nativeProgressFrame: number | null = null;
    let desktopTravel = 0;
    let desktopScrollTravel = 0;
    let isDesktopMotionEnabled = false;

    const updateProgress = (value: number) => {
      const progress = clampProgress(value);

      if (progressFill) {
        progressFill.style.transform = `scaleX(${progress.toFixed(5)})`;
      }

      if (progressText) {
        const activeIndex = team.length > 1 ? Math.round(progress * (team.length - 1)) : 0;
        const activeLabel = team[activeIndex]?.index ?? firstIndex;
        const nextLabel = `${activeLabel} / ${totalLabel}`;

        if (progressText.textContent !== nextLabel) {
          progressText.textContent = nextLabel;
        }
      }
    };

    const renderDesktopProgress = () => {
      desktopProgressFrame = null;

      if (disposed || !isDesktopMotionEnabled) return;

      const stageTop = stage.getBoundingClientRect().top;
      const rawProgress =
        desktopScrollTravel > 0
          ? clampProgress(-stageTop / desktopScrollTravel)
          : 0;
      const progress = smootherStep(rawProgress);
      const offset = -desktopTravel * progress;

      track.style.transform = `translate3d(${offset.toFixed(3)}px, 0, 0)`;
      updateProgress(progress);
    };

    const scheduleDesktopProgress = () => {
      if (
        disposed ||
        !isDesktopMotionEnabled ||
        desktopProgressFrame !== null
      ) {
        return;
      }

      desktopProgressFrame = window.requestAnimationFrame(
        renderDesktopProgress,
      );
    };

    const measureDesktopLayout = () => {
      measureFrame = null;

      if (disposed || !isDesktopMotionEnabled) return;

      desktopTravel = Math.max(0, track.scrollWidth - viewport.clientWidth);

      const viewportHeight = Math.max(1, window.innerHeight);
      const edgeRunway = getEdgeRunway(viewportHeight);
      desktopScrollTravel = desktopTravel + edgeRunway * 2;
      const nextViewportHeight = `${viewportHeight}px`;
      const nextStageHeight = `${viewportHeight + desktopScrollTravel}px`;

      if (viewport.style.height !== nextViewportHeight) {
        viewport.style.height = nextViewportHeight;
      }

      if (stage.style.height !== nextStageHeight) {
        stage.style.height = nextStageHeight;
      }

      renderDesktopProgress();
    };

    const scheduleMeasure = () => {
      if (
        disposed ||
        !isDesktopMotionEnabled ||
        measureFrame !== null
      ) {
        return;
      }

      measureFrame = window.requestAnimationFrame(measureDesktopLayout);
    };

    const renderNativeProgress = () => {
      nativeProgressFrame = null;

      if (disposed || isDesktopMotionEnabled) return;

      const travel = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      updateProgress(travel > 0 ? viewport.scrollLeft / travel : 0);
    };

    const scheduleNativeProgress = () => {
      if (
        disposed ||
        isDesktopMotionEnabled ||
        nativeProgressFrame !== null
      ) {
        return;
      }

      nativeProgressFrame = window.requestAnimationFrame(renderNativeProgress);
    };

    const handleLayoutChange = () => {
      if (isDesktopMotionEnabled) scheduleMeasure();
      else scheduleNativeProgress();
    };

    const clearDesktopLayout = () => {
      desktopTravel = 0;
      desktopScrollTravel = 0;
      stage.style.removeProperty("height");
      viewport.style.removeProperty("height");
      track.style.removeProperty("transform");
    };

    const desktopMotion = window.matchMedia(desktopMotionQuery);

    const syncMotionMode = () => {
      const shouldEnableDesktopMotion = desktopMotion.matches;

      if (shouldEnableDesktopMotion === isDesktopMotionEnabled) {
        handleLayoutChange();
        return;
      }

      isDesktopMotionEnabled = shouldEnableDesktopMotion;

      if (isDesktopMotionEnabled) {
        viewport.scrollLeft = 0;
        measureDesktopLayout();
      } else {
        clearDesktopLayout();
        scheduleNativeProgress();
      }
    };

    viewport.addEventListener("scroll", scheduleNativeProgress, {
      passive: true,
    });
    window.addEventListener("scroll", scheduleDesktopProgress, {
      passive: true,
    });
    window.addEventListener("resize", handleLayoutChange, { passive: true });
    window.addEventListener("orientationchange", handleLayoutChange);
    window.addEventListener("load", handleLayoutChange);
    window.visualViewport?.addEventListener("resize", handleLayoutChange, {
      passive: true,
    });
    desktopMotion.addEventListener("change", syncMotionMode);

    const pendingImages = Array.from(track.querySelectorAll("img")).filter(
      (image) => !image.complete,
    );

    pendingImages.forEach((image) => {
      image.addEventListener("load", handleLayoutChange);
      image.addEventListener("error", handleLayoutChange);
    });

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(handleLayoutChange);

    resizeObserver?.observe(viewport);
    resizeObserver?.observe(track);

    if ("fonts" in document) {
      void document.fonts.ready.then(handleLayoutChange);
    }

    updateProgress(0);
    syncMotionMode();

    return () => {
      disposed = true;
      desktopMotion.removeEventListener("change", syncMotionMode);
      resizeObserver?.disconnect();
      viewport.removeEventListener("scroll", scheduleNativeProgress);
      window.removeEventListener("scroll", scheduleDesktopProgress);
      window.removeEventListener("resize", handleLayoutChange);
      window.removeEventListener("orientationchange", handleLayoutChange);
      window.removeEventListener("load", handleLayoutChange);
      window.visualViewport?.removeEventListener("resize", handleLayoutChange);

      pendingImages.forEach((image) => {
        image.removeEventListener("load", handleLayoutChange);
        image.removeEventListener("error", handleLayoutChange);
      });

      if (measureFrame !== null) window.cancelAnimationFrame(measureFrame);
      if (desktopProgressFrame !== null) {
        window.cancelAnimationFrame(desktopProgressFrame);
      }
      if (nativeProgressFrame !== null) window.cancelAnimationFrame(nativeProgressFrame);

      clearDesktopLayout();
      progressFill?.style.removeProperty("transform");
    };
  }, [firstIndex, team, totalLabel]);

  return (
    <section id="team" aria-labelledby="barbers-title" className="barbers-scene">
      <header className="barbers-scene__intro page-shell">
        <p className="barbers-scene__eyebrow">
          <span aria-hidden="true">03</span>
          Команда
        </p>
        <div className="barbers-scene__intro-copy">
          <h2 id="barbers-title" className="barbers-scene__title font-display">
            <span>Характер</span>
            <span>создают люди.</span>
          </h2>
          <p className="barbers-scene__description">
            Команда с разным опытом и одним вниманием к деталям. Подберём
            мастера под задачу, стиль и комфортный темп общения.
          </p>
        </div>
      </header>

      <div ref={stageRef} className="barbers-scene__stage">
        <div
          ref={viewportRef}
          className="barbers-scene__viewport scrollbar-gold"
          role="region"
          aria-label="Роли команды"
          aria-describedby="barbers-scroll-hint"
          tabIndex={0}
        >
          <div ref={trackRef} className="barbers-scene__track">
            {team.map((member, index) => {
              const composition = cardCompositions[index % cardCompositions.length];

              return (
                <article
                  key={member.id}
                  className={`barbers-scene__card barbers-scene__card--${composition}`}
                >
                  <figure className="barbers-scene__media">
                    <Image
                      src={member.image}
                      alt={member.imageAlt}
                      width={1024}
                      height={1536}
                      sizes="(max-width: 639px) 86vw, (max-width: 1023px) 72vw, 46vw"
                      className="barbers-scene__portrait"
                    />
                    <figcaption className="barbers-scene__media-caption">
                      <span>{member.index}</span>
                      <span>Точность / характер / внимание</span>
                    </figcaption>
                  </figure>

                  <div className="barbers-scene__card-copy">
                    <p className="barbers-scene__role-label">Роль в команде</p>
                    <h3 className="barbers-scene__role font-display">{member.role}</h3>
                    <p className="barbers-scene__focus">{member.focus}</p>
                    <p className="barbers-scene__bio">{member.description}</p>
                    <a
                      href="#booking"
                      className="barbers-scene__cta"
                      aria-label={`Перейти к записи — ${member.role}`}
                    >
                      Перейти к записи
                      <ArrowRightIcon aria-hidden="true" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="barbers-scene__progress" aria-hidden="true">
            <span className="barbers-scene__progress-track">
              <span ref={progressFillRef} className="barbers-scene__progress-fill" />
            </span>
            <span ref={progressTextRef} className="barbers-scene__progress-text">
              {firstIndex} / {totalLabel}
            </span>
          </div>
        </div>
      </div>

      <p id="barbers-scroll-hint" className="barbers-scene__scroll-hint page-shell">
        Продолжайте прокрутку, чтобы увидеть все роли. На сенсорном экране листайте карточки по
        горизонтали.
      </p>
    </section>
  );
}
