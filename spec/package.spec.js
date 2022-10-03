// Pretty Print JSON
// Mocha Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import fs from 'fs';

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The "dist" folder', () => {

   it('contains the correct files', () => {
      const actual = fs.readdirSync('dist').sort();
      const expected = [
         'pretty-print-json.css',
         'pretty-print-json.d.ts',
         'pretty-print-json.dark-mode.css',
         'pretty-print-json.dev.js',
         'pretty-print-json.js',
         'pretty-print-json.min.js',
         'pretty-print-json.umd.cjs',
         ];
      assertDeepStrictEqual(actual, expected);
      });

   });
