import { describe, expect, it } from "vitest";

import { getProjectBySlug, portfolioData } from "@/data/portfolio";

describe("portfolioData", () => {
  it("프로젝트 slug가 중복되지 않는다", () => {
    const slugs = portfolioData.projects.map(({ slug }) => slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("모든 프로젝트가 7개 상세 항목을 채우고 있다", () => {
    const detailKeys = [
      "overview",
      "problem",
      "role",
      "implementation",
      "problemSolving",
      "result",
      "learned",
    ];

    for (const project of portfolioData.projects) {
      expect(Object.keys(project.details).sort()).toEqual([...detailKeys].sort());
    }
  });

  it("모든 연락처 항목이 href를 가진다", () => {
    for (const item of portfolioData.contact) {
      expect(item.href).toBeTruthy();
    }
  });
});

describe("getProjectBySlug", () => {
  it("존재하는 slug로 프로젝트를 찾는다", () => {
    const slug = portfolioData.projects[0].slug;

    expect(getProjectBySlug(slug)?.slug).toBe(slug);
  });

  it("존재하지 않는 slug는 undefined를 반환한다", () => {
    expect(getProjectBySlug("does-not-exist")).toBeUndefined();
  });
});
