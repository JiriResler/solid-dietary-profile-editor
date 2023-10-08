import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: '/',
    test: {
      environment: 'jsdom'
    }
  }

  if (command !== 'serve') {
    config.base = '/solid-dietary-profile-editor/'
  }

  return config
})