import assert from "node:assert";
import type { Flip } from "./headsPercentage.js";

type Options = { fetchFn: typeof fetch; apiKey: string };

function isFlip(value: unknown): value is Flip {
  return value === "heads" || value === "tails";
}

export async function flipCoin({ fetchFn, apiKey }: Options): Promise<Flip> {
  const response = await fetchFn("https://api.typesafe.ai/v1/systemone", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "jev-latest",
      state: "Flip a coin.",
      questions: {
        flip: {
          type: "choice",
          instructions: "Which side did the coin land on?",
          criteria: { heads: "The coin landed heads up.", tails: "The coin landed tails up." },
        },
      },
    }),
  });
  const text = await response.text();
  assert(response.ok, new Error(`Jev responded ${response.status}: ${text}`));
  const choice: unknown = JSON.parse(text).answers.flip.choice;
  assert(isFlip(choice), new Error(`Unexpected choice: ${choice}`));
  return choice;
}
