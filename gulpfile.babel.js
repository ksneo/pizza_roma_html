import gulp from 'gulp';
import gulpLoaderPlugins from 'gulp-load-plugins';
import del from 'del';
import path from 'path';

import runSequence from 'run-sequence';
import browserSyncTool from 'browser-sync';
import named from 'vinyl-named';
import RevAll from 'gulp-rev-all';
import './build_scripts/build-pug';
import './build_scripts/build-css';
import './build_scripts/build-static';
import './build_scripts/build-webpack';
import {root, paths, resource} from './build_scripts/settings';

const $ = gulpLoaderPlugins();
const browserSync   = browserSyncTool.create('sync');

let production = false

// console.log($);
// build and watch for developer
gulp.task('default', ['build', 'server']);

//## build for developer
gulp.task('build', (callback) =>
  runSequence('clean', ['build:pug', 'build:sass', 'build:webpack', 'build:static'], callback)
)

//## build production
gulp.task('build-prod', (callback) =>
  runSequence('production', 'build', 'revision', callback)
)

// clean dist
gulp.task('clean', () =>
  del.sync([`${paths.dist.root}/*`, `!${paths.dist.root}/.git*`], { force: true })
)

// production option
gulp.task('production', () => {
  process.env.NODE_ENV = (production == true) ? 'production' : 'development';
  production = true;
});

// support Resource Revision
gulp.task('revision', (callback) =>
  runSequence('revision:clean', 'revision:append', 'clean', 'revision:copy', 'revision:clean', callback)
)

// run Development Web Server (BrowserSync) [localhost:3000]
gulp.task('server', () => {
  browserSync.init({
    server: {baseDir: paths.dist.root},
    notify: false
  })
  // watch for source
  function errorHandler(err) {
    console.log(err.toString());
  }
  gulp.watch(resource.src.pug, ['build:pug']).on('error', errorHandler);
  gulp.watch(resource.src.sass, ['build:sass']).on('error', errorHandler);
  gulp.watch(resource.src.static, ['build:static']).on('error', errorHandler);
})

// append Resource Revision
gulp.task('revision:clean', () =>
  del.sync([root.tmp], { force: true })
)

gulp.task('revision:append', () => {
  return gulp.src(`${paths.dist.root}/**/*`)
    .pipe(RevAll.revision({dontRenameFile: [/^\/favicon.ico$/g, '.html']}))
    .pipe(gulp.dest(root.tmp))
})

gulp.task('revision:copy', () => {
  return gulp.src(`${root.tmp}/**/*`)
    .pipe(gulp.dest(paths.dist.root))
})
