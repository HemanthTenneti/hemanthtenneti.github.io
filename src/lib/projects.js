export const projectTabs = [
  {
    id: "all",
    label: "all work",
    heading: "selected work across code, systems, and analysis",
    description:
      "a rotating shelf of shipped products, backend-heavy builds, automation tools, and analytics case studies.",
  },
  {
    id: "software",
    label: "software",
    heading: "software projects built for real workflows",
    description:
      "full-stack products, scalable backend systems, and useful interfaces designed around clarity and reliability.",
  },
  {
    id: "automation",
    label: "automation",
    heading: "automation that removes repetitive work",
    description:
      "small tools and workflows that reduce friction, organize messy systems, and give time back.",
  },
  {
    id: "data-analytics",
    label: "data analytics",
    heading: "analytics work that turns noise into decisions",
    description:
      "finance models, marketplace intelligence, KPI dashboards, and operational analysis from portfolio case studies.",
  },
];

export const domainExperienceMap = {
  "data.10eti.dev": "data",
  "data.10eti.me": "data",
  "web.10eti.dev": "web",
  "web.10eti.me": "web",
  "auto.10eti.dev": "automation",
  "auto.10eti.me": "automation",
  "automation.10eti.dev": "automation",
  "automation.10eti.me": "automation",
};

export const siteExperiences = {
  data: {
    id: "data",
    categoryIds: ["data-analytics"],
    kicker: "data analytics portfolio",
    title: "analytics that turns raw work into boardroom-ready decisions",
    summary:
      "finance models, marketplace intelligence, tableau dashboards, and operations analysis built around clear business questions.",
    stats: ["4 analytics studies", "~100k marketplace orders", "Excel / Tableau / EDA"],
    pillars: ["valuation", "comparative finance", "marketplace KPIs", "operations signals"],
    process: ["frame the decision", "clean and model the data", "build the story", "map the recommendation"],
  },
  web: {
    id: "web",
    categoryIds: ["software"],
    kicker: "software portfolio",
    title: "full-stack, backend, and frontend projects shaped for real usage",
    summary:
      "product interfaces, backend-heavy platforms, AI utilities, and web systems with practical flows and clean presentation.",
    stats: ["5 software builds", "frontend + backend", "product-first interfaces"],
    pillars: ["platforms", "dashboards", "backend systems", "AI utilities"],
    process: ["shape the product flow", "model the data", "build the interface", "ship and iterate"],
  },
  automation: {
    id: "automation",
    categoryIds: ["automation"],
    kicker: "automation portfolio",
    title: "small tools that turn repetitive work into predictable systems",
    summary:
      "automation work focused on file cleanup, workflow reduction, rule-based organization, and tools that remove low-value manual effort.",
    stats: ["1 current automation build", "extension mapping", "workspace cleanup"],
    pillars: ["file systems", "rule engines", "productivity tools", "repeatable workflows"],
    process: ["spot repetition", "define rules", "automate the path", "keep it understandable"],
  },
};

export const projects = [
  {
    id: "inculcate",
    title: "in.culcate",
    eyebrow: "cultural learning platform",
    description:
      "Re-discovering Bharat by bridging India's ancient wisdom with modern tech. A learning platform that turns knowledge into an immersive, meaningful experience.",
    image: "/thumbnails/inculcate.png",
    codeUrl: "https://www.linkedin.com/company/in-culcate/",
    codeLabel: "LinkedIn",
    hostedUrl: "https://inculcate.in",
    hostedLabel: "Live site",
    categoryIds: ["software"],
    tags: ["edtech", "culture", "platform"],
    metrics: ["immersive learning", "modern web stack", "content platform"],
  },
  {
    id: "admiro",
    title: "AdMiro",
    eyebrow: "digital signage control",
    description:
      "A full-stack advertisement management system for centralized screen control, flexible scheduling, real-time content rotation, and device management.",
    image: "/thumbnails/admiro.png",
    codeUrl: "https://github.com/HemanthTenneti/AdMiro",
    hostedUrl: "https://admiro-app.vercel.app",
    hostedLabel: "Live app",
    categoryIds: ["software"],
    tags: ["full-stack", "scheduling", "devices"],
    metrics: ["playlist builder", "screen pairing", "real-time rotation"],
  },
  {
    id: "vyapaar-india",
    title: "Vyapaar India",
    eyebrow: "classifieds backend",
    description:
      "A backend-driven classifieds platform focused on scalable business listings, category discovery, structured data, authentication, and fast retrieval.",
    image: "/thumbnails/vyapaarindia.png",
    hostedUrl: "https://vyapaarindia.in",
    hostedLabel: "Live site",
    categoryIds: ["software"],
    tags: ["backend", "marketplace", "search"],
    metrics: ["listing management", "query performance", "auth flows"],
  },
  {
    id: "file-sorter",
    title: "File Sorter",
    eyebrow: "desktop automation",
    description:
      "An extension-based file organization tool that automates folder cleanup through a minimal interface and predictable sorting rules.",
    image: "/thumbnails/filesorter.png",
    codeUrl: "https://github.com/HemanthTenneti/FileSorter",
    hostedUrl: "https://github.com/HemanthTenneti/FileSorter",
    hostedLabel: "Repo",
    categoryIds: ["automation"],
    tags: ["automation", "productivity", "files"],
    metrics: ["extension mapping", "folder cleanup", "minimal UI"],
  },
  {
    id: "subtract",
    title: "subtract",
    eyebrow: "ai media utility",
    description:
      "An AI-integrated tool that summarizes and transcribes video content from platforms like YouTube, Instagram, and more with a clean, efficient workflow.",
    codeUrl: "https://github.com/HemanthTenneti/subtract-frontend",
    hostedUrl: "https://subtract.10eti.me",
    hostedLabel: "Live app",
    categoryIds: ["software"],
    visualType: "ai",
    tags: ["ai", "transcription", "summaries"],
    metrics: ["video summarization", "transcription workflow", "minimal interface"],
  },
  {
    id: "whtrapp",
    title: "whtrapp",
    eyebrow: "weather interface",
    description:
      "A sleek, minimal weather site that presents precise forecasts and essential weather data without visual clutter.",
    codeUrl: "https://github.com/HemanthTenneti/whtrapp.github.io",
    hostedUrl: "https://whtrapp.github.io/",
    hostedLabel: "Live site",
    categoryIds: ["software"],
    visualType: "weather",
    tags: ["weather", "web app", "minimal ui"],
    metrics: ["forecast display", "clean data layout", "lightweight frontend"],
  },
  {
    id: "adani-dcf",
    title: "Adani Total Gas DCF Valuation",
    eyebrow: "finance analytics",
    description:
      "DCF-based sensitivity analysis evaluating whether Adani Total Gas appeared overvalued or undervalued under WACC and terminal growth assumptions.",
    hostedUrl: "/portfolio.pdf",
    hostedLabel: "Case study",
    categoryIds: ["data-analytics"],
    visualType: "finance",
    tags: ["Excel", "EDA"],
    metrics: ["~2,456.69 Cr intrinsic estimate", "WACC/g sensitivity", "risk signal audit"],
    assets: [
      {
        type: "case study",
        title: "DCF valuation deck",
        href: "/portfolio.pdf",
        caption: "valuation model reference and case study notes",
      },
    ],
  },
  {
    id: "hindalco-nalco",
    title: "Hindalco vs NALCO Ratio Analysis",
    eyebrow: "comparative finance",
    description:
      "Financial and operating efficiency comparison across FY22-FY25 statements to identify the stronger investment candidate.",
    hostedUrl: "/portfolio.pdf",
    hostedLabel: "Case study",
    categoryIds: ["data-analytics"],
    visualType: "ratio",
    tags: ["Excel", "EDA"],
    metrics: ["~81% Hindalco revenue growth", "~25% NALCO growth", "ROE and margin trends"],
    assets: [
      {
        type: "case study",
        title: "ratio analysis deck",
        href: "/portfolio.pdf",
        caption: "comparative finance reference and case study notes",
      },
    ],
  },
  {
    id: "olist-marketplace",
    title: "Olist Marketplace Analytics",
    eyebrow: "capstone dashboard",
    description:
      "Marketplace intelligence project using the Brazilian Olist dataset to surface customer satisfaction, revenue, logistics, and regional freight drivers.",
    codeUrl: "https://github.com/HemanthNST/SectionB_Group10_OlistCommerce",
    hostedUrl:
      "https://public.tableau.com/app/profile/hemanth.tenneti/viz/SectionB_Group10_OlistCommerce/Overview?publish=yes",
    hostedLabel: "Tableau",
    categoryIds: ["data-analytics"],
    visualType: "marketplace",
    tags: ["Tableau", "EDA"],
    metrics: ["~100K orders", "9 relational tables", "SLA and freight recommendations"],
    assets: [
      {
        type: "dashboard",
        title: "Tableau dashboard",
        href:
          "https://public.tableau.com/app/profile/hemanth.tenneti/viz/SectionB_Group10_OlistCommerce/Overview?publish=yes",
        caption: "interactive marketplace dashboard",
      },
      {
        type: "repo",
        title: "analysis repository",
        href: "https://github.com/HemanthNST/SectionB_Group10_OlistCommerce",
      },
    ],
  },
  {
    id: "cafe-analysis",
    title: "Cafe Sales & Operations Analytics",
    eyebrow: "retail operations",
    description:
      "Transactional cafe sales analysis identifying revenue drivers, customer behavior patterns, peak windows, and low-performing menu items.",
    codeUrl: "https://github.com/HemanthTenneti/SectionB_Group1_CafeAnalysis",
    hostedUrl: "/portfolio.pdf",
    hostedLabel: "Case study",
    categoryIds: ["data-analytics"],
    visualType: "operations",
    tags: ["Excel", "EDA"],
    metrics: ["~20-30% peak-hour lift", "~70-80% revenue concentration", "menu rationalization signals"],
    assets: [
      {
        type: "case study",
        title: "cafe analytics deck",
        href: "/portfolio.pdf",
        caption: "operations analysis reference and case study notes",
      },
      {
        type: "repo",
        title: "analysis repository",
        href: "https://github.com/HemanthTenneti/SectionB_Group1_CafeAnalysis",
      },
    ],
  },
];
