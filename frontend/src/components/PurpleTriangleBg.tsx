// src/components/PurpleTriangleBg.tsx
import React from "react";

/**
 * Large purple triangle with softened (rounded-looking) corners.
 * It’s meant to sit behind hero text as a decorative shape.
 */
const PurpleTriangleBg: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 600 600"
      aria-hidden="true"
      focusable="false"
    >
      {/* Soft fill */}
      <defs>
        {/* Subtle blur to visually round the corners without losing the triangle shape */}
        <filter id="soften" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Base filled triangle */}
      <path
        d="M300 40 L560 560 L40 560 Z"
        fill="#7C3AED"      /* purple (close to Tailwind violet-600) */
        opacity="0.10"
        filter="url(#soften)"
      />

      {/* Overlay stroke with round joins to further soften corners */}
      <path
        d="M300 60 L545 550 L55 550 Z"
        fill="none"
        stroke="#7C3AED"
        strokeWidth="36"
        strokeLinejoin="round"
        opacity="0.15"
      />
    </svg>
  );
};

export default PurpleTriangleBg;
