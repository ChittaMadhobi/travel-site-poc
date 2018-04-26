var gulp = require('gulp'); 
var postcss = require('gulp-postcss'); 
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var cssImport = require('postcss-import');
var mixins = require('postcss-mixins');


gulp.task('styles', function() {
    // gulp.src is where the source  is
    // postcss by itself does not transform anything. Hence, we need to install other 
    // stuff like {npm install autoprefixer --save-dev} and include that in require
    // 'autoprefixer' is served as an array and hence the  [cssvars, nested, autoprefixer ]
    // 'cssvars' replaces variables in CSS with the format that is understood by browsers
    // nested is for enabling nested writing of css into browser understandable CSS format
    // and then the gulp destination
    return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log('Error : ' + errorInfo.toString());
        this.emit('end');             // This will do a nice end in case of error without crashing
    })
    .pipe(gulp.dest('./app/temp/styles'));

    console.log("Style files  has been changed...");
});