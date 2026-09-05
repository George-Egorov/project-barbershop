"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRightIcon } from "@/components/icons";

type ServicesSectionProps = {
  services: readonly {
    id: string;
    index: string;
    displayTitle: string;
    title: string;
    description: string;
    note: string;
    image: string;
    imageAlt: string;
  }[];
};

const finePointerDesktopQuery =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

export function ServicesSection({ services }: ServicesSectionProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeServiceId, setActiveServiceId] = useState(
    () => services[0]?.id ?? "",
  );
  const activeService =
    services.find((service) => service.id === activeServiceId) ?? services[0];

  useLayoutEffect(() => {
    const previewElement = previewRef.current;

    if (!previewElement || !activeService) {
      return;
    }

    const mediaContext = gsap.matchMedia();

    mediaContext.add(
      {
        finePointerDesktop: finePointerDesktopQuery,
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const isFinePointerDesktop =
          context.conditions?.finePointerDesktop ?? false;
        const prefersReducedMotion =
          context.conditions?.reduceMotion ?? false;

        if (!isFinePointerDesktop) {
          return;
        }

        gsap.killTweensOf(previewElement);

        if (prefersReducedMotion) {
          gsap.set(previewElement, {
            autoAlpha: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
          });
          return;
        }

        const revealTween = gsap.fromTo(
          previewElement,
          {
            autoAlpha: 0.48,
            clipPath: "inset(2.5% 2.5% 2.5% 2.5%)",
            scale: 0.985,
          },
          {
            autoAlpha: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.42,
            ease: "power2.out",
            overwrite: "auto",
            scale: 1,
          },
        );

        return () => revealTween.kill();
      },
    );

    return () => {
      gsap.killTweensOf(previewElement);
      mediaContext.revert();
    };
  }, [activeService]);

  return (
    <div className="services-scene">
      <ol className="services-scene__list">
        {services.map((service) => {
          const isActive = service.id === activeService?.id;

          return (
            <li key={service.id} className="services-scene__item">
              <a
                className={`services-scene__row${
                  isActive ? " services-scene__row--active" : ""
                }`}
                href="#booking"
                onFocus={() => setActiveServiceId(service.id)}
                onPointerEnter={() => setActiveServiceId(service.id)}
              >
                <span className="services-scene__index">{service.index}</span>

                <h3 className="services-scene__heading">
                  <span
                    className="services-scene__display-title"
                    aria-hidden="true"
                  >
                    {service.displayTitle}
                  </span>
                  <span className="services-scene__title">{service.title}</span>
                </h3>

                <p className="services-scene__description">{service.description}</p>

                <span className="services-scene__meta">
                  <span className="services-scene__note">{service.note}</span>
                  <span className="services-scene__arrow" aria-hidden="true">
                    <ArrowUpRightIcon />
                  </span>
                </span>

                <span className="services-scene__inline-image">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 1023px) 90vw, (hover: none) 90vw, (pointer: coarse) 90vw, 1px"
                    className="services-scene__image"
                  />
                </span>
              </a>
            </li>
          );
        })}
      </ol>

      <div className="services-scene__rail" aria-hidden="true">
        <div className="services-scene__rail-sticky">
          <div ref={previewRef} className="services-scene__preview">
            {activeService ? (
              <Image
                src={activeService.image}
                alt=""
                fill
                sizes="(min-width: 1440px) 28vw, (min-width: 1024px) 32vw, 1px"
                className="services-scene__image services-scene__image--preview"
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
