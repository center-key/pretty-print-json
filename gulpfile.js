// pretty-print-json
// gulp configuration and tasks

// Imports
const babel =         require('gulp-babel');
const gap =           require('gulp-append-prepend');
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
const minorVersion =   pkg.version.split('.').slice(0,2).join('.');
const home =           pkg.homepage.replace('https://', '');
const banner =         'pretty-print-json v' + pkg.version + ' ~ ' + home + ' ~ MIT License';
const bannerCss =      '/*! ' + banner + ' */\n';
const bannerJs =       '//! ' + banner + '\n';
const htmlHintConfig = { 'attr-value-double-quotes': false };
const headerComments = /^\/\/.*\n/gm;
const transpileES6 =   ['@babel/env', { modules: false }];
const babelMinifyJs =  { presets: [transpileES6, 'minify'], comments: false };

// Tasks
const task = {
   buildDistribution: () => {
      const buildCss = () =>
         gulp.src('pretty-print-json.css')
            .pipe(replace(/.*License.*\n/, ''))
            .pipe(header(bannerCss))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('dist'));
      const buildJs = () =>
         gulp.src('pretty-print-json.js')
            .pipe(replace(headerComments, ''))
            .pipe(header(bannerJs))
            .pipe(replace('[VERSION]', pkg.version))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('dist'))
            .pipe(babel(babelMinifyJs))
            .pipe(rename({ extname: '.min.js' }))
            .pipe(header(bannerJs))
            .pipe(gap.appendText('\n'))
            .pipe(size({ showFiles: true }))
            .pipe(size({ showFiles: true, gzip: true }))
            .pipe(gulp.dest('dist'));
      return mergeStream(buildCss(), buildJs());
      },
   publishWebsite: () => {
      const cdnUri = 'https://cdn.jsdelivr.net/npm/pretty-print-json@' + minorVersion;
      const cdnCss = 'href=' + cdnUri + '/dist/pretty-print-json.css';
      const cdnJs =  'src=' +  cdnUri + '/dist/pretty-print-json.js';
      return gulp.src('spec/interactive.html')
         .pipe(htmlHint(htmlHintConfig))
         .pipe(htmlHint.reporter())
         .pipe(htmlValidator())
         .pipe(htmlValidator.reporter())
         .pipe(rename('index.html'))
         .pipe(replace('href=../pretty-print-json.css', cdnCss))
         .pipe(replace('src=../pretty-print-json.js',   cdnJs))
         .pipe(size({ showFiles: true }))
         .pipe(gulp.dest('docs'));
      }
   };

// Gulp
gulp.task('build-dist',      task.buildDistribution);
gulp.task('publish-website', task.publishWebsite);
