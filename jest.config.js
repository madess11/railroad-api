module.exports = {
    testTimeout: 30000,
    preset: 'ts-jest',           // Use ts-jest preset to handle TypeScript
    testEnvironment: 'node',      // Set the test environment to Node.js
    transform: {                  // Transform files with ts-jest
      '^.+\\.tsx?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js'], // Recognize these file types
    moduleNameMapper: {           // Handle static assets (e.g., images)
      '\\.(jpg|jpeg|png|gif)$': '<rootDir>/__mocks__/fileMock.js'
    },
    transformIgnorePatterns: [
      "/node_modules/"            // Ignore node_modules transformations
    ]
  };
  