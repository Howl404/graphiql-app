import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      provider: 'v8',
      all: true,
      exclude: [
        'src/types.ts',
        'src/vite-env.d.ts',
        'src/main.tsx',
        'src/constants/*',
        'src/router/*',
      ],
    },
    environment: 'jsdom',
    globals: true,
  },
});
