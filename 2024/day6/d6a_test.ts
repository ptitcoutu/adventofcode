import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts";
import { solve } from "./d6a_functions.ts";

interface TestCase {
    name: string;
    input: string;
    expected: string;
}

const testCases: TestCase[] = [
    {
        name: "should work with sample input",
        input: `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`.slice(1),
        expected: "41",
    },
    {
        name: "should work with easy input with only one direction",
        input: `
........
.....^..
`.slice(1),
        expected: "2",
    },
    {
        name: "should work with easy input with only one obstacle",
        input: `
.....#..
........
.....^..
`.slice(1),
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
