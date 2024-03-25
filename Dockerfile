FROM node:20-alpine as build 

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

COPY prisma ./prisma/

COPY . .

RUN npm install

RUN npm run build
# RUN npx prisma generate && npm run build

FROM node:20-alpine as production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package.json /usr/src/app/package-lock.json ./

COPY --from=build /usr/src/app /usr/src/app

CMD npx prisma migrate dev && npm run start:dev