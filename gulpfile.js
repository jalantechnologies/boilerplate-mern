const babelify = require('babelify');
const browserify = require('browserify');
const cleanCSS = require('gulp-clean-css');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const nodemon = require('gulp-nodemon');
const plumber = require('gulp-plumber');
const reactify = require('reactify');
const sass = require('gulp-sass')(require('sass'));
const source = require('vinyl-source-stream');
const ts = require('gulp-typescript');
const tsify = require('tsify');

const minifyejs = require('gulp-minify-ejs');

const minifyResources = process.env.NODE_ENV !== 'development';

const src = () => gulp
  .src(['src/**/*.ts', '!src/public/js/*.ts'])
  .pipe(plumber())
  .pipe(ts.createProject('tsconfig.json')())
  .js.pipe(gulp.dest('dist'));

const css = () => gulp
  .src(['src/**/*.scss'])
  .pipe(plumber())
  .pipe(sass())
  .pipe(gulpif(minifyResources, cleanCSS()))
  .pipe(gulp.dest('dist'));

const js = () => browserify({ entries: ['src/public/js/site.tsx'] })
  .plugin(tsify)
  .transform(babelify, {
    presets: ['es2015'],
  })
  .transform(reactify)
  .bundle()
  .pipe(source('site.js'))
  .pipe(gulp.dest('dist/public/js'));

const views = () => gulp
  .src(['src/**/*.ejs'])
  .pipe(plumber())
  .pipe(gulpif(minifyResources, minifyejs()))
  .pipe(gulp.dest('dist'));

const build = gulp.parallel(src, js, css, views);

const watch = (done) => {
  nodemon({
    watch: ['src/**/*.*', 'config/*.*'],
    exec: 'npm start',
    tasks: ['build'],
    // for graceful process exit
    // @see - https://github.com/remy/nodemon#gracefully-reloading-down-your-script
    signal: 'SIGHUP',
    done,
  });
};
// directly running watch won't run build on initial run, only on changes
// because of this watch and serve have been seperated out
const serve = gulp.series(build, watch);

/*
 * Tasks can be run using the gulp task
 */
exports.build = build;
exports.serve = serve;

/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;
