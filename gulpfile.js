// pretty-print-json
// gulp configuration and tasks

// Imports
import babel from       'gulp-babel';
import gap from         'gulp-append-prepend';
import gulp from        'gulp';
import header from      'gulp-header';
import htmlHint from    'gulp-htmlhint';
import mergeStream from 'merge-stream';
import rename from      'gulp-rename';
import replace from     'gulp-replace';
import size from        'gulp-size';
import { htmlValidator } from 'gulp-w3c-html-validator';
import { readFileSync } from 'fs';

// Setup
const pkg =            JSON.parse(readFileSync('./package.json'));
const minorVersion =   pkg.version.split('.').slice(0, 2).join('.');
const home =           pkg.repository.replace('github:', 'github.com/');
const banner =         'pretty-print-json v' + pkg.version + ' ~ ' + home + ' ~ MIT License';
const bannerCss =      '/*! ' + banner + ' */';
const bannerJs =       '//! ' + banner + '\n\n';
const htmlHintConfig = { 'attr-value-double-quotes': false };
const headerComments = { css: /^\/[*].*[*]\/$/gm, js: /^\/\/.*\n/gm };
const transpileES6 =   ['@babel/env', { modules: false }];
const babelMinifyJs =  { presets: [transpileES6, 'minify'], comments: false };

// Tasks
const task = {

   makeDistribution() {
      const buildCss = () =>
         gulp.src('pretty-print-json.css')
            .pipe(replace(headerComments.css, ''))
            .pipe(header(bannerCss))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('dist'));
      const buildDts = () =>
         gulp.src('build/pretty-print-json.d.ts')
            .pipe(header(bannerJs))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('dist'));
      const buildEsm = () =>
         gulp.src('build/pretty-print-json.js')
            .pipe(replace(headerComments.js, ''))
            .pipe(header(bannerJs))
            .pipe(replace('[VERSION]', pkg.version))
            .pipe(size({ showFiles: true }))
            .pipe(rename({ extname: '.esm.js' }))
            .pipe(gulp.dest('dist'));
      const buildUmd = () =>
         gulp.src('build/umd/pretty-print-json.js')
            .pipe(header(bannerJs))
            .pipe(replace('[VERSION]', pkg.version))
            .pipe(rename({ extname: '.umd.cjs' }))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('dist'));
      const buildJs = () =>
         gulp.src('build/pretty-print-json.js')
            .pipe(replace(headerComments.js, ''))
            .pipe(header(bannerJs))
            .pipe(replace('[VERSION]', pkg.version))
            .pipe(replace(/^export { (.*) };/m, 'if (typeof window === "object") window.$1 = $1;'))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('dist'))
            .pipe(babel(babelMinifyJs))
            .pipe(rename({ extname: '.min.js' }))
            .pipe(header(bannerJs.replace('\n\n', '\n')))
            .pipe(gap.appendText('\n'))
            .pipe(size({ showFiles: true }))
            .pipe(size({ showFiles: true, gzip: true }))
            .pipe(gulp.dest('dist'));
      return mergeStream(buildCss(), buildDts(), buildEsm(), buildUmd(), buildJs());
      },

   publishWebsite() {
      const cdnUri = 'https://cdn.jsdelivr.net/npm/pretty-print-json@' + minorVersion;
      const cdnCss = 'href=' + cdnUri + '/dist/pretty-print-json.css';
      const cdnJs =  'src=' +  cdnUri + '/dist/pretty-print-json.js';
      const lint = () =>
         gulp.src('spec/**/*.html')
            .pipe(htmlHint(htmlHintConfig))
            .pipe(htmlHint.reporter())
            .pipe(htmlValidator.analyzer())
            .pipe(htmlValidator.reporter());
      const buildInteractive = () =>
         gulp.src('spec/interactive.html')
            .pipe(rename('index.html'))
            .pipe(replace('href=../pretty-print-json.css',    cdnCss))
            .pipe(replace('src=../dist/pretty-print-json.js', cdnJs))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('docs'));
      const buildDynamic = () =>
         gulp.src('spec/dynamic.html')
            .pipe(rename('index.html'))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('docs/dynamic'));
      return mergeStream(lint(), buildInteractive(), buildDynamic());
      },

   };

// Gulp
gulp.task('make-dist',       task.makeDistribution);
gulp.task('publish-website', task.publishWebsite);
