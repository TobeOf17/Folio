import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
    variant?: "landing" | "dashboard";
}

const Navbar: React.FC<NavbarProps> = ({ variant = "landing" }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navLinks = [
        { href: "#features", label: "Features" },
        { href: "#how", label: "How it works" },
        { href: "#pricing", label: "Pricing" },
        { href: "#faq", label: "FAQ" }
    ];

    return (
        <nav 
            className={`
                sticky top-0 z-50 transition-all duration-300
                ${isScrolled 
                    ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-100' 
                    : 'bg-white/80 backdrop-blur-md border-b border-gray-100/50'
                }
            `}
            role="navigation" 
            aria-label="Main"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Use CSS Grid for perfect 3-column layout */}
                <div className="grid grid-cols-3 items-center h-16 lg:h-18 w-full">
                    
                    {/* Left: Brand */}
                    <div className="flex items-center">
                        <Link 
                            to="/" 
                            className="group flex items-center gap-3 hover:opacity-80 transition-opacity"
                            aria-label="Folio Home"
                        >
                            <div className="relative">
                                <div className="w-8 h-8 bg-gradient-to-br from-brand to-brand-hover rounded-lg shadow-sm group-hover:shadow-md transition-shadow flex items-center justify-center">
                                    <div className="w-3 h-3 bg-white rounded-sm"></div>
                                </div>
                                {/* Subtle glow effect */}
                                <div className="absolute inset-0 w-8 h-8 bg-brand/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                            </div>
                            <span className="text-xl font-black text-gray-900 tracking-tight">
                                Folio
                            </span>
                        </Link>
                    </div>

                    {/* Center: Navigation links - perfectly centered */}
                    <div className="hidden lg:flex items-center justify-center">
                        <div className="flex items-center gap-1 bg-gray-50/80 backdrop-blur-sm rounded-xl p-1 border border-gray-200/50">
                            {navLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-brand transition-colors rounded-lg hover:bg-white/70 group"
                                >
                                    {link.label}
                                    <div className="absolute inset-x-1 -bottom-px h-px bg-brand scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right: Auth buttons + Mobile menu */}
                    <div className="flex items-center justify-end gap-3">
                        {/* Login button - hidden on mobile to save space */}
                        <Link
                            to="/login"
                            className="hidden sm:block text-sm font-medium text-gray-700 hover:text-brand transition-colors px-3 py-2 rounded-lg hover:bg-gray-50/50"
                        >
                            Log in
                        </Link>

                        {/* CTA button */}
                        <Link
                            to="/signup"
                            className="relative inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-brand/25 hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <span className="hidden sm:inline">Get Started</span>
                            <span className="sm:hidden">Sign up</span>
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-gray-600 hover:text-brand hover:bg-gray-50 rounded-lg transition-colors ml-2"
                            aria-label="Toggle menu"
                        >
                            <div className="relative w-5 h-5">
                                <span 
                                    className={`absolute block w-full h-0.5 bg-current rounded transition-all duration-200 ${
                                        isMobileMenuOpen ? 'top-2 rotate-45' : 'top-1'
                                    }`}
                                />
                                <span 
                                    className={`absolute block w-full h-0.5 bg-current rounded transition-all duration-200 top-2 ${
                                        isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                                    }`}
                                />
                                <span 
                                    className={`absolute block w-full h-0.5 bg-current rounded transition-all duration-200 ${
                                        isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-3'
                                    }`}
                                />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile menu dropdown */}
                <div 
                    className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
                        isMobileMenuOpen 
                            ? 'max-h-64 opacity-100 pb-4' 
                            : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="pt-4 border-t border-gray-100">
                        <div className="flex flex-col space-y-2">
                            {navLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="text-gray-700 hover:text-brand hover:bg-gray-50/80 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;