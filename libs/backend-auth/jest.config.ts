const config = {
  coverageDirectory: '../../coverage/libs/backend-auth',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  displayName: 'backend-auth',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  preset: '../../jest.preset.js',
  resolver: '../../tools/js/jest-node-resolver.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
};

export default config;