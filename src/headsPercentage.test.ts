import { describe, it, expect, beforeEach } from "vitest";
import { headsPercentage } from "./headsPercentage.js";

describe("headsPercentage", () => {
  describe("when all flips are heads", () => {
    let result: number;
    beforeEach(() => {
      result = headsPercentage(["heads", "heads"]);
    });
    it("returns 100", () => {
      expect(result).toBe(100);
    });
  });

  describe("when one of four flips is heads", () => {
    let result: number;
    beforeEach(() => {
      result = headsPercentage(["heads", "tails", "tails", "tails"]);
    });
    it("returns 25", () => {
      expect(result).toBe(25);
    });
  });
});
