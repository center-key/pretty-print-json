// Pretty Print JSON
// Mocha Specifications Cases

// Imports
const assert = require('assert').strict;
const fs =     require('fs');

// Setup
const extension =       process.env.specMode === 'minified' ? 'min.js' : 'js';
const path =            '../dist/pretty-print-json.' + extension;
const prettyPrintJson = require(path);

// Specification suite
describe(require('path').basename(__filename) + ': ' + path, () => {

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Library version number', () => {

   it('follows semantic version formatting', () => {
      const data = prettyPrintJson.version;
      const semVerPattern = /\d+[.]\d+[.]\d+/;
      const actual =   { version: data, valid: semVerPattern.test(data) };
      const expected = { version: data, valid: true };
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

   it('puts quotes around key names that contain special characters', () => {
      const input = { normal: 'No quotes', '     ': 'Spaces', '~!@#$%^&*()': 'Crazy!', "🚀": 'Unicode' };
      const htmlLines = [
         '{',
         '   <span class=json-key>normal</span>: <span class=json-string>"No quotes"</span>,',
         '   <span class=json-key>"     "</span>: <span class=json-string>"Spaces"</span>,',
         '   <span class=json-key>"~!@#$%^&amp;*()"</span>: <span class=json-string>"Crazy!"</span>,',
         '   <span class=json-key>"🚀"</span>: <span class=json-string>"Unicode"</span>',
         '}'
         ];
      const actual =   { html: prettyPrintJson.toHtml(input).split('\n') };
      const expected = { html: htmlLines };
      assert.deepEqual(actual, expected);
      });

   it('handles a value that is an empty array', () => {
      const input = [[], { x: [], y: [true, false, []], z: [] }];
      const htmlLines = [
         '[',
         '   [],',
         '   {',
         '      <span class=json-key>x</span>: [],',
         '      <span class=json-key>y</span>: [',
         '         <span class=json-boolean>true</span>,',
         '         <span class=json-boolean>false</span>,',
         '         []',
         '      ],',
         '      <span class=json-key>z</span>: []',
         '   }',
         ']',
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

   it('handles a value that is a string containing quotes', () => {
      const input = { quote: 'The Terminator warned, "I\'ll be back."' };
      const htmlLines = [
         '{',
         '   <span class=json-key>quote</span>: <span class=json-string>"The Terminator warned, &bsol;&quot;I\'ll be back.&bsol;&quot;"</span>',
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

////////////////////////////////////////////////////////////////////////////////////////////////////
});
