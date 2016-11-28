var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

gulp.task("sass", function () {
    return gulp.src("./sass/**/*.scss")
        .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
        .pipe(gulp.dest("./css"));
});

gulp.task("js", function () {
    return gulp.src(["js/app.js", "services/*.js", "controllers/*.js"])
        .pipe(concat("script.js"))
        .pipe(uglify())
        .pipe(gulp.dest("js/"));
});

//Watch task
gulp.task("default",function() {
    gulp.watch("sass/**/*.scss",["sass"]);
    gulp.watch(["js/app.js", "services/*.js", "controllers/*.js"], ["js"]);
});
