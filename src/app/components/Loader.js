"use client";

import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useGSAP(() => {
    if (!visible) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    document.body.style.overflow = "hidden";

    const hide = () => {
      document.body.style.overflow = "";
      setVisible(false);
    };

    if (prefersReducedMotion) {
      hide();
      return;
    }

    const tl = gsap.timeline({ onComplete: hide });

    tl.fromTo(
      ".loader-bar",
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: "power2.inOut", transformOrigin: "left center" },
    );
    tl.to(".loader-wordmark", { opacity: 0.5, duration: 0.25 }, "-=0.15");
    tl.to(".loader-screen", { opacity: 0, duration: 0.45, ease: "power2.out" });

    return () => tl.kill();
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="loader-screen fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-[#2C2C2C]"
      role="status"
      aria-live="polite"
      aria-label="Loading">
      <span className="loader-wordmark text-3xl font-bold text-[#F5EAD5] sm:text-4xl">
        10eti
      </span>
      <div className="h-[2px] w-32 overflow-hidden rounded-full bg-[#F5EAD5]/15 sm:w-40">
        <div className="loader-bar h-full w-full origin-left scale-x-0 bg-[#F5EAD5]" />
      </div>
    </div>
  );
}
