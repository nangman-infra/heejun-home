import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const siteDescription =
  "Backend와 Cloud 기술을 중심으로 문제를 해결하고 서비스를 만드는 개발자 전희준의 포트폴리오입니다.";

export const metadata: Metadata = {
  title: {
    default: "전희준 | Backend & Cloud Developer",
    template: "%s | 전희준",
  },
  description: siteDescription,
  icons: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: "전희준 | Backend & Cloud Developer",
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d10",
  colorScheme: "dark",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>
        <a className="skip-link" href="#main-content">
          본문으로 바로가기
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
