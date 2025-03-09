export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["**/__tests__/**/*.{ts,tsx}", "**/*.test.{ts,tsx}"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
};
