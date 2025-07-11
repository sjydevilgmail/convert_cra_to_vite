import { createServer } from 'vite';
import { resolve } from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Set development environment
process.env.NODE_ENV = 'development';

// Load environment variables
dotenv.config({ silent: true });

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3200;

async function startServer() {
    try {
        console.log(chalk.blue('Starting the development server...'));

        const server = await createServer({
            mode: 'development',
            server: {
                port: DEFAULT_PORT,
                open: true,
                proxy: getProxyConfig(),
            },
        });

        await server.listen();

        server.printUrls();
        console.log();
        console.log('Note that the development build is not optimized.');
        console.log('To create a production build, use ' + chalk.cyan('npm run build') + '.');
        console.log();

    } catch (err) {
        console.error(chalk.red('Failed to start development server:'));
        console.error(err);
        process.exit(1);
    }
}

function getProxyConfig() {
    try {
        const packageJson = require(resolve(__dirname, '../package.json'));
        const proxy = packageJson.proxy;

        if (!proxy) {
            return undefined;
        }

        if (typeof proxy !== 'string') {
            console.log(chalk.red('When specified, "proxy" in package.json must be a string.'));
            console.log(chalk.red('Instead, the type of "proxy" was "' + typeof proxy + '".'));
            console.log(chalk.red('Either remove "proxy" from package.json, or make it a string.'));
            process.exit(1);
        }

        return {
            '/api': {
                target: proxy,
                changeOrigin: true,
                secure: false,
                ws: true,
            },
        };
    } catch (err) {
        console.error(chalk.red('Failed to read proxy configuration:'));
        console.error(err);
        return undefined;
    }
}

// Start the server
startServer();