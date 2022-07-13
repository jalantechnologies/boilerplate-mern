const babelify = require('babelify');
const browserify = require('browserify');
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const gulpif = require('gulp-if');
const minifyejs = require('gulp-minify-ejs');
const mock = require('gulp-mock-module');
const nodemon = require('gulp-nodemon');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')(require('sass'));
const ts = require('gulp-typescript');
const path = require('path');
const reactify = require('reactify');
const tsify = require('tsify');
const source = require('vinyl-source-stream');

const minifyResources = process.env.NODE_ENV !== 'development';
const e2eMode = process.env.NODE_ENV === 'e2e';

const mocks = () => gulp
  .src(['test/mocks/*.ts'])
  .pipe(plumber())
  .pipe(ts.createProject('tsconfig.e2e.json')())
  .js.pipe(gulp.dest('dist/test/mocks'));

const src = () => gulp
  .src(['src/**/*.ts', '!src/public/js/*.ts'])
  .pipe(plumber())
  .pipe(
    gulpif(
      e2eMode,
      mock(
        ['twilio-service', 'sendgrid-service'],
        path.resolve(__dirname, 'test/mocks'),
      ),
    ),
  )
  .pipe(
    gulpif(
      !e2eMode,
      ts.createProject('tsconfig.json')(),
      ts.createProject('tsconfig.e2e.json')(),
    ),
  )
  .js.pipe(gulpif(!e2eMode, gulp.dest('dist'), gulp.dest('dist/src')));

const css = () => gulp
  .src(['src/**/*.scss'])
  .pipe(plumber())
  .pipe(sass())
  .pipe(gulpif(minifyResources, cleanCSS()))
  .pipe(gulpif(!e2eMode, gulp.dest('dist'), gulp.dest('dist/src')));

const js = () => browserify({ entries: ['src/public/js/site.tsx'] })
  .plugin(tsify)
  .transform(babelify, {
    presets: ['es2015'],
  })
  .transform(reactify)
  .bundle()
  .pipe(source('site.js'))
  .pipe(
    gulpif(
      !e2eMode,
      gulp.dest('dist/public/js'),
      gulp.dest('dist/src/public/js'),
    ),
  );

const views = () => gulp
  .src(['src/**/*.ejs'])
  .pipe(plumber())
  .pipe(gulpif(minifyResources, minifyejs()))
  .pipe(gulpif(!e2eMode, gulp.dest('dist'), gulp.dest('dist/src')));

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

const build = gulp.parallel(src, js, css, views);
const buildE2E = gulp.series(mocks, build);

const serve = gulp.series(build, watch);

/*
 * Tasks can be run using the gulp task
 */
exports.build = build;
exports.buildE2E = buildE2E;
exports.serve = serve;

/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;
