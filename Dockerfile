FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm@9

# 1. Dependências
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
RUN pnpm install --frozen-lockfile

# 2. Build da Aplicação
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=src/payload.config.ts

# Variáveis dummy para o build estático
ENV DATABASE_URL=postgres://postgres:postgres@localhost:5432/dummy
ENV PAYLOAD_SECRET=dummy_secret_for_docker_build_only
ENV NEXT_PUBLIC_SITE_URL=https://vitrine.imobifolio.com.br

RUN pnpm build

# 3. Imagem Final de Produção (Super leve)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
