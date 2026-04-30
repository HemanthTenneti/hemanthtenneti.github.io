"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { href: "#", label: "home" },
  { href: "#about", label: "about" },
  { href: "#projects", label: "projects" },
  { href: "#contact", label: "contact" },
  {
    href: "/Hemanth Tenneti Resume Jan 20.pdf",
    label: "resume",
    download: true,
  },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [resumeHref, setResumeHref] = useState(
    "/Hemanth Tenneti Resume Jan 20.pdf",
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 550) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const host = window.location.hostname.toLowerCase();
    const previewMode = new URLSearchParams(window.location.search).get("site");

    if (
      host === "data.10eti.dev" ||
      host === "data.10eti.me" ||
      previewMode === "data"
    ) {
      setResumeHref("/HemanthTennetiDVAResume.pdf");
    }
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const resolvedLinks = links.map(link =>
    link.label === "resume" ? { ...link, href: resumeHref } : link,
  );

  return (
    <nav
      id="navbar"
      className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 sm:px-8 lg:px-20">
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
          {isMenuOpen ?
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          : <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 7h16M4 12h16M4 17h16"
            />
          }
        </svg>
      </button>

      <div className="hidden items-center gap-6 font-semibold text-sm min-[550px]:flex min-[650px]:text-base lg:text-xl">
        {resolvedLinks.map(({ href, label, download }) => (
          <Link
            key={href}
            href={href}
            download={download}
            className="transition-opacity hover:opacity-70">
            {label}
          </Link>
        ))}
      </div>

      <div
        className={`absolute right-0 top-full z-40 mt-3 origin-top rounded-2xl border border-[#F5EAD5]/20 bg-[#1F1F1F] p-3 shadow-2xl transition-all duration-300 ease-out min-[550px]:hidden ${
          isMenuOpen ?
            "pointer-events-auto opacity-100 translate-y-0 scale-y-100"
          : "pointer-events-none opacity-0 -translate-y-2 scale-y-95"
        }`}>
        <div className="flex flex-col gap-2 text-sm font-semibold sm:text-base text-right">
          {resolvedLinks.map(({ href, label, download }) => (
            <Link
              key={href}
              href={href}
              download={download}
              onClick={handleLinkClick}
              className="rounded-lg px-3 py-1.5 transition-colors hover:bg-[#F5EAD5]/10">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
