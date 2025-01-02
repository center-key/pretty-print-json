//! pretty-print-json v3.0.4 ~~ https://pretty-print-json.js.org ~~ MIT License

export type FormatSettings = {
    indent: number;
    lineNumbers: boolean;
    linkUrls: boolean;
    linksNewTab: boolean;
    quoteKeys: boolean;
    trailingCommas: boolean;
};
export type FormatOptions = Partial<FormatSettings>;
export type JsonType = 'key' | 'string' | 'number' | 'boolean' | 'null' | 'mark';
declare const prettyPrintJson: {
    version: string;
    toHtml(data: unknown, options?: FormatOptions): string;
};
export { prettyPrintJson };
