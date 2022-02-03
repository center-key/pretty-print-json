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
   console.log(divider);
   console.log(catInABox);
   console.log(prettyPrintJson.toHtml(catInABox));

   // Cat in a Big Box
   const catInABigBox = ['🐈'];
   const catInABigBoxOptions = { indent: 8 };
   console.log(divider);
   console.log(catInABigBox, '👉', catInABigBoxOptions);
   console.log(prettyPrintJson.toHtml(catInABigBox, catInABigBoxOptions));

   // Railway Car
   const railwayCar = { active: true, mode: '🚃', codes: [48348, 28923, 39080], city: 'London' };
   console.log(divider);
   console.log(railwayCar);
   console.log(prettyPrintJson.toHtml(railwayCar));
   };

console.log('Examples');
console.log('========');
console.log('pretty-print-json v' + prettyPrintJson.version);
const divider = '\n----------------';
runExamples();
