import "./globals.css";
import NavBar from "./components/NavBar";

export const metadata = {
  metadataBase: new URL("https://10eti.dev"),
  title: "Hemanth Tenneti | Full Stack & Data Analytics Portfolio",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  description:
    "Portfolio of Hemanth Tenneti - full-stack developer and data analytics practitioner showcasing software, automation, and business analytics projects.",
  keywords:
    "Hemanth Tenneti, Portfolio, Full Stack Developer, Data Analytics, Business Analytics, Tableau, Python, Web Developer, Software Engineer, 10eti",
  authors: [
    {
      name: "Hemanth Tenneti",
      url: "https://10eti.dev",
    },
  ],
  creator: "Hemanth Tenneti",
  publisher: "Hemanth Tenneti",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://10eti.dev",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Hemanth Tenneti Portfolio",
  },
  formatDetection: {
    telephone: false,
    email: false,
  },
  verification: {
    google: "UT1DM9PfW12s1s-vjZ7Qje_HcxY3cPJCQyytKBHJHv4",
  },
  openGraph: {
    title: "Hemanth Tenneti | Full Stack & Data Analytics Portfolio",
    description:
      "Portfolio of Hemanth Tenneti - full-stack developer and data analytics practitioner showcasing software, automation, and business analytics projects.",
    url: "https://10eti.dev",
    siteName: "Hemanth Tenneti Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/facepfp.png",
        width: 553,
        height: 828,
        alt: "Hemanth Tenneti - Full Stack Developer and Data Analytics Practitioner",
        type: "image/png",
      },
      {
        url: "https://10eti.dev/facepfp.png",
        width: 553,
        height: 828,
        alt: "Hemanth Tenneti - Full Stack Developer and Data Analytics Practitioner",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hemanth Tenneti | Full Stack & Data Analytics",
    description:
      "Portfolio showcasing software, automation, and data analytics projects",
    images: ["/facepfp.png"],
    creator: "@10eti",
    site: "@10eti",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#F5EAD5",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hemanth Tenneti",
  url: "https://10eti.dev",
  image: "https://10eti.dev/facepfp.png",
  jobTitle: "Full Stack Developer and Data Analytics Practitioner",
  description:
    "Full-stack developer and data analytics practitioner building software, automation, dashboards, and business analytics projects",
  sameAs: [
    "https://linkedin.com/in/hemanthtenneti",
    "https://github.com/HemanthTenneti",
    "https://twitter.com/10eti",
  ],
  knowsAbout: [
    "Web Development",
    "AI Integration",
    "Full Stack Development",
    "Data Analytics",
    "Business Analytics",
    "Financial Modeling",
    "Tableau",
    "JavaScript",
    "React",
    "Next.js",
    "Python",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Independent Developer",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Hemanth Tenneti Portfolio",
  url: "https://10eti.dev",
  description: "Full Stack and Data Analytics Portfolio",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://10eti.dev?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/facepfp.png" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="text-[#F5EAD5] bg-[#2C2C2C] font-[Switzer]">
        <div className="w-full h-full bg-[url(/backgroundnoise.png)] mix-blend-soft-light opacity-75 -z-10 bg-repeat absolute"></div>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
