FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json* .npmrc* ./
RUN npm ci || npm i

FROM deps AS build
COPY tsconfig*.json ./
COPY src ./src
RUN npm run build

FROM base AS prod
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./package.json
COPY --from=build /app/dist ./dist
EXPOSE 3001
CMD ["node", "dist/main.js"]
