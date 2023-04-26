FROM cinema-services-base

RUN mkdir -p /app
WORKDIR /app

COPY package* ./
RUN npm ci

COPY . .

EXPOSE 8080

RUN npx prisma generate

CMD ["npm", "run", "prod-start"]

