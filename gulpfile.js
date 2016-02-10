// including plugins
var gulp = require('gulp')
, uglify = require("gulp-uglify")
, concat = require("gulp-concat");
 

var dentiline = [
    "js/hefesoft/imagenes/imagenesFb.js",
    "vendors/hefesoft/fb/services/fbHefesoft.js",
    "vendors/hefesoft/google/services/drive.upload.js",
    "vendors/hefesoft/google/services/youtube.js",
    "js/hefesoft/videos/videos.js",
    "vendors/hefesoft/tutorial.js",
    "js/hefesoft/procedimientos/servicios/procedimientos.js",
    "js/hefesoft/Prestador/sevice/prestador.js",
    "js/hefesoft/help/helperModalController.js"
]



gulp.task('concat', function () {
    gulp.src(dentiline)
    .pipe(concat('dentiline.js'))
    .pipe(uglify())
    .pipe(gulp.dest('bundle/'));
});