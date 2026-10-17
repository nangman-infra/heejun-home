import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { BlogPostList } from "@/components/blog-post-list";

const rss = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0"><channel>
  <item>
    <title><![CDATA[이전 글]]></title>
    <link>https://velog.io/@heejun0911/older</link>
    <pubDate>Mon, 01 Jun 2026 12:00:00 GMT</pubDate>
    <description><![CDATA[<p>이전 글 내용</p>]]></description>
  </item>
  <item>
    <title><![CDATA[최신 글]]></title>
    <link>https://velog.io/@heejun0911/newer</link>
    <pubDate>Tue, 22 Sep 2026 12:00:00 GMT</pubDate>
    <description><![CDATA[<p>새 글 <strong>요약</strong></p><img src="https://velog.velcdn.com/images/heejun0911/post/cover.png" alt="본문 그림">]]></description>
  </item>
  <item>
    <title>다른 주소</title>
    <link>https://example.com/untrusted</link>
  </item>
</channel></rss>`;

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("BlogPostList", () => {
  it("RSS 글을 최신순으로 표시하고 Velog 원문으로 연결한다", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, text: async () => rss });
    vi.stubGlobal("fetch", fetchMock);

    render(<BlogPostList />);

    const links = await screen.findAllByRole("link", { name: /글$/ });
    expect(links.map((link) => link.textContent)).toEqual(["최신 글", "이전 글"]);
    expect(links[0]).toHaveAttribute("href", "https://velog.io/@heejun0911/newer");
    expect(screen.getByText("새 글 요약")).toBeInTheDocument();
    const thumbnailLink = screen.getByRole("link", { name: "최신 글 이미지로 원문 열기" });
    expect(thumbnailLink.querySelector("img")).toHaveAttribute(
      "src",
      "https://velog.velcdn.com/images/heejun0911/post/cover.png",
    );
    expect(thumbnailLink).toHaveAttribute(
      "href",
      "https://velog.io/@heejun0911/newer",
    );
    expect(screen.queryByText("다른 주소")).not.toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith("/velog/rss", expect.objectContaining({ cache: "no-store" }));
  });

  it("피드를 가져오지 못하면 Velog로 이동할 수 있게 한다", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));

    render(<BlogPostList />);

    await waitFor(() => expect(screen.getByText(/글을 불러오지 못했습니다/)).toBeInTheDocument());
    expect(screen.getByRole("link", { name: "Velog에서 보기" })).toHaveAttribute(
      "href",
      "https://velog.io/@heejun0911/posts",
    );
  });

  it("홈에 표시할 글 수를 제한한다", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, text: async () => rss }));

    render(<BlogPostList limit={1} />);

    expect(await screen.findByRole("link", { name: "최신 글" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "이전 글" })).not.toBeInTheDocument();
  });

  it("외부 이미지 주소는 썸네일로 사용하지 않는다", async () => {
    const untrustedRss = rss.replace(
      "https://velog.velcdn.com/images/heejun0911/post/cover.png",
      "https://example.com/cover.png",
    );
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, text: async () => untrustedRss }));

    render(<BlogPostList />);

    expect(await screen.findByRole("link", { name: "최신 글" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /이미지로 원문 열기/ })).not.toBeInTheDocument();
  });
});
