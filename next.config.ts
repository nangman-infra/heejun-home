import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 정적 사이트로 export 해 nginx가 그대로 서빙한다.
  output: "export",
  // 정적 export에서는 Next 이미지 최적화 서버를 쓸 수 없다.
  images: {
    unoptimized: true,
  },
  devIndicators: false,
};

export default nextConfig;
