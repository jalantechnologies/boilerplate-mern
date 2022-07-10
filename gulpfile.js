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
const mockServices = process.env.NODE_ENV === 'e2e';

// const mock = require('../../../Escala/gulp-mock-module');
const srcTargets = ['src/**/*.ts', '!src/public/js/*.ts', '!src/mocks/*.ts'];

if (mockServices) srcTargets.pop();

const src = () =>
  gulp
    .src(srcTargets)
    .pipe(plumber())
    .pipe(
      gulpif(
        mockServices,
        mock(
          ['twilio-service', 'sendgrid-service'],
          path.resolve(__dirname, 'src/mocks'),
        ),
      ),
    )
    .pipe(ts.createProject('tsconfig.json')())
    .js.pipe(gulp.dest('dist'));

const css = () =>
  gulp
    .src(['src/**/*.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulpif(minifyResources, cleanCSS()))
    .pipe(gulp.dest('dist'));

const js = () =>
  browserify({ entries: ['src/public/js/site.tsx'] })
    .plugin(tsify)
    .transform(babelify, {
      presets: ['es2015'],
    })
    .transform(reactify)
    .bundle()
    .pipe(source('site.js'))
    .pipe(gulp.dest('dist/public/js'));

const views = () =>
  gulp
    .src(['src/**/*.ejs'])
    .pipe(plumber())
    .pipe(gulpif(minifyResources, minifyejs()))
    .pipe(gulp.dest('dist'));

const build = gulp.parallel(src, js, css, views);

const watchTargets = ['src/**/*.*', 'config/*.*'];

if (mockServices) watchTargets.push('cypress/mocks/*.ts');

const watch = (done) => {
  nodemon({
    watch: watchTargets,
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
