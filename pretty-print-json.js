//! pretty-print-json ~ MIT License

const prettyPrintJson = {
   version: '0.0.3',
   toHtml: function(obj) {
      function replacer(match, p1, p2, p3, p4) {
         // Converts the four parenthesized capture groups (indent, key, value, end) into HTML
         const part = { indent: p1, key: p2, value: p3, end: p4 };
         const key =  '<span class=json-key>';
         const val =  '<span class=json-value>';
         const bool = '<span class=json-boolean>';
         const str =  '<span class=json-string>';
         const isBool = ['true', 'false'].includes(part.value);
         const valSpan = /^"/.test(part.value) ? str : isBool ? bool : val;
         let r = part.indent || '';
         if (part.key)
            r = r + key + part.key.replace(/[": ]/g, '') + '</span>: ';
         if (part.value)
            r = r + valSpan + part.value + '</span>';
         return r + (part.end || '');
         }
      const jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
      // Regex parses each line of the JSON string into four parts:
      //    Capture group       Name    Part                         "   active: true,"
      //    ------------------  ------  ---------------------------  ------------------
      //    ( *)                indent  Spaces for indentation       "   "
      //    ("[\w]+": )         key     Key name                     "active"
      //    ("[^"]*"|[\w.+-]*)  value   Key value                    "true"
      //    ([,[{])             end     Line termination characters  ","
      return JSON.stringify(obj, null, 3)
         .replace(/&/g, '&amp;')
         .replace(/\\"/g, '&quot;')
         .replace(/</g, '&lt;')
         .replace(/>/g, '&gt;')
         .replace(jsonLine, replacer);
      }
   };

if (typeof module === 'object')
   module.exports = prettyPrintJson;  //node module loading system (CommonJS)
if (typeof window === 'object')
   window.prettyPrintJson = prettyPrintJson;  //support both global and window property
