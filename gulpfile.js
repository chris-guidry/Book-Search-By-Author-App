var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var webserver = require("gulp-webserver");

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

gulp.task("webserver", function() {
    gulp.src("./")
        .pipe(webserver({
            livereload: true,
            open: true,
            fallback: "index.html"
        }));
});

//Watch task
gulp.task("default",function() {
    gulp.watch("sass/**/*.scss",["sass"]);
    gulp.watch(["js/app.js", "services/*.js", "controllers/*.js"], ["js"]);
    return gulp.start(["webserver"]);
});
