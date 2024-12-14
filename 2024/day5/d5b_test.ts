import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts";
import { solve } from "./d5b_functions.ts";

interface TestCase {
    name: string;
    input: string;
    expected: string;
}

const testCases: TestCase[] = [
    {
        name: "should work with sample input",
        input: `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`.slice(1),
        expected: "123",
    },
    {
        name: "should work with easy input with only odd number of pages to update and a single rule",
        input: `
42|23
23|82
12|45

42,23,82
12,45,23,82,42`.slice(1), // 12,45,42,23,82
        expected: "42",
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
