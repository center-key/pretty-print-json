#!/usr/bin/env node
///////////////////////
// Pretty Print JSON //
// Examples          //
///////////////////////

// To run:
//    $ cd fetch-json
//    $ node spec/examples.js

import { prettyPrintJson } from '../dist/pretty-print-json.js';

const runExamples = () => {
   // Cat in a Box
   const catInABox = ['🐈'];
   console.info(divider);
   console.info(catInABox);
   console.info('HTML:');
   console.info(prettyPrintJson.toHtml(catInABox));

   // Striped
   const striped = { striped: ['🦓', '🐅', '🦨'] };
   const stripedOptions = { indent: 8, lineNumbers: true };
   console.info(divider);
   console.info(striped, '👉', stripedOptions);
   console.info('HTML:');
   console.info(prettyPrintJson.toHtml(striped, stripedOptions));

   // Railway Car
   const railwayCar = {
      active: true,
      mode:   '🚃',
      codes:  [48348, 28923, 39080],
      city:   'London',
      web:    'https://london.gov.uk',
      };
   const railwayCarOptions = {  };
   console.info(divider);
   console.info(railwayCar);
   console.info('HTML:');
   console.info(prettyPrintJson.toHtml(railwayCar, railwayCarOptions));
   };

console.info('Examples');
console.info('========');
console.info('pretty-print-json v' + prettyPrintJson.version);
const divider = '\n----------------';
runExamples();
