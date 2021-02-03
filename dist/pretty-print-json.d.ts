//! pretty-print-json v0.4.5 ~ github.com/center-key/pretty-print-json ~ MIT License

export declare type FormatOptions = {
    indent?: number;
    linkUrls?: boolean;
    quoteKeys?: boolean;
};
declare const prettyPrintJson: {
    version: string;
    toHtml(thing: unknown, options?: FormatOptions | undefined): string;
};
export { prettyPrintJson };
