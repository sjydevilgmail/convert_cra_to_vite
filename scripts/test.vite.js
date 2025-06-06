import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Set test environment
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// Load environment variables
dotenv.config({ silent: true });

// Get command line arguments
const argv = process.argv.slice(2);

// Create Vitest configuration
const config = defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: [resolve(__dirname, '../config/setupTests.js')],
        coverage: {
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'config/',
                'scripts/',
                'build/',
                'coverage/',
            ],
        },
        include: ['src/**/*.{test,spec}.{js,jsx}'],
        watch: !process.env.CI && argv.indexOf('--coverage') < 0,
    },
});

// Export the configuration
export default config;