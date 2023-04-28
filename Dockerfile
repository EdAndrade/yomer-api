FROM node:18-alpine As build

WORKDIR /app

COPY ["yarn.lock", "package.json", "./"]

RUN npm ci --only=production && npm cache clean --force

COPY . .

RUN npm run build

ENV NODE_ENV production

FROM node:18-alpine As production

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/dist ./dist

CMD ["node", "dist/main.js"]