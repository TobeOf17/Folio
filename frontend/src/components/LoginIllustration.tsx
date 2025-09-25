import React from "react";

const LoginIllustration: React.FC = () => {
    return (
        <div
            className="login-illustration"
            style={{
                width: "100%",
                maxWidth: 520,
                marginInline: "auto",
                color: "var(--brand, #dc2626)", // theme accent still respected
            }}
            aria-hidden="true"
        >
            <svg
                viewBox="0 0 480 360"
                role="img"
                aria-label="Secure login illustration"
                width="100%"
                height="auto"
            >
                <defs>
{/* Neutral radial glow */}
<radialGradient id="g-blob" cx="40%" cy="45%" r="65%">
  <stop offset="0%" stopColor="#f6443bff" stopOpacity="0.18" />  {/* blue-500 */}
  <stop offset="80%" stopColor="#f6443bff" stopOpacity="0.04" />
  <stop offset="100%" stopColor="#f6443bff" stopOpacity="0" />
</radialGradient>

{/* Softer background gradient */}
<linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0%" stopColor="#f3f4f6" />   {/* gray-100 */}
  <stop offset="100%" stopColor="#fff" />
</linearGradient>

                </defs>

                {/* Soft red glow (new) */}
                <rect x="0" y="0" width="480" height="360" fill="url(#g-blob)" />

                {/* Background blob (original) */}
                <path
                    d="M60 80c40-60 180-70 260-30s120 110 60 170-170 70-250 40S20 140 60 80Z"
                    fill="url(#grad)"
                />

                {/* Laptop base */}
                <rect
                    x="90"
                    y="110"
                    rx="12"
                    ry="12"
                    width="300"
                    height="200"
                    fill="#ffffff"
                    stroke="#e5e7eb"
                />
                <rect
                    x="110"
                    y="135"
                    rx="8"
                    ry="8"
                    width="260"
                    height="140"
                    fill="#f9fafb"
                    stroke="#e5e7eb"
                />

                {/* Lock */}
                <g transform="translate(130 155)">
                    <rect
                        x="0"
                        y="18"
                        width="42"
                        height="34"
                        rx="6"
                        fill="#ffffff"
                        stroke="#e5e7eb"
                    />
                    <path
                        d="M10 18v-6a11 11 0 0 1 22 0v6"
                        fill="none"
                        stroke="#9ca3af"
                        strokeWidth="2"
                    />
                    <circle cx="21" cy="34" r="4" fill="currentColor" />
                    <path
                        d="M21 38v6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </g>

                {/* Form fields */}
                <rect x="190" y="158" width="160" height="14" rx="7" fill="#e5e7eb" />
                <rect x="190" y="184" width="160" height="14" rx="7" fill="#e5e7eb" />

                {/* CTA button with shiny brand gradient (updated) */}
                <rect
                    x="190"
                    y="210"
                    width="100"
                    height="14"
                    rx="7"
                    fill="url(#g-brand)"
                    opacity="0.95"
                />

                {/* Mini charts */}
                <g transform="translate(130 220)">
                    <rect x="0" y="0" width="42" height="36" rx="6" fill="#ffffff" stroke="#e5e7eb" />
                    <rect x="7" y="18" width="6" height="12" rx="2" fill="currentColor" opacity="0.8" />
                    <rect x="18" y="12" width="6" height="18" rx="2" fill="currentColor" opacity="0.6" />
                    <rect x="29" y="6" width="6" height="24" rx="2" fill="currentColor" opacity="0.4" />
                </g>

                {/* Avatar row */}
                <g transform="translate(190 242)">
                    <circle cx="0" cy="0" r="8" fill="#fde7e7" stroke="currentColor" opacity="0.6" />
                    <circle cx="24" cy="0" r="8" fill="#fee2e2" stroke="#fca5a5" />
                    <circle cx="48" cy="0" r="8" fill="#fff1f2" stroke="#fda4af" />
                </g>

                {/* Keyboard / base */}
                <rect x="80" y="318" width="320" height="6" rx="3" fill="#e5e7eb" />

                {/* Subtle sparkles (new) */}
                <g opacity="0.75">
                    {/* tiny diamond sparkles */}
                    <path d="M420 86 h6 v6 h-6z" transform="rotate(45 423 89)" fill="url(#g-spark)" />
                    <path d="M108 292 h5 v5 h-5z" transform="rotate(45 110.5 294.5)" fill="url(#g-spark)" />
                    {/* small circles */}
                    <circle cx="440" cy="150" r="2.2" fill="url(#g-spark)" />
                    <circle cx="150" cy="80" r="2.6" fill="url(#g-spark)" />
                </g>
            </svg>
        </div>
    );
};

export default LoginIllustration;
