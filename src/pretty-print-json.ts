// pretty-print-json ~ MIT License

export type FormatSettings = {
   indent:      number,   //number of spaces for indentation
   lineNumbers: boolean,  //add line numbers
   linkUrls:    boolean,  //create anchor tags for URLs
   linksNewTab: boolean,  //create target=_blank attribute on anchor tags
   quoteKeys:   boolean,  //always double quote key names
   };
export type FormatOptions = Partial<FormatSettings>;
export type JsonType = 'key' | 'string' | 'number' | 'boolean' | 'null' | 'mark';

export const prettyPrintJson = {

   version: '{{pkg.version}}',

   toHtml(thing: unknown, options?: FormatOptions): string {
      const defaults = {
         indent:      3,
         lineNumbers: false,
         linkUrls:    true,
         linksNewTab: true,
         quoteKeys:   false,
         };
      const settings = { ...defaults, ...options };
      const htmlEntities = (text: string) => text
         // Makes text displayable in browsers.
         .replace(/[&\\"<>']/g, (char: string) => {
            switch (char) {
               case '&':
                  return '&amp;'
               case '\\':
                  return '&bsol;'
               case '"':
                  return '&quot;'
               case '<':
                  return '&lt;'
               case '>':
                  return '&gt;'
               default:
                  return '&apos;'
            }
         })
      const spanTag = (type: JsonType, display?: string): string =>
         // Creates HTML to display a value like: like "<span class=json-boolean>true</span>"
         display ? '<span class=json-' + type + '>' + display + '</span>' : '';
      const buildValueHtml = (value: string): string => {
         // Analyzes a value and returns HTML like: "<span class=json-number>3.1415</span>"
         const strType =    /^"/.test(value) && 'string';
         const boolType =   ['true', 'false'].includes(value) && 'boolean';
         const nullType =   value === 'null' && 'null';
         const type =       boolType || nullType || strType || 'number';
         const urlPattern = /https?:\/\/[^\s"]+/g;
         const target =     settings.linksNewTab ? ' target=_blank' : '';
         const makeLink =   (link: string) => `<a class=json-link href="${link}"${target}>${link}</a>`;
         const display =    strType && settings.linkUrls ? value.replace(urlPattern, makeLink) : value;
         return spanTag(type, display);
         };
      const replacer = (match: string, p1: string, p2: string, p3: string, p4: string): string => {
         // Converts the four parenthesized capture groups (indent, key, value, end) into HTML.
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
         //    Capture group       Part        Description                  Example
         //    ------------------  ----------  ---------------------------  --------------------
         //    ( *)                p1: indent  Spaces for indentation       '   '
         //    ("[^"]+": )         p2: key     Key name                     '"active": '
         //    ("[^"]*"|[\w.+-]*)  p3: value   Key value                    'true'
         //    ([{}[\],]*)         p4: end     Line termination characters  ','
         // For example, '   "active": true,' is parsed into: ['   ', '"active": ', 'true', ',']
      const json = JSON.stringify(thing, null, settings.indent) || 'undefined';
      const html = htmlEntities(json).replace(jsonLine, replacer);
      const makeLine = (line: string): string => `   <li>${line}</li>`;
      const addLineNumbers = (html: string): string =>  //wrap html in an <ol> tag
         ['<ol class=json-lines>', ...html.split('\n').map(makeLine), '</ol>'].join('\n');
      return settings.lineNumbers ? addLineNumbers(html) : html;
      },

   };
