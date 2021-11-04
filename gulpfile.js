var gulp = require("gulp");
var sass = require("gulp-sass")(require("sass"));
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");

gulp.task("compile", function () {
    return gulp.src("scss/*.scss").pipe(sass()).pipe(gulp.dest("css"));
});

gulp.task("watch-scss", function () {
    gulp.watch("scss/*.scss", gulp.series("compile", "minify-css"));
});

gulp.task("minify-css", () => {
    return gulp
        .src("css/*.css")
        .pipe(cleanCSS())
        .pipe(
            rename({
                suffix: ".min",
            })
        )
        .pipe(gulp.dest("dist"));
});

gulp.task(
    "default",
    gulp.series("compile", "minify-css", "watch-scss"),
    function () {}
);