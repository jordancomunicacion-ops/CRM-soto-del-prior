FROM node:20-alpine

WORKDIR /app

# Install dependencies sans lockfile
COPY package.json ./
RUN npm install

# Copy source
COPY . .

# Generate Client
RUN npx prisma generate --schema=./prisma/schema.prisma

# Set ENV for Build
ENV NEXT_PUBLIC_API_URL=https://crm.jordazola.com/api
ENV AUTH_SECRET=secret_crm_build_dummy
ENV DATABASE_URL="file:/app/prisma/dev.db"

# Build
RUN npm run build

EXPOSE 3000

ENV PORT=3000

# Start Production
CMD ["npx", "next", "start", "-H", "0.0.0.0", "-p", "3000"]
