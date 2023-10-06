//! pretty-print-json v2.0.4 ~~ https://pretty-print-json.js.org ~~ MIT License

export type FormatSettings = {
    indent: number;
    lineNumbers: boolean;
    linkUrls: boolean;
    linksNewTab: boolean;
    quoteKeys: boolean;
    trailingComma: boolean;
};
export type FormatOptions = Partial<FormatSettings>;
export type JsonType = 'key' | 'string' | 'number' | 'boolean' | 'null' | 'mark';
declare const prettyPrintJson: {
    version: string;
    toHtml(data: unknown, options?: FormatOptions): string;
};
export { prettyPrintJson };
