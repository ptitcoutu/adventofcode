import fs from "node:fs";

const data = fs.readFileSync("./d1_input.txt", "utf8");
const lines = data.split("\n");
console.log(lines.slice(0,10));
const couples = lines.filter(line => line.length > 0).map((line) => line.split("  ").map(n => +n));
console.log(couples.slice(0,10));
console.log(`... ${couples.length} ...`);
console.log(couples.slice(couples.length-10,couples.length));
const firstSortedList = couples.map((couple) => couple[0]).sort((a, b) => a - b);
console.log(`firstSortedList: ${firstSortedList.slice(0,10)}`);
const secondSortedList = couples.map((couple) => couple[1]).sort((a, b) => a - b);
console.log(`secondSortedList: ${secondSortedList.slice(0,10)}`);
const distances = firstSortedList.map((value, index) => Math.abs(value - secondSortedList[index]));

console.log(distances.reduce((acc, curr) => acc + curr, 0));