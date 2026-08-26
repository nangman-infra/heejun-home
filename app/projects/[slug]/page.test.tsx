import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { portfolioData } from "@/data/portfolio";

// 서버 컴포넌트가 호출하는 notFound()는 실제로 렌더를 중단시키므로 감시용으로 대체한다.
const notFound = vi.fn(() => {
  throw new Error("NEXT_NOT_FOUND");
});

vi.mock("next/navigation", () => ({
  notFound: () => notFound(),
}));

const { default: ProjectPage, generateMetadata, generateStaticParams } = await import(
  "@/app/projects/[slug]/page"
);

const firstProject = portfolioData.projects[0];

describe("generateStaticParams", () => {
  it("모든 프로젝트 slug를 정적 경로로 반환한다", () => {
    expect(generateStaticParams()).toEqual(
      portfolioData.projects.map(({ slug }) => ({ slug })),
    );
  });
});

describe("generateMetadata", () => {
  it("존재하는 프로젝트의 제목과 설명을 반환한다", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: firstProject.slug }),
    });

    expect(metadata.title).toBe(firstProject.name);
    expect(metadata.description).toBe(firstProject.description);
    expect(metadata.openGraph?.title).toBe(firstProject.name);
  });

  it("존재하지 않는 프로젝트는 빈 메타데이터를 반환한다", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "does-not-exist" }),
    });

    expect(metadata).toEqual({});
  });
});

describe("ProjectPage", () => {
  it("프로젝트 제목과 기술 태그를 렌더한다", async () => {
    render(await ProjectPage({ params: Promise.resolve({ slug: firstProject.slug }) }));

    expect(
      screen.getByRole("heading", { level: 1, name: firstProject.name }),
    ).toBeInTheDocument();
    for (const technology of firstProject.technologies) {
      expect(screen.getByText(technology)).toBeInTheDocument();
    }
  });

  it("7개 상세 섹션을 모두 렌더한다", async () => {
    render(await ProjectPage({ params: Promise.resolve({ slug: firstProject.slug }) }));

    for (const title of [
      "Overview",
      "Problem",
      "My Role",
      "Implementation",
      "Problem Solving",
      "Result",
      "What I Learned",
    ]) {
      expect(screen.getByRole("heading", { level: 2, name: title })).toBeInTheDocument();
    }
  });

  it("플레이스홀더 문구에 placeholder 클래스를 부여한다", async () => {
    render(await ProjectPage({ params: Promise.resolve({ slug: firstProject.slug }) }));

    expect(screen.getByText(firstProject.details.overview)).not.toHaveClass(
      "detail-placeholder",
    );
    expect(screen.getByText(firstProject.details.role)).toHaveClass("detail-placeholder");
  });

  it("존재하지 않는 slug는 notFound를 호출한다", async () => {
    await expect(
      ProjectPage({ params: Promise.resolve({ slug: "does-not-exist" }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalled();
  });
});
