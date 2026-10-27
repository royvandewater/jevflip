import { headsPercentage, type Flip } from "./headsPercentage.js";

type Options = { n: number; flip: () => Promise<Flip>; log: (line: string) => void };

export async function run({ n, flip, log }: Options): Promise<void> {
  const flips: Flip[] = [];
  for (let i = 1; i <= n; i++) {
    const result = await flip();
    flips.push(result);
    log(`${i}: ${result}`);
  }
  const heads = flips.filter((flip) => flip === "heads").length;
  log(`Heads: ${headsPercentage(flips)}% (${heads}/${n})`);
}
