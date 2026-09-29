FROM node:24.5.0 AS base

RUN apt-get update && apt-get install -y libc6-dev && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install 

FROM base AS build

COPY . .

RUN yarn prisma generate

RUN yarn build

FROM base AS production

WORKDIR /app

COPY --from=build /app/package.json /app/yarn.lock ./

RUN yarn install --production 

COPY --from=build /app/dist ./dist
COPY --from=build /app/generated/prisma ./generated/prisma


# Запускаем push, потом приложение
CMD ["sh", "-c", "npx prisma db push --skip-generate && node dist/src/main"]

CMD ["node", "dist/src/main"]
