import fs from "node:fs";
import { solve } from "./d4a_functions.ts";

const data = fs.readFileSync("2024/day4/d4_input.txt", "utf8");
console.info(solve(data))