//! pretty-print-json v1.1.0 ~ github.com/center-key/pretty-print-json ~ MIT License

export declare type FormatOptions = {
    indent?: number;
    linkUrls?: boolean;
    quoteKeys?: boolean;
};
export declare type JsonType = 'key' | 'string' | 'number' | 'boolean' | 'null' | 'mark';
declare const prettyPrintJson: {
    version: string;
    toHtml(thing: unknown, options?: FormatOptions | undefined): string;
};
export { prettyPrintJson };
