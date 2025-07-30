#!/bin/bash

echo "Мониторинг ресурсов во время сборки..."
echo "Нажмите Ctrl+C для остановки"

# Мониторинг в фоне
while true; do
    echo "=== $(date) ==="
    echo "Память:"
    free -h
    echo "Диск:"
    df -h /
    echo "Docker процессы:"
    docker ps
    echo "=================="
    sleep 30
done 