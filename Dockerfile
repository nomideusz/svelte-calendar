# The demo and docs at svelte-calendar.xyz (Dokploy on Contabo). Built from the
# standalone repo github.com/nomideusz/svelte-calendar, which sync-package.sh
# fills from asini, so the context is that repo's root.
FROM node:22-slim AS build
ENV CI=true
RUN corepack enable
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile && pnpm build

FROM node:22-slim
ENV CI=true NODE_ENV=production PORT=3000 ORIGIN=https://svelte-calendar.xyz
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# --ignore-scripts: `prepare` runs svelte-package, a dev dependency.
RUN pnpm install --prod --frozen-lockfile --ignore-scripts
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["node", "build"]
