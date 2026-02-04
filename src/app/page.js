"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import SliderItem from "./components/SliderItem";

gsap.registerPlugin(ScrollTrigger);

// SEO Metadata export
export const metadata = {
  title: "Hemanth Tenneti | Full Stack Developer & Portfolio",
  description:
    "Portfolio of Hemanth Tenneti - Full Stack Developer showcasing AI projects, web development, and innovative tech solutions.",
  keywords:
    "Full Stack Developer, Web Developer, Portfolio, AI Projects, JavaScript, React, Next.js, Python",
  openGraph: {
    title: "Hemanth Tenneti | Full Stack Developer",
    description:
      "Portfolio showcasing innovative AI projects, web development, and modern tech solutions",
    image: "/facepfp.png",
  },
};
export default function HomePage() {
  const projects = useMemo(
    () => [
      {
        title: "in.culcate",
        description:
          "Re-discovering Bharat by bridging India's ancient wisdom with modern tech. A learning platform that transforms knowledge into an immersive, meaningful experience - making the journey both engaging and culturally rooted.",
        image: "/thumbnails/inculcate.png",
        codeUrl: "https://www.linkedin.com/company/in-culcate/",
        hostedUrl: "https://inculcate.in",
      },
      {
        title: "admiro",
        description: "",
        image: "",
        codeUrl: "",
        hostedUrl: "",
      },
      {
        title: "subtract",
        description:
          "An AI-integrated tool that summarizes and transcribes video content from platforms like YouTube, Instagram, and more. Designed for both long-form and short-form media, with a clean, efficient user experience.",
        image: "/thumbnails/subtract.png",
        codeUrl: "https://github.com/HemanthTenneti/subtract-frontend",
        hostedUrl: "https://subtract.10eti.me",
      },
      {
        title: "File Sorter",
        description:
          "Sort files effortlessly using an extension-based mapping system. Designed with simplicity in mind, it features a minimal UI and automates folder organization to improve workspace efficiency and reduce clutter.",
        image: "/thumbnails/filesorter.png",
        codeUrl: "https://github.com/HemanthTenneti/FileSorter",
        hostedUrl: "https://github.com/HemanthTenneti/FileSorter",
      },
      {
        title: "whtrapp",
        description:
          "A sleek, minimalistic weather site delivering precise forecasts in a clean design. It presents essential data without distractions, focusing on visual elegance and accurate information for everyday weather checks.",
        image: "/thumbnails/whtrapp.png",
        codeUrl: "https://github.com/HemanthTenneti/whtrapp.github.io",
        hostedUrl: "https://whtrapp.github.io/",
      },
    ],
    [],
  );

  const projectCount = projects.length;
  const [currentProjectIndex, setCurrentProjectIndex] = useState(projectCount); // Start in middle of duplicated array
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [autoSlideActive, setAutoSlideActive] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const scrollHintRef = useRef(null);
  const sliderRef = useRef(null);
  const sliderTrackRef = useRef(null);

  const nextProject = () => {
    if (projectCount <= 1) return;
    setCurrentProjectIndex(prevIndex => prevIndex + 1);
  };

  const prevProject = () => {
    if (projectCount <= 1) return;
    setCurrentProjectIndex(prevIndex => prevIndex - 1);
  };

  // Handle infinite carousel reset after animation completes
  useEffect(() => {
    const handleTransitionEnd = () => {
      const trackEl = sliderTrackRef.current;
      if (!trackEl) return;

      // Reset index when we get too far from the middle range
      if (currentProjectIndex >= projectCount * 2) {
        // Disable transitions completely and set transform manually
        trackEl.style.transition = "none";
        const newIndex = currentProjectIndex - projectCount;
        trackEl.style.transform = `translateX(-${newIndex * 100}%)`;
        setCurrentProjectIndex(newIndex);

        // Re-enable transitions on next frame
        requestAnimationFrame(() => {
          trackEl.style.transition = "";
        });
      } else if (currentProjectIndex < projectCount) {
        // Disable transitions completely and set transform manually
        trackEl.style.transition = "none";
        const newIndex = currentProjectIndex + projectCount;
        trackEl.style.transform = `translateX(-${newIndex * 100}%)`;
        setCurrentProjectIndex(newIndex);

        // Re-enable transitions on next frame
        requestAnimationFrame(() => {
          trackEl.style.transition = "";
        });
      }
    };

    const trackEl = sliderTrackRef.current;
    if (trackEl) {
      trackEl.addEventListener("transitionend", handleTransitionEnd);
      return () =>
        trackEl.removeEventListener("transitionend", handleTransitionEnd);
    }
  }, [projectCount, currentProjectIndex]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowScrollTop(true);
      else setShowScrollTop(false);

      if (window.scrollY > 100) {
        setShowScrollHint(false);
      }
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
    if (!isMobile || !autoSlideActive || projectCount <= 1) return;

    const interval = setInterval(() => {
      setCurrentProjectIndex(prevIndex => prevIndex + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile, autoSlideActive, projectCount]);

  useEffect(() => {
    const sliderEl = sliderRef.current;
    if (!isMobile || !sliderEl || projectCount <= 1) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const onTouchStart = event => {
      touchStartX = event.touches[0].clientX;
    };

    const onTouchMove = event => {
      touchEndX = event.touches[0].clientX;
    };

    const onTouchEnd = () => {
      const threshold = 50;
      const distance = touchEndX - touchStartX;

      if (Math.abs(distance) > threshold) {
        setAutoSlideActive(false);
        if (distance < 0) {
          setCurrentProjectIndex(prevIndex => prevIndex + 1);
        } else {
          setCurrentProjectIndex(prevIndex => prevIndex - 1);
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
  }, [isMobile, projectCount]);

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
  const lenis = useLenis(({ scroll }) => {});

  useGSAP(() => {
    const sliderTrack = sliderRef.current?.querySelector(".slider-track");
    if (!sliderTrack) return;

    gsap.fromTo(
      sliderTrack,
      { opacity: 0.75 },
      { opacity: 1, duration: 0.4, ease: "power2.out" },
    );
  }, [currentProjectIndex]);

  return (
    <ReactLenis root>
      <header className="flex h-[80vh] w-full px-12 md:px-30">
        <img
          src="/circleglow.png"
          alt="Decorative gradient circle glow background effect"
          className="absolute hidden lg:block bottom-0 left-0 -z-20 object-cover"
          loading="lazy"
        />
        <img
          src="/rayglow.png"
          alt="Decorative ray glow background effect"
          className="absolute top-0 right-0 -z-20 object-cover"
          loading="lazy"
        />
        <img
          className="header-image hidden lg:block"
          src="/hemanthpfp.png"
          alt="Hemanth Tenneti - Full Stack Developer"
          loading="lazy"
        />
        <div className="flex flex-col grow justify-center items-center lg:items-end">
          <div className="text-center lg:text-right w-fit lg:w-full">
            <h1 className="heading-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#20201E] font-bold">
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
            <h2 className="hidden text-2xl sm:block sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl md:w-full md:text-center lg:text-right font-bold heading-subtext">
              a passion for coding
              <br /> with an insatiable curiosity
              <br />
              fuelling my portfolio
            </h2>
          </div>
        </div>
      </header>
      <section
        id="about"
        className="px-6 py-16 sm:px-10 sm:py-20 md:px-16 md:py-24 lg:p-24 bg-[#2C2C2C] relative">
        <div className="absolute top-0 left-0 h-full w-full bg-[url(/backgroundnoise.png)] mix-blend-soft-light opacity-75"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h3 className="about-text w-full text-lg sm:text-xl md:text-2xl lg:text-3xl text-justify sm:text-center font-bold text-[#F5EAD5] lowercase">
            Driven by music and a love for clean, purposeful code, I enjoy
            building creative and efficient tech solutions. From automation to
            full-stack, I focus on solving real problems with clarity and
            intent. Bringing both technical and a forward-thinking mindset to
            everything I create.
          </h3>
        </div>
      </section>

      <section id="projects" className="relative pb-10">
        {/* Projects Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Projects",
            description: "Portfolio projects by Hemanth Tenneti",
            hasPart: [
              {
                "@type": "CreativeWork",
                name: "in.culcate",
                description:
                  "Re-discovering Bharat by bridging India's ancient wisdom with modern tech. A learning platform that transforms knowledge into an immersive, meaningful experience.",
                image: "https://10eti.me/thumbnails/inculcate.png",
                url: "https://inculcate.in",
                author: {
                  "@type": "Person",
                  name: "Hemanth Tenneti",
                },
              },
              {
                "@type": "CreativeWork",
                name: "subtract",
                description:
                  "An AI-integrated tool that summarizes and transcribes video content from platforms like YouTube, Instagram, and more.",
                image: "https://10eti.me/thumbnails/subtract.png",
                url: "https://subtract.10eti.me",
                author: {
                  "@type": "Person",
                  name: "Hemanth Tenneti",
                },
              },
              {
                "@type": "CreativeWork",
                name: "File Sorter",
                description:
                  "Sort files effortlessly using an extension-based mapping system. Designed with simplicity in mind.",
                image: "https://10eti.me/thumbnails/filesorter.png",
                url: "https://github.com/HemanthTenneti/FileSorter",
                author: {
                  "@type": "Person",
                  name: "Hemanth Tenneti",
                },
              },
              {
                "@type": "CreativeWork",
                name: "whtrapp",
                description:
                  "A sleek, minimalistic weather site delivering precise forecasts in a clean design.",
                image: "https://10eti.me/thumbnails/whtrapp.png",
                url: "https://whtrapp.github.io/",
                author: {
                  "@type": "Person",
                  name: "Hemanth Tenneti",
                },
              },
            ],
          })}
        </script>
        <div className="absolute top-0 left-0 h-full  bg-[url(/backgroundnoise.png)] mix-blend-soft-light opacity-75 w-full"></div>
        <div className=" h-48 overflow-hidden flex items-center justify-center">
          <marquee
            className="md:text-2xl lg:text-4xl bg-[#F5EAD5] text-[#20201E] font-bold p-4 rotate-z-[-4deg] scale-[1.1]"
            scrollamount="15"
            behavior="scroll"
            direction="left"
            loop="infinite"
            scrolldelay="0">
            {"PROJECTS・".repeat(1000)}
          </marquee>
        </div>
        <div
          ref={sliderRef}
          className="flex w-full items-center justify-center gap-10 px-6 sm:px-10 lg:px-20 py-20 pb-5 z-20">
          <button
            onClick={() => {
              setAutoSlideActive(false);
              prevProject();
            }}
            className="hidden p-5 rounded-lg bg-[#F5EAD5] hover:bg-[#e5d9c4] transition-colors cursor-pointer z-10 md:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#000"
              className="size-3 lg:size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <div className="relative flex w-full max-w-[800px] touch-pan-y overflow-hidden md:touch-auto">
            <div
              ref={sliderTrackRef}
              className="slider-track flex w-full transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentProjectIndex * 100}%)`,
              }}>
              {[...projects, ...projects, ...projects].map((project, idx) => (
                <div
                  key={`${project.title}-${idx}`}
                  className="flex w-full shrink-0 justify-center">
                  <SliderItem
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    codeUrl={project.codeUrl}
                    hostedUrl={project.hostedUrl}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setAutoSlideActive(false);
              nextProject();
            }}
            className="hidden p-5 rounded-lg bg-[#F5EAD5] hover:bg-[#e5d9c4] transition-colors cursor-pointer z-10 md:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#000"
              className="size-3 lg:size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-3 mt-2 mb-10">
          {projects.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentProjectIndex % projectCount ?
                  "bg-[#F5EAD5]"
                : "bg-[#696969]"
              }`}
            />
          ))}
        </div>
      </section>
      <section id="contact" className="relative">
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
        <div className="absolute top-0 left-0 h-full w-full bg-[url(/backgroundnoise.png)] mix-blend-soft-light opacity-75"></div>
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
    </ReactLenis>
  );
}
