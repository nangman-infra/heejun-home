import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import NotFoundPage from "@/app/not-found";

describe("NotFoundPage", () => {
  it("404 안내 문구를 표시한다", () => {
    render(<NotFoundPage />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "페이지를 찾을 수 없습니다." }),
    ).toBeInTheDocument();
  });

  it("프로젝트 목록으로 돌아가는 링크를 제공한다", () => {
    render(<NotFoundPage />);

    expect(screen.getByRole("link", { name: "프로젝트 목록" })).toHaveAttribute(
      "href",
      "/#projects",
    );
  });
});
