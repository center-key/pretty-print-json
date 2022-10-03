// pretty-print-json
// gulp configuration and tasks

// Imports
import fs          from 'fs';
import gulp        from 'gulp';
import mergeStream from 'merge-stream';
import rename      from 'gulp-rename';
import replace     from 'gulp-replace';
import size        from 'gulp-size';

// Setup
const pkg =          JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const minorVersion = pkg.version.split('.').slice(0, 2).join('.');

// Tasks
const task = {

   publishWebsite() {
      const cdnUri = 'https://cdn.jsdelivr.net/npm/pretty-print-json@' + minorVersion;
      const cdnCss = 'href=' + cdnUri + '/dist/pretty-print-json.css';
      const cdnJs =  'src=' +  cdnUri + '/dist/pretty-print-json.min.js';
      const buildInteractive = () =>
         gulp.src('spec/interactive.html')
            .pipe(rename('index.html'))
            .pipe(replace('href=../src/pretty-print-json.css',    cdnCss))
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
gulp.task('publish-website', task.publishWebsite);
