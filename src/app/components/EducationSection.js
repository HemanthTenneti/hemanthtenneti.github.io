"use client";
import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education } from "../../lib/education";

gsap.registerPlugin(ScrollTrigger);

export default function EducationSection() {
  const trackRef = useRef(null);

  useGSAP(() => {
    gsap.from(".edu-card", {
      scrollTrigger: {
        trigger: trackRef.current,
        start: "top 80%",
      },
      opacity: 0,
      y: 28,
      stagger: 0.12,
      duration: 0.75,
      ease: "power3.out",
    });
  }, []);

  return (
    <section
      id="education"
      className="education-stage relative overflow-hidden bg-[#2C2C2C] px-6 py-16 sm:px-10 sm:py-20 md:px-16 lg:px-20">
      <div className="absolute top-0 left-0 h-full w-full bg-[url(/backgroundnoise.webp)] mix-blend-soft-light opacity-55"></div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="education-reveal max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase text-[#F0DFC0]/70">
            how i got here
          </p>
          <h2 className="text-2xl font-bold lowercase text-[#F5EAD5] sm:text-3xl lg:text-[2.5rem] lg:leading-tight">
            education
          </h2>
        </div>

        <div className="edu-track-wrap relative mt-12 -mx-6 overflow-x-auto px-6 pb-4 sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
          <div
            ref={trackRef}
            className="edu-track grid grid-flow-col auto-cols-[300px] items-stretch gap-5 sm:auto-cols-fr sm:grid-cols-3 sm:gap-6">
            {education.map(item => (
              <EducationCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EducationCard({ item }) {
  const milestone = item.milestones[0];
  const logos = item.logos || [
    {
      src: item.logo,
      width: item.logoWidth,
      height: item.logoHeight,
      alt: `${item.institution} logo`,
    },
  ];
  const primaryLogo = logos[0];

  return (
    <article className="edu-card group relative flex min-h-[320px] flex-col overflow-hidden rounded-[1.75rem] border border-[#F5EAD5]/12 bg-[#171818] text-left lowercase">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 100% 0%, ${item.accent}30, transparent 60%), radial-gradient(90% 80% at 0% 100%, ${item.accent}14, transparent 55%)`,
        }}
        aria-hidden="true"
      />
      <Image
        src={primaryLogo.src}
        alt=""
        aria-hidden="true"
        width={primaryLogo.width}
        height={primaryLogo.height}
        className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 object-contain opacity-[0.12] grayscale transition-opacity duration-500 group-hover:opacity-[0.18]"
        loading="lazy"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c0d0d] via-[#0c0d0d]/10 to-transparent opacity-90" />

      <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-1.5">
          {logos.map(logo => (
            <div
              key={logo.src}
              className="flex h-8 w-12 items-center justify-center rounded-md bg-[#F5EAD5] px-1.5 py-1">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {item.subtitle && (
          <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-wide text-[#F0DFC0]/70">
            {item.subtitle}
          </p>
        )}
        <h3 className="text-lg font-bold text-[#F5EAD5] sm:text-xl">
          {item.institution}
        </h3>

        {item.note && (
          <p className="mt-2 text-xs italic leading-relaxed text-[#F5EAD5]/55">
            {item.note}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-[#F5EAD5]/20 px-2.5 py-1 text-[0.65rem] font-bold uppercase text-[#F5EAD5]/70">
              {item.location}
            </span>
            {item.period && (
              <span className="rounded-full border border-[#F5EAD5]/20 px-2.5 py-1 text-[0.65rem] font-bold uppercase text-[#F5EAD5]/70">
                {item.period}
              </span>
            )}
          </div>
          <div className="shrink-0 text-right">
            <div
              className="text-2xl font-extrabold leading-none sm:text-3xl"
              style={{ color: item.accent }}>
              {milestone.score}
            </div>
            <div className="mt-1 text-[0.6rem] font-bold uppercase tracking-wide text-[#F5EAD5]/45">
              {milestone.label}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
