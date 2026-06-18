import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Configure Vitest (https://vitest.dev/config/)
  test: {
    globals: true,
    // Fixture files include *.test.* names; only run the real test suites
    include: ['tests/*.test.ts'],
    // Avoid Node.js 23 + tinypool recursion by using process forks
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
        isolate: false,
      },
    },
    fileParallelism: false,
    maxWorkers: 1,
    minWorkers: 1,
    testTimeout: 60000,
  },
});
