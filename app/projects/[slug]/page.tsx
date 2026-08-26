import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProjectBySlug, portfolioData, type ProjectDetailKey } from "@/data/portfolio";

const detailSections: ReadonlyArray<{ key: ProjectDetailKey; title: string }> = [
  { key: "overview", title: "Overview" },
  { key: "problem", title: "Problem" },
  { key: "role", title: "My Role" },
  { key: "implementation", title: "Implementation" },
  { key: "problemSolving", title: "Problem Solving" },
  { key: "result", title: "Result" },
  { key: "learned", title: "What I Learned" },
];

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return portfolioData.projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      type: "article",
      locale: "ko_KR",
      title: project.name,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <main id="main-content" className="container detail-main">
      <Link className="detail-back text-link" href="/#projects">
        ← 프로젝트 목록
      </Link>
      <article>
        <header className="detail-header">
          <p className="eyebrow">Project detail</p>
          <h1>{project.name}</h1>
          <p className="detail-summary">{project.description}</p>
          <div className="tag-list" aria-label="사용 기술">
            {project.technologies.map((technology) => (
              <span className="tag" key={technology}>
                {technology}
              </span>
            ))}
          </div>
          <div className="detail-links">
            <a className="button button-secondary" href={project.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </header>
        <div className="detail-content">
          {detailSections.map(({ key, title }) => {
            const content = project.details[key];
            const isPlaceholder = content.includes("입력해 주세요");

            return (
              <section className="detail-section" key={key}>
                <h2>{title}</h2>
                <p className={isPlaceholder ? "detail-placeholder" : undefined}>{content}</p>
              </section>
            );
          })}
        </div>
      </article>
    </main>
  );
}
