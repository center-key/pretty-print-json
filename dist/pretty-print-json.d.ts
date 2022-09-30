//! pretty-print-json v1.3.0 ~~ https://pretty-print-json.js.org ~~ MIT License

export declare type FormatSettings = {
    indent: number;
    lineNumbers: boolean;
    linkUrls: boolean;
    linksNewTab: boolean;
    quoteKeys: boolean;
};
export declare type FormatOptions = Partial<FormatSettings>;
export declare type JsonType = 'key' | 'string' | 'number' | 'boolean' | 'null' | 'mark';
declare const prettyPrintJson: {
    version: string;
    toHtml(thing: unknown, options?: FormatOptions): string;
};
export { prettyPrintJson };
