import { describe, it, expect, beforeEach } from "vitest";
import { run } from "./run.js";
import type { Flip } from "./headsPercentage.js";

describe("run", () => {
  describe("with 4 flips where Jev returns heads, tails, heads, heads", () => {
    let output: string[];
    let calls: number;
    beforeEach(async () => {
      const answers: Flip[] = ["heads", "tails", "heads", "heads"];
      calls = 0;
      output = [];
      await run({
        n: 4,
        flip: async () => answers[calls++],
        log: (line) => output.push(line),
      });
    });
    it("flips 4 times", () => {
      expect(calls).toBe(4);
    });
    it("records each flip", () => {
      expect(output.slice(0, 4)).toEqual(["1: heads", "2: tails", "3: heads", "4: heads"]);
    });
    it("reports the heads percentage", () => {
      expect(output.at(-1)).toBe("Heads: 75% (3/4)");
    });
  });
});
