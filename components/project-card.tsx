import Link from "next/link";

import type { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="project-card">
      <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
      <h3>{project.name}</h3>
      <p className="project-description">{project.description}</p>
      <div className="tag-list" aria-label="사용 기술">
        {project.technologies.map((technology) => (
          <span className="tag" key={technology}>
            {technology}
          </span>
        ))}
      </div>
      <p className="project-focus">{project.focus}</p>
      <div className="project-links">
        <a
          className="text-link"
          href={project.github}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.name} GitHub 새 창에서 열기`}
        >
          GitHub
        </a>
        <Link
          className="text-link"
          href={`/projects/${project.slug}`}
          aria-label={`${project.name} 상세 보기`}
        >
          Details →
        </Link>
      </div>
    </article>
  );
}
