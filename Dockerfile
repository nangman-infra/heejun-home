# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
# package.json의 packageManager와 동일한 pnpm 버전을 고정한다.
RUN corepack enable && corepack prepare pnpm@11.24.0 --activate

FROM base AS deps
WORKDIR /app
# pnpm-workspace.yaml에 allowBuilds 설정이 있어 함께 복사해야 한다.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# next.config.ts의 output: "export" 설정에 따라 out/ 에 정적 파일이 생성된다.
RUN pnpm build

FROM nginx:alpine AS runner
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
