import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**", "out/**", "coverage/**"],
    coverage: {
      provider: "v8",
      // SonarQube가 읽는 lcov 리포트를 항상 생성한다.
      reporter: ["text", "lcov"],
      reportsDirectory: "./coverage",
      include: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "data/**/*.ts"],
      exclude: ["**/*.test.{ts,tsx}", "app/layout.tsx", "**/*.d.ts"],
    },
  },
  resolve: {
    alias: {
      // tsconfig의 "@/*" 경로 별칭과 동일하게 맞춘다.
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
});
