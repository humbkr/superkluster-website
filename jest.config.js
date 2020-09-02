module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/__tests__/_testutils/'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  // Need to mock images imports for next-optimized-images.
  moduleNameMapper: {
    '^.+\\.(gif|png|jpg|ttf|eot)\\?(resize|sizes)(.+)?$': '<rootDir>/__mocks__/fileResizeMock.js',
    '^.+\\.(gif|png|jpg|ttf|eot)(\\?.+)?$': '<rootDir>/__mocks__/fileMock.js',
    '^.+\\.svg\\?(sprite|include)(.+)?$': '<rootDir>/__mocks__/svgMock.js',
    '^.+\\.svg$': '<rootDir>/__mocks__/svgMock.js',
    '@src/(.*)': '<rootDir>/src/$1',
  },
}
