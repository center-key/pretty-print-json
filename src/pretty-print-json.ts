// pretty-print-json ~ MIT License

export type FormatOptions = {
   indent?:      number,   //number of spaces for indentation
   linkUrls?:    boolean,  //create anchor tags for URLs
   quoteKeys?:   boolean,  //always double quote key names
   lineNumbers?: boolean //add line number
   };
export type JsonType = 'key' | 'string' | 'number' | 'boolean' | 'null' | 'mark';

const prettyPrintJson = {

   version: '~~~version~~~',

   toHtml(thing: unknown, options?: FormatOptions): string {
      const defaults = { indent: 3, linkUrls: true, quoteKeys: false, lineNumbers: false };
      const settings = { ...defaults, ...options };
      const htmlEntities = (text: string) => text
         // Makes text displayable in browsers.
         .replace(/&/g,   '&amp;')
         .replace(/\\"/g, '&bsol;&quot;')
         .replace(/</g,   '&lt;')
         .replace(/>/g,   '&gt;');
      const spanTag = (type: JsonType, display?: string): string =>
         // Creates HTML to display a value like: like "<span class=json-boolean>true</span>"
         display ? '<span class=json-' + type + '>' + display + '</span>' : '';
      const buildValueHtml = (value: string): string => {
         // Analyzes a value and returns HTML like: "<span class=json-number>3.1415</span>"
         const strType =  /^"/.test(value) && 'string';
         const boolType = ['true', 'false'].includes(value) && 'boolean';
         const nullType = value === 'null' && 'null';
         const type =     boolType || nullType || strType || 'number';
         const urlRegex = /https?:\/\/[^\s"]+/g;
         const makeLink = (link: string) => '<a class=json-link href="' + link + '">' + link + '</a>';
         const display =  strType && settings.linkUrls ? value.replace(urlRegex, makeLink) : value;
         return spanTag(type, display);
         };
      // Create list item tag
      const lineTag = (s: string): string => `   <li>${s}</li>`;
      // Create ordered list tag
      const orderedListTag = (s: string): string => ['<ol class=json-lines>', s, '</ol>'].join('\n');

      const replacer = (match: string, p1: string, p2: string, p3: string, p4: string): string => {
         // Converts the four parenthesized capture groups (indent, key, value, end) into HTML.
         const part =       { indent: p1, key: p2, value: p3, end: p4 };
         const findName =   settings.quoteKeys ? /(.*)(): / : /"([\w$]+)": |(.*): /;
         const indentHtml = part.indent || '';
         const keyName =    part.key && part.key.replace(findName, '$1$2');
         const keyHtml =    part.key ? spanTag('key', keyName) + spanTag('mark', ': ') : '';
         const valueHtml =  part.value ? buildValueHtml(part.value) : '';
         const endHtml =    spanTag('mark', part.end);
         const result =     indentHtml + keyHtml + valueHtml + endHtml;
         return settings.lineNumbers ? lineTag(result) : result;
         };
      const jsonLine = /^( *)("[^"]+": )?("[^"]*"|[\w.+-]*)?([{}[\],]*)?$/mg;
         // Regex parses each line of the JSON string into four parts:
         //    Capture group       Part        Description                  Example
         //    ------------------  ----------  ---------------------------  --------------------
         //    ( *)                p1: indent  Spaces for indentation       '   '
         //    ("[^"]+": )         p2: key     Key name                     '"active": '
         //    ("[^"]*"|[\w.+-]*)  p3: value   Key value                    'true'
         //    ([{}[\],]*)         p4: end     Line termination characters  ','
         // For example, '   "active": true,' is parsed into: ['   ', '"active": ', 'true', ',']
      const json = JSON.stringify(thing, null, settings.indent) || 'undefined';
      const result = htmlEntities(json).replace(jsonLine, replacer);
      return settings.lineNumbers ? orderedListTag(result) : result;
      },

   };

export { prettyPrintJson };
