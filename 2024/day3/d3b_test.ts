import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts";
import { cleanupData } from "./d3b_functions.ts";

interface TestCase {
    name: string;
    input: string;
    expected: string;
}

const testCases: TestCase[] = [
    {
        name: "should clean simple don't-do pattern",
        input: "don't()abc123do()xyz",
        expected: "xyz",
    },
    {
        name: "should keep normal line unchanged",
        input: "normal line",
        expected: "normal line",
    },
    {
        name: "should handle multiple don't-do patterns",
        input: "adon't()456do()789don't()def do()b",
        expected: "a789don't()def do()b",
    },
    {
        name: "should handle empty content between don't-do",
        input: "don't()do()after",
        expected: "after",
    },
    {
        name: "should handle line with only don't-do",
        input: "don't()content do()",
        expected: "",
    },
    {
        name: "should handle line with only don't",
        input: "azedon't()content",
        expected: "aze",
    },
    {
        name: "should handle multi-line with only don't",
        input: "azedon't()content\nanotdon't()herdo() line",
        expected: "aze\nanotdon't()herdo() line",
    },
    {
        name: "should handle multi-line with multiple do and don't",
        input: "azedon't()contdo()edon't()ndo()t\nanotdon't()herdo() line",
        expected: "azeedon't()ndo()t\nanotdon't()herdo() line",
    },
];

Deno.test({
    name: "cleanupData",
    async fn(t) {
        for (const { name, input, expected } of testCases) {
         await t.step({
                name,
                fn() {
                    // When
                    const result = cleanupData(input);

                    // Then
                    assertEquals(result, expected);
                },
            });
        }
    },
});
