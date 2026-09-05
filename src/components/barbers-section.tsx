"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

    if (!stage || !viewport || !track) return;

    gsap.registerPlugin(ScrollTrigger);

    let disposed = false;
    let refreshFrame: number | null = null;
    let nativeProgressFrame: number | null = null;

    const updateProgress = (value: number) => {
      const progress = Math.min(1, Math.max(0, value));
      const progressFill = progressFillRef.current;
      const progressText = progressTextRef.current;

      if (progressFill) {
        gsap.set(progressFill, { scaleX: progress });
      }

      if (progressText) {
        const activeIndex = team.length > 1 ? Math.round(progress * (team.length - 1)) : 0;
        const activeLabel = team[activeIndex]?.index ?? firstIndex;
        progressText.textContent = `${activeLabel} / ${totalLabel}`;
      }
    };

    const scheduleRefresh = () => {
      if (disposed || refreshFrame !== null) return;

      refreshFrame = window.requestAnimationFrame(() => {
        refreshFrame = null;
        if (!disposed) ScrollTrigger.refresh();
      });
    };

    const updateNativeProgress = () => {
      nativeProgressFrame = null;
      const travel = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      updateProgress(travel > 0 ? viewport.scrollLeft / travel : 0);
    };

    const handleNativeScroll = () => {
      if (nativeProgressFrame !== null) return;
      nativeProgressFrame = window.requestAnimationFrame(updateNativeProgress);
    };

    viewport.addEventListener("scroll", handleNativeScroll, { passive: true });
    window.addEventListener("resize", scheduleRefresh, { passive: true });
    window.addEventListener("load", scheduleRefresh);

    const pendingImages = Array.from(track.querySelectorAll("img")).filter(
      (image) => !image.complete,
    );

    pendingImages.forEach((image) => {
      image.addEventListener("load", scheduleRefresh);
      image.addEventListener("error", scheduleRefresh);
    });

    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleRefresh);

    resizeObserver?.observe(viewport);
    resizeObserver?.observe(track);

    if ("fonts" in document) {
      void document.fonts.ready.then(scheduleRefresh);
    }

    const desktopMotion = gsap.matchMedia();

    desktopMotion.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const getTravel = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

        viewport.scrollLeft = 0;
        updateProgress(0);

        if (getTravel() === 0) return;

        const horizontalTween = gsap.to(track, {
          x: () => -getTravel(),
          ease: "none",
          force3D: true,
          overwrite: "auto",
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${getTravel()}`,
            pin: stage,
            pinSpacing: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: (self) => updateProgress(self.progress),
            onUpdate: (self) => updateProgress(self.progress),
          },
        });

        scheduleRefresh();

        return () => {
          horizontalTween.scrollTrigger?.kill();
          horizontalTween.kill();
          gsap.set(track, { clearProps: "transform" });
          viewport.scrollLeft = 0;
          updateProgress(0);
        };
      },
    );

    updateProgress(0);
    scheduleRefresh();

    return () => {
      disposed = true;
      desktopMotion.revert();
      resizeObserver?.disconnect();
      viewport.removeEventListener("scroll", handleNativeScroll);
      window.removeEventListener("resize", scheduleRefresh);
      window.removeEventListener("load", scheduleRefresh);

      pendingImages.forEach((image) => {
        image.removeEventListener("load", scheduleRefresh);
        image.removeEventListener("error", scheduleRefresh);
      });

      if (refreshFrame !== null) window.cancelAnimationFrame(refreshFrame);
      if (nativeProgressFrame !== null) window.cancelAnimationFrame(nativeProgressFrame);
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
