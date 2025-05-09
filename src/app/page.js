"use client";
import { useState, useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger);
export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

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
      'a[href^="#"]:not([href="#"])'
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

  useGSAP(() => {
    const headingSplit = new SplitText(".heading-text");
    const headingSubtext = new SplitText(".heading-subtext");
    const aboutText = new SplitText(".about-text");
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
    tl.from(aboutText.words, {
      duration: 0.05,
      opacity: 0,
      y: -10,
      delay: 0,
      stagger: 0.1,
      ease: "power2.EaseInOut",
    });
  });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const lenis = useLenis(({ scroll }) => {});
  return (
    <ReactLenis root>
      <header className="flex h-[80vh] w-full px-30">
        <img
          src="/circleglow.png"
          alt="Circle Glow"
          className="absolute bottom-0 left-0 -z-20 object-cover"
        />
        <img
          src="/rayglow.png"
          alt="Ray Glow"
          className="absolute top-0 right-0 -z-20 object-cover"
        />
        <img
          className="header-image"
          src="/hemanthpfp.png"
          alt="Hemanth's Picture"
        />
        <div className="flex flex-col flex-grow justify-center items-end">
          <h1 className="heading-text text-right text-8xl text-[#20201E] font-bold">
            hi! i&apos;m hemanth
          </h1>
          <h2 className="text-6xl text-right font-bold heading-subtext">
            a passion for coding
            <br /> with an insatiable curiosity
            <br />
            fuelling my portfolio
          </h2>
        </div>
      </header>
      <section id="about" className="p-[96px] bg-[#2C2C2C] relative">
        <div className="absolute top-0 left-0 h-full  bg-[url(/backgroundnoise.png)] mix-blend-soft-light opacity-75 w-full"></div>
        <h3 className="about-text text-4xl text-center font-bold text-[#F5EAD5] relative z-10 lowercase">
          Driven by music and a love for clean, purposeful code, I enjoy
          <br></br>
          building creative and efficient tech solutions. From automation to
          <br></br>
          full-stack, I focus on solving real problems with clarity and intent.
          <br></br>
          Bringing both technical and a forward-thinking mindset to everything I
          <br></br>
          create.
        </h3>
      </section>
      <section id="projects" className="relative pb-10">
        <div className="absolute top-0 left-0 h-full  bg-[url(/backgroundnoise.png)] mix-blend-soft-light opacity-75 w-full"></div>
        <div className=" h-48 overflow-hidden flex items-center justify-center">
          <marquee
            className="text-4xl bg-[#F5EAD5] text-[#20201E] font-bold p-4 rotate-z-[-4deg] scale-[1.1]"
            scrollamount="15"
            behavior="scroll"
            direction="left"
            loop="infinite"
            scrolldelay="0">
            {"PROJECTS・".repeat(1000)}
          </marquee>
        </div>
      </section>
      <section id="contact" className="relative">
        <div className="absolute top-0 left-0 h-full  bg-[url(/backgroundnoise.png)] mix-blend-soft-light opacity-75 w-full"></div>
        <div className="mx-6 rounded-t-4xl px-12 pt-12 overflow-hidden flex flex-col items-center justify-center border-1 border-b-0 border-[#F5EAD5]">
          <h1 className="text-4xl font-bold mb-18">contact</h1>

          <div className="flex flex-col items-center justify-center gap-5 lowercase mb-20">
            <div className="flex text-2xl justify-between items-center font-medium w-[800px] gap-10">
              <h1>email</h1>
              <div className="flex-grow w-full border-[#F5EAD5] border-t-2 border-dotted"></div>
              <h1>hemanth10etii@gmail.com</h1>
            </div>
            <div className="flex text-2xl justify-between items-center font-medium w-[800px] gap-10">
              <h1>github</h1>
              <div className="flex-grow w-full border-[#F5EAD5] border-t-2 border-dotted"></div>
              <h1>HemanthTenneti</h1>
            </div>
            <div className="flex text-2xl justify-between items-center font-medium w-[800px] gap-10">
              <h1>linkedin</h1>
              <div className="flex-grow w-full border-[#F5EAD5] border-t-2 border-dotted"></div>
              <h1>hemanth10eti</h1>
            </div>
            <div className="flex text-2xl justify-between items-center font-medium w-[800px] gap-10">
              <h1>twitter/x</h1>
              <div className="flex-grow w-full border-[#F5EAD5] border-t-2 border-dotted"></div>
              <h1>@HemanthTenneti</h1>
            </div>
          </div>
          <footer className="relative pb-5">
            <hr className="w-[90vw] mb-5 mx-auto"></hr>
            <div className="flex justify-between mx-24 lowercase text-2xl font-bold">
              <h1>© 2025 Hemanth Tenneti.</h1>
              <div className="links flex gap-5 z-10 text-[#F5EAD5]">
                <a href="https://github.com/HemanthTenneti" target="_blank">
                  GitHub
                </a>
                <a>|</a>
                <a href="https://linkedin.com/in/hemanth10eti" target="_blank">
                  LinkedIn
                </a>
                <a>|</a>
                <a href="https://x.com/hemanthtenneti" target="_blank">
                  twitter
                </a>
              </div>
            </div>
          </footer>
        </div>
      </section>
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-[#F5EAD5] text-[#20201E] w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-[#e5d9c4] transition-all duration-500 z-50 transform ${
          showScrollTop
            ? "opacity-100 translate-y-0"
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
