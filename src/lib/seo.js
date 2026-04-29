// SEO Configuration and Utilities for Hemanth Tenneti Portfolio

export { projects } from "./projects";

export const siteConfig = {
  title: "Hemanth Tenneti | Full Stack & Data Analytics Portfolio",
  description:
    "Portfolio of Hemanth Tenneti - full-stack developer and data analytics practitioner showcasing software, automation, and business analytics projects.",
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
    "Data Analytics",
    "Business Analytics",
    "Finance Analytics",
    "Tableau",
    "JavaScript",
    "React",
    "Next.js",
    "Python",
    "Software Engineer",
    "Hemanth Tenneti",
  ],
};

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
      jobTitle: "Full Stack Developer and Data Analytics Practitioner",
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
        "Data Analytics",
        "Business Analytics",
        "Tableau",
        "Financial Modeling",
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
  primary: "Full Stack Developer Data Analytics Portfolio",
  secondary: [
    "Web Developer",
    "React Developer",
    "JavaScript Developer",
    "Next.js Developer",
    "Python Developer",
    "AI Integration",
    "Data Analytics",
    "Business Analytics",
    "Tableau Dashboard",
    "Product Development",
    "Intern",
  ],
  long_tail: [
    "Full Stack Developer and Data Analytics Portfolio Hemanth",
    "AI Projects Web Development Data Analytics",
    "React Next.js Tableau Portfolio",
  ],
};
