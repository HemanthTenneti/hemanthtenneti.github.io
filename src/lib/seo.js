// SEO Configuration and Utilities for Hemanth Tenneti Portfolio

export const siteConfig = {
  title: "Hemanth Tenneti | Full Stack Developer & Portfolio",
  description:
    "Portfolio of Hemanth Tenneti - Full Stack Developer showcasing AI projects and innovative tech solutions.",
  url: "https://10eti.me",
  siteName: "Hemanth Tenneti Portfolio",
  email: "hemanth10etii@gmail.com",
  twitter: "@10eti",
  github: "HemanthTenneti",
  linkedin: "hemanth10eti",
  author: "Hemanth Tenneti",
  locale: "en_US",
  keywords: [
    "Full Stack Developer",
    "Web Developer",
    "Portfolio",
    "AI Projects",
    "JavaScript",
    "React",
    "Next.js",
    "Python",
    "Software Engineer",
    "Hemanth Tenneti",
  ],
};

export const projects = [
  {
    id: "inculcate",
    title: "in.culcate",
    description:
      "Re-discovering Bharat by bridging India's ancient wisdom with modern tech. A learning platform that transforms knowledge into an immersive, meaningful experience - making the journey both engaging and culturally rooted.",
    image: "https://10eti.me/thumbnails/inculcate.png",
    codeUrl: "https://www.linkedin.com/company/in-culcate/",
    hostedUrl: "https://inculcate.in",
    tags: ["EdTech", "AI", "Cultural Tech", "Learning Platform"],
    featured: true,
  },
  {
    id: "subtract",
    title: "subtract",
    description:
      "An AI-integrated tool that summarizes and transcribes video content from platforms like YouTube, Instagram, and more. Designed for both long-form and short-form media, with a clean, efficient user experience.",
    image: "https://10eti.me/thumbnails/subtract.png",
    codeUrl: "https://github.com/HemanthTenneti/subtract-frontend",
    hostedUrl: "https://subtract.10eti.me",
    tags: ["AI", "Video Processing", "Transcription", "Summarization"],
    featured: true,
  },
  {
    id: "filesorter",
    title: "File Sorter",
    description:
      "Sort files effortlessly using an extension-based mapping system. Designed with simplicity in mind, it features a minimal UI and automates folder organization to improve workspace efficiency and reduce clutter.",
    image: "https://10eti.me/thumbnails/filesorter.png",
    codeUrl: "https://github.com/HemanthTenneti/FileSorter",
    hostedUrl: "https://github.com/HemanthTenneti/FileSorter",
    tags: ["Automation", "File Management", "Productivity Tool"],
    featured: false,
  },
  {
    id: "whtrapp",
    title: "whtrapp",
    description:
      "A sleek, minimalistic weather site delivering precise forecasts in a clean design. It presents essential data without distractions, focusing on visual elegance and accurate information for everyday weather checks.",
    image: "https://10eti.me/thumbnails/whtrapp.png",
    codeUrl: "https://github.com/HemanthTenneti/whtrapp.github.io",
    hostedUrl: "https://whtrapp.github.io/",
    tags: ["Weather", "Web App", "Minimalist Design"],
    featured: false,
  },
];

export const generateSchemaMarkup = (type, data) => {
  const schemas = {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.siteName,
      url: siteConfig.url,
      logo: `${siteConfig.url}/favicon.svg`,
      description: siteConfig.description,
      sameAs: [
        `https://github.com/${siteConfig.github}`,
        `https://linkedin.com/in/${siteConfig.linkedin}`,
        `https://twitter.com/${siteConfig.twitter.substring(1)}`,
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: siteConfig.email,
        contactType: "General",
      },
    },

    person: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
      image: `${siteConfig.url}/facepfp.png`,
      jobTitle: "Full Stack Developer",
      description: siteConfig.description,
      sameAs: [
        `https://github.com/${siteConfig.github}`,
        `https://linkedin.com/in/${siteConfig.linkedin}`,
        `https://twitter.com/${siteConfig.twitter.substring(1)}`,
      ],
      knowsAbout: [
        "Web Development",
        "Full Stack Development",
        "JavaScript",
        "React",
        "Next.js",
        "Python",
        "AI Integration",
        "UI/UX Design",
      ],
    },

    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.siteName,
      url: siteConfig.url,
      description: siteConfig.description,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteConfig.url}?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },

    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: data || [],
    },

    article: {
      "@context": "https://schema.org",
      "@type": "Article",
      ...(data || {}),
    },
  };

  return schemas[type] || {};
};

export const socialMedia = {
  github: `https://github.com/${siteConfig.github}`,
  linkedin: `https://linkedin.com/in/${siteConfig.linkedin}`,
  email: `mailto:${siteConfig.email}`,
};

export const keywords = {
  primary: "Full Stack Developer Portfolio",
  secondary: [
    "Web Developer",
    "React Developer",
    "JavaScript Developer",
    "Next.js Developer",
    "Python Developer",
    "AI Integration",
    "Product Development",
    "Intern",
  ],
  long_tail: [
    "Full Stack Developer Portfolio Hemanth",
    "AI Projects Web Development",
    "React Next.js Portfolio",
  ],
};
