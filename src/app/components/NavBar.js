"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { href: "#", label: "home" },
  { href: "#about", label: "about" },
  { href: "#projects", label: "projects" },
  { href: "#contact", label: "contact" },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 550) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      id="navbar"
      className="relative flex items-center justify-between py-6 px-6 sm:px-8 lg:px-20">
      <Link
        href="#navbar"
        className="text-3xl font-bold leading-none sm:text-4xl">
        10eti
      </Link>

      <button
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen(prev => !prev)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F5EAD5]/40 text-[#F5EAD5] transition-colors hover:bg-[#F5EAD5]/10 min-[550px]:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
          className="h-6 w-6">
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 7h16M4 12h16M4 17h16"
            />
          )}
        </svg>
      </button>

      <div className="hidden items-center gap-6 font-semibold text-sm min-[550px]:flex min-[650px]:text-base lg:text-xl">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="transition-opacity hover:opacity-70">
            {label}
          </Link>
        ))}
      </div>

      <div
        className={`absolute left-0 top-full z-40 mt-3 w-full origin-top rounded-3xl border border-[#F5EAD5]/20 bg-[#1F1F1F] p-6 shadow-2xl transition-all duration-300 ease-out min-[550px]:hidden ${
          isMenuOpen
            ? "pointer-events-auto opacity-100 translate-y-0 scale-y-100"
            : "pointer-events-none opacity-0 -translate-y-2 scale-y-95"
        }`}>
        <div className="flex flex-col gap-4 text-base font-semibold sm:text-lg">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={handleLinkClick}
              className="rounded-full px-4 py-2 transition-colors hover:bg-[#F5EAD5]/10">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
