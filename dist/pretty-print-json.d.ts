//! pretty-print-json v0.4.0 ~ github.com/center-key/pretty-print-json ~ MIT License

declare type OutputOptions = {
    indent?: number;
    linkUrls?: boolean;
    quoteKeys?: boolean;
};
declare const prettyPrintJson: {
    version: string;
    toHtml(thing: any, options?: OutputOptions | undefined): string;
};
export { prettyPrintJson };
