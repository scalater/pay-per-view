const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const babelMinify = require('gulp-babel-minify');
const rename = require('gulp-rename');
var sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
sass.compiler = require('node-sass');
const config = {
  js: {
    src: ['assets/js/*.js', '!assets/js/*.min.js'],
    out: 'assets/js/',
    watch: [
      'assets/js/*.js',
      '!assets/js/*.min.js',
      'assets/js/*/*.js',
      '!assets/js/*/*.min.js'
    ]
  },
  sass: {
    src: 'assets/sass/*.scss',
    out: 'assets/css/',
    watch: [
      'assets/sass/*.scss',
      'assets/sass/**/*.scss'
    ]
  }
};
gulp.task('js', function () {
  return gulp.src(config.js.src)
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(babelMinify())
  .pipe(rename(function (path) {
    path.basename += '.min';
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(config.js.out));
});
gulp.task('sass', function () {
  return gulp.src(config.sass.src)
  .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(gulp.dest(config.sass.out))
  .pipe(sourcemaps.init())
  .pipe(rename(function (path) {
    path.basename += '.min';
  }))
  .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(config.sass.out));
});
gulp.task('watch', function () {
  gulp.watch(config.js.watch, gulp.series(['js']));
  gulp.watch(config.sass.watch, gulp.series(['sass']));
});
gulp.task('default', gulp.series('js', 'sass', 'watch'));
