import React from "react";

/** Deterministic pseudo-random generator so the field is stable across renders. */
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function NodeField({ count = 26, seed = 11 }) {
  const rand = mulberry32(seed);
  const nodes = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rand() * 100,
    y: rand() * 100,
    r: rand() > 0.85 ? 3.2 : 1.8,
    delay: rand() * 6,
  }));

  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const d = Math.hypot(dx, dy);
      if (d < 22) edges.push([nodes[i], nodes[j]]);
    }
  }
  const emberNodeId = Math.floor(rand() * count);

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          style={{ stroke: "var(--node-line)" }}
          strokeWidth="0.15"
        />
      ))}
      {nodes.map((n) => (
        <circle
          key={n.id}
          cx={n.x}
          cy={n.y}
          r={n.r * 0.35}
          style={{
            fill: n.id === emberNodeId ? "var(--ember)" : "var(--node-dot)",
            animationDelay: `${n.delay}s`,
          }}
          className={n.id === emberNodeId ? "pulse" : "twinkle"}
        />
      ))}
    </svg>
  );
}
