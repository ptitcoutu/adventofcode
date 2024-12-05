import fs from "node:fs";
import { cleanupData } from "./d3b_functions.ts";

const data = fs.readFileSync("2024/day3/d3b_input.txt", "utf8");
//const data = fs.readFileSync("2024/day3/test_input.txt", "utf8");

const cleanData = cleanupData(data);
//const cleanData = fs.readFileSync("2024/day3/cleaned_d3b_input.txt", "utf8");
const muls = cleanData.match(/mul\((\d+),(\d+)\)/g)??[];
console.log(muls.slice(0,10));
console.log(`... ${muls.length} ...`);
console.log(muls.slice(muls.length-10,muls.length));
const mulPairs = muls.map(it => it.match(/mul\((\d+),(\d+)\)/)?.slice(1))
    .filter((it): it is string[] => it !== undefined);
console.log(mulPairs.slice(0,10));
console.log(`... ${mulPairs.length} ...`);
console.log(mulPairs.slice(mulPairs.length-10,mulPairs.length));
const sum = mulPairs.map(it => Number(it[0]) * Number(it[1])).reduce((cumul,currentVal) => cumul+currentVal, 0);
console.log(sum);