import Image from "next/image";
import type { ReactNode } from "react";
import { BarbersSection } from "@/components/barbers-section";
import { BookingPanel } from "@/components/booking-panel";
import { ExpandingLookbook } from "@/components/expanding-lookbook";
import { HeroSection } from "@/components/hero/hero-section";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  MapPinIcon,
} from "@/components/icons";
import { KineticManifesto } from "@/components/kinetic-manifesto";
import { NetworkMap } from "@/components/network-map";
import { ServicesSection } from "@/components/services-section";
import { SiteHeader } from "@/components/site-header";
import { SiteBrand } from "@/components/site-brand";
import { SitePreloader } from "@/components/site-preloader";
import { MagneticLink } from "@/components/ui/magnetic-link";
import {
  articles,
  branches,
  lookbook,
  manifesto,
  navItems,
  pageCopy,
  services,
  siteSettings,
  team,
} from "@/data/content";

type SectionIntroProps = {
  index: string;
  eyebrow: string;
  titleLines: readonly string[];
  description: string;
  aside?: ReactNode;
};

function SectionIntro({
  index,
  eyebrow,
  titleLines,
  description,
  aside,
}: SectionIntroProps) {
  return (
    <header className="section-intro">
      <div className="section-intro__meta">
        <span>{index}</span>
        <span>{eyebrow}</span>
      </div>
      <div className="section-intro__body">
        <h2 className="section-intro__title">
          {titleLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <div className="section-intro__support">
          <p className="section-intro__description">{description}</p>
          {aside ? <div className="section-intro__aside">{aside}</div> : null}
        </div>
      </div>
    </header>
  );
}

function JournalSection() {
  const publicationLink = siteSettings.socialLink;

  return (
    <section id="journal" className="journal-section">
      <div className="page-shell">
        <SectionIntro
          index={pageCopy.journal.index}
          eyebrow={pageCopy.journal.eyebrow}
          titleLines={pageCopy.journal.titleLines}
          description={pageCopy.journal.description}
          aside={publicationLink ? (
            <a
              href={publicationLink.url}
              target="_blank"
              rel="noreferrer"
              className="text-link text-link--dark"
            >
              {publicationLink.label}
              <ArrowUpRightIcon className="text-link__icon" />
            </a>
          ) : undefined}
        />

        <div className="journal-list">
          {articles.map((article, index) => (
            <article
              key={article.id}
              id={article.href.slice(1)}
              className="journal-list__item"
            >
              <span className="journal-list__index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="journal-list__copy">
                <p className="journal-list__category">{article.category}</p>
                <h3 className="journal-list__title">{article.title}</h3>
                <p className="journal-list__excerpt">{article.excerpt}</p>
              </div>
              <div className="journal-list__media">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  sizes="(max-width: 767px) 64vw, (max-width: 1023px) 30vw, 18vw"
                  className="journal-list__image"
                />
              </div>
              <p className="journal-list__status">Материал в работе</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AtmosphereSection() {
  return (
    <section className="atmosphere-scene" aria-labelledby="atmosphere-title">
      <Image
        src="/images/interior.webp"
        alt="Кинематографичный интерьер барбершопа с барберским креслом"
        fill
        sizes="(orientation: portrait) 160svh, 100vw"
        className="atmosphere-scene__image"
      />
      <div className="atmosphere-scene__legibility" aria-hidden="true" />
      <div className="atmosphere-scene__content page-shell">
        <p className="atmosphere-scene__eyebrow">
          {pageCopy.atmosphere.eyebrow}
        </p>
        <h2 id="atmosphere-title" className="atmosphere-scene__title">
          {pageCopy.atmosphere.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <p className="atmosphere-scene__note">{pageCopy.atmosphere.note}</p>
      </div>
    </section>
  );
}

function BookingSection() {
  return (
    <section
      id="booking"
      className="booking-climax"
      aria-labelledby="booking-title"
    >
      <div className="booking-climax__inner page-shell">
        <div className="booking-climax__meta">
          <span>{pageCopy.booking.index}</span>
          <span>{pageCopy.booking.eyebrow}</span>
        </div>

        <MagneticLink href="#booking-form" className="booking-climax__title-link">
          <h2 id="booking-title" className="booking-climax__title">
            {pageCopy.booking.title}
          </h2>
          <ArrowRightIcon className="booking-climax__title-icon" />
        </MagneticLink>

        <div id="booking-form" className="booking-climax__form">
          <div className="booking-climax__copy">
            <p>{pageCopy.booking.description}</p>
            <p className="booking-climax__availability">
              {pageCopy.booking.availability}
            </p>
          </div>
          <BookingPanel branches={branches} bookingUrl={siteSettings.bookingUrl} />
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  const bookingHref = siteSettings.bookingUrl ?? "#booking-form";

  return (
    <>
      <SitePreloader identity={siteSettings.identity} />

      <a href="#main-content" className="skip-link">
        Перейти к содержанию
      </a>

      <SiteHeader
        navigation={navItems}
        identity={siteSettings.identity}
        bookingUrl={siteSettings.bookingUrl}
      />

      <main id="main-content">
        <HeroSection
          eyebrow={siteSettings.eyebrow}
          titleLines={siteSettings.heroLines}
          description={siteSettings.description}
          bookingLabel={siteSettings.bookingLabel}
          metaItems={siteSettings.heroMeta}
        />

        <KineticManifesto
          words={manifesto.words}
          statement={manifesto.statement}
        />

        <section id="services" className="services-section">
          <div className="page-shell">
            <SectionIntro
              index={pageCopy.services.index}
              eyebrow={pageCopy.services.eyebrow}
              titleLines={pageCopy.services.titleLines}
              description={pageCopy.services.description}
            />
            <ServicesSection services={services} />
          </div>
        </section>

        <BarbersSection team={team} />

        <section id="lookbook" className="lookbook-section">
          <div className="page-shell">
            <SectionIntro
              index={pageCopy.lookbook.index}
              eyebrow={pageCopy.lookbook.eyebrow}
              titleLines={pageCopy.lookbook.titleLines}
              description={pageCopy.lookbook.description}
            />
          </div>
          <ExpandingLookbook items={lookbook} />
        </section>

        <JournalSection />
        <AtmosphereSection />
        <BookingSection />
        {branches.length > 0 ? <NetworkMap branches={branches} /> : null}
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner page-shell">
          <div className="site-footer__brand-column">
            <SiteBrand
              identity={siteSettings.identity}
              className="site-footer__logo"
            />
            <p className="site-footer__statement">
              Точность в деталях.
              <br />
              Характер в образе.
            </p>
            {siteSettings.socialLink ? (
              <a
                href={siteSettings.socialLink.url}
                target="_blank"
                rel="noreferrer"
                className="site-footer__social"
              >
                {siteSettings.socialLink.label}
                <ArrowUpRightIcon />
              </a>
            ) : null}
          </div>

          {branches.length > 0 ? (
            <div className="site-footer__locations">
              <h2 className="site-footer__heading">Адреса</h2>
              <ul>
                {branches.map((branch) => (
                  <li key={branch.id}>
                    <MapPinIcon aria-hidden="true" />
                    <div>
                      <span>{branch.city}</span>
                      <span>{branch.address}</span>
                      {branch.phone ? (
                        <a href={branch.phone.href}>{branch.phone.label}</a>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="site-footer__information">
              <h2 className="site-footer__heading">Информация</h2>
              <p>
                Адреса, часы работы и способы связи появятся после подключения
                контентных данных.
              </p>
            </div>
          )}

          <div className="site-footer__navigation-column">
            <h2 className="site-footer__heading">Навигация</h2>
            <nav aria-label="Навигация в подвале">
              {navItems.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href={bookingHref}
              target={siteSettings.bookingUrl ? "_blank" : undefined}
              rel={siteSettings.bookingUrl ? "noreferrer" : undefined}
              className="text-link"
            >
              {siteSettings.bookingUrl
                ? "Открыть онлайн-запись"
                : "Перейти к записи"}
              <ArrowUpRightIcon className="text-link__icon" />
            </a>
          </div>
        </div>

        <div className="site-footer__legal page-shell">
          <span>
            © 2026 {siteSettings.identity.name ?? siteSettings.identity.descriptor}
          </span>
          <span>Информация на сайте носит справочный характер</span>
        </div>
      </footer>

      <a href="#booking" className="mobile-booking-bar">
        <span>Записаться</span>
        <ArrowRightIcon />
      </a>
    </>
  );
}
