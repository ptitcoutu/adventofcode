import fs from "node:fs";
import { solve } from "./d6b_functions.ts";

const data = fs.readFileSync("2024/day6/d6_input.txt", "utf8");
console.info(solve(data))