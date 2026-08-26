import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SiteHeader } from "@/components/site-header";
import { portfolioData } from "@/data/portfolio";

describe("SiteHeader", () => {
  it("모든 내비게이션 링크를 렌더한다", () => {
    render(<SiteHeader />);

    for (const { label, href } of portfolioData.navigation) {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute("href", `/${href}`);
    }
  });

  it("메뉴 버튼이 열림 상태를 토글한다", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const button = screen.getByRole("button", { name: "Menu" });
    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("내비게이션 링크를 클릭하면 메뉴가 닫힌다", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const button = screen.getByRole("button", { name: "Menu" });
    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("link", { name: portfolioData.navigation[0].label }));
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
