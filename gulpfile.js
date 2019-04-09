/*CONST */
const APP_SRC_PATH = './src';
const APP_DIST_PATH = './dist';
const APP_STRUCTURE = {
  src: {
    scss: APP_SRC_PATH + '/scss',
    images: APP_SRC_PATH + '/images',
    js: APP_SRC_PATH + '/js',
    fonts: APP_SRC_PATH + '/fonts',
    njk: APP_SRC_PATH + '/njk'
  },
  dist: {
    css: APP_DIST_PATH + '/css',
    images: APP_DIST_PATH + '/images',
    js: APP_DIST_PATH + '/js',
    fonts: APP_DIST_PATH + '/fonts',
  }
};
const {watch} = require('gulp');

/*VAR */
var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var gulpCopy = require('gulp-copy');
var nunjucks = require('gulp-nunjucks');
var gulpCached = require ('gulp-cached');
var gulpPlumber = require('gulp-plumber');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var cleanCSS = require ('gulp-clean-css');
var imagesMin =require ('gulp-imagemin');
var prettier = require('gulp-prettier');




/*TASK */
//task clean
gulp.task('clean:dist', function() {
  return gulp.src(APP_DIST_PATH, {read: false, allowEmpty: true})
  .pipe(clean());
});

//task sass
gulp.task('sass', function(){
  return gulp.src(APP_STRUCTURE.src.scss + '/**/*.scss')
    .pipe(sass())
    .pipe(gulpPlumber())
    .pipe(gulpCached('sass'))
    .pipe(gulp.dest(APP_STRUCTURE.dist.css))
});

//task min
gulp.task('min:css',function() {
  return gulp.src(APP_STRUCTURE.dist.css + '/**/*.css')
    .pipe(clean())
    .pipe (cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(APP_STRUCTURE.dist.css));
});

gulp.task('min:images',function() {
  return gulp.src(APP_STRUCTURE.src.images + '/**/*.{png,jpg,gif,svg,webm}')
    .pipe(imagesMin())
    .pipe(gulp.dest(APP_STRUCTURE.dist.images));
});

//task prettier
gulp.task('prettier:html', () => {
  return gulp.src(APP_STRUCTURE.dist + '/*.html')
    .pipe(clean())
    .pipe(prettier({ singleQuote: true }))
    .pipe(gulp.dest(APP_STRUCTURE.dist));
});


//task copy
gulp.task('copy:images', function() {
  return gulp.src(APP_STRUCTURE.src.images + '/**/*.{png,jpg,gif,svg,webm,mp4}')
  .pipe(gulpPlumber())
  .pipe(gulpCached('copy:images'))
  .pipe(gulpCopy(APP_STRUCTURE.dist.images, {prefix: 2}))
});

gulp.task('copy:js', function() {
  return gulp.src (APP_STRUCTURE.src.js + '/**/*.js')
  .pipe(gulpPlumber())
  .pipe(gulpCached('copy:js'))
  .pipe(gulpCopy(APP_STRUCTURE.dist.js, {prefix: 2}));
});

gulp.task('copy:fonts', function() {
  return gulp.src (APP_STRUCTURE.src.fonts)
  .pipe(gulpPlumber())
  .pipe(gulpCached('copy:fonts'))
  .pipe(gulpCopy(APP_STRUCTURE.dist.fonts, {prefix: 2}));
});

//task nunjucks
gulp.task('njk', function() {
  return gulp.src(APP_STRUCTURE.src.njk +'/*.njk')
    .pipe(gulpPlumber())
    .pipe(nunjucks.compile())
    .pipe(gulpCached('njk'))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest(APP_DIST_PATH))
});

//task browser-sync
gulp.task('browser-sync:start', function() {
  browserSync.init({
      server: {
          baseDir: APP_DIST_PATH,
          index: 'index.html',
      }
  });
});

gulp.task('browserSync:reload',function(done) {
  browserSync.reload();
  return done();
});

//task watch
gulp.task('watch', function() {
  gulp.watch(APP_STRUCTURE.src.scss + '/**/*.scss', gulp.series('sass','browserSync:reload' ));
  gulp.watch(APP_STRUCTURE.src.images + '/**/*.{png,jpg,gif,svg,webm}', gulp.series('copy:images','browserSync:reload'));
  gulp.watch(APP_STRUCTURE.src.js + '/**/*.js', gulp.series('copy:js','browserSync:reload'));
  gulp.watch(APP_STRUCTURE.src.fonts , gulp.series('copy:fonts', 'browserSync:reload'));
  gulp.watch(APP_STRUCTURE.src.njk + '/**/*.njk', gulp.series('njk', 'browserSync:reload'));
});

//task dev
gulp.task('dev', gulp.series(
  'clean:dist',
  'njk',
  gulp.parallel(
    'copy:images',
    'copy:js', 
    'copy:fonts',  
  ),
  'sass',
  gulp.parallel(
    'watch',
    'browser-sync:start',
  ),

));

gulp.task ('prod', gulp.series(
  'clean:dist',
  'njk',
  gulp.parallel(
    'copy:js', 
    'copy:fonts',  
  ),
  'sass',
  gulp.parallel(
    'min:images',
    'min:css',  
  ),
  'watch',
));