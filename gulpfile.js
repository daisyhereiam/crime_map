//'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('./public/css'));
  });
   
  gulp.task('watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
  });

  gulp.task('copyHTML', function () {
    gulp.src('./src/html/*.html')
    .pipe(gulp.dest('./public/html'));
  });

  gulp.task('copyImages', function () {
    gulp.src('./src/images/*.jpg')
    .pipe(gulp.dest('./public/images'));
  });

  gulp.task('copyJs', function () {
    gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./public/js'));
  });

  gulp.task('imageMin', () =>
  gulp.src('./src/images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('./public/images'))
);

gulp.task('minifyJs', () =>
gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
);

gulp.task('compress', function (cb) {
  pump([
        gulp.src('.src/js/*.js'),
        uglify(),
        gulp.dest('./public/js')
    ],
    cb
  );
});

gulp.task('default',['copyHTML', 'copyImages', 'copyJs', 'imageMin', 'minifyJs', 'sass']);

gulp.task('watch', function(){
  gulp.watch('./src/js/*.js', ['minifyJs']);
  gulp.watch('./src/images/*', ['imageMin']);
  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch('./src/html/*.html', ['copyHTML']);
});





