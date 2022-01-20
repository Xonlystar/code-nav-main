const fabric = require('@umijs/fabric')

module.exports = {
  ...fabric.prettier,
  printWidth: 120,
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  arrowParens: 'avoid',
  insertPragma: false,
  tabWidth: 2,
  useTabs: false
}
