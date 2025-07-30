#!/bin/bash

echo "=== ДИАГНОСТИКА СИСТЕМЫ И DOCKER ==="
echo "Время: $(date)"
echo ""

echo "=== ИНФОРМАЦИЯ О СИСТЕМЕ ==="
echo "CPU ядер: $(nproc)"
echo "Общая память:"
free -h
echo "Свободное место на диске:"
df -h /
echo ""

echo "=== СОСТОЯНИЕ DOCKER ==="
echo "Docker версия:"
docker --version
echo ""

echo "=== ИСПОЛЬЗОВАНИЕ РЕСУРСОВ DOCKER ==="
docker system df
echo ""

echo "=== АКТИВНЫЕ КОНТЕЙНЕРЫ ==="
docker ps -a
echo ""

echo "=== ОБРАЗЫ DOCKER ==="
docker images
echo ""

echo "=== ТОМЫ DOCKER ==="
docker volume ls
echo ""

echo "=== СЕТИ DOCKER ==="
docker network ls
echo ""

echo "=== ПРОЦЕССЫ DOCKER ==="
ps aux | grep docker
echo ""

echo "=== ЗАГРУЗКА СИСТЕМЫ ==="
top -bn1 | head -20
echo ""

echo "=== СЕТЕВЫЕ СОЕДИНЕНИЯ ==="
netstat -tuln | head -10
echo ""

echo "=== ПРОВЕРКА DOCKER DAEMON ==="
systemctl status docker --no-pager -l
echo ""

echo "=== РЕКОМЕНДАЦИИ ==="
echo "1. Минимальные требования для Docker:"
echo "   - CPU: 1 ядро (рекомендуется 2+)"
echo "   - RAM: 2GB (рекомендуется 4GB+)"
echo "   - Диск: 20GB свободного места"
echo ""
echo "2. Для вашего проекта рекомендуется:"
echo "   - CPU: 2 ядра"
echo "   - RAM: 4GB"
echo "   - Диск: 50GB свободного места"
echo ""

echo "=== КОМАНДЫ ДЛЯ ОЧИСТКИ ==="
echo "Очистка всех неиспользуемых ресурсов:"
echo "docker system prune -a --volumes"
echo ""
echo "Очистка только образов:"
echo "docker image prune -a"
echo ""
echo "Очистка только контейнеров:"
echo "docker container prune"
echo ""
echo "Очистка только томов:"
echo "docker volume prune"
echo ""
echo "Очистка build cache:"
echo "docker builder prune -a" 