import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/data/portfolio";

const project: Project = {
  slug: "sample-project",
  name: "샘플 프로젝트",
  description: "샘플 설명",
  technologies: ["TypeScript", "Next.js"],
  focus: "샘플 포커스",
  github: "https://github.com/example/sample",
  details: {
    overview: "overview",
    problem: "problem",
    role: "role",
    implementation: "implementation",
    problemSolving: "problemSolving",
    result: "result",
    learned: "learned",
  },
};

describe("ProjectCard", () => {
  it("프로젝트 이름과 설명을 렌더한다", () => {
    render(<ProjectCard project={project} index={0} />);

    expect(screen.getByRole("heading", { name: "샘플 프로젝트" })).toBeInTheDocument();
    expect(screen.getByText("샘플 설명")).toBeInTheDocument();
    expect(screen.getByText("샘플 포커스")).toBeInTheDocument();
  });

  it("index를 2자리 번호로 표시한다", () => {
    render(<ProjectCard project={project} index={0} />);

    expect(screen.getByText("01")).toBeInTheDocument();
  });

  it("모든 기술 태그를 렌더한다", () => {
    render(<ProjectCard project={project} index={4} />);

    expect(screen.getByText("05")).toBeInTheDocument();
    for (const technology of project.technologies) {
      expect(screen.getByText(technology)).toBeInTheDocument();
    }
  });

  it("GitHub 링크는 새 창으로, 상세 링크는 slug 경로로 연결된다", () => {
    render(<ProjectCard project={project} index={0} />);

    const github = screen.getByRole("link", { name: /GitHub 새 창에서 열기/ });
    expect(github).toHaveAttribute("href", project.github);
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noreferrer");

    expect(screen.getByRole("link", { name: /상세 보기/ })).toHaveAttribute(
      "href",
      `/projects/${project.slug}`,
    );
  });
});
