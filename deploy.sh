#!/bin/bash

# Скрипт для деплоя на сервер
echo "🚀 Начинаем деплой на сервер..."

# Переменные
SERVER_IP="91.197.97.133"
PROJECT_DIR="/root/corporate_portal"

# 1. Сохраняем образы в tar файлы
echo "📦 Сохраняем Docker образы..."
docker save corporate-portal-server:latest -o corporate-portal-server.tar
docker save corporate-portal-client:latest -o corporate-portal-client.tar

# 2. Копируем образы на сервер
echo "📤 Копируем образы на сервер..."
scp corporate-portal-server.tar corporate-portal-client.tar docker-compose.prod.yml root@$SERVER_IP:$PROJECT_DIR/

# 3. Загружаем образы на сервере
echo "📥 Загружаем образы на сервере..."
ssh root@$SERVER_IP "cd $PROJECT_DIR && docker load -i corporate-portal-server.tar && docker load -i corporate-portal-client.tar"

# 4. Останавливаем старые контейнеры
echo "🛑 Останавливаем старые контейнеры..."
ssh root@$SERVER_IP "cd $PROJECT_DIR && docker-compose -f docker-compose.prod.yml down"

# 5. Запускаем новые контейнеры
echo "▶️ Запускаем новые контейнеры..."
ssh root@$SERVER_IP "cd $PROJECT_DIR && docker-compose -f docker-compose.prod.yml up -d"

# 6. Проверяем статус
echo "✅ Проверяем статус..."
ssh root@$SERVER_IP "cd $PROJECT_DIR && docker-compose -f docker-compose.prod.yml ps"

# 7. Очищаем временные файлы
echo "🧹 Очищаем временные файлы..."
rm corporate-portal-server.tar corporate-portal-client.tar

echo "🎉 Деплой завершен!"
echo "🌐 Сайт доступен по адресу: http://ir-kazan.ru" 