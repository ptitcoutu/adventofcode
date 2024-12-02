import fs from "node:fs";

const data = fs.readFileSync("2024/day2/d2_input.txt", "utf8");
const lines = data.split("\n");
console.log(lines.slice(0,10));
const reports = lines.filter(line => line.length > 0).map((line) => line.split(" ").map(n => +n));
console.log(reports.slice(0,10));
console.log(`... ${reports.length} ...`);
console.log(reports.slice(reports.length-10,reports.length));

const reportsConsecutiveLevelDistance = reports.map(levels => levels.map((level, index) => index > 0 ? level - levels[index - 1] : "S").filter(distance => distance !== "S"));
const numberOfSafeReports = reportsConsecutiveLevelDistance.filter(distances => {
    const absoluteDistances = distances.map(Math.abs);
    console.log(absoluteDistances);
    const minDistance = Math.min(...absoluteDistances);
    console.log(minDistance);
    const maxDistance = Math.max(...absoluteDistances);
    console.log(maxDistance);
    const allDistancesAreOfTheSameSign = distances.every(distance => distance > 0) || distances.every(distance => distance < 0);
    console.log(allDistancesAreOfTheSameSign);
    return allDistancesAreOfTheSameSign && minDistance > 0 && maxDistance <= 3
}).length;
console.log(`Number of safe reports: ${numberOfSafeReports}`);