import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <span>© {new Date().getFullYear()} 전희준</span>
        <Link href="/#top">Back to top ↑</Link>
      </div>
    </footer>
  );
}
