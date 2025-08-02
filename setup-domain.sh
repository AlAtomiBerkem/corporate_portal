#!/bin/bash

# Скрипт для настройки домена на сервере
echo "🌐 Настраиваем домен ir-kazan.ru..."

# Переменные
SERVER_IP="91.197.97.133"
DOMAIN="ir-kazan.ru"
PROJECT_DIR="/root/corporate_portal"

# 1. Подключаемся к серверу и устанавливаем необходимые пакеты
echo "📦 Устанавливаем необходимые пакеты..."
ssh root@$SERVER_IP "apt update && apt install -y nginx certbot python3-certbot-nginx"

# 2. Создаем конфигурацию Nginx
echo "⚙️ Создаем конфигурацию Nginx..."
ssh root@$SERVER_IP "cat > /etc/nginx/sites-available/$DOMAIN << 'EOF'
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    # Проксирование на клиентское приложение
    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
    
    # Проксирование API на серверное приложение
    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF"

# 3. Активируем сайт
echo "🔗 Активируем сайт..."
ssh root@$SERVER_IP "ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/ && rm -f /etc/nginx/sites-enabled/default"

# 4. Проверяем конфигурацию Nginx
echo "✅ Проверяем конфигурацию Nginx..."
ssh root@$SERVER_IP "nginx -t"

# 5. Перезапускаем Nginx
echo "🔄 Перезапускаем Nginx..."
ssh root@$SERVER_IP "systemctl restart nginx"

# 6. Устанавливаем SSL сертификат
echo "🔒 Устанавливаем SSL сертификат..."
ssh root@$SERVER_IP "certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN"

# 7. Настраиваем автообновление сертификата
echo "⏰ Настраиваем автообновление сертификата..."
ssh root@$SERVER_IP "echo '0 12 * * * /usr/bin/certbot renew --quiet' | crontab -"

echo "🎉 Настройка домена завершена!"
echo "📋 Что нужно сделать вручную:"
echo "1. Зайти в панель управления reg.ru"
echo "2. Найти домен ir-kazan.ru"
echo "3. Перейти в раздел 'DNS записи'"
echo "4. Добавить A-запись:"
echo "   - Имя: @ (или оставить пустым)"
echo "   - Значение: 91.197.97.133"
echo "5. Добавить CNAME-запись:"
echo "   - Имя: www"
echo "   - Значение: ir-kazan.ru"
echo ""
echo "🌐 После настройки DNS сайт будет доступен по адресу:"
echo "   https://ir-kazan.ru" 