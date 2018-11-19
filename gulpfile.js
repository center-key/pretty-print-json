// pretty-print-json
// gulp configuration and tasks

// Imports
const babel =         require('gulp-babel');
const gulp =          require('gulp');
const header =        require('gulp-header');
const htmlHint =      require('gulp-htmlhint');
const htmlValidator = require('gulp-w3c-html-validator');
const mergeStream =   require('merge-stream');
const rename =        require('gulp-rename');
const replace =       require('gulp-replace');
const size =          require('gulp-size');

// Setup
const pkg =            require('./package.json');
const home =           pkg.homepage.replace('https://', '');
const license =        pkg.license + ' License';
const banner =         'pretty-print-json v' + [pkg.version, home, license].join(' ~ ');
const htmlHintConfig = { 'attr-value-double-quotes': false };

// Tasks
const task = {
   analyzeHtml: function() {
      return gulp.src('pretty-print-json.html')
         .pipe(htmlHint(htmlHintConfig))
         .pipe(htmlHint.reporter())
         .pipe(htmlValidator())
         .pipe(htmlValidator.reporter())
         .pipe(size({ showFiles: true }))
         ;
      },
   setVersion: function() {
      const semVerPattern = /\d+[.]\d+[.]\d+/g;
      return gulp.src('pretty-print-json.js')
         .pipe(replace(semVerPattern, pkg.version))
         .pipe(gulp.dest('.'));
      },
   buildDistribution: function() {
      const transpileES6 = ['@babel/env', { modules: false }];
      const staticBanner = /[/][/]!.*/;
      return mergeStream(
         gulp.src('pretty-print-json.css')
            .pipe(header('/*! ' + banner + ' */\n'))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('dist')),
         gulp.src('pretty-print-json.js')
            .pipe(replace(staticBanner, '//! ' + banner))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('dist')),
         gulp.src('pretty-print-json.js')
            .pipe(babel({ presets: [transpileES6, 'minify'], comments: false }))
            .pipe(rename({ extname: '.min.js' }))
            .pipe(header('//! ' + banner + '\n'))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('dist'))
         );
      }
   };

// Gulp
gulp.task('lint-html',   task.analyzeHtml);
gulp.task('set-version', task.setVersion);
gulp.task('build-dist',  task.buildDistribution);
