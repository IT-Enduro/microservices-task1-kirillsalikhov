FROM cinema-services-base:latest

RUN mkdir -p /app
WORKDIR /app

COPY package* ./
RUN npm ci

COPY . .

EXPOSE 8070

RUN npx prisma generate

CMD ["npm", "run", "prod-start"]

