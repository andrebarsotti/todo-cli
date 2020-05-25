const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');
const tsProject = ts.createProject('tsconfig.build.json');

gulp.task('build', () => {
    return tsProject.src()
                    .pipe(tsProject())
                    .pipe(gulp.dest('app'));
});

gulp.task('clean', () => {
    return del(['app']);
});

gulp.task('copy-json', () => {
    return gulp.src('src/**/*.json')
               .pipe(gulp.dest('app'));
});

gulp.task('clean+build', gulp.series('clean', gulp.parallel('build','copy-json')));
