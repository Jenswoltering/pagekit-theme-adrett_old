var gulp       = require('gulp');
var less       = require('gulp-less');
var rename     = require('gulp-rename');
var postcss    = require('gulp-postcss');
var flexbugsfixes = require('postcss-flexbugs-fixes');
var autoprefixer = require('autoprefixer');

var processors = [
    flexbugsfixes,
    autoprefixer({
        browsers: ['last 2 versions', '> 0.1%']
    })
];


gulp.task('default', function () {
    return gulp.src('less/theme.less', {base: __dirname})
        .pipe(less({compress: true}))
        .pipe(rename(function (file) {
            // the compiled file should be stored in the css/ folder instead of the less/ folder
            file.dirname = file.dirname.replace('less', 'css');
        }))
        .pipe(postcss(processors))
        .pipe(gulp.dest(__dirname));
});

gulp.task('watch', function () {
    gulp.watch('less/*.less', ['default']);
});