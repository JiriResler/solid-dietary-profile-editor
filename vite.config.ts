import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const config = {
  plugins: [react()],
  base: '/solid-dietary-profile-editor/',
  test: {
    environment: 'jsdom',
  },
}

export default config
