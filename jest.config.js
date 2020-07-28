module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/__tests__/_testutils/'],
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  // Need to mock images imports for next-optimized-images.
  moduleNameMapper: {
    '^.+\\.(gif|png|jpg|ttf|eot)\\?(resize|sizes)(.+)?$': '<rootDir>/__mocks__/fileResizeMock.js',
    '^.+\\.(gif|png|jpg|ttf|eot)(\\?.+)?$': '<rootDir>/__mocks__/fileMock.js',
    '^.+\\.svg\\?(sprite|include)(.+)?$': '<rootDir>/__mocks__/svgMock.js',
    '^.+\\.svg$': '<rootDir>/__mocks__/svgMock.js',
  },
}
