"use client";

import { useEffect, useRef, useState } from "react";
import { SiteBrand } from "@/components/site-brand";
import type { SiteIdentity } from "@/data/content";

type NavigationItem = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  navigation: readonly NavigationItem[];
  identity: SiteIdentity;
  bookingUrl: string | null;
};

export function SiteHeader({
  navigation,
  identity,
  bookingUrl,
}: SiteHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const keepHeaderVisibleUntilRef = useRef(0);
  const anchorTargetPositionRef = useRef<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeHref, setActiveHref] = useState("#top");
  const isMenuLayerActive = isOpen || isMenuClosing;

  useEffect(() => {
    let lastScrollPosition = window.scrollY;
    let frameId = 0;
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const updateHeader = () => {
      const currentScrollPosition = window.scrollY;
      const isMovingDown = currentScrollPosition > lastScrollPosition + 4;
      const isMovingUp = currentScrollPosition < lastScrollPosition - 4;
      const focusedElement = document.activeElement;
      const headerHasKeyboardFocus =
        focusedElement instanceof HTMLElement &&
        (headerRef.current?.contains(focusedElement) ?? false) &&
        focusedElement.matches(":focus-visible");
      const isAnchorTransitionActive =
        performance.now() < keepHeaderVisibleUntilRef.current;
      const anchorTargetPosition = anchorTargetPositionRef.current;
      const isAlignedToAnchor =
        anchorTargetPosition !== null &&
        Math.abs(currentScrollPosition - anchorTargetPosition) < 6;

      if (anchorTargetPosition !== null && !isAlignedToAnchor) {
        anchorTargetPositionRef.current = null;
      }

      setIsCompact(currentScrollPosition > 40);
      if (
        reducedMotionQuery.matches ||
        currentScrollPosition < 140 ||
        isMenuLayerActive ||
        headerHasKeyboardFocus ||
        isAnchorTransitionActive ||
        isAlignedToAnchor
      ) {
        setIsHidden(false);
      } else if (isMovingDown) {
        setIsHidden(true);
      } else if (isMovingUp) {
        setIsHidden(false);
      }

      lastScrollPosition = currentScrollPosition;
      frameId = 0;
    };

    const handleScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateHeader);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateHeader();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [isMenuLayerActive]);

  useEffect(() => {
    const sectionElements = [
      document.querySelector<HTMLElement>("#top"),
      ...navigation.map((item) =>
        document.querySelector<HTMLElement>(item.href),
      ),
    ]
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveHref(`#${visibleEntry.target.id}`);
        }
      },
      {
        rootMargin: "-30% 0px -55%",
        threshold: [0, 0.2, 0.55],
      },
    );

    sectionElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [navigation]);

  useEffect(() => {
    const findHashTarget = (hash: string) => {
      try {
        return document.getElementById(decodeURIComponent(hash.slice(1)));
      } catch {
        return null;
      }
    };

    const scrollToHash = (hash: string) => {
      const targetElement = findHashTarget(hash);
      if (!targetElement) return;

      keepHeaderVisibleUntilRef.current = performance.now() + 900;
      setIsHidden(false);

      const scrollMargin = Number.parseFloat(
        window.getComputedStyle(targetElement).scrollMarginTop,
      );
      const targetPosition =
        window.scrollY +
        targetElement.getBoundingClientRect().top -
        (Number.isFinite(scrollMargin) ? scrollMargin : 0);
      const normalizedTargetPosition = Math.max(0, targetPosition);

      anchorTargetPositionRef.current = normalizedTargetPosition;

      const rootElement = document.documentElement;
      const previousScrollBehavior = rootElement.style.scrollBehavior;

      rootElement.style.scrollBehavior = "auto";
      window.scrollTo({ top: normalizedTargetPosition });
      window.requestAnimationFrame(() => {
        rootElement.style.scrollBehavior = previousScrollBehavior;
      });
    };

    const handleAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const eventTarget = event.target;
      if (!(eventTarget instanceof Element)) return;

      const anchor = eventTarget.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = anchor?.hash;

      if (!anchor || !hash || anchor.classList.contains("skip-link")) return;
      if (!findHashTarget(hash)) return;

      event.preventDefault();
      window.history.pushState(null, "", hash);
      scrollToHash(hash);
    };

    const initialHash = window.location.hash;
    const alignInitialHash = () => {
      if (!initialHash || window.location.hash !== initialHash) return;
      scrollToHash(initialHash);
    };

    const initialAlignmentTimer = window.setTimeout(alignInitialHash, 180);
    const settledAlignmentTimer = window.setTimeout(alignInitialHash, 900);
    const mediaAlignmentTimer = window.setTimeout(alignInitialHash, 1800);

    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("load", alignInitialHash);

    return () => {
      window.clearTimeout(initialAlignmentTimer);
      window.clearTimeout(settledAlignmentTimer);
      window.clearTimeout(mediaAlignmentTimer);
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("load", alignInitialHash);
    };
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const closeMenuOnDesktop = () => {
      if (!desktopQuery.matches) return;

      setIsOpen(false);
      setIsMenuClosing(false);
    };

    desktopQuery.addEventListener("change", closeMenuOnDesktop);
    closeMenuOnDesktop();

    return () => desktopQuery.removeEventListener("change", closeMenuOnDesktop);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuLayerActive ? "hidden" : "";
    const pageContent = [
      document.querySelector<HTMLElement>("main"),
      document.querySelector<HTMLElement>("footer"),
      document.querySelector<HTMLElement>(".mobile-booking-bar"),
    ].filter((element): element is HTMLElement => Boolean(element));

    for (const element of pageContent) {
      element.inert = isMenuLayerActive;
      if (isMenuLayerActive) element.setAttribute("aria-hidden", "true");
      else element.removeAttribute("aria-hidden");
    }

    const handleMenuKeyboard = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === "Escape") {
        setIsOpen(false);
        setIsMenuClosing(true);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableSelector =
        'a[href]:not([tabindex="-1"]), button:not([disabled])';
      const focusableElements = [headerRef.current, menuRef.current]
        .flatMap((element) =>
          Array.from(
            element?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
          ),
        )
        .filter((element) => element.getClientRects().length > 0);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);
      if (!firstElement || !lastElement) return;
      const focusScopeContainsActiveElement =
        (headerRef.current?.contains(document.activeElement) ?? false) ||
        (menuRef.current?.contains(document.activeElement) ?? false);

      if (
        event.shiftKey &&
        (document.activeElement === firstElement ||
          !focusScopeContainsActiveElement)
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === lastElement ||
          !focusScopeContainsActiveElement)
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleMenuKeyboard);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleMenuKeyboard);
      for (const element of pageContent) {
        element.inert = false;
        element.removeAttribute("aria-hidden");
      }
    };
  }, [isMenuLayerActive, isOpen]);

  const headerClassName = [
    "site-header",
    isCompact ? "site-header--compact" : "",
    isHidden ? "site-header--hidden" : "",
    isMenuLayerActive ? "site-header--menu-open" : "",
    isOpen ? "site-header--menu-expanded" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const bookingHref = bookingUrl ?? "#booking";

  const handleMenuToggle = () => {
    if (isOpen) {
      setIsOpen(false);
      setIsMenuClosing(true);
      return;
    }

    setIsMenuClosing(false);
    setIsOpen(true);
  };

  const handleMenuClose = () => {
    setIsOpen(false);
    setIsMenuClosing(true);
  };

  return (
    <>
      <header ref={headerRef} className={headerClassName}>
        <div className="site-header__inner page-shell">
          <a
            href="#top"
            className="site-header__brand"
            aria-label={`${identity.name ?? identity.descriptor} / наверх`}
          >
            <SiteBrand
              identity={identity}
              priority
              className="site-header__logo"
            />
          </a>

          <nav className="site-header__navigation" aria-label="Основная навигация">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={activeHref === item.href ? "location" : undefined}
                className={`site-header__nav-link ${
                  activeHref === item.href ? "site-header__nav-link--active" : ""
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="site-header__actions">
            <a
              href={bookingHref}
              target={bookingUrl ? "_blank" : undefined}
              rel={bookingUrl ? "noreferrer" : undefined}
              aria-hidden={isMenuLayerActive}
              tabIndex={isMenuLayerActive ? -1 : undefined}
              className="site-header__booking"
            >
              Записаться
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={handleMenuToggle}
              className="site-header__menu-button"
            >
              <span className="site-header__menu-icon" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal={isOpen ? "true" : undefined}
        aria-hidden={!isOpen}
        aria-label="Меню сайта"
        inert={!isOpen}
        onTransitionEnd={(event) => {
          if (
            event.target !== event.currentTarget ||
            event.propertyName !== "transform"
          ) return;

          if (isOpen) firstMenuLinkRef.current?.focus({ preventScroll: true });
          else setIsMenuClosing(false);
        }}
        className={`mobile-menu ${isOpen ? "mobile-menu--open" : ""}`}
      >
        <div className="mobile-menu__inner page-shell">
          <nav aria-label="Мобильная навигация" className="mobile-menu__navigation">
            {navigation.map((item, index) => (
              <a
                key={item.href}
                ref={index === 0 ? firstMenuLinkRef : undefined}
                href={item.href}
                onClick={handleMenuClose}
                className="mobile-menu__link"
              >
                <span className="mobile-menu__index">0{index + 1}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
          <a
            href={bookingHref}
            target={bookingUrl ? "_blank" : undefined}
            rel={bookingUrl ? "noreferrer" : undefined}
            onClick={handleMenuClose}
            className="button-primary mobile-menu__booking"
          >
            <span className="button-primary__label">
              {bookingUrl ? "Открыть онлайн-запись" : "Перейти к записи"}
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
