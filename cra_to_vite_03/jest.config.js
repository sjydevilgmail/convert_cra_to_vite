export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/test/setup.js'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/test/__mocks__/fileMock.js',
      '^/vite\\.svg$': '<rootDir>/src/test/__mocks__/fileMock.js'
    },
    transform: {
      '^.+\\.(js|jsx)$': ['babel-jest', { configFile: './babel.config.js' }]
    },
    moduleFileExtensions: ['js', 'jsx'],
    testMatch: [
      '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
      '<rootDir>/src/**/*.{test,spec}.{js,jsx}',
    ],
    collectCoverageFrom: [
      'src/**/*.{js,jsx}',
      '!src/main.js',
      '!src/index.js',
    ],
    extensionsToTreatAsEsm: ['.jsx'],
    transformIgnorePatterns: [
      'node_modules/(?!(vite-ssr|vite|vite-plugin-ssr)/)'
    ]
}