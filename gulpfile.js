const gulp = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');

tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', ['static'], () => {
    const tsResult = tsProject.src().pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('static', ['include_views'], () => {
    return gulp.src(['src/**/*json'])
    .pipe(gulp.dest('dist'));
});

gulp.task('include_views', ['include_public'], () => {
    return gulp.src(['src/app/views/**/*'])
    .pipe(gulp.dest('dist/app/views'));
});

gulp.task('include_public', ['clean'], () => {
    return gulp.src(['src/app/public/**/*'])
    .pipe(gulp.dest('dist/app/public'));
});


gulp.task('clean', () => {
    return gulp.src('dist')
    .pipe(clean());
});

gulp.task('build', ['scripts']);

gulp.task('watch', ['build'], () => {
    return gulp.watch(['src/**/*.ts', 'src/**/*.json', 'src/**/*.js', 'src/**/*.ejs'], ['build']);
});

gulp.task('default', ['watch']);