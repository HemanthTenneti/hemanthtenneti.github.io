import "./globals.css";
import Head from "next/head";
import NavBar from "./components/NavBar";

export const metadata = {
  title: "Hemanth Tenneti",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  description: "A portfolio page to showcase my work and skills.",
  openGraph: {
    title: "Hemanth Tenneti",
    description: "A portfolio page to showcase my work and skills.",
    url: "https://10eti.me",
    siteName: "Portfolio Website",
    images: [
      {
        url: "/facepfp.png",
        width: 553,
        height: 828,
        alt: "Hemanth Tenneti",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="icon" href="/favicon.svg" />
        <meta name="theme-color" content="#F5EAD5" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="Hemanth Tenneti, Portfolio, 10eti" />
        <meta name="author" content="Hemanth Tenneti" />
      </Head>
      <body className="text-[#F5EAD5] bg-[#2C2C2C] font-[Switzer]">
        <div className="w-full h-full bg-[url(/backgroundnoise.png)] mix-blend-soft-light opacity-75 -z-10 bg-repeat absolute"></div>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
