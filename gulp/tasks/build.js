var gulp = require('gulp');
var imagemin = require('gulp-imagemin'); // This is for minimizing images
var del = require('del'); // Used for deleting 
var usemin = require('gulp-usemin'); // used for compressing the output html, css, javascript files
var rev = require('gulp-rev'); // for rivisioning our output files (CSS etc.)
var cssnano = require('gulp-cssnano'); // minimizes or compress css files
var uglify = require('gulp-uglify'); // used for compressing distribution javascript
var browserSync = require('browser-sync').create(); //Refresh the browser and just create once.

// We are using output as docs because github does not like dist as output. 
// If we push this to any other webapp, it is OK to use dist.

/* This would refresh a browser to show the outcome in a browser automatically after the build dist*/
gulp.task('previewDist', function() {
    browserSync.init({
        notify: false,    
        server: {
            //baseDir: "dist"   This tell browsersync where the index.html dir is
            baseDir: "docs"
        }
    });
});

/* The following task deletest the 'dest' folder at the start of build to make it from scratch */
gulp.task('deleteDistFolder', function() {
    return del('./docs');
});

/*  Copy general files "other than" html, css, javascript and images we need
    For this project we do not need anything else but, this is a test-case
    for other projects which may need moving files into dist folder.
*/
gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
    var pathsToCopy = [
        './app/**/*', 
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ]
    return gulp.src(pathsToCopy)
    .pipe(gulp.dest("./docs"));
});

/* This task takes relevant images, performs minimizing functions and puts it out for distribution 
    This task is depndent on the completion of deleteDistFolder and hence mentioned in ['deleteDistFolder']
    as depndency.  */
gulp.task('optimizeImages', ['deleteDistFolder'], function(){
    // '!' means ... exclude the files as specified. ** means any dub-dorectories. * means ... all files.
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*' ])
    .pipe(imagemin ({
        progressive: true,
        interlaced: true,
        multipass: true
    }))
    .pipe(gulp.dest('./docs/assets/images'));
});

// This would trigger the usemin task after old docs (or dist folder) delete is completed
gulp.task('useminTrigger', ['deleteDistFolder'], function(){
    gulp.start('usemin');
});

/* The following copies, compress, and version the javascript and css files mentioned in 
   html files. For that it uses a tool called 'usemin'

   for this we would need NPM gulp-rev gulp-cssnano gulp-uglify (for js) 
 */
gulp.task('usemin', ['styles', 'scripts'], function(){

    return gulp.src('./app/index.html')
    .pipe(usemin({
        css: [function() {return rev()}, function() {return cssnano()}],
        js: [function() {return rev()}, function() {return uglify()}]
    }))
    .pipe(gulp.dest("./docs"));
});


gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);