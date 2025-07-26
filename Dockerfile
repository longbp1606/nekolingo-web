FROM node:22 AS builder
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build

FROM nginx:1.25.2-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
EXPOSE 5173

# FROM node:22 AS runner
# WORKDIR /app
# COPY --from=builder /app/dist /app
# RUN npm install -g http-server
# EXPOSE 8080
# CMD ["http-server", "-p", "8080"]