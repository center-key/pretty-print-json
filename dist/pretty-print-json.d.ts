//! pretty-print-json v1.2.6 ~~ https://pretty-print-json.js.org ~~ MIT License

export declare type FormatOptions = {
    indent?: number;
    lineNumbers?: boolean;
    linkUrls?: boolean;
    quoteKeys?: boolean;
};
export declare type JsonType = 'key' | 'string' | 'number' | 'boolean' | 'null' | 'mark';
declare const prettyPrintJson: {
    version: string;
    toHtml(thing: unknown, options?: FormatOptions): string;
};
export { prettyPrintJson };
