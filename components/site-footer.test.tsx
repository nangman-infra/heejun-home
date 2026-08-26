import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteFooter } from "@/components/site-footer";

describe("SiteFooter", () => {
  it("현재 연도와 이름을 표시한다", () => {
    render(<SiteFooter />);

    expect(screen.getByText(`© ${new Date().getFullYear()} 전희준`)).toBeInTheDocument();
  });

  it("맨 위로 이동하는 링크를 제공한다", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("link", { name: /Back to top/ })).toHaveAttribute("href", "/#top");
  });
});
