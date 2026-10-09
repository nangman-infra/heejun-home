import Link from "next/link";

import { BlogPostList } from "@/components/blog-post-list";
import { ProjectCard } from "@/components/project-card";
import { portfolioData } from "@/data/portfolio";

export default function HomePage() {
  const { profile, projects, experience, contact } = portfolioData;
  const github = contact.find(({ label }) => label === "GitHub");

  return (
    <main id="main-content">
      <section id="top" className="hero container" aria-labelledby="hero-title">
        <p className="eyebrow">{profile.role}</p>
        <h1 id="hero-title">{profile.headline}</h1>
        <div className="hero-introduction">
          {profile.introduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            View Projects
          </a>
          {github && (
            <a className="button button-secondary" href={github.href} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
          <Link className="button button-secondary" href="/blog">Blog</Link>
        </div>
      </section>

      <div className="container content-sections">
        <section id="about" className="section" aria-labelledby="about-title">
          <div className="section-heading">
            <p className="section-label">About</p>
            <h2 id="about-title">{profile.aboutTitle}</h2>
          </div>
          <div className="about-content">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section id="projects" className="section" aria-labelledby="projects-title">
          <div className="section-heading">
            <p className="section-label">Selected work</p>
            <h2 id="projects-title">Projects</h2>
            <p>프로젝트에서 맡은 역할과 해결한 문제를 중심으로 정리했습니다.</p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </section>

        <section id="blog" className="section" aria-labelledby="blog-title">
          <div className="section-heading">
            <p className="section-label">Writing</p>
            <h2 id="blog-title">Blog</h2>
            <p>공부하고 직접 실습한 내용을 기록합니다.</p>
          </div>
          <BlogPostList limit={5} />
          <Link className="blog-more" href="/blog">블로그 글 모두 보기 →</Link>
        </section>

        <section id="experience" className="section" aria-labelledby="experience-title">
          <div className="section-heading">
            <p className="section-label">Background</p>
            <h2 id="experience-title">Experience</h2>
          </div>
          <div className="experience-list">
            {experience.map(({ period, title, description }) => (
              <article className="experience-row" key={`${period}-${title}`}>
                <span className="experience-period">{period}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact-section" aria-labelledby="contact-title">
          <div className="section-heading">
            <p className="section-label">Get in touch</p>
            <h2 id="contact-title">Contact</h2>
            <p>함께할 기회나 프로젝트에 관한 이야기를 기다립니다.</p>
          </div>
          <dl className="contact-list">
            {contact.map(({ label, value, href }) => (
              <div className="contact-item" key={label}>
                <dt>{label}</dt>
                <dd>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                  >
                    {value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </main>
  );
}
