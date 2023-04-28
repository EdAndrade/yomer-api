FROM node:18-alpine As build

WORKDIR /app

COPY ["yarn.lock", "package.json", "./"]

RUN yarn install --only=production && yarn cache clean --force

COPY . .

RUN yarn build

ENV NODE_ENV production

FROM node:18-alpine As production

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/dist ./dist

CMD ["node", "dist/main.js"]