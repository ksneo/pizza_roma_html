import gulp from 'gulp';
import gulpLoaderPlugins from 'gulp-load-plugins';
import browserSyncTool from 'browser-sync';
import {root, paths, resource} from './settings';
import initGetData from 'jade-get-data';

const getData = initGetData(paths.src.data);
const $ = gulpLoaderPlugins();

// compile Pug -> HTML
gulp.task('build:pug', () => {
    const browserSync = browserSyncTool.get('sync');
    return gulp
        .src(resource.src.html)
        .pipe($.plumber())
        .pipe($.pug(
            { basedir: root.src,
              locals: {getData}
            }
        ))
        // .pipe($.htmlhint()) .pipe($.htmlhint.reporter())
        .pipe($.jsbeautifier())
        .pipe(gulp.dest(paths.dist.root))
        .pipe(browserSync.stream());
})