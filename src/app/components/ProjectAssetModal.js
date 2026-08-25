"use client";
import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";

export default function ProjectAssetModal({ project, onClose }) {
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
        <Image
          src={asset.src || asset.href}
          alt={asset.alt || asset.title}
          fill
          sizes="(max-width: 640px) 90vw, 420px"
          loading="lazy"
        />
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
