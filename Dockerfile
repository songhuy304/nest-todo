# Stage 1: Build NestJS app
FROM node:24.9.0-alpine AS builder

WORKDIR /app

# Copy và cài dependency
COPY package*.json ./
RUN npm install

# Copy toàn bộ source
COPY . .

# Build TypeScript → JavaScript
RUN npm run build


# Stage 2: Run app
FROM node:24.9.0-alpine

WORKDIR /app

# Chỉ copy file cần thiết cho runtime
COPY package*.json ./
RUN npm install --omit=dev

# Copy code đã build từ stage builder
COPY --from=builder /app/dist ./dist

# Mở cổng NestJS (mặc định 3000)
EXPOSE 3000

# Lệnh khởi động
CMD ["node", "dist/main.js"]
