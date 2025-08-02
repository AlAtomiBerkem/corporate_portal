FROM node:20-alpine

WORKDIR /usr/src/app

# Устанавливаем только необходимые зависимости для сборки
RUN apk add --no-cache python3 make g++

# Копируем только package.json и package-lock.json сначала
COPY package*.json ./

# Устанавливаем зависимости с оптимизациями
RUN npm ci --only=production --no-audit --no-fund &&     npm cache clean --force

# Копируем остальные файлы
COPY . .

# Создаем необходимые директории
RUN mkdir -p documents images

EXPOSE 5000

# Используем node напрямую вместо npm run dev для production
CMD ['node', 'index.js']
