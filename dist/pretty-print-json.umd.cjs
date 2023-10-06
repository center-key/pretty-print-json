//! pretty-print-json v2.0.4 ~~ https://pretty-print-json.js.org ~~ MIT License

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.prettyPrintJson = void 0;
    const prettyPrintJson = {
        version: '2.0.4',
        toHtml(data, options) {
            if (!''.at)
                String.prototype.at = function (i) { return this.charAt(i + (i < 0 ? this.length : 0)); };
            const defaults = {
                indent: 3,
                lineNumbers: false,
                linkUrls: true,
                linksNewTab: true,
                quoteKeys: false,
                trailingComma: true,
            };
            const settings = { ...defaults, ...options };
            const invalidHtml = /[<>&]|\\"/g;
            const toHtml = (char) => char === '<' ? '&lt;' :
                char === '>' ? '&gt;' :
                    char === '&' ? '&amp;' :
                        '&bsol;&quot;';
            const spanTag = (type, display) => display ? '<span class=json-' + type + '>' + display + '</span>' : '';
            const buildValueHtml = (value) => {
                const strType = /^"/.test(value) && 'string';
                const boolType = ['true', 'false'].includes(value) && 'boolean';
                const nullType = value === 'null' && 'null';
                const type = boolType || nullType || strType || 'number';
                const urlPattern = /https?:\/\/[^\s"]+/g;
                const target = settings.linksNewTab ? ' target=_blank' : '';
                const makeLink = (link) => `<a class=json-link href="${link}"${target}>${link}</a>`;
                const display = strType && settings.linkUrls ? value.replace(urlPattern, makeLink) : value;
                return spanTag(type, display);
            };
            const replacer = (match, ...parts) => {
                const part = { indent: parts[0], key: parts[1], value: parts[2], end: parts[3] };
                const findName = settings.quoteKeys ? /(.*)(): / : /"([\w$]+)": |(.*): /;
                const indentHtml = part.indent || '';
                const keyName = part.key && part.key.replace(findName, '$1$2');
                const keyHtml = part.key ? spanTag('key', keyName) + spanTag('mark', ': ') : '';
                const valueHtml = part.value ? buildValueHtml(part.value) : '';
                const noComma = !part.end || [']', '}'].includes(match.at(-1));
                const addComma = settings.trailingComma && match.at(0) === ' ' && noComma;
                const endHtml = spanTag('mark', addComma ? (part.end ?? '') + ',' : part.end);
                return indentHtml + keyHtml + valueHtml + endHtml;
            };
            const jsonLine = /^( *)("[^"]+": )?("[^"]*"|[\w.+-]*)?([{}[\],]*)?$/mg;
            const json = JSON.stringify(data, null, settings.indent) || 'undefined';
            const html = json.replace(invalidHtml, toHtml).replace(jsonLine, replacer);
            const makeLine = (line) => `   <li>${line}</li>`;
            const addLineNumbers = (html) => ['<ol class=json-lines>', ...html.split('\n').map(makeLine), '</ol>'].join('\n');
            return settings.lineNumbers ? addLineNumbers(html) : html;
        },
    };
    exports.prettyPrintJson = prettyPrintJson;
});
