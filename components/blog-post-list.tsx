"use client";

import { useEffect, useState } from "react";

const BLOG_URL = "https://velog.io/@heejun0911/posts";

type BlogPost = {
  title: string;
  url: string;
  publishedAt: string;
  excerpt: string;
};

type FeedState =
  | { status: "loading" }
  | { status: "ready"; posts: BlogPost[] }
  | { status: "error" };

function readFeed(xml: string): BlogPost[] {
  const document = new DOMParser().parseFromString(xml, "application/xml");

  if (document.querySelector("parsererror")) {
    throw new Error("Invalid Velog RSS feed");
  }

  return Array.from(document.querySelectorAll("channel > item"))
    .map((item) => {
      const title = item.querySelector("title")?.textContent?.trim() ?? "";
      const rawUrl = item.querySelector("link")?.textContent?.trim() ?? "";
      const publishedAt = item.querySelector("pubDate")?.textContent?.trim() ?? "";
      const html = item.querySelector("description")?.textContent ?? "";
      const excerpt = new DOMParser()
        .parseFromString(html, "text/html")
        .body.textContent?.replace(/\s+/g, " ")
        .trim()
        .slice(0, 180) ?? "";

      let url: URL;
      try {
        url = new URL(rawUrl);
      } catch {
        return null;
      }

      if (!title || url.origin !== "https://velog.io" || !url.pathname.startsWith("/@heejun0911/")) {
        return null;
      }

      return { title, url: url.href, publishedAt, excerpt };
    })
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function BlogPostList({ limit }: { limit?: number } = {}) {
  const [feed, setFeed] = useState<FeedState>({ status: "loading" });
  const PostHeading = limit === undefined ? "h2" : "h3";

  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      try {
        const response = await fetch("/velog/rss", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Velog RSS request failed: ${response.status}`);
        }

        const posts = readFeed(await response.text());
        if (!controller.signal.aborted) {
          setFeed({ status: "ready", posts });
        }
      } catch {
        if (!controller.signal.aborted) {
          setFeed({ status: "error" });
        }
      }
    }

    void loadPosts();
    return () => controller.abort();
  }, []);

  return (
    <section aria-label="Velog 글 목록" aria-live="polite">
      {feed.status === "loading" && <p className="blog-message">최신 글을 불러오는 중입니다.</p>}
      {feed.status === "error" && (
        <p className="blog-message">
          글을 불러오지 못했습니다. <a href={BLOG_URL} target="_blank" rel="noreferrer">Velog에서 보기</a>
        </p>
      )}
      {feed.status === "ready" && feed.posts.length === 0 && (
        <p className="blog-message">표시할 글이 없습니다. <a href={BLOG_URL} target="_blank" rel="noreferrer">Velog에서 보기</a></p>
      )}
      {feed.status === "ready" && feed.posts.length > 0 && (
        <>
          <div className="blog-list">
            {feed.posts.slice(0, limit).map((post) => (
              <article className="blog-post" key={post.url}>
                <time dateTime={post.publishedAt}>
                  {Number.isNaN(Date.parse(post.publishedAt))
                    ? "Velog"
                    : new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric" }).format(new Date(post.publishedAt))}
                </time>
                <PostHeading><a href={post.url} target="_blank" rel="noreferrer">{post.title}</a></PostHeading>
                {post.excerpt && <p>{post.excerpt}{post.excerpt.length === 180 ? "…" : ""}</p>}
              </article>
            ))}
          </div>
          <a className="blog-more" href={BLOG_URL} target="_blank" rel="noreferrer">Velog에서 모든 글 보기 ↗</a>
        </>
      )}
    </section>
  );
}
