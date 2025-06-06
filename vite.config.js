import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Load environment variables
dotenv.config({ silent: true });

// Get environment variables
const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PUBLIC_URL: process.env.PUBLIC_URL || '',
    PRODUCT_OPTION: process.env.PRODUCT_OPTION || '',
};

// Import configuration based on PRODUCT_OPTION
const configPath = env.PRODUCT_OPTION === 'com'
    ? './config/vite.config.prd.js'
    : './config/vite.config.dev.js';
console.log(configPath);

const config = await import(new URL(configPath, import.meta.url).href);
console.log(config);

// https://vitejs.dev/config/
export default defineConfig(config.default);

