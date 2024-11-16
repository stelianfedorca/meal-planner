module.exports = {
  endOfLine: 'lf',
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: 'es5',
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: ['<THIRD_PARTY_MODULES>', '', '^~/(.*)$', '', '^[./]'],
};
