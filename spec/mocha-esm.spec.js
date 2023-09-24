// Pretty Print JSON
// Mocha Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { prettyPrintJson } from '../dist/pretty-print-json.js';
import fs from 'fs';

// Setup
const mode =     { type: 'ES Module', file: 'dist/pretty-print-json.js' };
const filename = import.meta.url.replace(/.*\//, '');  //jshint ignore:line

// Specification suite
describe(`Specifications: ${filename} - ${mode.type} (${mode.file})`, () => {

////////////////////////////////////////////////////////////////////////////////
describe('Library version number', () => {

   it('follows semantic version formatting', () => {
      const data = prettyPrintJson.version;
      const semVerPattern = /\d+[.]\d+[.]\d+/;
      const actual =   { version: data, valid: semVerPattern.test(data) };
      const expected = { version: data, valid: true };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('The .toHtml() function', () => {

   it('formats a simple object into the correct HTML', () => {
      const input = { active: true, codes: [48348, 28923, 39080], city: 'London' };
      const htmlLines = [
         '<span class=json-mark>{</span>',
         '   <span class=json-key>active</span><span class=json-mark>: </span><span class=json-boolean>true</span><span class=json-mark>,</span>',
         '   <span class=json-key>codes</span><span class=json-mark>: </span><span class=json-mark>[</span>',
         '      <span class=json-number>48348</span><span class=json-mark>,</span>',
         '      <span class=json-number>28923</span><span class=json-mark>,</span>',
         '      <span class=json-number>39080</span><span class=json-mark>,</span>',
         '   <span class=json-mark>],</span>',
         '   <span class=json-key>city</span><span class=json-mark>: </span><span class=json-string>"London"</span><span class=json-mark>,</span>',
         '<span class=json-mark>}</span>',
         ];
      const actual =   { html: prettyPrintJson.toHtml(input).split('\n') };
      const expected = { html: htmlLines };
      assertDeepStrictEqual(actual, expected);
      });

   it('puts quotes around key names that contain special characters', () => {
      const input = {
         normal:        'No quotes',
         '     ':       'Spaces',
         '$':           'Money',
         '~!@#$%^&*()': 'Crazy!',
         '🚀':          'Unicode',
         };
      const htmlLines = [
         '<span class=json-mark>{</span>',
         '   <span class=json-key>normal</span><span class=json-mark>: </span><span class=json-string>"No quotes"</span><span class=json-mark>,</span>',
         '   <span class=json-key>"     "</span><span class=json-mark>: </span><span class=json-string>"Spaces"</span><span class=json-mark>,</span>',
         '   <span class=json-key>$</span><span class=json-mark>: </span><span class=json-string>"Money"</span><span class=json-mark>,</span>',
         '   <span class=json-key>"~!@#$%^&amp;*()"</span><span class=json-mark>: </span><span class=json-string>"Crazy!"</span><span class=json-mark>,</span>',
         '   <span class=json-key>"🚀"</span><span class=json-mark>: </span><span class=json-string>"Unicode"</span><span class=json-mark>,</span>',
         '<span class=json-mark>}</span>',
         ];
      const actual =   { html: prettyPrintJson.toHtml(input).split('\n') };
      const expected = { html: htmlLines };
      assertDeepStrictEqual(actual, expected);
      });

   it('handles a value that is an emoticon', () => {
      const input = { $: '💰' };
      const htmlLines = [
         '<span class=json-mark>{</span>',
         '   <span class=json-key>$</span><span class=json-mark>: </span><span class=json-string>"💰"</span><span class=json-mark>,</span>',
         '<span class=json-mark>}</span>',
         ];
      const actual =   { html: prettyPrintJson.toHtml(input).split('\n') };
      const expected = { html: htmlLines };
      assertDeepStrictEqual(actual, expected);
      });

   it('handles a value that is null', () => {
      const input = { _: null };
      const htmlLines = [
         '<span class=json-mark>{</span>',
         '   <span class=json-key>_</span><span class=json-mark>: </span><span class=json-null>null</span><span class=json-mark>,</span>',
         '<span class=json-mark>}</span>',
         ];
      const actual =   { html: prettyPrintJson.toHtml(input).split('\n') };
      const expected = { html: htmlLines };
      assertDeepStrictEqual(actual, expected);
      });

   it('handles a value that is an empty array', () => {
      const input = [[], { x: [], y: [true, false, []], z: [] }];
      const htmlLines = [
         '<span class=json-mark>[</span>',
         '   <span class=json-mark>[],</span>',
         '   <span class=json-mark>{</span>',
         '      <span class=json-key>x</span><span class=json-mark>: </span><span class=json-mark>[],</span>',
         '      <span class=json-key>y</span><span class=json-mark>: </span><span class=json-mark>[</span>',
         '         <span class=json-boolean>true</span><span class=json-mark>,</span>',
         '         <span class=json-boolean>false</span><span class=json-mark>,</span>',
         '         <span class=json-mark>[],</span>',
         '      <span class=json-mark>],</span>',
         '      <span class=json-key>z</span><span class=json-mark>: </span><span class=json-mark>[],</span>',
         '   <span class=json-mark>},</span>',
         '<span class=json-mark>]</span>',
         ];
      const actual =   { html: prettyPrintJson.toHtml(input).split('\n') };
      const expected = { html: htmlLines };
      assertDeepStrictEqual(actual, expected);
      });

   it('handles a value that is an empty object', () => {
      const input = { x: {}, y: { a: true, b: false }, z: {} };
      const htmlLines = [
         '<span class=json-mark>{</span>',
         '   <span class=json-key>x</span><span class=json-mark>: </span><span class=json-mark>{},</span>',
         '   <span class=json-key>y</span><span class=json-mark>: </span><span class=json-mark>{</span>',
         '      <span class=json-key>a</span><span class=json-mark>: </span><span class=json-boolean>true</span><span class=json-mark>,</span>',
         '      <span class=json-key>b</span><span class=json-mark>: </span><span class=json-boolean>false</span><span class=json-mark>,</span>',
         '   <span class=json-mark>},</span>',
         '   <span class=json-key>z</span><span class=json-mark>: </span><span class=json-mark>{},</span>',
         '<span class=json-mark>}</span>',
         ];
      const actual =   { html: prettyPrintJson.toHtml(input).split('\n') };
      const expected = { html: htmlLines };
      assertDeepStrictEqual(actual, expected);
      });

   it('handles a value that is a string containing quotes', () => {
      const input = { quote: 'The Terminator warned, "I\'ll be back."' };
      const htmlLines = [
         '<span class=json-mark>{</span>',
         '   <span class=json-key>quote</span><span class=json-mark>: </span><span class=json-string>' +
            '"The Terminator warned, &bsol;&quot;I\'ll be back.&bsol;&quot;"</span><span class=json-mark>,</span>',
         '<span class=json-mark>}</span>',
         ];
      const actual =   { html: prettyPrintJson.toHtml(input).split('\n') };
      const expected = { html: htmlLines };
      assertDeepStrictEqual(actual, expected);
      });

   it('outputs correct number of lines for formatting package.json', () => {
      const packageJson = fs.readFileSync('package.json', 'utf-8');
      const lines = prettyPrintJson.toHtml(JSON.parse(packageJson)).split('\n');
      const fileLineCount = packageJson.trim().split('\n').length;
      const actual =   {
         lines: lines.length,
         first: lines[0],
         last:  lines.at(-1),
         };
      const expected = {
         lines: fileLineCount,
         first: '<span class=json-mark>{</span>',
         last:  '<span class=json-mark>}</span>',
         };
      assertDeepStrictEqual(actual, expected);
      });

   it('handles single values', () => {
      const input = ['String cheese!', Math.PI, true, null, [], {}];
      const htmlLines = [
         '<span class=json-string>"String cheese!"</span>',
         '<span class=json-number>3.141592653589793</span>',
         '<span class=json-boolean>true</span>',
         '<span class=json-null>null</span>',
         '<span class=json-mark>[]</span>',
         '<span class=json-mark>{}</span>',
         ];
      const actual =   { html: input.map(prettyPrintJson.toHtml) };
      const expected = { html: htmlLines };
      assertDeepStrictEqual(actual, expected);
      });

   it('handles nothing (undefined)', () => {
      const htmlLines = [
         '<span class=json-number>undefined</span>',
         ];
      const actual =   { html: prettyPrintJson.toHtml().split('\n') };
      const expected = { html: htmlLines };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('The "indent" option', () => {

   it('indents the correct number of spaces', () => {
      const input = { active: true, codes: [48348, 28923, 39080], city: 'London' };
      const htmlLines = [
         '<span class=json-mark>{</span>',
         '          <span class=json-key>active</span><span class=json-mark>: </span><span class=json-boolean>true</span><span class=json-mark>,</span>',
         '          <span class=json-key>codes</span><span class=json-mark>: </span><span class=json-mark>[</span>',
         '                    <span class=json-number>48348</span><span class=json-mark>,</span>',
         '                    <span class=json-number>28923</span><span class=json-mark>,</span>',
         '                    <span class=json-number>39080</span><span class=json-mark>,</span>',
         '          <span class=json-mark>],</span>',
         '          <span class=json-key>city</span><span class=json-mark>: </span><span class=json-string>"London"</span><span class=json-mark>,</span>',
         '<span class=json-mark>}</span>',
         ];
      const actual =   { html: prettyPrintJson.toHtml(input, { indent: 10 }).split('\n') };
      const expected = { html: htmlLines };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('The "lineNumbers" option', () => {

   it('correclty wraps the HTML in an <ol> tag', () => {
      const input = { active: true, codes: [48348, 28923, 39080], city: 'London' };
      const htmlLines = [
         '<ol class=json-lines>',
         '   <li><span class=json-mark>{</span></li>',
         '   <li>   <span class=json-key>active</span><span class=json-mark>: </span><span class=json-boolean>true</span><span class=json-mark>,</span></li>',
         '   <li>   <span class=json-key>codes</span><span class=json-mark>: </span><span class=json-mark>[</span></li>',
         '   <li>      <span class=json-number>48348</span><span class=json-mark>,</span></li>',
         '   <li>      <span class=json-number>28923</span><span class=json-mark>,</span></li>',
         '   <li>      <span class=json-number>39080</span><span class=json-mark>,</span></li>',
         '   <li>   <span class=json-mark>],</span></li>',
         '   <li>   <span class=json-key>city</span><span class=json-mark>: </span><span class=json-string>"London"</span><span class=json-mark>,</span></li>',
         '   <li><span class=json-mark>}</span></li>',
         '</ol>',
         ];
      const actual =   { html: prettyPrintJson.toHtml(input, { lineNumbers: true }).split('\n') };
      const expected = { html: htmlLines };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('The "linkUrls" option', () => {
   const input = {
      city:       'London',
      url:        'https://en.wikipedia.org/wiki/London',
      info:       'Visit https://en.wikipedia.org/wiki/London https://en.wikipedia.org/wiki/United_Kingdom',
      local:      'http://localhost/london/',
      characters: 'https://example.com/_.~-/%20/?x=777',
      };

   it('creates anchor tags for URLs', () => {
      const htmlLines = [
         '<span class=json-mark>{</span>',
         '   <span class=json-key>city</span><span class=json-mark>: </span><span class=json-string>"London"</span><span class=json-mark>,</span>',
         '   <span class=json-key>url</span><span class=json-mark>: </span><span class=json-string>"<a class=json-link href="https://en.wikipedia.org/wiki/London">https://en.wikipedia.org/wiki/London</a>"</span><span class=json-mark>,</span>',
         '   <span class=json-key>info</span><span class=json-mark>: </span><span class=json-string>"Visit <a class=json-link href="https://en.wikipedia.org/wiki/London">https://en.wikipedia.org/wiki/London</a> <a class=json-link href="https://en.wikipedia.org/wiki/United_Kingdom">https://en.wikipedia.org/wiki/United_Kingdom</a>"</span><span class=json-mark>,</span>',
         '   <span class=json-key>local</span><span class=json-mark>: </span><span class=json-string>"<a class=json-link href="http://localhost/london/">http://localhost/london/</a>"</span><span class=json-mark>,</span>',
         '   <span class=json-key>characters</span><span class=json-mark>: </span><span class=json-string>"<a class=json-link href="https://example.com/_.~-/%20/?x=777">https://example.com/_.~-/%20/?x=777</a>"</span><span class=json-mark>,</span>',
         '<span class=json-mark>}</span>',
         ];
      const options =  { linkUrls: true, linksNewTab: false };
      const actual =   { html: prettyPrintJson.toHtml(input, options).split('\n') };
      const expected = { html: htmlLines };
      assertDeepStrictEqual(actual, expected);
      });

   it('creates anchor tags for new tabs when "linksNewTab" is enabled', () => {
      const htmlLines = [
         '<span class=json-mark>{</span>',
         '   <span class=json-key>city</span><span class=json-mark>: </span><span class=json-string>"London"</span><span class=json-mark>,</span>',
         '   <span class=json-key>url</span><span class=json-mark>: </span><span class=json-string>"<a class=json-link href="https://en.wikipedia.org/wiki/London" target=_blank>https://en.wikipedia.org/wiki/London</a>"</span><span class=json-mark>,</span>',
         '   <span class=json-key>info</span><span class=json-mark>: </span><span class=json-string>"Visit <a class=json-link href="https://en.wikipedia.org/wiki/London" target=_blank>https://en.wikipedia.org/wiki/London</a> <a class=json-link href="https://en.wikipedia.org/wiki/United_Kingdom" target=_blank>https://en.wikipedia.org/wiki/United_Kingdom</a>"</span><span class=json-mark>,</span>',
         '   <span class=json-key>local</span><span class=json-mark>: </span><span class=json-string>"<a class=json-link href="http://localhost/london/" target=_blank>http://localhost/london/</a>"</span><span class=json-mark>,</span>',
         '   <span class=json-key>characters</span><span class=json-mark>: </span><span class=json-string>"<a class=json-link href="https://example.com/_.~-/%20/?x=777" target=_blank>https://example.com/_.~-/%20/?x=777</a>"</span><span class=json-mark>,</span>',
         '<span class=json-mark>}</span>',
         ];
      const options =  { linkUrls: true, linksNewTab: true };
      const actual =   { html: prettyPrintJson.toHtml(input, options).split('\n') };
      const expected = { html: htmlLines };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('The "quoteKeys" option', () => {

   it('puts double quotes around all key names', () => {
      const input = { active: true, codes: [48348, 28923, 39080], city: 'London' };
      const htmlLines = [
         '<span class=json-mark>{</span>',
         '   <span class=json-key>"active"</span><span class=json-mark>: </span><span class=json-boolean>true</span><span class=json-mark>,</span>',
         '   <span class=json-key>"codes"</span><span class=json-mark>: </span><span class=json-mark>[</span>',
         '      <span class=json-number>48348</span><span class=json-mark>,</span>',
         '      <span class=json-number>28923</span><span class=json-mark>,</span>',
         '      <span class=json-number>39080</span><span class=json-mark>,</span>',
         '   <span class=json-mark>],</span>',
         '   <span class=json-key>"city"</span><span class=json-mark>: </span><span class=json-string>"London"</span><span class=json-mark>,</span>',
         '<span class=json-mark>}</span>',
         ];
      const actual =   { html: prettyPrintJson.toHtml(input, { quoteKeys: true }).split('\n') };
      const expected = { html: htmlLines };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('The "trailingComma" option can be disabled', () => {

   it('to remove commas after the last item in arrays and objects', () => {
      const input = { active: true, codes: [48348, 28923, 39080], city: 'London' };
      const htmlLines = [
         '<span class=json-mark>{</span>',
         '   <span class=json-key>active</span><span class=json-mark>: </span><span class=json-boolean>true</span><span class=json-mark>,</span>',
         '   <span class=json-key>codes</span><span class=json-mark>: </span><span class=json-mark>[</span>',
         '      <span class=json-number>48348</span><span class=json-mark>,</span>',
         '      <span class=json-number>28923</span><span class=json-mark>,</span>',
         '      <span class=json-number>39080</span>',
         '   <span class=json-mark>],</span>',
         '   <span class=json-key>city</span><span class=json-mark>: </span><span class=json-string>"London"</span>',
         '<span class=json-mark>}</span>',
         ];
      const actual =   { html: prettyPrintJson.toHtml(input, { trailingComma: false }).split('\n') };
      const expected = { html: htmlLines };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
});
