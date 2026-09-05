import { ArrowRightIcon, MapPinIcon } from "@/components/icons";
import type { Branch } from "@/data/content";

type NetworkMapProps = {
  branches: readonly Branch[];
};

const markerPositions = [
  { left: "24%", top: "34%" },
  { left: "46%", top: "57%" },
  { left: "68%", top: "28%" },
  { left: "80%", top: "68%" },
] as const;

export function NetworkMap({ branches }: NetworkMapProps) {
  if (branches.length === 0) return null;

  return (
    <section
      id="locations"
      className="network-map"
      aria-labelledby="network-map-title"
    >
      <header className="network-map__header page-shell">
        <p className="network-map__eyebrow">
          <span aria-hidden="true">07</span>
          Адреса сети
        </p>
        <div className="network-map__heading-group">
          <h2 id="network-map-title" className="network-map__title">
            Ближе, чем кажется.
          </h2>
          <p className="network-map__description">
            Выберите удобный адрес, а затем перейдите к услуге, мастеру и
            свободному времени в форме записи.
          </p>
        </div>
      </header>

      <div className="network-map__canvas">
        <svg
          className="network-map__streets"
          viewBox="0 0 1600 760"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M-80 585C210 510 225 280 518 300s300 184 557 112 310-246 620-170" />
          <path d="M96-38c70 186 252 235 326 402s18 308 154 452" />
          <path d="M740-54c-54 204 83 290 52 484s-188 248-76 396" />
          <path d="M1260-70c-102 214-38 350-160 492S888 610 912 830" />
          <path d="M-40 184c214 42 378-60 560 8s286 154 470 96 338-80 680 28" />
          <path d="M-30 704c282-112 452-26 648-90s352-156 508-72 280 84 520 16" />
          <circle cx="416" cy="296" r="86" />
          <circle cx="1124" cy="512" r="122" />
        </svg>

        <ol className="network-map__markers">
          {branches.map((branch, index) => {
            const position = markerPositions[index % markerPositions.length];

            return (
              <li
                key={branch.id}
                className="network-map__marker"
                style={position}
              >
                <a
                  href="#booking-form"
                  className="network-map__marker-link"
                  aria-label={`Перейти к форме выбора адреса: ${branch.city}, ${branch.address}`}
                >
                  <span className="network-map__marker-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="network-map__marker-copy">
                    <strong>{branch.name}</strong>
                    <span>{branch.address}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ol>

        <p className="network-map__note">
          Стилизованная схема — не навигационная карта.
        </p>
      </div>

      <ol className="network-map__address-list page-shell">
        {branches.map((branch, index) => (
          <li key={branch.id} className="network-map__address-item">
            <span className="network-map__address-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <MapPinIcon className="network-map__address-icon" />
            <div className="network-map__address-copy">
              <strong>{branch.city}</strong>
              <span>{branch.address}</span>
              {branch.phone ? (
                <a href={branch.phone.href}>{branch.phone.label}</a>
              ) : null}
            </div>
            <a
              href="#booking-form"
              className="network-map__address-action"
              aria-label={`Перейти к форме выбора адреса: ${branch.city}, ${branch.address}`}
            >
              <ArrowRightIcon />
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
