module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-strongly-recommended'
  ],
  parserOptions: {
    parser: 'vue-eslint-parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    indent: ['error', 2],
    'comma-spacing': ['error', { before: false, after: true }],
    'vue/no-multi-spaces': 0
  }
};
