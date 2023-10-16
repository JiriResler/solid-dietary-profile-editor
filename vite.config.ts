import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: '/solid-dietary-profile-editor/',
    test: {
      environment: 'jsdom',
    },
  }

  return config
})
