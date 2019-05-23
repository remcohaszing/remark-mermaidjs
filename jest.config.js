module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/*'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
