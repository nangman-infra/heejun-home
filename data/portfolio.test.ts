import { describe, expect, it } from "vitest";

import { getProjectBySlug, portfolioData } from "@/data/portfolio";

describe("portfolioData", () => {
  it("CloudSaver를 표시하고 제거한 프로젝트는 목록에서 제외한다", () => {
    const slugs = portfolioData.projects.map(({ slug }) => slug);
    const cloudSaver = getProjectBySlug("cloudsaver");

    expect(slugs).toContain("cloudsaver");
    expect(slugs).not.toContain("anti-spoofing");
    expect(slugs).not.toContain("fpga-alarm-clock");
    expect(cloudSaver?.github).toBe("https://github.com/Zenjun/CloudSaver");
    expect(cloudSaver?.details.overview).toBeTruthy();
  });

  it("프로젝트 slug가 중복되지 않는다", () => {
    const slugs = portfolioData.projects.map(({ slug }) => slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("프로젝트 상세에 임시 문구와 가짜 GitHub 주소가 없다", () => {
    for (const project of portfolioData.projects) {
      expect(project.details.overview).toBeTruthy();
      for (const content of Object.values(project.details)) {
        expect(content).not.toContain("입력해 주세요");
      }
      expect("github" in project ? project.github : undefined).not.toBe("https://github.com/username");
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
