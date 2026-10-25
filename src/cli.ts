#!/usr/bin/env node
import assert from "node:assert";
import { flipCoin } from "./flipCoin.js";
import { run } from "./run.js";

const n = Number(process.argv[2]);
assert(Number.isInteger(n) && n > 0, new Error("Usage: jevflip <N>"));
const apiKey = process.env.TYPESAFE_API_KEY;
assert(apiKey, new Error("TYPESAFE_API_KEY is not set"));

await run({ n, flip: () => flipCoin({ fetchFn: fetch, apiKey }), log: console.log });
