// Pretty Print JSON
// Mocha Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import fs from 'node:fs';

// Setup
import { prettyPrintJson } from '../dist/pretty-print-json.js';

////////////////////////////////////////////////////////////////////////////////
describe('The "dist" folder', () => {

   it('contains the correct files', () => {
      const actual = fs.readdirSync('dist').sort();
      const expected = [
         'css',
         'pretty-print-json.d.ts',
         'pretty-print-json.dev.js',
         'pretty-print-json.js',
         'pretty-print-json.min.js',
         ];
      assertDeepStrictEqual(actual, expected);
      });

   it('contains a "css" subfolder with the correct files', () => {
      const actual = fs.readdirSync('dist/css').sort();
      const expected = [
         'pretty-print-json.css',
         'pretty-print-json.dark-mode.css',
         'pretty-print-json.dark-mode.min.css',
         'pretty-print-json.min.css',
         'pretty-print-json.prefers.css',
         'pretty-print-json.prefers.min.css',
         ];
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('Library version number', () => {

   it('follows semantic version formatting', () => {
      const version =  prettyPrintJson.version;
      const semVer =   /\d+[.]\d+[.]\d+/;
      const actual =   { version: version, valid: semVer.test(version) };
      const expected = { version: version, valid: true };
      assertDeepStrictEqual(actual, expected);
      });

   });
