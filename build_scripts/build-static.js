import gulp from 'gulp';
import gulpLoaderPlugins from 'gulp-load-plugins';
import browserSyncTool from 'browser-sync';
import {root, paths, resource} from './settings';

const $ = gulpLoaderPlugins();

// copy Static Resource
gulp.task('build:static', () => {
    const libjs = resource.vendor.js;
    const browserSync = browserSyncTool.get('sync');
    gulp.src(Object.keys(libjs).map((key) => libjs[key]))
      .pipe($.concat("vendor.bundle.js"))
      .pipe($.if((process.env.NODE_ENV == 'production'), $.uglify()))
      .pipe(gulp.dest(paths.dist.js));
    gulp.src(resource.vendor.css)
      .pipe($.concat('vendor.css'))
      .pipe($.pleeease())
      .pipe(gulp.dest(paths.dist.css));
    gulp.src(resource.vendor.fontawesome)
      .pipe(gulp.dest(paths.dist.font));
    return gulp.src(resource.src.static)
        .pipe($.changed(paths.dist.root))
        .pipe(gulp.dest(paths.dist.root))
        .pipe(browserSync.stream());
  });

