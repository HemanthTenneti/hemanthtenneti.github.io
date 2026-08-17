"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { projects } from "../lib/projects";
import SliderItem from "./components/SliderItem";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  return <MainPortfolio />;
}

function MainPortfolio() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollHintRef = useRef(null);
  const sliderRef = useRef(null);
  const projectCardRef = useRef(null);

  const visibleProjects = projects;

  const projectCount = visibleProjects.length;
  const currentProject = visibleProjects[currentProjectIndex] || visibleProjects[0];

  const nextProject = useCallback(() => {
    if (projectCount <= 1) return;
    setCurrentProjectIndex(prevIndex => (prevIndex + 1) % projectCount);
  }, [projectCount]);

  const prevProject = useCallback(() => {
    if (projectCount <= 1) return;
    setCurrentProjectIndex(
      prevIndex => (prevIndex - 1 + projectCount) % projectCount,
    );
  }, [projectCount]);

  useEffect(() => {
    if (projectCount > 0 && currentProjectIndex >= projectCount) {
      setCurrentProjectIndex(0);
    }
  }, [currentProjectIndex, projectCount]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowScrollTop(true);
      else setShowScrollTop(false);
    };
    window.addEventListener("scroll", handleScroll);

    const handleAnchorClick = e => {
      const href = e.currentTarget.getAttribute("href");
      if (href && href.startsWith("#") && href !== "#") {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const elementRect = targetElement.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.pageYOffset;
          const middle =
            absoluteElementTop -
            window.innerHeight / 2 +
            elementRect.height / 2;

          window.scrollTo({
            top: middle,
            behavior: "smooth",
          });
        }
      }
    };

    const anchorLinks = document.querySelectorAll(
      'a[href^="#"]:not([href="#"])',
    );
    anchorLinks.forEach(anchor => {
      anchor.addEventListener("click", handleAnchorClick);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      anchorLinks.forEach(anchor => {
        anchor.removeEventListener("click", handleAnchorClick);
      });
    };
  }, []);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    const sliderEl = sliderRef.current;
    if (!isMobile || !sliderEl || projectCount <= 1) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const onTouchStart = event => {
      touchStartX = event.touches[0].clientX;
      touchEndX = touchStartX;
    };

    const onTouchMove = event => {
      touchEndX = event.touches[0].clientX;
    };

    const onTouchEnd = () => {
      const threshold = 50;
      const distance = touchEndX - touchStartX;

      if (Math.abs(distance) > threshold) {
        if (distance < 0) {
          nextProject();
        } else {
          prevProject();
        }
      }

      touchStartX = 0;
      touchEndX = 0;
    };

    sliderEl.addEventListener("touchstart", onTouchStart, { passive: true });
    sliderEl.addEventListener("touchmove", onTouchMove, { passive: true });
    sliderEl.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      sliderEl.removeEventListener("touchstart", onTouchStart);
      sliderEl.removeEventListener("touchmove", onTouchMove);
      sliderEl.removeEventListener("touchend", onTouchEnd);
    };
  }, [isMobile, projectCount, nextProject, prevProject]);

  useGSAP(() => {
    const scrollHint = scrollHintRef.current;
    if (!scrollHint) return;

    // Fade in after 2 seconds
    gsap.to(scrollHint, {
      opacity: 0.6,
      delay: 2,
      duration: 0.8,
      ease: "power2.out",
    });

    // Then start the bouncing animation
    gsap.to(
      scrollHint,
      {
        y: 6,
        duration: 1.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      },
      ">-0.8",
    );
  }, []);
  useGSAP(() => {
    const aboutText = new SplitText(".about-text");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-text",
        start: "top 80%",
        end: "bottom 60%",
        scrub: true,
      },
    });
    tl.from(aboutText.words, {
      duration: 0.5,
      opacity: 0,
      y: -10,
      stagger: 0.1,
      ease: "power2.EaseInOut",
    });
    tl.to(aboutText.words, {
      duration: 0.5,
      opacity: 1,
      y: 0,
      stagger: 0.1,
      ease: "power2.EaseInOut",
    });
    return () => {
      tl.kill();
    };
  }, []);
  useGSAP(() => {
    const headingSplit = new SplitText(".heading-text");
    const headingSubtext = new SplitText(".heading-subtext");
    const navbar = document.getElementById("navbar");
    const tl = gsap.timeline();
    tl.from(navbar, {
      duration: 1,
      opacity: 0,
      y: -10,
      ease: "power2.EaseInOut",
    });
    tl.from(headingSplit.chars, {
      duration: 0.05,
      opacity: 0,
      y: 10,
      stagger: 0.1,
      ease: "power2.EaseInOut",
    });
    tl.from(headingSubtext.words, {
      duration: 0.5,
      opacity: 0,
      y: -10,
      delay: 1,
      stagger: 0.1,
      ease: "power2.EaseInOut",
    });
  });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  useLenis(() => {});

  useGSAP(() => {
    const projectCard = projectCardRef.current;
    if (!projectCard || !currentProject) return;

    gsap.fromTo(
      projectCard,
      { opacity: 0, y: 24, scale: 0.98, rotateX: 4 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.55,
        ease: "power3.out",
      },
    );
  }, [currentProjectIndex]);

  useGSAP(() => {
    gsap.from(".project-reveal", {
      scrollTrigger: {
        trigger: "#projects",
        start: "top 72%",
      },
      opacity: 0,
      y: 28,
      stagger: 0.08,
      duration: 0.75,
      ease: "power3.out",
    });
  }, []);

  return (
    <ReactLenis root>
      <header className="relative flex h-[96svh] min-h-[620px] w-full px-8 pt-20 sm:px-12 md:px-24">
        <img
          src="/circleglow.png"
          alt="Decorative gradient circle glow background effect"
          className="pointer-events-none absolute bottom-0 left-0 z-0 hidden object-cover opacity-45 lg:block"
          loading="lazy"
        />
        <img
          src="/rayglow.png"
          alt="Decorative ray glow background effect"
          className="pointer-events-none absolute -top-32 right-0 z-0 object-cover opacity-30"
          loading="lazy"
        />
        <img
          className="header-image relative z-10 hidden lg:block"
          src="/hemanthpfp.png"
          alt="Hemanth Tenneti - Full Stack Developer and Data Analytics Practitioner"
          loading="lazy"
        />
        <div className="relative z-10 flex flex-col grow justify-center items-center lg:items-end">
          <div className="text-center lg:text-right w-fit lg:w-full">
            <h1 className="heading-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#20201E] font-bold">
              hi! i&apos;m hemanth
            </h1>
            <div
              className="sm:hidden flex flex-col items-center gap-2 mt-6"
              ref={scrollHintRef}
              style={{ opacity: 0 }}>
              <p className="text-xs text-[#a8a8a8] font-medium uppercase tracking-wider">
                scroll
              </p>
              <svg
                className="scroll-hint w-3 h-3 text-[#a8a8a8]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
            <h2 className="hidden text-lg sm:block sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl md:w-full md:text-center lg:text-right font-bold heading-subtext">
              full-stack builds / automation systems
              <br /> and analytics stories
              <br />
              built with intent
            </h2>
          </div>
        </div>
      </header>
      <section
        id="about"
        className="about-cut px-6 py-14 pt-20 sm:px-10 sm:py-16 sm:pt-24 md:px-16 md:py-20 md:pt-28 lg:p-20 lg:pt-28 bg-[#2C2C2C] relative z-20">
        <div className="absolute top-0 left-0 h-full w-full bg-[url(/backgroundnoise.png)] mix-blend-soft-light opacity-55"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h3 className="about-text w-full text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] text-justify sm:text-center font-semibold leading-relaxed text-[#F5EAD5] lowercase">
            Driven by music and a love for clean, purposeful systems, I build
            full-stack products, workflow automations, and data analytics
            stories that turn messy problems into clear decisions. I care about
            useful interfaces, reliable logic, and work that has a reason to
            exist.
          </h3>
        </div>
      </section>

      <section id="projects" className="project-stage relative overflow-hidden bg-[#2C2C2C] pb-0 pt-0">
        {/* Projects Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Projects",
            description:
              "Software, automation, and data analytics projects by Hemanth Tenneti",
            hasPart: projects.map(project => ({
              "@type": "CreativeWork",
              name: project.title,
              description: project.description,
              image:
                project.image ? `https://10eti.dev${project.image}` : undefined,
              url:
                project.hostedUrl?.startsWith("/") ?
                  `https://10eti.dev${project.hostedUrl}`
                : project.hostedUrl || project.codeUrl,
              keywords: project.tags?.join(", "),
              author: {
                "@type": "Person",
                name: "Hemanth Tenneti",
              },
            })),
          })}
        </script>
        <div className="absolute top-0 left-0 h-full bg-[url(/backgroundnoise.png)] mix-blend-soft-light opacity-55 w-full"></div>
        <div className="project-marquee-wrap h-36 overflow-hidden flex items-center justify-center">
          <div className="project-marquee bg-[#F5EAD5] text-[#20201E] font-bold">
            <div className="project-marquee-track">
              {Array.from({ length: 36 }).map((_, index) => (
                <span key={index}>projects・analytics・systems・</span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-14 max-w-6xl px-6 sm:mt-18 sm:px-10 lg:mt-20 lg:px-20">
          <div className="project-reveal flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase text-[#F0DFC0]/70">
                project switchboard
              </p>
              <h2 className="text-2xl font-bold lowercase text-[#F5EAD5] sm:text-3xl lg:text-[2.5rem] lg:leading-tight">
                selected work across code, systems, and analysis
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#F5EAD5]/70 sm:text-base lowercase">
                a rotating shelf of shipped products, backend-heavy builds, and automation tools.
              </p>
            </div>
            <div className="project-counter-panel w-fit rounded-2xl border border-[#F5EAD5]/20 bg-[#171818]/80 px-4 py-3 lowercase">
              <span className="block text-xs font-bold uppercase text-[#F0DFC0]/60">
                viewing
              </span>
              <strong className="mt-1 block text-xl text-[#F5EAD5]">
                {String(currentProjectIndex + 1).padStart(2, "0")} /{" "}
                {String(projectCount).padStart(2, "0")}
              </strong>
            </div>
          </div>

          <div
            ref={sliderRef}
            className="project-reveal mt-12 flex w-full items-center justify-center gap-4 md:gap-8">
            <button
              type="button"
              onClick={prevProject}
              disabled={projectCount <= 1}
              className="project-nav-button hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F5EAD5] text-[#20201E] transition-all hover:-translate-x-1 hover:bg-[#e5d9c4] disabled:cursor-not-allowed disabled:opacity-40 md:flex"
              aria-label="Previous project">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="size-5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <div className="w-full max-w-[920px] touch-pan-y md:touch-auto">
              <div
                key={currentProject?.id}
                ref={projectCardRef}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedProject(currentProject)}
                onKeyDown={event => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedProject(currentProject);
                  }
                }}
                className="project-card-shell cursor-pointer rounded-[2rem] p-[1px]"
                aria-label={`Open ${currentProject?.title} project details`}>
                {currentProject && <SliderItem project={currentProject} />}
              </div>

              <div className="mt-5 flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="flex justify-center gap-2">
                  {visibleProjects.map((project, index) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setCurrentProjectIndex(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        index === currentProjectIndex ?
                          "w-8 bg-[#F5EAD5]"
                        : "w-2.5 bg-[#696969] hover:bg-[#F0DFC0]"
                      }`}
                      aria-label={`Show ${project.title}`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold uppercase text-[#F5EAD5]/60">
                  {currentProject?.tags?.map(tag => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#F5EAD5]/15 px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={nextProject}
              disabled={projectCount <= 1}
              className="project-nav-button hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F5EAD5] text-[#20201E] transition-all hover:translate-x-1 hover:bg-[#e5d9c4] disabled:cursor-not-allowed disabled:opacity-40 md:flex"
              aria-label="Next project">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="size-5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
      <section id="contact" className="contact-stage relative bg-[#2C2C2C] pt-16">
        {/* Contact Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPoint",
            telephone: "",
            email: "hemanth10etii@gmail.com",
            contactType: "General Contact",
            url: "https://10eti.dev",
            availableLanguage: ["en"],
          })}
        </script>
        <div className="absolute top-0 left-0 h-full w-full bg-[url(/backgroundnoise.png)] mix-blend-soft-light opacity-55"></div>
        <div className="relative mx-4 rounded-t-4xl border border-b-0 border-[#F5EAD5] px-6 pt-12 pb-10 sm:mx-6 sm:px-10 lg:mx-10 lg:px-14 xl:mx-16">
          <h1 className="mb-14 text-center text-3xl font-bold sm:text-4xl">
            contact
          </h1>

          <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 lowercase sm:gap-8">
            {[
              {
                label: "email",
                value: "hemanth10etii@gmail.com",
                href: "mailto:hemanth10etii@gmail.com",
              },
              {
                label: "github",
                value: "HemanthTenneti",
                href: "https://github.com/HemanthTenneti",
              },
              {
                label: "linkedin",
                value: "hemanth10eti",
                href: "https://linkedin.com/in/hemanth10eti",
              },
            ].map(({ label, value, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-start justify-between gap-3 text-lg font-medium sm:flex-row sm:items-center sm:gap-6 sm:text-xl lg:text-2xl transition-opacity hover:opacity-70"
                title={`Contact Hemanth Tenneti via ${label}`}>
                <span className="shrink-0 lowercase">{label}</span>
                <div className="hidden grow border-t-2 border-dotted border-[#F5EAD5] sm:block"></div>
                <span className="break-all text-right sm:text-left">
                  {value}
                </span>
              </a>
            ))}
          </div>

          <footer className="relative mt-16 pb-4">
            <hr className="mx-auto mb-5 w-full max-w-5xl" />
            <div className="mx-auto flex flex-col items-center justify-between gap-4 text-center lowercase text-sm font-bold sm:text-base md:text-lg lg:text-xl lg:flex-row lg:text-left">
              <p>© 2026 Hemanth Tenneti.</p>
              <nav className="flex flex-wrap items-center justify-center gap-4 text-[#F5EAD5]">
                <a
                  href="https://github.com/HemanthTenneti"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Visit Hemanth's GitHub profile">
                  GitHub
                </a>
                <span aria-hidden="true">|</span>
                <a
                  href="https://linkedin.com/in/hemanth10eti"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Visit Hemanth's LinkedIn profile">
                  LinkedIn
                </a>
              </nav>
            </div>
          </footer>
        </div>
      </section>
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-[#F5EAD5] text-[#20201E] w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-[#e5d9c4] transition-all duration-500 z-50 transform ${
          showScrollTop ?
            "opacity-100 translate-y-0"
          : "opacity-0 translate-y-5 pointer-events-none"
        }`}
        aria-label="Scroll to top">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
      <ProjectAssetModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </ReactLenis>
  );
}

function ProjectAssetModal({ project, onClose }) {
  const assets = useMemo(() => buildProjectAssets(project), [project]);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = event => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  useEffect(() => {
    const modal = modalRef.current;
    if (!project || !modal) return undefined;

    const stopScrollPropagation = event => {
      event.stopPropagation();
    };

    modal.addEventListener("wheel", stopScrollPropagation, { passive: true });
    modal.addEventListener("touchmove", stopScrollPropagation, { passive: true });

    return () => {
      modal.removeEventListener("wheel", stopScrollPropagation);
      modal.removeEventListener("touchmove", stopScrollPropagation);
    };
  }, [project]);

  if (!project) return null;

  return (
    <div
      className="project-modal-backdrop"
      role="presentation"
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose();
      }}>
      <section
        ref={modalRef}
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title">
        <button
          type="button"
          className="project-modal-close"
          onClick={onClose}
          aria-label="Close project details">
          &times;
        </button>

        <div className="project-modal-copy">
          <p>{project.eyebrow}</p>
          <h2 id="project-modal-title">{project.title}</h2>
          <span>{project.description}</span>
        </div>

        {project.metrics?.length > 0 && (
          <div className="project-modal-metrics">
            {project.metrics.map(metric => (
              <span key={metric}>{metric}</span>
            ))}
          </div>
        )}

        <div className="project-modal-assets">
          {assets.map(asset => (
            <ProjectAssetItem
              asset={asset}
              key={`${asset.title}-${asset.href || asset.src}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjectAssetItem({ asset }) {
  const isImage =
    asset.type === "image" ||
    /\.(avif|gif|jpe?g|png|webp|svg)(\?.*)?$/i.test(asset.src || asset.href || "");

  if (isImage && (asset.src || asset.href)) {
    return (
      <a
        className="project-modal-asset project-modal-image-asset"
        href={asset.href || asset.src}
        target="_blank"
        rel="noopener noreferrer">
        <img src={asset.src || asset.href} alt={asset.alt || asset.title} />
        <span>{asset.title}</span>
      </a>
    );
  }

  return (
    <a
      className="project-modal-asset"
      href={asset.href}
      target="_blank"
      rel="noopener noreferrer">
      <span>{asset.type || "asset"}</span>
      <strong>{asset.title}</strong>
      {asset.caption && <small>{asset.caption}</small>}
    </a>
  );
}

function buildProjectAssets(project) {
  if (!project) return [];

  const declaredAssets = project.assets || [];
  const previewAsset =
    project.image ?
      [
        {
          type: "image",
          title: `${project.title} preview`,
          src: project.image,
          alt: `${project.title} project preview`,
        },
      ]
    : [];
  const linkAssets = [
    project.codeUrl && project.codeUrl !== "#" ?
      {
        type: project.codeLabel || "code",
        title: project.codeLabel || "Code",
        href: project.codeUrl,
        caption: "source or project reference",
      }
    : null,
    project.hostedUrl && project.hostedUrl !== "#" ?
      {
        type: project.hostedLabel || "link",
        title: project.hostedLabel || "Open project",
        href: project.hostedUrl,
        caption: "live site, dashboard, or case study",
      }
    : null,
  ].filter(Boolean);

  return [...previewAsset, ...declaredAssets, ...linkAssets].filter(
    (asset, index, allAssets) => {
      const assetKey = asset.href || asset.src || asset.title;
      return (
        allAssets.findIndex(
          candidate =>
            (candidate.href || candidate.src || candidate.title) === assetKey,
        ) === index
      );
    },
  );
}
