var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    cssComb = require('gulp-csscomb'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    cleanCss = require('gulp-clean-css'),
    autoPrefixer = require('gulp-autoprefixer');
    babel = require('gulp-babel');

gulp.task('scss', () => {
    gulp.src([
        'app/scss/src/app.scss',
        'node_modules/angular-material/angular-material.scss',
        'node_modules/material-icons/css/material-icons.css'
        ])
    .pipe(plumber({
        handleError: function(err){
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(sass())
    .pipe(autoPrefixer())
    .pipe(cssComb())
    .pipe(concat('bundle.css'))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(cleanCss())
    .pipe(gulp.dest('app/scss/dist'))

});

gulp.task('js', () => {
    gulp.src([
        'node_modules/angular/angular.min.js',
        'node_modules/firebase/firebase.js',
        'node_modules/angularfire/dist/angularfire.min.js',
        'node_modules/angular-aria/angular-aria.min.js',
        'node_modules/angular-messages/angular-messages.min.js',
        'node_modules/angular-material/angular-material.min.js',
        'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
        'node_modules/angular-animate/angular-animate.min.js',
        'app/app.js',
        'app/js/src/**/*.js'
    ])
    /*
    .pipe(babel({
      presets: ['env'],
    })) */
    .pipe(plumber({
        handleError(err) {
            console.log(err);
            this.emit('end')
        }
    }))
    .pipe(concat('bundle.js'))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('app/js/dist'))
});

gulp.task('default', ['scss', 'js']);

