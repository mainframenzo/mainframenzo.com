declare class ArgParser {
    readonly args: CLIArgs;
    constructor();
}
interface CLIArgs {
    readonly 'absolute-input-openapi-def-path': string;
    readonly 'absolute-output-openapi-def-path': string;
    readonly help?: boolean;
}
declare const argparser: ArgParser;
export { argparser };
//# sourceMappingURL=argparser.d.ts.map