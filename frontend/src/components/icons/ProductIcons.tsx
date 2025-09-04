import React from "react";

/** Base icon wrapper so all icons size/align consistently */
export const IconWrap: React.FC<React.PropsWithChildren<{ size?: number }>> = ({ children, size = 40 }) => (
    <div
        className="feature-icon-wrap"
        style={{
            width: size,
            height: size,
            borderRadius: 12,
            display: "grid",
            placeItems: "center",
            background: "rgba(220,38,38,.1)", // #dc2626 @ 10%
            boxShadow: "inset 0 0 0 1px rgba(252,165,165,.9)",
            color: "var(--brand, #dc2626)",
        }}
        aria-hidden="true"
    >
        {children}
    </div>
);

/** 1) Share once, book forever */
/** 1) Share once, book forever — adjusted so inner link is centered */
/** Share once, book forever — true vertical center */
export const CalendarLinkIcon: React.FC = () => (
    <IconWrap>
        <svg
            className="feature-icon"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            shapeRendering="geometricPrecision"
            aria-hidden="true"
        >
            {/* Calendar frame */}
            <rect x="3" y="4" width="18" height="16" rx="3" />

            {/* Pins & header */}
            <path d="M8 3v4M16 3v4M3 9h18" />

            {/*
        Calendar body is y=4..20 with a header rule at y=9.
        Body content area is effectively 9..20 (height 11), so true center ≈ y=14.5.
        The chain below spans y=12..16, centered at y=14 — visually perfect with 2px stroke.
      */}
            {/* Right half */}
            <path d="M11 12h3a2 2 0 0 1 0 4h-1" />
            {/* Left half */}
            <path d="M12 16H9a2 2 0 0 1 0-4h1.5" />

        </svg>
    </IconWrap>
);


/** 2) Control the rules */
export const RulesIcon: React.FC = () => (
    <IconWrap>
        <svg className="feature-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="4" y="3.5" width="16" height="17" rx="2" />
            <path d="M7.5 7.5h9" />
            <path d="M7.5 11.5h6" />
            <path d="M7.5 15.5h4" />
            <path d="M17.5 15.25l-2 2 2 2" />
        </svg>
    </IconWrap>
);

/** 3) Team scheduling */
export const TeamIcon: React.FC = () => (
    <IconWrap>
        <svg className="feature-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="8" cy="8" r="3" />
            <circle cx="16.5" cy="10" r="2.5" />
            <path d="M3.5 18.5c.8-2.6 3.1-4.5 5.9-4.5s5.1 1.9 5.9 4.5" />
            <path d="M13.6 17.5c.6-1.9 2.2-3.2 4.1-3.2 1.2 0 2.3.5 3.1 1.3" />
        </svg>
    </IconWrap>
);

/** 4) Workflows & reminders */
export const WorkflowIcon: React.FC = () => (
    <IconWrap>
        <svg className="feature-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 6.5h6v5H5z" />
            <path d="M13 12.5h6v5h-6z" />
            <path d="M11 9h4" />
            <path d="M9.5 11.5v4" />
            <path d="M7.5 17.5h3" />
            <path d="M16 7.5l2 0" />
            <path d="M18 7.5l0 2" />
        </svg>
    </IconWrap>
);

/** 5) Embeds & integrations */
export const EmbedIcon: React.FC = () => (
    <IconWrap>
        <svg className="feature-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M8 6l-5 6 5 6" />
            <path d="M16 6l5 6-5 6" />
            <path d="M12 4l-2 16" />
        </svg>
    </IconWrap>
);

/** 6) Time-zone smart */
export const TimeZoneIcon: React.FC = () => (
    <IconWrap>
        <svg className="feature-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
            <path d="M2.5 12h19" opacity=".25" />
            <path d="M12 2.5v19" opacity=".25" />
        </svg>
    </IconWrap>
);
