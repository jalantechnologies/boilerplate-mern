const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const ts = require('gulp-typescript');

const files = {
  assets: [
    'src/**/*.json',
  ],
  watch: [
    'src/**/*.*',
  ],
};

const copyAssets = () => gulp.src(files.assets).pipe(gulp.dest('dist'));

const tsProject = ts.createProject('tsconfig.json');
const tsBuild = () => tsProject.src().pipe(tsProject()).js.pipe(gulp.dest('dist'));

const build = gulp.parallel(copyAssets, tsBuild);

const watch = (done) => {
  nodemon({
    watch: files.watch,
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
