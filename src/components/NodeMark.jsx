import React from "react";

/**
 * The Nodeforge brand mark: an "N" built from connected nodes,
 * with an ember-orange core where the diagonal crosses.
 */
export default function NodeMark({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="18" fill="#0f1013" />
      <g stroke="#edeae2" strokeWidth="2.4" strokeLinecap="round">
        <line x1="30" y1="25" x2="30" y2="75" />
        <line x1="70" y1="25" x2="70" y2="75" />
        <line x1="30" y1="25" x2="70" y2="75" />
      </g>
      {[
        [30, 25, 4],
        [30, 50, 3],
        [30, 75, 4],
        [70, 25, 4],
        [70, 50, 3],
        [70, 75, 4],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="#edeae2" />
      ))}
      <circle cx="50" cy="50" r="6.5" fill="#f0723a" />
    </svg>
  );
}
