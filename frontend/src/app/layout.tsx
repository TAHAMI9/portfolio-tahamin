import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

/* ── Google Fonts ─────────────────────────────────────────────────────────── */

// Poppins — clean geometric headings (matches modern portfolio Canva style)
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Inter — ultra-readable body text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// JetBrains Mono — code / labels
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

/* ── Metadata ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default:  "MD TAHAMIN ISLAM",
    template: "%s | MD Tahamin Islam",
  },
  description:
    "Welcome to the official portfolio of MD TAHAMIN ISLAM (Mahin) — a passionate learner, aspiring machine learning engineer, and tech enthusiast from Bangladesh.",
  keywords: [
    "MD Tahamin Islam", "Mahin", "machine learning", "ML engineer",
    "Bangladesh", "portfolio", "kaggle", "web developer",
  ],
  authors: [{ name: "MD Tahamin Islam", url: "https://tahaminislam.com" }],
  creator: "MD Tahamin Islam",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://tahaminislam.com"
  ),
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         "https://tahaminislam.com",
    siteName:    "MD Tahamin Islam",
    title:       "MD TAHAMIN ISLAM",
    description: "Bangladeshi student and aspiring ML engineer. Exploring machine learning, web development, and music.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "MD Tahamin Islam — Portfolio" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "MD TAHAMIN ISLAM",
    description: "Bangladeshi student exploring ML, web development, and music.",
    images:      ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor:   "#060912",
  colorScheme:  "dark",
  width:        "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* ── Root Layout ──────────────────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${poppins.variable} ${inter.variable} ${mono.variable}`}
    >
      <body className="bg-bg-deep text-text-primary font-body antialiased">
        {/* Skip to main for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999]
                     focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent-cyan focus:text-bg-deep
                     focus:font-heading focus:font-bold focus:text-sm"
        >
          Skip to main content
        </a>
        <div id="main-content">{children}</div>

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context":  "https://schema.org",
              "@type":     "Person",
              name:        "MD Tahamin Islam",
              alternateName: "Mahin",
              url:         "https://tahaminislam.com",
              jobTitle:    "Student & Aspiring ML Engineer",
              description: "Bangladeshi student exploring machine learning and web development.",
              nationality: "Bangladeshi",
              address: { "@type": "PostalAddress", addressCountry: "BD" },
              alumniOf: { "@type": "EducationalOrganization", name: "Sunup International School and College" },
              sameAs: [
                "https://github.com/TAHAMI9",
                "https://www.linkedin.com/in/md-tahamin-islam-mahin/",
                "https://www.instagram.com/tahami9n",
                "https://www.facebook.com/tahami9n",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
