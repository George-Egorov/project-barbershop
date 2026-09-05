import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const iconDefaults = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 1.5,
  viewBox: "0 0 24 24",
};

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" {...iconDefaults} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" {...iconDefaults} {...props}>
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" {...iconDefaults} {...props}>
      <path d="m7 9 5 5 5-5" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" {...iconDefaults} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" {...iconDefaults} {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" {...iconDefaults} {...props}>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function ScissorsIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" {...iconDefaults} {...props}>
      <circle cx="6" cy="7" r="3" />
      <circle cx="6" cy="17" r="3" />
      <path d="m8.6 8.5 10.4 6M8.6 15.5 19 9.5M14 12l5-8" />
    </svg>
  );
}
