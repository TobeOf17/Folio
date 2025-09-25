// src/components/AttendanceHeroIllustration.tsx
import React from "react";

const AttendanceHeroIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    const cols = 7;
    const rows = 3;
    const cellW = 36;
    const cellH = 28;
    const gap = 8;
    const active = new Set(["0,1", "0,4", "1,2", "2,5"]); // sample scheduled cells

    return (
        <svg
            viewBox="0 0 520 420"
            role="img"
            aria-label="Folio shift management & attendance"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            {...props}
        >
            <defs>
                {/* exact background defs from SignUp illustration */}
                <linearGradient id="g-brand" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#b91c1c" />
                </linearGradient>
                <radialGradient id="g-blob" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#dc2626" stopOpacity="0.18" />
                    <stop offset="80%" stopColor="#dc2626" stopOpacity="0.04" />
                    <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
                </radialGradient>

                {/* neutrals */}
                <linearGradient id="g-line" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#e5e7eb" />
                    <stop offset="100%" stopColor="#d1d5db" />
                </linearGradient>
            </defs>

            {/* exact background */}
{/* exact background */}
<rect width="520" height="420" fill="#ffffff" />
            <circle cx="450" cy="90" r="44" fill="url(#g-brand)" opacity="0.08" />
            <circle cx="90" cy="320" r="34" fill="url(#g-brand)" opacity="0.08" />

            {/* card */}
            <g transform="translate(80,80)">
                <rect width="360" height="240" rx="16" fill="#ffffff" stroke="#eef0f3" />
                {/* header */}
                <rect x="0" y="0" width="360" height="48" rx="16" fill="#fafafa" />
                <circle cx="24" cy="24" r="5" fill="#fca5a5" />
                <circle cx="40" cy="24" r="5" fill="#fdba74" />
                <circle cx="56" cy="24" r="5" fill="#86efac" />
                <rect x="88" y="18" width="140" height="12" rx="6" fill="url(#g-line)" />

                {/* add shift */}
                <g transform="translate(312,10)">
                    <circle cx="0" cy="14" r="12" fill="url(#g-brand)" />
                    <rect x="-6" y="13" width="12" height="2" rx="1" fill="#fff" />
                    <rect x="-1" y="8" width="2" height="12" rx="1" fill="#fff" />
                </g>

                {/* day labels */}
                <g transform="translate(20,62)" fontFamily="Inter, ui-sans-serif" fontSize="10" fill="#6b7280">
                    {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => (
                        <text key={d} x={i * (cellW + gap) + cellW / 2} y={-10} textAnchor="middle">
                            {d}
                        </text>
                    ))}
                </g>

                {/* grid */}
                <g transform="translate(20,68)">
                    {Array.from({ length: rows }).map((_, r) => (
                        <g key={r} transform={`translate(0, ${r * (cellH + gap)})`}>
                            {Array.from({ length: cols }).map((__, c) => {
                                const x = c * (cellW + gap);
                                const key = `${r},${c}`;
                                const isActive = active.has(key);
                                return (
                                    <g key={key} transform={`translate(${x}, 0)`}>
                                        <rect width={cellW} height={cellH} rx="8" fill="#ffffff" stroke="#eef0f3" />
                                        {isActive ? (
                                            <rect x="6" y={cellH / 2 - 4} width={cellW - 12} height="8" rx="4" fill="url(#g-brand)" opacity="0.95" />
                                        ) : (
                                            <rect x="10" y={cellH / 2 - 3} width={cellW - 20} height="6" rx="3" fill="url(#g-line)" />
                                        )}
                                    </g>
                                );
                            })}
                        </g>
                    ))}
                </g>

                {/* legend — moved down for more breathing room (was y=180) */}
                <g transform="translate(20, 200)" fontFamily="Inter, ui-sans-serif" fontSize="10" fill="#374151">
                    <rect x="0" y="-10" width="110" height="22" rx="6" fill="#fafafa" stroke="#eef0f3" />
                    <rect x="10" y="-2" width="22" height="6" rx="3" fill="url(#g-brand)" />
                    <text x="40" y="3">Scheduled</text>

                    <rect x="130" y="-10" width="110" height="22" rx="6" fill="#fafafa" stroke="#eef0f3" />
                    <rect x="140" y="-2" width="22" height="6" rx="3" fill="url(#g-line)" />
                    <text x="170" y="3">Available</text>
                </g>
            </g>
        </svg>
    );
};

export default AttendanceHeroIllustration;
