export function cleanupData(data: string) {
    const firstNewLineIndex = data.indexOf("\n");
    console.info(firstNewLineIndex);
    
    return firstNewLineIndex > 0 
        ? processMultilineText(data, firstNewLineIndex)
        : processSingleLineText(data);
}
function processMultilineText(text: string, newLineIndex: number) {
    const firstLine = text.slice(0, newLineIndex);
    console.info("firstLine", firstLine);
    const remainingLines = text.slice(newLineIndex + 1);
    console.info("remainingLines", remainingLines);
    const cleanedFirstLine = processSingleLineText(firstLine);
    console.info("cleanedFirstLine", cleanedFirstLine);
    return cleanedFirstLine + (remainingLines.length > 0 ? "\n" + remainingLines : "");
};

function processSingleLineText(text: string) {
    return text.replace(/don't\(\).*?(do\(\)|$)/, "");
}