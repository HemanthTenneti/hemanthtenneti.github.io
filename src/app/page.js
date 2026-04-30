"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import {
  domainExperienceMap,
  projectTabs,
  projects,
  siteExperiences,
} from "../lib/projects";
import SliderItem from "./components/SliderItem";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const [experienceId, setExperienceId] = useState("main");

  useEffect(() => {
    const host = window.location.hostname.toLowerCase();
    const previewMode = new URLSearchParams(window.location.search).get("site");
    const mappedExperience =
      siteExperiences[previewMode] ? previewMode : domainExperienceMap[host];

    setExperienceId(mappedExperience || "main");
  }, []);

  const experience = siteExperiences[experienceId];

  if (experience) {
    if (experience.id === "data") {
      return <DataSpecializedPortfolio experience={experience} />;
    }
    return <LegacySpecializedPortfolio experience={experience} />;
  }

  return <MainPortfolio />;
}

function MainPortfolio() {
  const [activeTab, setActiveTab] = useState("all");
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollHintRef = useRef(null);
  const sliderRef = useRef(null);
  const projectCardRef = useRef(null);

  const visibleProjects = useMemo(() => {
    if (activeTab === "all") return projects;
    return projects.filter(project => project.categoryIds.includes(activeTab));
  }, [activeTab]);

  const activeTabMeta = useMemo(
    () => projectTabs.find(tab => tab.id === activeTab) || projectTabs[0],
    [activeTab],
  );

  const projectCount = visibleProjects.length;
  const currentProject = visibleProjects[currentProjectIndex] || visibleProjects[0];

  const getTabCount = tabId => {
    if (tabId === "all") return projects.length;
    return projects.filter(project => project.categoryIds.includes(tabId)).length;
  };

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
    setCurrentProjectIndex(0);
  }, [activeTab]);

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
  }, [activeTab, currentProjectIndex]);

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
                project.image ? `https://10eti.me${project.image}` : undefined,
              url:
                project.hostedUrl?.startsWith("/") ?
                  `https://10eti.me${project.hostedUrl}`
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
                {activeTabMeta.heading}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#F5EAD5]/70 sm:text-base lowercase">
                {activeTabMeta.description}
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
            className="project-reveal mt-8 flex flex-wrap gap-3"
            role="tablist"
            aria-label="Project categories">
            {projectTabs.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`project-tab rounded-full border px-4 py-2 text-sm font-bold lowercase transition-all duration-300 sm:px-5 ${
                    isActive ?
                      "border-[#F5EAD5] bg-[#F5EAD5] text-[#20201E]"
                    : "border-[#F5EAD5]/25 bg-[#171818]/70 text-[#F5EAD5] hover:border-[#F5EAD5]/70"
                  }`}>
                  <span>{tab.label}</span>
                  <span
                    className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                      isActive ? "bg-[#20201E]/10" : "bg-[#F5EAD5]/10"
                    }`}>
                    {getTabCount(tab.id)}
                  </span>
                </button>
              );
            })}
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
                key={`${activeTab}-${currentProject?.id}`}
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
            url: "https://10eti.me",
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
              <p>© 2025 Hemanth Tenneti. All rights reserved.</p>
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

function DataSpecializedPortfolio({ experience }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activityDays, setActivityDays] = useState([]);

  const experienceProjects = useMemo(
    () =>
      projects.filter(project =>
        project.categoryIds.some(categoryId =>
          experience.categoryIds.includes(categoryId),
        ),
      ),
    [experience],
  );

  const filterOptions = useMemo(() => {
    const tagMap = new Map();

    experienceProjects.forEach(project => {
      (project.tags || []).forEach(tag => {
        const key = tag.toLowerCase();
        if (!tagMap.has(key)) tagMap.set(key, tag);
      });
    });

    return [
      { key: "all", label: "All" },
      ...Array.from(tagMap.entries()).map(([key, label]) => ({ key, label })),
    ];
  }, [experienceProjects]);

  const filteredProjects = useMemo(
    () =>
      experienceProjects.filter(project => {
        const projectText = `${project.title} ${project.description} ${(project.tags || []).join(" ")}`.toLowerCase();
        const searchMatch = projectText.includes(searchTerm.toLowerCase());
        const filterMatch =
          activeFilter === "all" ||
          (project.tags || []).some(tag => tag.toLowerCase() === activeFilter);

        return searchMatch && filterMatch;
      }),
    [activeFilter, experienceProjects, searchTerm],
  );

  useEffect(() => {
    setActiveFilter("all");
    setSearchTerm("");
  }, [experience.id]);

  useEffect(() => {
    let cancelled = false;

    const fetchActivity = async () => {
      try {
        const response = await fetch("/api/github-activity");

        if (!response.ok) return;

        const payload = await response.json();
        if (cancelled) return;

        setActivityDays(Array.isArray(payload.days) ? payload.days : []);
      } catch {
        if (!cancelled) setActivityDays([]);
      }
    };

    fetchActivity();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    gsap.from(".domain-reveal", {
      opacity: 0,
      y: 26,
      stagger: 0.08,
      duration: 0.75,
      ease: "power3.out",
    });

    gsap.from(".domain-gh-card", {
      scrollTrigger: {
        trigger: ".domain-gh-grid",
        start: "top 75%",
      },
      opacity: 0,
      y: 32,
      stagger: 0.08,
      duration: 0.7,
      ease: "power3.out",
    });
  }, [experience.id]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <ReactLenis root>
      <main className={`domain-gh-page domain-${experience.id}`}>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: experience.title,
            description: experience.summary,
            hasPart: experienceProjects.map(project => ({
              "@type": "CreativeWork",
              name: project.title,
              description: project.description,
              image:
                project.image ? `https://10eti.me${project.image}` : undefined,
              url:
                project.hostedUrl?.startsWith("/") ?
                  `https://10eti.me${project.hostedUrl}`
                : project.hostedUrl || project.codeUrl,
              keywords: project.tags?.join(", "),
              author: {
                "@type": "Person",
                name: "Hemanth Tenneti",
              },
            })),
          })}
        </script>

        <div className="domain-gh-container">
          <aside id="about" className="domain-gh-sidebar domain-reveal">
            <img
              src="/facepfp.png"
              alt="Hemanth Tenneti"
              className="domain-gh-avatar"
            />
            <h1>Hemanth Tenneti</h1>
            <h2>10eti</h2>
            <p>{experience.summary}</p>
            <a
              href="/HemanthTennetiDVAResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="domain-gh-resume-btn">
              View Resume
            </a>
            <div className="domain-gh-sidebar-links">
              <a href="https://github.com/HemanthTenneti" target="_blank" rel="noopener noreferrer">
                github.com/HemanthTenneti
              </a>
              <a href="https://linkedin.com/in/hemanth10eti" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/hemanth10eti
              </a>
            </div>
            <div className="domain-gh-skills">
              <h3>Skills & Tools</h3>
              <div>
                {Array.from(
                  new Set(
                    experienceProjects.flatMap(project => project.tags || []),
                  ),
                ).map(skill => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          </aside>

          <section className="domain-gh-content">
            <section className="domain-gh-intro domain-reveal">
              <p>{experience.kicker}</p>
              <h2>{experience.title}</h2>
              <span>{experience.summary}</span>
              <div className="domain-gh-metrics">
                {experience.stats.map(stat => (
                  <div key={stat}>
                    <strong>{stat.split(" ")[0]}</strong>
                    <small>{stat.replace(`${stat.split(" ")[0]} `, "")}</small>
                  </div>
                ))}
              </div>
            </section>

            <section id="projects" className="domain-gh-repos domain-reveal">
              <div className="domain-gh-repo-head">
                <h3>
                  Repositories{" "}
                  <span>{String(filteredProjects.length).padStart(2, "0")}</span>
                </h3>
              </div>

              <div className="domain-gh-filter-bar">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={event => setSearchTerm(event.target.value)}
                  placeholder="Find a project..."
                  aria-label="Find a project"
                />
                <div className="domain-gh-filter-buttons">
                  {filterOptions.map(filter => (
                    <button
                      key={filter.key}
                      type="button"
                      onClick={() => setActiveFilter(filter.key)}
                      className={activeFilter === filter.key ? "active" : ""}>
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="domain-gh-grid">
                {filteredProjects.map((project, index) => (
                  <ExperienceProjectCard
                    experienceId={experience.id}
                    index={index}
                    key={project.id}
                    onOpen={setSelectedProject}
                    project={project}
                  />
                ))}
                {filteredProjects.length === 0 && (
                  <div className="domain-gh-no-results">
                    No projects match this search or filter.
                  </div>
                )}
              </div>
            </section>

            <section id="contact" className="domain-gh-contact domain-reveal">
              <strong>Contact</strong>
              <a href="mailto:hemanth10etii@gmail.com">hemanth10etii@gmail.com</a>
              <div>
                <a href="https://github.com/HemanthTenneti" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href="https://linkedin.com/in/hemanth10eti" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </div>
            </section>

            <section className="domain-gh-contrib domain-reveal" aria-label="GitHub contribution matrix">
              <div className="domain-gh-contrib-head">
                <strong>GitHub contribution matrix</strong>
                <span>last year via GitHub API</span>
              </div>
              <div className="domain-gh-contrib-grid" role="img" aria-label="GitHub contribution matrix">
                {activityDays.length > 0 ?
                  activityDays.map((day, index) => (
                    <span
                      key={`${day.date}-${index}`}
                      className={`domain-gh-contrib-cell level-${day.level}`}
                      title={`${day.count} public events on ${day.date}`}
                    />
                  ))
                : Array.from({ length: 364 }).map((_, index) => (
                    <span key={index} className="domain-gh-contrib-cell level-0" />
                  ))
                }
              </div>
            </section>
          </section>
        </div>
      </main>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#F5EAD5] text-[#20201E] shadow-lg transition-all duration-500 hover:bg-[#e5d9c4] ${
          showScrollTop ?
            "opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-5"
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

function LegacySpecializedPortfolio({ experience }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const experienceProjects = useMemo(
    () =>
      projects.filter(project =>
        project.categoryIds.some(categoryId =>
          experience.categoryIds.includes(categoryId),
        ),
      ),
    [experience],
  );

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    gsap.from(".domain-reveal", {
      opacity: 0,
      y: 26,
      stagger: 0.08,
      duration: 0.75,
      ease: "power3.out",
    });

    gsap.from(".domain-project-card", {
      scrollTrigger: {
        trigger: ".domain-project-grid",
        start: "top 75%",
      },
      opacity: 0,
      y: 32,
      stagger: 0.08,
      duration: 0.7,
      ease: "power3.out",
    });
  }, [experience.id]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <ReactLenis root>
      <main className={`domain-page domain-${experience.id}`}>
        <section id="about" className="domain-hero">
          <div className="domain-shell domain-hero-grid">
            <div className="domain-hero-copy">
              <p className="domain-reveal domain-kicker">{experience.kicker}</p>
              <h1 className="domain-reveal domain-title">{experience.title}</h1>
              <p className="domain-reveal domain-summary">
                {experience.summary}
              </p>
              <div className="domain-reveal domain-stat-grid">
                {experience.stats.map(stat => (
                  <span key={stat}>{stat}</span>
                ))}
              </div>
            </div>

            <DomainHeroVisual experience={experience} />
          </div>
        </section>

        <section className="domain-shell domain-pillars" aria-label="Focus areas">
          {experience.pillars.map((pillar, index) => (
            <div className="domain-reveal domain-pillar" key={pillar}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{pillar}</strong>
            </div>
          ))}
        </section>

        <section id="projects" className="domain-shell domain-projects">
          <div className="domain-reveal domain-section-heading">
            <p>{experience.id === "automation" ? "system builds" : "selected builds"}</p>
            <h2>
              {experience.id === "automation" ?
                "repeatable systems with visible logic"
              : "work shaped around the domain"}
            </h2>
          </div>

          <div className="domain-project-grid">
            {experienceProjects.map((project, index) => (
              <LegacyExperienceProjectCard
                experienceId={experience.id}
                index={index}
                key={project.id}
                onOpen={setSelectedProject}
                project={project}
              />
            ))}
          </div>
        </section>

        <section className="domain-shell domain-process-section">
          <div className="domain-reveal domain-section-heading">
            <p>working method</p>
            <h2>
              {experience.id === "automation" ?
                "from repeated action to reliable flow"
              : "from product idea to shipped interface"}
            </h2>
          </div>

          <div className="domain-process">
            {experience.process.map((step, index) => (
              <div className="domain-reveal domain-process-step" key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="domain-contact">
          <div className="domain-shell domain-contact-inner">
            <p>build something focused</p>
            <a href="mailto:hemanth10etii@gmail.com">
              hemanth10etii@gmail.com
            </a>
          </div>
        </section>
      </main>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#F5EAD5] text-[#20201E] shadow-lg transition-all duration-500 hover:bg-[#e5d9c4] ${
          showScrollTop ?
            "opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-5"
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

function DomainHeroVisual({ experience }) {
  if (experience.id === "web") {
    return (
      <div className="domain-reveal domain-hero-visual domain-browser-visual">
        <div className="domain-browser-top">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="domain-browser-body">
          <div className="domain-browser-sidebar"></div>
          <div className="domain-browser-content">
            <div className="domain-browser-row wide"></div>
            <div className="domain-browser-row"></div>
            <div className="domain-browser-cards">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (experience.id === "automation") {
    return (
      <div className="domain-reveal domain-hero-visual domain-flow-visual">
        {["input", "rules", "sort", "output"].map((step, index) => (
          <div
            className="domain-flow-node"
            key={step}
            style={{ "--node-index": index }}>
            <span>{step}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="domain-reveal domain-hero-visual domain-data-visual">
      <div className="domain-data-panel">
        <p>valuation model</p>
        <strong>2,456.69 Cr</strong>
        <span>intrinsic estimate</span>
      </div>
      <div className="domain-data-bars" aria-hidden="true">
        {[46, 78, 64, 91, 58, 72].map((height, index) => (
          <span
            key={index}
            style={{
              "--bar-height": `${height}%`,
              "--bar-delay": `${index * 80}ms`,
            }}
          />
        ))}
      </div>
      <div className="domain-data-grid">
        {["growth", "margin", "freight", "SLA"].map(label => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function ExperienceProjectCard({ project, index, experienceId, onOpen }) {
  const links = [
    project.codeUrl && project.codeUrl !== "#" ?
      { href: project.codeUrl, label: project.codeLabel || "Code" }
    : null,
    project.hostedUrl && project.hostedUrl !== "#" ?
      { href: project.hostedUrl, label: project.hostedLabel || "Open" }
    : null,
  ].filter(Boolean);

  return (
    <article
      className={`domain-gh-card domain-project-card-${experienceId}`}
      style={{ "--card-index": index }}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project)}
      onKeyDown={event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(project);
        }
      }}
      aria-label={`Open ${project.title} project details`}>
      <div className="domain-gh-card-media">
        {project.image ?
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            loading="lazy"
          />
        : <DomainProjectVisual project={project} />}
      </div>

      <div className="domain-gh-card-body">
        <div className="domain-gh-card-head">
          <p>{project.eyebrow}</p>
          <span>public</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>

      {project.metrics?.length > 0 && (
        <div className="domain-gh-card-tags">
          {project.metrics.slice(0, 3).map(metric => (
            <span key={metric}>{metric}</span>
          ))}
        </div>
      )}

      {links.length > 0 && (
        <div className="domain-gh-card-links">
          {links.map(link => (
            <a
              href={link.href}
              key={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={event => event.stopPropagation()}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

function LegacyExperienceProjectCard({ project, index, experienceId, onOpen }) {
  const links = [
    project.codeUrl && project.codeUrl !== "#" ?
      { href: project.codeUrl, label: project.codeLabel || "Code" }
    : null,
    project.hostedUrl && project.hostedUrl !== "#" ?
      { href: project.hostedUrl, label: project.hostedLabel || "Open" }
    : null,
  ].filter(Boolean);

  return (
    <article
      className={`domain-project-card domain-project-card-${experienceId}`}
      style={{ "--card-index": index }}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project)}
      onKeyDown={event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(project);
        }
      }}
      aria-label={`Open ${project.title} project details`}>
      <div className="domain-project-media">
        {project.image ?
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            loading="lazy"
          />
        : <DomainProjectVisual project={project} />}
      </div>

      <div className="domain-project-body">
        <p>{project.eyebrow}</p>
        <h3>{project.title}</h3>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <p>{project.description}</p>
      </div>

      {project.metrics?.length > 0 && (
        <div className="domain-project-metrics">
          {project.metrics.map(metric => (
            <span key={metric}>{metric}</span>
          ))}
        </div>
      )}

      {links.length > 0 && (
        <div className="domain-project-links">
          {links.map(link => (
            <a
              href={link.href}
              key={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={event => event.stopPropagation()}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

function buildActivityMatrix(events) {
  const counts = new Map();
  events.forEach(event => {
    if (!event?.created_at) return;
    const day = event.created_at.slice(0, 10);
    counts.set(day, (counts.get(day) || 0) + 1);
  });

  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 52 * 7);
  start.setHours(0, 0, 0, 0);

  const cells = [];
  for (let week = 0; week < 53; week += 1) {
    for (let day = 0; day < 7; day += 1) {
      const date = new Date(start);
      date.setDate(start.getDate() + week * 7 + day);
      const key = date.toISOString().slice(0, 10);
      const count = counts.get(key) || 0;
      cells.push({
        date: key,
        count,
        level:
          count === 0 ? 0
          : count === 1 ? 1
          : count === 2 ? 2
          : count === 3 ? 3
          : 4,
      });
    }
  }

  return cells;
}

function DomainProjectVisual({ project }) {
  const bars = [52, 71, 44, 86, 63, 77];

  return (
    <div className={`domain-project-visual analytics-visual-${project.visualType}`}>
      <div className="domain-project-visual-grid"></div>
      <p>{project.eyebrow}</p>
      <strong>{project.title}</strong>
      <div className="domain-project-visual-bars" aria-hidden="true">
        {bars.map((height, index) => (
          <span
            key={index}
            style={{
              "--bar-height": `${height}%`,
              "--bar-delay": `${index * 70}ms`,
            }}
          />
        ))}
      </div>
    </div>
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
