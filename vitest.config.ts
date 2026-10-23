import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: './',
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/main.ts', 'src/**/*.spec.ts'],
    },
  },
});
