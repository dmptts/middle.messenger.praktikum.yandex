const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'js', 'json'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    ".*\\.hbs\\?raw": "jest-raw-loader",
    "^.+\\.svg$": "<rootDir>/src/mocks/svg.ts"
  }
};

export default config;
