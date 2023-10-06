// pretty-print-json ~ MIT License

export type FormatSettings = {
   indent:        number,   //number of spaces for indentation
   lineNumbers:   boolean,  //wrap HTML in an <ol> tag to support line numbers
   linkUrls:      boolean,  //create anchor tags for URLs
   linksNewTab:   boolean,  //add a target=_blank attribute setting to anchor tags
   quoteKeys:     boolean,  //always double quote key names
   trailingComma: boolean,  //append a comma after the last item in arrays and objects
   };
export type FormatOptions = Partial<FormatSettings>;
export type JsonType = 'key' | 'string' | 'number' | 'boolean' | 'null' | 'mark';

const prettyPrintJson = {

   version: '{{pkg.version}}',

   toHtml(data: unknown, options?: FormatOptions): string {
      // Converts an object or primitive into an HTML string suitable for rendering.
      if (!''.at) String.prototype.at = function(i) { return this.charAt(i + (i < 0 ? this.length : 0)); }  //polyfill to support older versions of Electron
      const defaults = {
         indent:        3,
         lineNumbers:   false,
         linkUrls:      true,
         linksNewTab:   true,
         quoteKeys:     false,
         trailingComma: true,
         };
      const settings = { ...defaults, ...options };
      const invalidHtml = /[<>&]|\\"/g;
      const toHtml = (char: string) =>
         char === '<' ? '&lt;' :
         char === '>' ? '&gt;' :
         char === '&' ? '&amp;' :
         '&bsol;&quot;';  //escaped quote: \"
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
      const replacer = (match: string, ...parts: string[]): string => {
         // Converts the four parenthesized capture groups (indent, key, value, end) into HTML.
         const part =       { indent: parts[0], key: parts[1], value: parts[2], end: parts[3] };
         const findName =   settings.quoteKeys ? /(.*)(): / : /"([\w$]+)": |(.*): /;
         const indentHtml = part.indent || '';
         const keyName =    part.key && part.key.replace(findName, '$1$2');
         const keyHtml =    part.key ? spanTag('key', keyName) + spanTag('mark', ': ') : '';
         const valueHtml =  part.value ? buildValueHtml(part.value) : '';
         const noComma =    !part.end || [']', '}'].includes(match.at(-1)!);
         const addComma =   settings.trailingComma && match.at(0) === ' ' && noComma;
         const endHtml =    spanTag('mark', addComma ? (part.end ?? '') + ',' : part.end);
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
      const json =     JSON.stringify(data, null, settings.indent) || 'undefined';
      const html =     json.replace(invalidHtml, toHtml).replace(jsonLine, replacer);
      const makeLine = (line: string): string => `   <li>${line}</li>`;
      const addLineNumbers = (html: string): string =>  //wrap html in an <ol> tag
         ['<ol class=json-lines>', ...html.split('\n').map(makeLine), '</ol>'].join('\n');
      return settings.lineNumbers ? addLineNumbers(html) : html;
      },

   };

export { prettyPrintJson };
