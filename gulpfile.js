// pretty-print-json
// gulp configuration and tasks

// Imports
import babel from       'gulp-babel';
import gap from         'gulp-append-prepend';
import gulp from        'gulp';
import mergeStream from 'merge-stream';
import rename from      'gulp-rename';
import replace from     'gulp-replace';
import size from        'gulp-size';
import { readFileSync } from 'fs';

// Setup
const pkg =           JSON.parse(readFileSync('./package.json'));
const minorVersion =  pkg.version.split('.').slice(0, 2).join('.');
const transpileES6 =  ['@babel/env', { modules: false }];
const babelMinifyJs = { presets: [transpileES6, 'minify'], comments: false };

// Tasks
const task = {

   minifyJs() {
      return gulp.src('build/pretty-print-json.js')
         .pipe(replace(/^export { (.*) };/m, 'if (typeof window === "object") window.$1 = $1;'))
         .pipe(rename({ extname: '.dev.js' }))
         .pipe(size({ showFiles: true }))
         .pipe(gulp.dest('build'))
         .pipe(babel(babelMinifyJs))
         .pipe(rename('pretty-print-json.min.js'))
         .pipe(gap.appendText('\n'))
         .pipe(size({ showFiles: true }))
         .pipe(size({ showFiles: true, gzip: true }))
         .pipe(gulp.dest('build'));
      },

   publishWebsite() {
      const cdnUri = 'https://cdn.jsdelivr.net/npm/pretty-print-json@' + minorVersion;
      const cdnCss = 'href=' + cdnUri + '/dist/pretty-print-json.css';
      const cdnJs =  'src=' +  cdnUri + '/dist/pretty-print-json.min.js';
      const buildInteractive = () =>
         gulp.src('spec/interactive.html')
            .pipe(rename('index.html'))
            .pipe(replace('href=../pretty-print-json.css',        cdnCss))
            .pipe(replace('src=../dist/pretty-print-json.min.js', cdnJs))
            .pipe(replace('dynamic.html',                         'dynamic/'))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('docs'));
      const buildDynamic = () =>
         gulp.src('spec/dynamic.html')
            .pipe(rename('index.html'))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('docs/dynamic'));
      return mergeStream(buildInteractive(), buildDynamic());
      },

   };

// Gulp
gulp.task('minify-js',       task.minifyJs);
gulp.task('publish-website', task.publishWebsite);
