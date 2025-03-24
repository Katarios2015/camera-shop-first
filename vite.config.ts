/// <reference types='vitest' />
/// <reference types='vite/client' />


import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const viteConfig = defineViteConfig({
  plugins: [react()],
});

// https://vitejs.dev/config/
const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
});

export default mergeConfig(viteConfig, vitestConfig);
