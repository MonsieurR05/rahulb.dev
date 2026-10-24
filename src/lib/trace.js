// Deterministic wavy line, used as the sparkline in the featured-project tile.
export function tracePoints({ seed = 0, amplitude = 40, width = 360, base = 150, offset = 20 }) {
  const points = [];
  for (let x = 0; x <= width; x += 6) {
    const y =
      base -
      (Math.sin(x / 38 + seed) * amplitude +
        Math.sin(x / 17 + seed * 2) * amplitude * 0.35 +
        Math.cos(x / 71) * amplitude * 0.6);
    points.push(`${x + offset},${y.toFixed(1)}`);
  }
  return points.join(" ");
}
