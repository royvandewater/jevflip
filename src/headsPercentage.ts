export type Flip = "heads" | "tails";

export function headsPercentage(flips: Flip[]): number {
  const heads = flips.filter((flip) => flip === "heads").length;
  return (heads / flips.length) * 100;
}
