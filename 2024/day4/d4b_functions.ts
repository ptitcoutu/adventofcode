export function solve(data: string):string {
    const lineLengthMinusNewLine = data.indexOf("\n");
    const xmasRegExps = ["MMSS","MSMS","SMSM","SSMM"].map(
        pattern => new RegExp(
            `(?=(${pattern[0]}(.)${pattern[2]}(.|\n){${lineLengthMinusNewLine-1}}A(.|\n){${lineLengthMinusNewLine-1}}${pattern[1]}(.)${pattern[3]}))`, "g")
    );
    console.info(xmasRegExps);
    const resByPattern = xmasRegExps.map(xmasRegExp => data.match(xmasRegExp))
    console.info(resByPattern);
    return resByPattern.reduce((cumul, curr) => cumul+ (curr?.length ?? 0),0).toString() ?? "0";
}
