const helpers = require('./helpers'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  settings = require('./settings'),
  path = require('path');

let config = {
  entry: {
    'main': helpers.root(settings.src_folder, 'main.ts'),
    'style': helpers.root(settings.src_folder, 'sass/main.scss')
  },
  output: {
    path: helpers.root(settings.dist_folder),
    filename: 'static/js/[name].[hash].js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: [
      '.ts', '.js', '.html'
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'tslint-loader'
      }, {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [path.join(settings.src_folder, 'index.html')]
      }, {
        test: /\.pug$/,
        use: [
          {
            loader: 'raw-loader'
          }, {
            loader: 'pug-html-loader',
            options: {
              basedir: helpers.root(settings.src_folder)
            }
          }
        ],
        exclude: [path.join(settings.src_folder, 'index.pug')]
      }
    ]
  },
  plugins: [new CopyWebpackPlugin([
      {
        from: helpers.root(settings.src_folder, 'assets'),
        to: './static/assets'
      }
    ])]
};

module.exports = config;