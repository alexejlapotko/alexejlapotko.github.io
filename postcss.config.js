module.exports = {
  plugins: [
    require('autoprefixer')({
      // Support last 2 versions of all browsers
      overrideBrowserslist: [
        'last 2 versions',
        '> 1%',
        'not dead',
        'not ie <= 11'
      ]
    }),
    require('cssnano')({
      preset: 'default'
    })
  ]
}