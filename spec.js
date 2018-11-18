// Pretty Print JSON
// Mocha Specifications Cases

// Imports
const assert =           require('assert').strict;
const prettyPrintJson =  require('./pretty-print-json.js');

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

   it('formats an object into HTML', () => {
      const data = { active: true, codes: [48348, 28923, 39080], city: 'London' };
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
      const actual =   { html: prettyPrintJson.toHtml(data).split('\n') };
      const expected = { html: htmlLines };
      assert.deepEqual(actual, expected);
      });

   });
