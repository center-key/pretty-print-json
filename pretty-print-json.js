// pretty-print-json ~ MIT License

const prettyPrintJson = {

   version: '[VERSION]',

   toHtml: (thing) => {
      const makeHtmlFriendly = (string) => {
         // Converts characters into their HTML entities
         return string
            .replace(/&/g,   '&amp;')
            .replace(/\\"/g, '&quot;')
            .replace(/</g,   '&lt;')
            .replace(/>/g,   '&gt;');
         };
      const replacer = (match, p1, p2, p3, p4) => {
         // Converts the four parenthesized capture groups (indent, key, value, end) into HTML
         const part =       { indent: p1, key: p2, value: p3, end: p4 };
         const key =        '<span class=json-key>';
         const val =        '<span class=json-value>';
         const bool =       '<span class=json-boolean>';
         const str =        '<span class=json-string>';
         const isBool =     ['true', 'false'].includes(part.value);
         const valSpan =    /^"/.test(part.value) ? str : isBool ? bool : val;
         const findName =   /"([\w]+)": |(.*): /;
         const indentHtml = part.indent || '';
         const keyHtml =    part.key ? key + part.key.replace(findName, '$1$2') + '</span>: ' : '';
         const valueHtml =  part.value ? valSpan + part.value + '</span>' : '';
         const endHtml =    part.end || '';
         return indentHtml + keyHtml + valueHtml + endHtml;
         };
      const jsonLine = /^( *)("[^"]+": )?("[^"]*"|[\w.+-]*)?([{}[\],]*)?$/mg;
      // Regex parses each line of the JSON string into four parts:
      //    Capture group       Part    Description                  '   "active": true,'
      //    ------------------  ------  ---------------------------  --------------------
      //    ( *)                indent  Spaces for indentation       '   '
      //    ("[^"]+": )         key     Key name                     '"active": '
      //    ("[^"]*"|[\w.+-]*)  value   Key value                    'true'
      //    ([{}[\],]*)         end     Line termination characters  ','
      return makeHtmlFriendly(JSON.stringify(thing, null, 3)).replace(jsonLine, replacer);
      }

   };

if (typeof module === 'object')
   module.exports = prettyPrintJson;  //node module loading system (CommonJS)
if (typeof window === 'object')
   window.prettyPrintJson = prettyPrintJson;  //support both global and window property
