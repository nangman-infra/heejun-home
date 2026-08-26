import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main id="main-content" className="container not-found">
      <p className="eyebrow">404</p>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p>주소를 확인하거나 프로젝트 목록으로 돌아가 주세요.</p>
      <Link className="button button-secondary" href="/#projects">
        프로젝트 목록
      </Link>
    </main>
  );
}
