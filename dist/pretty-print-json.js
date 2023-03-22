//! pretty-print-json v1.4.1 ~~ https://pretty-print-json.js.org ~~ MIT License

const prettyPrintJson = {
    version: '1.4.1',
    toHtml(thing, options) {
        const defaults = {
            indent: 3,
            lineNumbers: false,
            linkUrls: true,
            linksNewTab: true,
            quoteKeys: false,
        };
        const settings = Object.assign(Object.assign({}, defaults), options);
        const htmlEntities = (text) => text
            .replace(/&/g, '&amp;')
            .replace(/\\"/g, '&bsol;&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
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
        const replacer = (match, p1, p2, p3, p4) => {
            const part = { indent: p1, key: p2, value: p3, end: p4 };
            const findName = settings.quoteKeys ? /(.*)(): / : /"([\w$]+)": |(.*): /;
            const indentHtml = part.indent || '';
            const keyName = part.key && part.key.replace(findName, '$1$2');
            const keyHtml = part.key ? spanTag('key', keyName) + spanTag('mark', ': ') : '';
            const valueHtml = part.value ? buildValueHtml(part.value) : '';
            const endHtml = spanTag('mark', part.end);
            return indentHtml + keyHtml + valueHtml + endHtml;
        };
        const jsonLine = /^( *)("[^"]+": )?("[^"]*"|[\w.+-]*)?([{}[\],]*)?$/mg;
        const json = JSON.stringify(thing, null, settings.indent) || 'undefined';
        const html = htmlEntities(json).replace(jsonLine, replacer);
        const makeLine = (line) => `   <li>${line}</li>`;
        const addLineNumbers = (html) => ['<ol class=json-lines>', ...html.split('\n').map(makeLine), '</ol>'].join('\n');
        return settings.lineNumbers ? addLineNumbers(html) : html;
    },
};
export { prettyPrintJson };
