// pretty-print-json ~ MIT License

export type FormatOptions = {
   indent?:    number,
   linkUrls?:  boolean,
   quoteKeys?: boolean;
   };
export type JsonType = 'key' | 'string' | 'number' | 'boolean' | 'null' | 'mark';

const prettyPrintJson = {

   version: '[VERSION]',

   toHtml(thing: unknown, options?: FormatOptions): string {
      const defaults = { indent: 3, linkUrls: true, quoteKeys: false };
      const settings = { ...defaults, ...options };
      const htmlEntities = (text: string) => {
         // Makes text displayable in browsers
         return text
            .replace(/&/g,   '&amp;')
            .replace(/\\"/g, '&bsol;&quot;')
            .replace(/</g,   '&lt;')
            .replace(/>/g,   '&gt;');
         };
      const spanTag = (type: JsonType, display?: string): string =>
         display ? '<span class=json-' + type + '>' + display + '</span>' : '';
      const buildValueHtml = (value: string): string => {
         // Returns a string like: "<span class=json-number>3.1415</span>"
         const strType =  /^"/.test(value) && 'string';
         const boolType = ['true', 'false'].includes(value) && 'boolean';
         const nullType = value === 'null' && 'null';
         const type =     boolType || nullType || strType || 'number';
         const urlRegex = /https?:\/\/[^\s"]+/g;
         const makeLink = (link: string) => '<a class=json-link href="' + link + '">' + link + '</a>';
         const display =  strType && settings.linkUrls ? value.replace(urlRegex, makeLink) : value;
         return spanTag(type, display);
         };
      const replacer = (match: string, p1: string, p2: string, p3: string, p4: string): string => {
         // Converts the four parenthesized capture groups (indent, key, value, end) into HTML
         const part =       { indent: p1, key: p2, value: p3, end: p4 };
         const findName =   settings.quoteKeys ? /(.*)(): / : /"([\w$]+)": |(.*): /;
         const indentHtml = part.indent || '';
         const keyName =    part.key && part.key.replace(findName, '$1$2');
         const keyHtml =    part.key ? spanTag('key', keyName) + spanTag('mark', ': ') : '';
         const valueHtml =  part.value ? buildValueHtml(part.value) : '';
         const endHtml =    spanTag('mark', part.end);
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
      const json = JSON.stringify(thing, null, settings.indent) || 'undefined';
      return htmlEntities(json).replace(jsonLine, replacer);
      },

   };

export { prettyPrintJson };
