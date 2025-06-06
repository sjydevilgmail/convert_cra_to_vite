import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
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

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            'react-native': 'react-native-web',
        },
        extensions: ['.js', '.jsx', '.json'],
    },
    server: {
        port: 3200,
        open: true,
        proxy: {
            '/api': {
                target: process.env.PROXY || 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
                ws: true,
            },
        },
    },
    build: {
        outDir: 'build',
        sourcemap: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
        },
    },
    css: {
        preprocessorOptions: {
            css: {
                postcss: {
                    plugins: [
                        require('autoprefixer')({
                            overrideBrowserslist: [
                                '>1%',
                                'last 4 versions',
                                'Firefox ESR',
                                'not ie < 9',
                            ],
                        }),
                    ],
                },
            },
        },
    },
    define: {
        'process.env': {
            NODE_ENV: JSON.stringify(env.NODE_ENV),
            PUBLIC_URL: JSON.stringify(env.PUBLIC_URL),
            PRODUCT_OPTION: JSON.stringify(env.PRODUCT_OPTION),
        },
    },
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
            'react-router-dom',
            'react-redux',
            'redux',
            'redux-saga',
            'jquery',
        ],
    },
});