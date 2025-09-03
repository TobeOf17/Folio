// src/pages/LandingPage.tsx
import React, { useState } from 'react';

interface LandingPageProps {
    onNavigateToLogin: () => void;
}

const LandingPage = ({ onNavigateToLogin }: LandingPageProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="modern-landing">
            {/* Navigation Header */}
            <header className="landing-header">
                <nav className="landing-nav">
                    <div className="nav-container">
                        {/* Logo Section */}
                        <div className="nav-brand">
                            <div className="brand-logo">
                                <span className="logo-icon">F</span>
                            </div>
                            <span className="brand-text">Folio</span>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="nav-links">
                            <a href="#features" className="nav-link">Features</a>
                            <a href="#solutions" className="nav-link">Solutions</a>
                            <a href="#resources" className="nav-link">Resources</a>
                            <a href="#pricing" className="nav-link">Pricing</a>
                        </div>

                        {/* Desktop Actions */}
                        <div className="nav-actions">
                            <button onClick={onNavigateToLogin} className="signin-button">
                                Sign In
                            </button>
                            <button onClick={onNavigateToLogin} className="primary-cta-button">
                                Get Started
                            </button>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="mobile-menu-button"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle navigation menu"
                        >
                            <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </button>
                    </div>

                    {/* Mobile Menu Overlay */}
                    {isMobileMenuOpen && (
                        <div className="mobile-menu">
                            <div className="mobile-menu-content">
                                <div className="mobile-nav-links">
                                    <a href="#features" className="mobile-nav-link">Features</a>
                                    <a href="#solutions" className="mobile-nav-link">Solutions</a>
                                    <a href="#resources" className="mobile-nav-link">Resources</a>
                                    <a href="#pricing" className="mobile-nav-link">Pricing</a>
                                </div>
                                <div className="mobile-nav-actions">
                                    <button onClick={onNavigateToLogin} className="mobile-signin-button">
                                        Sign In
                                    </button>
                                    <button onClick={onNavigateToLogin} className="mobile-cta-button">
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </nav>
            </header>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Easy scheduling that
                            <span className="title-highlight"> works for everyone</span>
                        </h1>
                        <p className="hero-description">
                            Streamline your workforce management with intelligent shift scheduling,
                            real-time attendance tracking, and seamless team coordination.
                            Built for modern teams who value efficiency.
                        </p>
                        <div className="hero-actions">
                            <button onClick={onNavigateToLogin} className="hero-primary-button">
                                <span>Start for free</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <button className="hero-secondary-button">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <polygon points="5,3 19,12 5,21" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
                                </svg>
                                <span>Watch demo</span>
                            </button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="trust-indicators">
                            <p className="trust-text">Trusted by 100,000+ teams worldwide</p>
                            <div className="trust-stats">
                                <div className="stat-item">
                                    <span className="stat-number">99.9%</span>
                                    <span className="stat-label">Uptime</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">10M+</span>
                                    <span className="stat-label">Shifts managed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section" id="features">
                <div className="features-container">
                    <div className="section-header">
                        <h2 className="section-title">Everything you need to manage your workforce</h2>
                        <p className="section-description">
                            Powerful features designed to simplify scheduling and boost productivity
                        </p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                    <path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                            </div>
                            <div className="feature-content">
                                <h3 className="feature-title">Smart Scheduling</h3>
                                <p className="feature-description">
                                    Create, modify, and optimize shifts with AI-powered scheduling that considers
                                    availability, skills, and business requirements.
                                </p>
                                <a href="#" className="feature-link">
                                    Learn more
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <div className="feature-content">
                                <h3 className="feature-title">Real-time Tracking</h3>
                                <p className="feature-description">
                                    Monitor attendance in real-time with automated clock-ins, GPS verification,
                                    and detailed reporting capabilities.
                                </p>
                                <a href="#" className="feature-link">
                                    Learn more
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                            </div>
                            <div className="feature-content">
                                <h3 className="feature-title">Team Collaboration</h3>
                                <p className="feature-description">
                                    Enable seamless shift swaps, time-off requests, and team communication
                                    with built-in approval workflows.
                                </p>
                                <a href="#" className="feature-link">
                                    Learn more
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                    <path d="M3 3v5h5M3 16l4-4 4 4 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M21 21v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <div className="feature-content">
                                <h3 className="feature-title">Analytics & Reports</h3>
                                <p className="feature-description">
                                    Get insights into workforce productivity, attendance patterns, and
                                    operational efficiency with comprehensive analytics.
                                </p>
                                <a href="#" className="feature-link">
                                    Learn more
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-container">
                    <div className="cta-content">
                        <h2 className="cta-title">Ready to transform your workforce management?</h2>
                        <p className="cta-description">
                            Join thousands of teams already using Folio to streamline their operations
                        </p>
                        <div className="cta-actions">
                            <button onClick={onNavigateToLogin} className="cta-primary-button">
                                Start free trial
                            </button>
                            <button className="cta-secondary-button">
                                Schedule demo
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="modern-footer">
                <div className="footer-container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <div className="footer-logo">
                                <span className="logo-icon">F</span>
                            </div>
                            <span className="brand-text">Folio</span>
                        </div>
                        <p className="footer-tagline">
                            Modern workforce management for the modern workplace
                        </p>
                    </div>
                    <div className="footer-bottom">
                        <p className="copyright">© 2024 Folio. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;