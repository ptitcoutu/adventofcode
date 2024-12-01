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
let currentIndexOnSecondSortedList = 0;
const similarities = firstSortedList.map(value => {
    const firstIndexOnSecondSortedList = secondSortedList.slice(currentIndexOnSecondSortedList).indexOf(value);
    if (firstIndexOnSecondSortedList < 0) {
        return 0;
    } else {
        const lastIndexOnSecondSortedList = secondSortedList.slice(currentIndexOnSecondSortedList).lastIndexOf(value);
        const numberOfItems = lastIndexOnSecondSortedList - firstIndexOnSecondSortedList + 1;
        currentIndexOnSecondSortedList = lastIndexOnSecondSortedList+1;
        return value * numberOfItems;
    }
});

console.log(similarities.reduce((acc, curr) => acc + curr, 0));