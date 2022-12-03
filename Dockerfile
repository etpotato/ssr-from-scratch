FROM node:18.12.1-alpine as builder

WORKDIR /app-build

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


FROM node:18.12.1-alpine

WORKDIR /app

COPY package.json ./

COPY --from=builder /app-build/dist ./dist

CMD ["npm", "run", "serve"]
