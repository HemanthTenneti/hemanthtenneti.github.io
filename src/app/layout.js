import "./globals.css";

export const metadata = {
  title: "Hemanth Tenneti",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  description: "A portfolio page to showcase my work and skills.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-[#F5EAD5] bg-[#2C2C2C] font-[Switzer]">
        <div className="w-full h-full bg-[url(/backgroundnoise.png)] mix-blend-soft-light opacity-75 -z-10 bg-repeat absolute"></div>
        <nav
          id="navbar"
          className="flex justify-between items-center py-12 px-32">
          <a href="#navbar" className="text-4xl font-bold">
            10eti
          </a>
          <div className="flex gap-8 font-bold text-xl">
            <a href="#">home</a>
            <a href="#about">about</a>
            <a href="#projects">projects</a>
            <a href="#contact">contact</a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
