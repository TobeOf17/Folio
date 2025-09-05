import React from "react";

const SignUpIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            viewBox="0 0 520 420"
            role="img"
            aria-label="Sign up illustration"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            {...props}
        >
            <defs>
                {/* Brand-ish reds */}
                <linearGradient id="g-brand" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#b91c1c" />
                </linearGradient>

                {/* Soft background blob */}
                <radialGradient id="g-blob" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#dc2626" stopOpacity="0.18" />
                    <stop offset="80%" stopColor="#dc2626" stopOpacity="0.04" />
                    <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
                </radialGradient>

                {/* Card shadow */}
                <filter id="f-shadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="b" />
                    <feOffset in="b" dx="0" dy="8" result="o" />
                    <feColorMatrix
                        in="o"
                        type="matrix"
                        values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0   0 0 0 0.18 0"
                        result="s"
                    />
                    <feMerge>
                        <feMergeNode in="s" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                {/* Subtle line gradient */}
                <linearGradient id="g-line" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#e5e7eb" />
                    <stop offset="100%" stopColor="#d1d5db" />
                </linearGradient>

                {/* Accent plus badge shadow */}
                <filter id="f-badge" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="bb" />
                    <feMerge>
                        <feMergeNode in="bb" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                {/* Sparkle gradient */}
                <linearGradient id="g-spark" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
                </linearGradient>
            </defs>

            {/* Background */}
            <rect width="520" height="420" fill="url(#g-blob)" />

            {/* Floating shapes for depth */}
            <circle cx="450" cy="90" r="44" fill="url(#g-brand)" opacity="0.08" />
            <circle cx="90" cy="320" r="34" fill="url(#g-brand)" opacity="0.08" />

            {/* Profile Card */}
            <g filter="url(#f-shadow)" transform="translate(80,80)">
                <rect width="360" height="220" rx="18" fill="#ffffff" />
                {/* Header bar */}
                <rect x="0" y="0" width="360" height="56" rx="18" fill="#fafafa" />
                <circle cx="28" cy="28" r="6" fill="#fca5a5" />
                <circle cx="46" cy="28" r="6" fill="#fdba74" />
                <circle cx="64" cy="28" r="6" fill="#86efac" />

                {/* Avatar */}
                <circle cx="92" cy="120" r="34" fill="#f3f4f6" />
                <circle cx="92" cy="114" r="14" fill="#e5e7eb" />
                <rect x="74" y="132" width="36" height="8" rx="4" fill="url(#g-line)" />

                {/* Lines as inputs */}
                <rect x="140" y="98" width="170" height="10" rx="5" fill="url(#g-line)" />
                <rect x="140" y="122" width="190" height="10" rx="5" fill="url(#g-line)" />
                <rect x="140" y="146" width="150" height="10" rx="5" fill="url(#g-line)" />

                {/* CTA button hint */}
                <rect x="140" y="178" width="120" height="14" rx="7" fill="url(#g-brand)" opacity="0.85" />
            </g>

            {/* Plus badge (create account) */}
            <g filter="url(#f-badge)" transform="translate(360,160)">
                <circle cx="0" cy="0" r="26" fill="url(#g-brand)" />
                <rect x="-12" y="-2" width="24" height="4" rx="2" fill="#ffffff" />
                <rect x="-2" y="-12" width="4" height="24" rx="2" fill="#ffffff" />
            </g>

            {/* Subtle lock (account security hint) */}
            <g transform="translate(410,270)" opacity="0.25">
                <rect x="-20" y="0" width="40" height="28" rx="6" fill="#111827" />
                <rect x="-10" y="-14" width="20" height="18" rx="10" fill="#111827" />
                <circle cx="0" cy="14" r="3" fill="#ffffff" />
            </g>

            {/* Sparkles */}
            <g opacity="0.7">
                <path d="M66 96 l6 0 l0 6 l-6 0 l0 -6 Z" fill="url(#g-spark)" opacity="0.6" />
                <path d="M470 210 l5 0 l0 5 l-5 0 l0 -5 Z" fill="url(#g-spark)" opacity="0.45" />
                <circle cx="430" cy="60" r="2" fill="url(#g-spark)" />
                <circle cx="120" cy="360" r="2.5" fill="url(#g-spark)" />
            </g>
        </svg>
    );
};

export default SignUpIllustration;
