module.exports = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['./jest.setup.js'], // veya './jest.setup.ts'
  testEnvironment: 'jsdom', // veya 'jsdom' eğer tarayıcı ortamında test ediyorsanız
  setupFilesAfterEnv: ['@testing-library/jest-dom'], // Burayı ekleyin
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};
