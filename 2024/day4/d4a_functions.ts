export function solve(data: string):string {
    const lineLengthMinusNewLine = data.indexOf("\n");
    const xmasRegExps = ["(?=XMAS)",
        ...(lineLengthMinusNewLine > 0)?
        [0,1,-1].map(pos=>
            `(?=(X(.|\n){${lineLengthMinusNewLine+pos}}M(.|\n){${lineLengthMinusNewLine+pos}}A(.|\n){${lineLengthMinusNewLine+pos}}S))`):[],
        "(?=SAMX)",
        ...(lineLengthMinusNewLine > 0)?
        [0,1,-1].map(pos=>
            `(?=(S(.|\n){${lineLengthMinusNewLine+pos}}A(.|\n){${lineLengthMinusNewLine+pos}}M(.|\n){${lineLengthMinusNewLine+pos}}X))`):[],
    ].map(pattern => new RegExp(pattern,"g"));
    console.info(xmasRegExps);
    const resByPattern = xmasRegExps.map(xmasRegExp => data.match(xmasRegExp))
    console.info(resByPattern);
    return resByPattern.reduce((cumul, curr) => cumul+ (curr?.length ?? 0),0).toString() ?? "0";
}

/*
(XMAS) => 3
|
(X.{10}M.{10}A.{10}S) => 1
|
(X.{11}M.{11}A.{11}S) => 1
|
(X.{9}M.{9}A.{9}S) => 1
|
(SAMX) => 2
|
(S.{10}A.{10}M.{10}X) => 2
|
(S.{11}A.{11}M.{11}X) => 2
|
(S.{9}A.{9}M.{9}X) => 2
*/