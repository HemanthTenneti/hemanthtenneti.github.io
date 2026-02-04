import "./globals.css";
import Head from "next/head";
import NavBar from "./components/NavBar";

export const metadata = {
  title: "Hemanth Tenneti | Full Stack Developer & Portfolio",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  description:
    "Portfolio of Hemanth Tenneti - Full Stack Developer. Showcasing innovative projects in AI, web development, and modern tech solutions.",
  keywords:
    "Hemanth Tenneti, Portfolio, Full Stack Developer, Web Developer, AI Projects, Software Engineer, 10eti, in.culcate, subtract",
  authors: [
    {
      name: "Hemanth Tenneti",
      url: "https://10eti.me",
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
    canonical: "https://10eti.me",
  },
  openGraph: {
    title: "Hemanth Tenneti | Full Stack Developer & Portfolio",
    description:
      "Portfolio of Hemanth Tenneti - Full Stack Developer. Showcasing innovative projects in AI, web development, and modern tech solutions.",
    url: "https://10eti.me",
    siteName: "Hemanth Tenneti Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/facepfp.png",
        width: 553,
        height: 828,
        alt: "Hemanth Tenneti - Full Stack Developer",
        type: "image/png",
      },
      {
        url: "https://10eti.me/facepfp.png",
        width: 553,
        height: 828,
        alt: "Hemanth Tenneti - Full Stack Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hemanth Tenneti | Full Stack Developer",
    description:
      "Portfolio showcasing AI projects, web development, and innovative tech solutions",
    images: ["/facepfp.png"],
    creator: "@10eti",
    site: "@10eti",
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  verification: {
    google: "google-site-verification-code-here",
    yandex: "yandex-verification-code-here",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Favicon & App Icons */}
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Meta Tags */}
        <meta name="theme-color" content="#F5EAD5" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Portfolio of Hemanth Tenneti - Full Stack Developer showcasing AI projects and innovative tech solutions."
        />
        <meta
          name="keywords"
          content="Hemanth Tenneti, Portfolio, Full Stack Developer, Web Developer, AI, Software Engineer, 10eti"
        />
        <meta name="author" content="Hemanth Tenneti" />
        <meta name="copyright" content="Hemanth Tenneti" />
        <meta name="og:locale" content="en_US" />

        {/* Mobile Web App */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Hemanth Tenneti" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* DNS Prefetch & Preconnect */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://10eti.me" />

        {/* Google Analytics & Verification */}
        <meta name="google-site-verification" content="" />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Hemanth Tenneti",
            url: "https://10eti.me",
            image: "https://10eti.me/facepfp.png",
            jobTitle: "Full Stack Developer",
            description:
              "Full Stack Developer specializing in AI, web development, and modern tech solutions",
            sameAs: [
              "https://linkedin.com/in/hemanthtenneti",
              "https://github.com/HemanthTenneti",
              "https://twitter.com/10eti",
            ],
            knowsAbout: [
              "Web Development",
              "AI Integration",
              "Full Stack Development",
              "JavaScript",
              "React",
              "Next.js",
              "Python",
            ],
            worksFor: {
              "@type": "Organization",
              name: "Independent Developer",
            },
          })}
        </script>

        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Hemanth Tenneti",
            url: "https://10eti.me",
            logo: "https://10eti.me/favicon.svg",
            description:
              "Portfolio showcasing Full Stack Development and AI projects",
            foundingDate: "2023",
            sameAs: [
              "https://linkedin.com/in/hemanthtenneti",
              "https://github.com/HemanthTenneti",
              "https://twitter.com/10eti",
            ],
          })}
        </script>

        {/* Website Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Hemanth Tenneti Portfolio",
            url: "https://10eti.me",
            description: "Full Stack Developer Portfolio",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://10eti.me?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          })}
        </script>

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://10eti.me" />
        <meta
          property="og:title"
          content="Hemanth Tenneti | Full Stack Developer & Portfolio"
        />
        <meta
          property="og:description"
          content="Portfolio of Hemanth Tenneti - Full Stack Developer showcasing AI projects and innovative tech solutions."
        />
        <meta property="og:image" content="https://10eti.me/facepfp.png" />
        <meta property="og:image:width" content="553" />
        <meta property="og:image:height" content="828" />
        <meta
          property="og:image:alt"
          content="Hemanth Tenneti - Full Stack Developer"
        />
        <meta property="og:site_name" content="Hemanth Tenneti Portfolio" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://10eti.me" />
        <meta
          name="twitter:title"
          content="Hemanth Tenneti | Full Stack Developer"
        />
        <meta
          name="twitter:description"
          content="Portfolio showcasing AI projects, web development, and innovative tech solutions"
        />
        <meta name="twitter:image" content="https://10eti.me/facepfp.png" />
        <meta name="twitter:creator" content="@10eti" />

        {/* Performance & Security */}
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="email=no" />

        {/* Preload Critical Assets */}
        <link rel="preload" href="/facepfp.png" as="image" />
      </Head>
      <body className="text-[#F5EAD5] bg-[#2C2C2C] font-[Switzer]">
        <div className="w-full h-full bg-[url(/backgroundnoise.png)] mix-blend-soft-light opacity-75 -z-10 bg-repeat absolute"></div>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
