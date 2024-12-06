import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts";
import { solve } from "./d4a_functions.ts";

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
        expected: "18",
    },
    {
        name: "should work easy case",
        input: `XMAS`,
        expected: "1",
    },
    {
        name: "should work easy case 2",
        input: `XMMM
MMMM
AMMM
SMMM`,
        expected: "1",
    },
    {
        name: "should work easy case 3",
        input: `XMMM
MMMM
MMAM
MMMS`,
        expected: "1",
    },
    {
        name: "should work easy case 4",
        input: `MMMX
MMMM
MAMM
SMMM`,
        expected: "1",
    },
    {
        name: "should work easy case 5",
        input: `MMMS
MMMA
MMMM
MMMX`,
        expected: "1",
    },
    {
        name: "should work easy case 6",
        input: `
MMMM
MMMM
MMMM
SAMX`.slice(1),
        expected: "1",
    },
    {
        name: "should work easy case multiple lines",
        input: `XMAS
XMAS`,
        expected: "2",
    },
    {
        name: "should work easy case multiple lines with different pattern",
        input: `XMAS
SAMX`,
        expected: "2",
    },
    {
        name: "should work easy case multiple lines with different pattern and lenght greater than XMAS",
        input: `XMASxxxx
xxxSAMXx`,
        expected: "2",
    },
    {
        name: "should work with little part of sample pattern",
        input: `
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM`.slice(1),
        expected: "4",
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
