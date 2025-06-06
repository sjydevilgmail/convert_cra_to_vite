import { build as viteBuild } from 'vite';
import { resolve } from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Set production environment and product option
process.env.NODE_ENV = 'production';
process.env.PRODUCT_OPTION = 'com';

// Load environment variables
dotenv.config({ silent: true });

const paths = {
    appBuild: resolve(__dirname, '../build'),
    appPublic: resolve(__dirname, '../public'),
    appHtml: resolve(__dirname, '../public/index.html'),
};

async function build() {
    try {
        console.log(chalk.blue('Creating an optimized production build with PRODUCT_OPTION=com...'));

        // Clean build directory
        await fs.emptyDir(paths.appBuild);

        // Build with Vite
        const result = await viteBuild({
            mode: 'production',
            build: {
                outDir: paths.appBuild,
                sourcemap: true,
            },
            define: {
                'process.env.PRODUCT_OPTION': JSON.stringify('com'),
            },
        });

        // Copy public folder
        await copyPublicFolder();

        console.log(chalk.green('Build completed successfully!'));
        console.log();
        console.log('The build folder is ready to be deployed.');
        console.log('You may serve it with a static server:');
        console.log();
        console.log(`  ${chalk.cyan('npm')} install -g serve`);
        console.log(`  ${chalk.cyan('serve')} -s build`);
        console.log();

    } catch (err) {
        console.error(chalk.red('Build failed:'));
        console.error(err);
        process.exit(1);
    }
}

async function copyPublicFolder() {
    try {
        await fs.copy(paths.appPublic, paths.appBuild, {
            dereference: true,
            filter: (file) => file !== paths.appHtml,
        });
    } catch (err) {
        console.error(chalk.red('Failed to copy public folder:'));
        console.error(err);
        process.exit(1);
    }
}

// Run build
build();