module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/components/**.{ts,vue}',
    '<rootDir>/src/views/**.{ts,vue}',
    '!**/node_modules/**'
  ],
  // coverageReporters: ['text-summary']
}
