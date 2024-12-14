import fs from "node:fs";
import { solve } from "./d5b_functions.ts";

const data = fs.readFileSync("2024/day5/d5_input.txt", "utf8");
console.info(solve(data))