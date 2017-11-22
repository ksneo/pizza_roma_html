import gulp from 'gulp';
import gulpLoaderPlugins from 'gulp-load-plugins';
import browserSyncTool from 'browser-sync';
import {root, paths, resource} from './settings';

const $ = gulpLoaderPlugins();

// compile Sass -> CSS
gulp.task('build:sass', () => {
    const browserSync = browserSyncTool.get('sync');
    return gulp.src(resource.src.sass)
      .pipe($.plumber())
      .pipe($.sass())
      .pipe($.concat('style.css'))
      .pipe($.pleeease())
      .pipe(gulp.dest(paths.dist.css))
      .pipe(browserSync.stream())
  })