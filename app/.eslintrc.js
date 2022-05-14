module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier', 'airbnb/hooks'],
  plugins: ['jest', 'unused-imports'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'react/function-component-definition': ['off', 'never'],
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": 'error',
    "unused-imports/no-unused-vars": 'warn',
    "no-nested-ternary": "off"
  },
};
