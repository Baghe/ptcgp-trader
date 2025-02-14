import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ptcgp-trader-2/',
  resolve: {
    alias: {
      src: "/src",
    },
  },
})
