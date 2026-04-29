import Link from "next/link";

const chartBars = {
  finance: [58, 72, 46, 88, 64, 79],
  ratio: [42, 81, 55, 69, 35, 74],
  marketplace: [65, 38, 91, 54, 78, 47],
  operations: [34, 62, 83, 51, 76, 45],
  ai: [38, 76, 58, 84, 44, 69],
  weather: [52, 35, 71, 48, 82, 61],
};

const visualLabels = {
  finance: "finance model",
  ratio: "ratio model",
  marketplace: "marketplace dashboard",
  operations: "operations dashboard",
  ai: "ai workflow",
  weather: "weather interface",
};

function GeneratedVisual({ type = "finance", title }) {
  const bars = chartBars[type] || chartBars.finance;

  return (
    <div className={`analytics-visual analytics-visual-${type}`}>
      <div className="analytics-grid"></div>
      <div className="relative z-10 flex h-full flex-col justify-between p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase text-[#F5EAD5]/55">
              {visualLabels[type] || "project system"}
            </p>
            <h3 className="mt-1 max-w-[15rem] text-xl font-bold leading-tight text-[#F5EAD5]">
              {title}
            </h3>
          </div>
          <div className="rounded-full border border-[#F5EAD5]/20 px-3 py-1 text-xs font-bold uppercase text-[#F0DFC0]">
            active build
          </div>
        </div>

        <div className="grid grid-cols-[1fr_0.8fr] items-end gap-5">
          <div className="analytics-bars" aria-hidden="true">
            {bars.map((height, index) => (
              <span
                key={index}
                style={{
                  "--bar-height": `${height}%`,
                  "--bar-delay": `${index * 90}ms`,
                }}
              />
            ))}
          </div>
          <svg
            className="analytics-line"
            viewBox="0 0 180 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true">
            <path
              d="M8 92 C 35 36, 52 74, 74 52 S 119 16, 138 46 S 159 85, 172 28"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M8 92 C 35 36, 52 74, 74 52 S 119 16, 138 46 S 159 85, 172 28"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function SliderItem({ project }) {
  const {
    title,
    eyebrow,
    description,
    image,
    visualType,
    codeUrl,
    hostedUrl,
    codeLabel = "Code",
    hostedLabel = "Hosted URL",
    metrics = [],
  } = project;

  const links = [
    codeUrl && codeUrl !== "#" ?
      { href: codeUrl, label: codeLabel, tone: "light" }
    : null,
    hostedUrl && hostedUrl !== "#" ?
      { href: hostedUrl, label: hostedLabel, tone: "warm" }
    : null,
  ].filter(Boolean);

  return (
    <article className="slider-item overflow-hidden rounded-[2rem] border border-[#414141] bg-[#171818] text-[#F5EAD5]">
      <div className="grid gap-0 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="project-media relative aspect-video overflow-hidden bg-[#080909] lg:aspect-auto lg:min-h-[430px]">
          {image ?
            <img
              src={image}
              alt={`${title} project preview`}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          : <GeneratedVisual type={visualType} title={title} />}
          <div className="project-scanline" aria-hidden="true"></div>
        </div>

        <div className="flex min-h-[430px] flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
          <div>
            {eyebrow && (
              <p className="mb-3 text-xs font-bold uppercase text-[#F0DFC0]/60">
                {eyebrow}
              </p>
            )}
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
              {title}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-[#F5EAD5]/75 sm:text-base lowercase">
              {description}
            </p>
          </div>

          {metrics.length > 0 && (
            <div className="grid gap-2">
              {metrics.map(metric => (
                <div
                  key={metric}
                  className="metric-row flex items-center gap-3 rounded-xl border border-[#F5EAD5]/10 bg-[#F5EAD5]/5 px-3 py-2 text-sm text-[#F5EAD5]/80">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#74E3C4]"></span>
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          )}

          {links.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {links.map(({ href, label, tone }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={event => event.stopPropagation()}
                  className={`rounded-full px-4 py-2 text-sm font-bold text-black transition-all hover:-translate-y-0.5 ${
                    tone === "light" ?
                      "bg-white hover:bg-gray-200"
                    : "bg-[#F0DFC0] hover:bg-[#e5d4b5]"
                  }`}>
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
