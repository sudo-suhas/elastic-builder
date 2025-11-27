import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        // Test file patterns
        include: ['test/**/*.test.js'],

        // Exclude TypeScript typedef test (handled by tsc)
        exclude: ['test/typedef.test.ts', '**/node_modules/**'],

        // Enable coverage
        coverage: {
            // Coverage reporters: html for viewing, lcov for Coveralls, text for console
            reporter: ['html', 'lcov', 'text'],

            // Coverage output directory
            reportsDirectory: './coverage',

            // Include source files
            include: ['src/**/*.js'],

            // Exclude non-source files and files with v8 coverage instrumentation issues
            exclude: [
                'src/index.d.ts',
                'src/core/inspect.js',
                'src/core/util.js',
                'src/_/index.js',
                '**/*.test.js',
                '**/node_modules/**'
            ]
        },

        // Enable watch mode support for local development
        watch: false,

        // Use Node.js environment (not browser)
        environment: 'node',

        // Globals (using explicit imports instead)
        globals: false,

        // Silent mode: suppress console output during tests
        // Console output will only be shown for failing tests
        silent: false,

        // Only show console output on test failures
        onConsoleLog(log, type) {
            // Return false to suppress the log
            // This will be overridden to show logs when tests fail
            return false;
        },

        // Use single-threaded execution to avoid worker serialization issues
        pool: 'threads',
        poolOptions: {
            threads: {
                singleThread: true
            }
        },

        // Disable file parallelism to avoid worker issues
        fileParallelism: false,

        // Limit test timeout
        testTimeout: 10000,

        // Limit hook timeout
        hookTimeout: 10000
    }
});
