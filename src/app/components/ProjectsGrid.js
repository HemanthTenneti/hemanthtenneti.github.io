import Image from "next/image";

const TILE_SPANS = [
  "sm:col-span-7 sm:row-span-2",
  "sm:col-span-5 sm:row-span-1",
  "sm:col-span-5 sm:row-span-1",
  "sm:col-span-4 sm:row-span-1",
  "sm:col-span-8 sm:row-span-1",
];

const chartBars = {
  finance: [58, 72, 46, 88, 64, 79],
  ratio: [42, 81, 55, 69, 35, 74],
  marketplace: [65, 38, 91, 54, 78, 47],
  operations: [34, 62, 83, 51, 76, 45],
  ai: [38, 76, 58, 84, 44, 69],
  weather: [52, 35, 71, 48, 82, 61],
};

export default function ProjectsGrid({ projects, onSelect }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:auto-rows-[240px] sm:gap-5">
      {projects.map((project, index) => (
        <ProjectTile
          key={project.id}
          project={project}
          onSelect={onSelect}
          className={`project-reveal ${TILE_SPANS[index % TILE_SPANS.length]}`}
        />
      ))}
    </div>
  );
}

function ProjectTile({ project, onSelect, className }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(project)}
      onKeyDown={event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(project);
        }
      }}
      aria-label={`Open ${project.title} project details`}
      className={`project-tile group relative min-h-[240px] cursor-pointer overflow-hidden rounded-[1.75rem] border border-[#F5EAD5]/12 bg-[#171818] ${className}`}>
      {project.image ?
        <Image
          src={project.image}
          alt={`${project.title} project preview`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
          className="object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
          loading="lazy"
        />
      : <GeneratedVisual type={project.visualType} title={project.title} />}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c0d0d] via-[#0c0d0d]/10 to-transparent opacity-90" />

      <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-6">
        {project.eyebrow && (
          <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-wide text-[#F0DFC0]/70">
            {project.eyebrow}
          </p>
        )}
        <h3 className="text-lg font-bold text-[#F5EAD5] sm:text-xl">
          {project.title}
        </h3>
        <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-[#F5EAD5]/75 opacity-0 transition-all duration-500 group-hover:mt-2 group-hover:max-h-24 group-hover:opacity-100 lowercase">
          {project.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags?.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="rounded-full border border-[#F5EAD5]/20 px-2.5 py-1 text-[0.65rem] font-bold uppercase text-[#F5EAD5]/70">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function GeneratedVisual({ type = "finance", title }) {
  const bars = chartBars[type] || chartBars.finance;

  return (
    <div className={`analytics-visual analytics-visual-${type} absolute inset-0`}>
      <div className="analytics-grid"></div>
      <div className="relative z-10 flex h-full flex-col justify-between p-5">
        <div className="rounded-full border border-[#F5EAD5]/20 px-3 py-1 text-xs font-bold uppercase text-[#F0DFC0] self-start">
          {title}
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
