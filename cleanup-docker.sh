#!/bin/bash

echo "=== ПОЛНАЯ ОЧИСТКА DOCKER ==="
echo "Время начала: $(date)"
echo ""

echo "1. Остановка всех контейнеров..."
docker stop $(docker ps -q) 2>/dev/null || echo "Нет активных контейнеров"

echo "2. Удаление всех контейнеров..."
docker rm $(docker ps -aq) 2>/dev/null || echo "Нет контейнеров для удаления"

echo "3. Удаление всех образов..."
docker rmi $(docker images -q) 2>/dev/null || echo "Нет образов для удаления"

echo "4. Удаление всех томов..."
docker volume rm $(docker volume ls -q) 2>/dev/null || echo "Нет томов для удаления"

echo "5. Удаление всех сетей (кроме default)..."
docker network rm $(docker network ls -q | grep -v bridge) 2>/dev/null || echo "Нет сетей для удаления"

echo "6. Очистка build cache..."
docker builder prune -a -f

echo "7. Полная очистка системы..."
docker system prune -a --volumes -f

echo "8. Проверка результата..."
echo ""
echo "=== РЕЗУЛЬТАТ ОЧИСТКИ ==="
docker system df

echo ""
echo "=== ОПТИМИЗАЦИЯ DOCKER ==="

echo "9. Перезапуск Docker daemon..."
systemctl restart docker

echo "10. Проверка статуса Docker..."
systemctl status docker --no-pager -l

echo ""
echo "=== НАСТРОЙКА ОГРАНИЧЕНИЙ РЕСУРСОВ ==="

# Создаем daemon.json для оптимизации
echo "11. Создание оптимизированной конфигурации Docker..."
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json > /dev/null <<EOF
{
  "storage-driver": "overlay2",
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "default-ulimits": {
    "nofile": {
      "Hard": 64000,
      "Name": "nofile",
      "Soft": 64000
    }
  }
}
EOF

echo "12. Перезапуск Docker с новой конфигурацией..."
systemctl restart docker

echo ""
echo "=== ФИНАЛЬНАЯ ПРОВЕРКА ==="
echo "Время завершения: $(date)"
echo ""
echo "Docker готов к работе!"
echo "Теперь можно попробовать сборку:"
echo "docker-compose build --no-cache --progress=plain server" 