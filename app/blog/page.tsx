import type { Metadata } from "next";

import { BlogPostList } from "@/components/blog-post-list";

export const metadata: Metadata = {
  title: "Blog",
  description: "전희준의 Velog 최신 글을 확인할 수 있습니다.",
};

export default function BlogPage() {
  return (
    <main id="main-content" className="container blog-main">
      <header className="blog-header">
        <p className="section-label">Writing</p>
        <h1>Blog</h1>
        <p>공부하고 직접 실습한 내용을 기록합니다.</p>
      </header>
      <BlogPostList />
    </main>
  );
}
