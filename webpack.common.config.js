const webpack = require('webpack'),
      path = require('path'),
      env = process.env.NODE_ENV || 'development',
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      CleanWebpackPlugin = require('clean-webpack-plugin');

var settings = require('./settings/settings.' + env + '.json');
const i18n = {
  en: require('./settings/strings.en.json')
};

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: './js/app.js'
  },
  output: {
    filename: 'js/app/[name].[hash].min.js',
    chunkFilename: 'js/app/[name].[hash].min.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          'loader': 'babel-loader',
          'options': {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              'react-html-attrs',
              '@babel/plugin-transform-react-inline-elements',
              ['@babel/plugin-proposal-decorators', { 'legacy': true }],
              ['@babel/plugin-proposal-class-properties', { 'loose': true }],
              ['@babel/plugin-proposal-object-rest-spread', { 'loose': true, 'useBuiltIns': true }]]
          }
        }]
      }
    ]
  },
  plugins:[
    new webpack.EnvironmentPlugin({
      DEBUG: false,
      VERSION: require('./package.json').version +
               ' - ' + new Date().toLocaleString()
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '',
      description: '',
      keywords: '',
      minify: (env!=='development' && env!=='qa')?{
        'collapseWhitespace': true,
        'minifyJS': true,
        'removeComments': true,
        'removeStyleLinkTypeAttributes': true
      }:false,
      inject: false,
      template: 'html/template.html',
      filename: 'app.html',
      gtmId: settings.gtmId
    })
  ],
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    'alias': {
      'explore': path.resolve(__dirname, './src/js/explore'),
      'dashboard': path.resolve(__dirname, './src/js/dashboard'),
      'login': path.resolve(__dirname, './src/js/login'),
      'admin': path.resolve(__dirname, './src/js/admin'),
      'user': path.resolve(__dirname, './src/js/user'),
      'actions': path.resolve(__dirname, './src/js/actions'),
      'shared': path.resolve(__dirname, './src/js/shared'),
      'helpers': path.resolve(__dirname, './src/js/shared/helpers'),
      'i18n': path.resolve(__dirname, './src/js/shared/i18n')
    },
    'extensions': ['.js', '.sass']
  },
  externals: {
    'Settings': JSON.stringify(settings),
    'I18N': JSON.stringify(i18n)
  }
}
