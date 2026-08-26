import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";
import { portfolioData } from "@/data/portfolio";

describe("HomePage", () => {
  it("hero 영역에 역할과 헤드라인을 표시한다", () => {
    render(<HomePage />);

    expect(screen.getByText(portfolioData.profile.role)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: portfolioData.profile.headline }),
    ).toBeInTheDocument();
  });

  it("주요 섹션 제목을 모두 렌더한다", () => {
    render(<HomePage />);

    for (const title of ["Projects", "Experience", "Contact"]) {
      expect(screen.getByRole("heading", { level: 2, name: title })).toBeInTheDocument();
    }
    expect(
      screen.getByRole("heading", { level: 2, name: portfolioData.profile.aboutTitle }),
    ).toBeInTheDocument();
  });

  it("모든 프로젝트 카드를 렌더한다", () => {
    render(<HomePage />);

    for (const project of portfolioData.projects) {
      expect(screen.getByRole("heading", { level: 3, name: project.name })).toBeInTheDocument();
    }
  });

  it("모든 경력 항목을 렌더한다", () => {
    render(<HomePage />);

    for (const { period } of portfolioData.experience) {
      expect(screen.getByText(period)).toBeInTheDocument();
    }
  });

  it("mailto 연락처는 새 창으로 열지 않는다", () => {
    render(<HomePage />);

    const email = portfolioData.contact.find(({ href }) => href.startsWith("mailto:"));
    expect(email).toBeDefined();

    const link = screen.getByRole("link", { name: email!.value });
    expect(link).toHaveAttribute("href", email!.href);
    expect(link).not.toHaveAttribute("target");
  });

  it("외부 연락처는 새 창에서 열린다", () => {
    render(<HomePage />);

    const external = portfolioData.contact.find(({ href }) => href.startsWith("http"));
    expect(external).toBeDefined();

    expect(screen.getByRole("link", { name: external!.value })).toHaveAttribute("target", "_blank");
  });

  it("GitHub 연락처가 있으면 hero에 GitHub 버튼을 노출한다", () => {
    render(<HomePage />);

    const github = portfolioData.contact.find(({ label }) => label === "GitHub");
    expect(screen.getAllByRole("link", { name: "GitHub" })[0]).toHaveAttribute(
      "href",
      github!.href,
    );
  });
});
