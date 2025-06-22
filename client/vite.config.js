import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Чтобы сервер слушал все интерфейсы
    watch: {
      usePolling: true,  // Нужно для работы в Docker
    },
  }
})
