
module.exports = {
  extends: ['@moralisweb3'],
  ignorePatterns: ['**/build/**/*'],
  env: {
    browser: true,
    
  },
  
    rules: {
      complexity: 0,
      "no-console": 0,
      "@typescript-eslint/no-unused-vars":0,
      "@typescript-eslint/no-shadow":0,
    }
};
