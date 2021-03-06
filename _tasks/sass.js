'use strict';

import gulp from 'gulp';
import log from 'fancy-log';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import purify from 'gulp-purifycss';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const AUTOPREFIXER_BROWSERS = [
  '> 1%',
  'last 2 versions',
  'Firefox ESR'
];

const sourcefiles = [
  '_assets/styles/main.scss',
  '_assets/styles/dark-theme.css'
];

gulp.task('sass', () => {
  return gulp.src(sourcefiles)
    .pipe($.flatten())
    .pipe(plumber({
      errorHandler: (err) => {
        log.error(err);
        this.emit('end');
      },
    }))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10,
      onError: browserSync.notify,
    }))
    .pipe($.autoprefixer({ grid: true, browsers: AUTOPREFIXER_BROWSERS }))
    .pipe($.sourcemaps.write())
    .pipe($.rename({ extname: '.css' }))
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(reload({ stream: true }));
});

gulp.task('sass:prod', () => {
  return gulp.src(sourcefiles)
    .pipe($.flatten())
    .pipe(plumber({
      handleError: (err) => {
        log.error(err);
        this.emit('end');
      },
    }))
    .pipe($.sass({
      precision: 10,
      onError: browserSync.notify,
    }))
    .pipe($.autoprefixer({ grid: true, browsers: AUTOPREFIXER_BROWSERS }))
    .pipe(purify(['_site/assets/js/*.js', '_site/**/*.html']))
    .pipe($.cleanCss())
    .pipe($.rename({ extname: '.min.css' }))
    .pipe(gulp.dest('_site/assets/css'));
});