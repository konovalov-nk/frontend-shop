module.exports = {
  root: true,
  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  'plugins': [
    'snakecase'
  ],
  'rules': {
    'import/no-unresolved': 0,
    'max-len': [2, { 'code': 500 }],
    'snakecase/snakecase': 0,
    'camelcase': 0,
    'semi': [2, 'never']
  }
}