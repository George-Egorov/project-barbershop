import Image from "next/image";
import type { SiteIdentity } from "@/data/content";

type SiteBrandProps = {
  identity: SiteIdentity;
  className?: string;
  priority?: boolean;
};

function GenericBarberMark() {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="site-brand__symbol"
    >
      <rect
        x="19"
        y="9"
        width="26"
        height="46"
        rx="8"
        className="site-brand__pole"
      />
      <path d="m20 20 23 12M20 32l23 12M24 11l20 10" />
      <path d="M16 13h32M16 51h32" className="site-brand__caps" />
    </svg>
  );
}

export function SiteBrand({ identity, className, priority }: SiteBrandProps) {
  const visibleName = identity.name ?? identity.descriptor;
  const classes = ["site-brand", className].filter(Boolean).join(" ");

  return (
    <span className={classes}>
      {identity.logoSrc ? (
        <Image
          src={identity.logoSrc}
          alt=""
          width={64}
          height={64}
          priority={priority}
          className="site-brand__symbol"
        />
      ) : (
        <GenericBarberMark />
      )}
      <span className="site-brand__copy">
        <strong className="site-brand__name">{visibleName}</strong>
        {identity.name ? (
          <span className="site-brand__descriptor">{identity.descriptor}</span>
        ) : null}
      </span>
    </span>
  );
}
