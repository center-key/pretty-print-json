//! pretty-print-json v0.3.1 ~ github.com/center-key/pretty-print-json ~ MIT License

const prettyPrintJson = {

   version: '0.3.1',

   toHtml(thing, options) {
      const defaults = { indent: 3, linkUrls: true, quoteKeys: false };
      const settings = { ...defaults, ...options };
      const htmlEntities = (string) => {
         // Makes text displayable in browsers
         return string
            .replace(/&/g,   '&amp;')
            .replace(/\\"/g, '&bsol;&quot;')
            .replace(/</g,   '&lt;')
            .replace(/>/g,   '&gt;');
         };
      const buildValueHtml = (value) => {
         // Returns a string like: "<span class=json-number>3.1415</span>"
         const strType =  /^"/.test(value) && 'string';
         const boolType = ['true', 'false'].includes(value) && 'boolean';
         const nullType = value === 'null' && 'null';
         const type =     boolType || nullType || strType || 'number';
         const urlRegex = /https?:\/\/[^\s"]+/g;
         const makeLink = (link) => '<a class=json-link href="' + link + '">' + link + '</a>';
         const display =  strType && settings.linkUrls ? value.replace(urlRegex, makeLink) : value;
         return '<span class=json-' + type + '>' + display + '</span>';
         };
      const replacer = (match, p1, p2, p3, p4) => {
         // Converts the four parenthesized capture groups (indent, key, value, end) into HTML
         const part =       { indent: p1, key: p2, value: p3, end: p4 };
         const findName =   settings.quoteKeys ? /(.*)(): / : /"([\w$]+)": |(.*): /;
         const indentHtml = part.indent || '';
         const keyName =    part.key && part.key.replace(findName, '$1$2');
         const keyHtml =    part.key ? '<span class=json-key>' + keyName + '</span>: ' : '';
         const valueHtml =  part.value ? buildValueHtml(part.value) : '';
         const endHtml =    part.end || '';
         return indentHtml + keyHtml + valueHtml + endHtml;
         };
      const jsonLine = /^( *)("[^"]+": )?("[^"]*"|[\w.+-]*)?([{}[\],]*)?$/mg;
         // Regex parses each line of the JSON string into four parts:
         //    Capture group       Part        Description                  '   "active": true,'
         //    ------------------  ----------  ---------------------------  --------------------
         //    ( *)                p1: indent  Spaces for indentation       '   '
         //    ("[^"]+": )         p2: key     Key name                     '"active": '
         //    ("[^"]*"|[\w.+-]*)  p3: value   Key value                    'true'
         //    ([{}[\],]*)         p4: end     Line termination characters  ','
      const json = JSON.stringify(thing, null, settings.indent);
      return htmlEntities(json).replace(jsonLine, replacer);
      },

   };

if (typeof module === 'object')
   module.exports = prettyPrintJson;  //node module loading system (CommonJS)
if (typeof window === 'object')
   window.prettyPrintJson = prettyPrintJson;  //support both global and window property
