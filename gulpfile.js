/**
 * Created by kit on 2017/7/11.
 */
const gulp = require("gulp");
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const del = require("del");

/**
 * ----------------------------------------------------
 * source configuration
 * ----------------------------------------------------
 */

const config = {
    source: 'src/*.js',
    dest: 'dist',
}

/**
 * ----------------------------------------------------
 *  tasks
 * ----------------------------------------------------
 */

/**
 * clean build dir
 */
gulp.task('clean', () => {
    del.sync('dist')
});

gulp.task('lint', () => {
    return gulp.src(config.source)
        .pipe(eslint())
        .pipe(eslint.result(result => {
            console.log(`ESLint result: ${result.filePath}`);
            console.log(`# Messages: ${result.messages.length}`);
            console.log(`# Warnings: ${result.warningCount}`);
            console.log(`# Errors: ${result.errorCount}`);
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('minify', () => {
    return gulp.src(config.source)
        .pipe(gulp.dest(config.dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(config.dest));
});

/**
 * production build task
 */
gulp.task('default', ['clean', 'lint', 'minify'], () => {
        console.log('build success');
    }
);
