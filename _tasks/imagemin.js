'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

gulp.task('imagemin', () => {
  return gulp.src('_assets/images/**/*')
    .pipe(gulp.dest('_site/assets/images'));
});

gulp.task('imagemin:prod', () => {
  return gulp.src('_assets/images/**/*')
    .pipe($.imagemin())
    .pipe(gulp.dest('_site/assets/images'));
});

gulp.task('iconmin', () => {
  return gulp.src('_assets/icons/**/*.png')
    .pipe($.imagemin())
    .pipe(gulp.dest('_site/assets/icons'));
});