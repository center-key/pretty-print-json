// Pretty Print JSON
// Mocha Specifications Cases

// Imports
const assert =          require('assert').strict;
const fs =              require('fs');
const prettyPrintJson = require('./pretty-print-json.js');

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Library version number', () => {

   it('follows semantic version formatting', () => {
      const semVerPattern = /\d+[.]\d+[.]\d+/;
      const actual =   { valid: semVerPattern.test(prettyPrintJson.version) };
      const expected = { valid: true };
      assert.deepEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The .toHtml() function', () => {

   it('formats a simple object into the correct HTML', () => {
      const input = { active: true, codes: [48348, 28923, 39080], city: 'London' };
      const htmlLines = [
         '{',
         '   <span class=json-key>active</span>: <span class=json-boolean>true</span>,',
         '   <span class=json-key>codes</span>: [',
         '      <span class=json-value>48348</span>,',
         '      <span class=json-value>28923</span>,',
         '      <span class=json-value>39080</span>',
         '   ],',
         '   <span class=json-key>city</span>: <span class=json-string>"London"</span>',
         '}'
         ];
      const actual =   { html: prettyPrintJson.toHtml(input).split('\n') };
      const expected = { html: htmlLines };
      assert.deepEqual(actual, expected);
      });

   it('handles a value that is an empty array', () => {
      const input = { x: [], y: [true, false], z: [] };
      const htmlLines = [
         '{',
         '   <span class=json-key>x</span>: [],',
         '   <span class=json-key>y</span>: [',
         '      <span class=json-boolean>true</span>,',
         '      <span class=json-boolean>false</span>',
         '   ],',
         '   <span class=json-key>z</span>: []',
         '}'
         ];
      const actual =   { html: prettyPrintJson.toHtml(input).split('\n') };
      const expected = { html: htmlLines };
      assert.deepEqual(actual, expected);
      });

   it('handles a value that is an empty object', () => {
      const input = { x: {}, y: { a: true, b: false }, z: {} };
      const htmlLines = [
         '{',
         '   <span class=json-key>x</span>: {},',
         '   <span class=json-key>y</span>: {',
         '      <span class=json-key>a</span>: <span class=json-boolean>true</span>,',
         '      <span class=json-key>b</span>: <span class=json-boolean>false</span>',
         '   },',
         '   <span class=json-key>z</span>: {}',
         '}'
         ];
      const actual =   { html: prettyPrintJson.toHtml(input).split('\n') };
      const expected = { html: htmlLines };
      assert.deepEqual(actual, expected);
      });

   it('outputs correct number of lines for formatting package.json', () => {
      const packageJson = fs.readFileSync('package.json', 'utf8');
      const lines = prettyPrintJson.toHtml(JSON.parse(packageJson)).split('\n');
      const fileLineCount = packageJson.trim().split('\n').length;
      const actual =   { lines: lines.length,  first: lines[0], last: lines[lines.length - 1] };
      const expected = { lines: fileLineCount, first: '{',      last: '}' };
      assert.deepEqual(actual, expected);
      });

   });
