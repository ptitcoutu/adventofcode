import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts";
import { solve } from "./d4b_functions.ts";

interface TestCase {
    name: string;
    input: string;
    expected: string;
}

const testCases: TestCase[] = [
    {
        name: "should work with sample input",
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: "9",
    },
    {
        name: "should work easy case",
        input: `
M.M
.A.
S.S`.slice(1),
        expected: "1",
    },
    {
        name: "should work easy case 2",
        input: `
S.M
.A.
S.M`.slice(1),
        expected: "1",
    },
    {
        name: "should work easy case 3",
        input: `
S.S
.A.
M.M`.slice(1),
        expected: "1",
    },
    {
        name: "should work easy case 4",
        input: `
M.S
.A.
M.S`.slice(1),
        expected: "1",
    },
];

Deno.test({
    name: "solve",
    async fn(t) {
        for (const { name, input, expected } of testCases) {
         await t.step({
                name,
                fn() {
                    // When
                    const result = solve(input);

                    // Then
                    assertEquals(result, expected);
                },
            });
        }
    },
});
