const prettyPrintJson = {
   version: '0.0.1',
   toHtml: function(obj) {
      function replacer(match, pIndent, pKey, pVal, pEnd) {
         const key =  '<span class=json-key>';
         const val =  '<span class=json-value>';
         const bool = '<span class=json-boolean>';
         const str =  '<span class=json-string>';
         const isBool = ['true', 'false'].includes(pVal);
         const pValSpan = /^"/.test(pVal) ? str : isBool ? bool : val;
         let r = pIndent || '';
         if (pKey)
            r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
         if (pVal)
            r = r + pValSpan + pVal + '</span>';
         return r + (pEnd || '');
         }
      const jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
      return JSON.stringify(obj, null, 3)
         .replace(/&/g, '&amp;')
         .replace(/\\"/g, '&quot;')
         .replace(/</g, '&lt;')
         .replace(/>/g, '&gt;')
         .replace(jsonLine, replacer);
      }
   };

if (typeof module === 'object')
   module.exports = prettyPrintJson;  //Node.js module loading system (CommonJS)
if (typeof window === 'object')
   window.prettyPrintJson = prettyPrintJson;  //support both global and window property
