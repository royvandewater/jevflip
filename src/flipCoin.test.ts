import { describe, it, expect, beforeEach } from "vitest";
import { flipCoin } from "./flipCoin.js";
import type { Flip } from "./headsPercentage.js";

describe("flipCoin", () => {
  describe("when Jev answers tails", () => {
    let result: Flip;
    let request: { url: string; init: RequestInit };
    beforeEach(async () => {
      const fetchFn: typeof fetch = async (url, init) => {
        request = { url: String(url), init: init ?? {} };
        return Response.json({
          model: "jev-1.13.0",
          answers: {
            flip: {
              type: "choice",
              choice: "tails",
              confidence: 0.5,
              probabilities: { heads: 0.5, tails: 0.5 },
            },
          },
          usage: { input_tokens: 1, output_tokens: 1 },
        });
      };
      result = await flipCoin({ fetchFn, apiKey: "test-key" });
    });
    it("returns tails", () => {
      expect(result).toBe("tails");
    });
    it("posts to the systemone endpoint", () => {
      expect(request.url).toBe("https://api.typesafe.ai/v1/systemone");
      expect(request.init.method).toBe("POST");
    });
    it("sends the bearer token", () => {
      expect(new Headers(request.init.headers).get("authorization")).toBe("Bearer test-key");
    });
    it("asks a heads/tails choice question", () => {
      const body = JSON.parse(String(request.init.body));
      expect(body.questions.flip.type).toBe("choice");
      expect(Object.keys(body.questions.flip.criteria).sort()).toEqual(["heads", "tails"]);
    });
  });
});
