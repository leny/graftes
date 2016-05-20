/* GrafTès
 *
 * /gulpfile.js - tasks
 *
 * coded by leny@flatLand!
 * started at 20/05/2016
 */

/* eslint-disable */

"use strict";

var gulp = require( "gulp" ),
    gbabel = require( "gulp-babel" );

gulp.task( "build", function() {
    gulp.src( "./src/**/*.js" )
        .pipe( gbabel( {
            "presets": [ "es2015" ]
        } ) )
        .pipe( gulp.dest( "./bin" ) );
} );

gulp.task( "watch", function() {
    gulp.watch( "src/**/*.js", [ "build" ] );
} );

gulp.task( "default", [ "build" ] );

gulp.task( "work", [ build, "watch" ] );
