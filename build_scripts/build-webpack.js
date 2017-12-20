import gulp from 'gulp';
import gulpLoaderPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import named from 'vinyl-named';
import browserSyncTool from 'browser-sync';
import {root, paths, resource} from './settings';

const $ = gulpLoaderPlugins();
// compile Webpack [ ES6(Babel) / Vue -> Multipage ]

let production = false

gulp.task('build:webpack', () => {
    const browserSync = browserSyncTool.get('sync');
    process.env.NODE_ENV = (production == true) ? 'production' : 'development'
    if (production) plugins.push(new webpack.optimize.UglifyJsPlugin({compress: { warnings: false　}}))
    return gulp.src([resource.src.webpack.babel])
      .pipe(named())
      .pipe($.plumber())
      .pipe(webpackStream({
        devtool: '#source-map',
        output: {filename: '[name].js'},
        watch: !production,
        module: {
          rules: [
            {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
            {test: /\.vue$/, use: 'vue-loader', exclude: /node_modules/}
          ],
        },
        resolve: {
          modules: ['node_modules', paths.src.js],
          extensions: ['*', '.js', '.vue'],
          alias: {
            vue: 'vue/dist/vue.common.js',
            constants: `${paths.src.js}/constants`,
          }
        }
       }, webpack))
      .pipe(gulp.dest(paths.dist.js))
      .pipe(browserSync.stream())
  })
