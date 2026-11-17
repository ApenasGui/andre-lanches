module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['./jest.setup.js'],
  clearMocks: true,
  testTimeout: 15000,
};
