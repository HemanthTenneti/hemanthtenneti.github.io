export const domainExperienceMap = {
  "data.10eti.dev": "data",
  "web.10eti.dev": "web",
  "auto.10eti.dev": "automation",
  "automation.10eti.dev": "automation",
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
    id: "customer-churn-prediction",
    title: "Customer Churn Prediction",
    eyebrow: "telecom retention system",
    description:
      "A GenAI-powered customer retention workflow that combines churn prediction, risk explanation, and personalized intervention guidance.",
    image: "/data-thumbnails/customer-churn-space.png",
    codeUrl: "https://github.com/HemanthTenneti/CustomerChurnPredictor",
    codeLabel: "GitHub",
    hostedUrl: "https://huggingface.co/spaces/hemanth10etii/customer-churn-prediction",
    hostedLabel: "Hugging Face",
    categoryIds: ["software"],
    visualType: "ai",
    tags: ["gradio", "ml", "rag"],
    metrics: ["LogReg model", "LangGraph agent", "ChromaDB / Groq"],
    assets: [
      {
        type: "image",
        title: "Hugging Face space",
        href: "/data-thumbnails/customer-churn-space.png",
        caption: "interactive retention dashboard",
      },
      {
        type: "repo",
        title: "prediction repository",
        href: "https://github.com/HemanthTenneti/CustomerChurnPredictor",
        caption: "model, agent, and app source",
      },
      {
        type: "space",
        title: "live demo",
        href: "https://huggingface.co/spaces/hemanth10etii/customer-churn-prediction",
        caption: "deployed Gradio interface",
      },
    ],
  },
];
