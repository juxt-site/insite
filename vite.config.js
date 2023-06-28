import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ViteRestart from 'vite-plugin-restart';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    ViteRestart({
      restart: ['.eslintrc*', '.prettierrc*', 'tsconfig.json'],
    }),
    react()
  ],
});
