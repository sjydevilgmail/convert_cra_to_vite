import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Get environment variables
const env = {
    NODE_ENV: 'production',
    PUBLIC_URL: process.env.PUBLIC_URL || '',
    PRODUCT_OPTION: process.env.PRODUCT_OPTION || '',
};

export default {
    mode: 'production',
    plugins: [
        react(),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, '../src'),
            'react-native': 'react-native-web',
        },
        extensions: ['.js', '.jsx', '.json'],
    },
    build: {
        outDir: 'build',
        sourcemap: false,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: false,
                pure_funcs: ['console.log'],
            },
            output: {
                comments: false,
            },
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: [
                        'react',
                        'react-dom',
                        'react-router-dom',
                        'react-redux',
                        'redux',
                        'redux-saga',
                        'jquery',
                    ],
                },
                chunkFileNames: 'static/js/[name].[hash].js',
                entryFileNames: 'static/js/[name].[hash].js',
                assetFileNames: 'static/[ext]/[name].[hash].[ext]',
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
};