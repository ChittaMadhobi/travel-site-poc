var gulp = require('gulp'); 
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create(); //We need only one method create()

gulp.task('watch', function(){
    // This does not notify that CSS has been injected on browser on change
    browserSync.init({
        notify: false,    
        server: {
            baseDir: "app"   //This tell browsersync where the index.html dir is
        }
    });

    watch('./app/index.html', function(){
        //gulp.start('html');
        browserSync.reload();
    });
// ** means any directory below styles that would  contain any file with css extension
    watch('./app/assets/styles/**/*.css', function(){
        // gulp.start('styles');
        //browserSync.reload();
        gulp.start('cssInject');
    });
});

/* 1. Gulp watch would execute cssInject when anything changes in any css files.
   2. cssInject would first execute 'styles' related transformation into destination
      directory (./app/temp/styles/styles.css)
   3. Browser will update the finalazied per new CSS without actually refreshing it.     
*/
gulp.task('cssInject', ['styles'], function() {
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());  //We include return since this is async function
});