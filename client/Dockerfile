FROM node:22-alpine3.20 AS builder

WORKDIR /app

COPY package.json package-lock.json . ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine3.20 AS server

COPY --from=builder /app/dist /app

EXPOSE 8080

CMD ["npx", "http-server", "/app"]