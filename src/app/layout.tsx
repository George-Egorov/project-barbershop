import type { Metadata, Viewport } from "next";
import { siteSettings } from "@/data/content";
import "./globals.css";

const metadataTitle = siteSettings.identity.name
  ? `${siteSettings.identity.name} — ${siteSettings.metadata.title}`
  : siteSettings.metadata.title;
const metadataDescription = siteSettings.identity.name
  ? `${siteSettings.identity.name}. ${siteSettings.metadata.description}`
  : siteSettings.metadata.description;

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: "#0b0b0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
