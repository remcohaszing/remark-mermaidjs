module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: ['<rootDir>/src/*'],
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
