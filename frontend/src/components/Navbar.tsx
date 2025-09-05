import { useEffect } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
    variant?: "landing" | "dashboard";
}

const Navbar: React.FC<NavbarProps> = ({ variant = "landing" }) => {
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
        <nav className="navbar" role="navigation" aria-label="Main" data-variant={variant}>
            <div className="nav-container">
                {/* Left: brand only (no hamburger) */}
                <div className="nav-left">
                    <a href="/" className="brand" aria-label="Home">
                        <img src="/images/logo/Logo.png" alt="Folio" className="logo" />
                    </a>
                </div>

                {/* Center: simple marketing links */}
                <div className="nav-links" role="menubar" aria-label="Primary">
                    <a className="nav-link" href="#features">Features</a>
                    <a className="nav-link" href="#how">How it works</a>
                    <a className="nav-link" href="#pricing">Pricing</a>
                    <a className="nav-link" href="#faq">FAQ</a>
                </div>

                {/* Right: auth links */}
                <div className="nav-right">
                    <Link className="login-btn" to="/login">Log in</Link>
                    <Link className="cta-btn" to="/signup">Get Started</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
