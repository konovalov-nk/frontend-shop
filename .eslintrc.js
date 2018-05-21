module.exports = {
  root: true,
  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  'rules': {
    'import/no-unresolved': 0,
    'max-len': ['error', { 'code': 500 }]
  }
}