module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'vuetify',
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  plugins: [
    'vuetify'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-extra-parens': 'error',
    'vuetify/no-deprecated-classes': 'error',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off'
      }
    }
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
};
