import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

interface NavbarProps {
    onToggleSidebar?: () => void;
    variant?: 'landing' | 'dashboard';

}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, variant = 'dashboard' }) => {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // close menu on outside click / Esc
    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    // scroll shadow
    useEffect(() => {
        const el = document.querySelector(".navbar");
        const onScroll = () => {
            if (!el) return;
            (el as HTMLElement).classList.toggle("scrolled", window.scrollY > 20);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav className="navbar" role="navigation">
            <div className="nav-container">
                {/* Left: mobile toggle + brand */}
                <div className="nav-left">
                    {variant === 'dashboard' && (
                        <button
                            className="mobile-toggle"
                            onClick={onToggleSidebar}
                            aria-label="Toggle sidebar"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </button>
                    )}

                    <a href="/" className="brand">
                        <img src="/images/logo/Logo.png" alt="Folio" className="logo" />
                    </a>
                </div>

                {/* Center: nav links */}
                <nav className="nav-links">
                    <a className="nav-link" href="#features">Features</a>
                    <a className="nav-link" href="#how">How it works</a>
                    <a className="nav-link" href="#pricing">Pricing</a>
                    <a className="nav-link" href="#faq">FAQ</a>
                </nav>

                {/* Right: actions */}
                <div className="nav-right">
                    {variant === 'landing' ? (
                        <>
                            <Link className="login-btn" to="/login">Log in</Link>
                            <a className="cta-btn" href="/get-started">Get Started</a>
                        </>
                    ) : (
                        <>
                            <Link className="login-btn" to="/login">Log in</Link>
                            <a className="cta-btn" href="/get-started">Get Started</a>

                            <div className="user-menu" ref={menuRef}>
                                <button
                                    className="user-btn"
                                    onClick={() => setOpen(!open)}
                                    aria-haspopup="menu"
                                    aria-expanded={open}
                                >
                                    <div className="avatar">{user?.fullName?.charAt(0) || "U"}</div>
                                    <svg className={`chevron ${open ? "open" : ""}`} width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </button>

                                {open && (
                                    <div className="user-dropdown">
                                        <div className="dropdown-header">
                                            <div className="avatar large">{user?.fullName?.charAt(0) || "U"}</div>
                                            <div>
                                                <div className="user-name">{user?.fullName || "User"}</div>
                                                <div className="user-email">{user?.email || "user@example.com"}</div>
                                            </div>
                                        </div>
                                        <hr className="dropdown-divider" />
                                        <button className="dropdown-item logout" onClick={logout}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;