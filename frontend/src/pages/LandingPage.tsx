import React from "react";
import Navbar from "../components/Navbar.tsx";
import FeatureCard from "../components/FeatureCard";
import {Link} from "react-router-dom";
import AttendanceHeroIllustration from "../components/AttendanceHeroIllustration.tsx";

import {
    CalendarLinkIcon,
    RulesIcon,
    TeamIcon,
    WorkflowIcon,
    EmbedIcon,
    TimeZoneIcon,
} from "../components/icons/ProductIcons";


const LandingPage: React.FC = () => {
    return (
        <div className="folio-page">
            {/* NAVBAR */}
            <Navbar variant="landing" />

            {/* HERO */}
            <section className="hero">
                <div className="container grid-12 center-y">
                    <div className="col-12 md-col-7">
                        <h1 className="hero-title">
                            Attendance management <span className="accent">simplified</span>
                        </h1>
                        <p className="hero-sub">
                            Register your company, add your team, and start tracking attendance in minutes. No more spreadsheets or manual timekeeping.
                        </p>

                        <div className="hero-form grid-12">
                            <input type="email" className="input col-12 md-col-7" placeholder="Company email address" />
                            <Link to="/company-registration" className="btn btn-primary col-12 md-col-5">
                                Register your company
                            </Link>
                            <p className="form-note col-12">Free 30-day trial. No credit card required.</p>
                        </div>
                    </div>

                    <div className="col-12 md-col-5">
                        <AttendanceHeroIllustration />
                    </div>
                </div>
            </section>

            {/* Updated brand carousel - keeping existing structure */}
            <section className="marquee">
                <div className="container">
                    <div className="marquee-track">
                        {Array.from({ length: 13 }, (_, i) => (
                            <img
                                key={`set1-${i}`}
                                src={`/public/images/brand/brand-${String(i + 1).padStart(2, '0')}.svg`}
                                alt={`Brand ${i + 1}`}
                                className="brand-logo"
                            />
                        ))}
                        {Array.from({ length: 13 }, (_, i) => (
                            <img
                                key={`set2-${i}`}
                                src={`/public/images/brand/brand-${String(i + 1).padStart(2, '0')}.svg`}
                                alt={`Brand ${i + 1}`}
                                className="brand-logo"
                            />
                        ))}
                        {Array.from({ length: 13 }, (_, i) => (
                            <img
                                key={`set3-${i}`}
                                src={`/public/images/brand/brand-${String(i + 1).padStart(2, '0')}.svg`}
                                alt={`Brand ${i + 1}`}
                                className="brand-logo"
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section id="features" className="section">
                <div className="container">
                    <div className="section-head">
                        <span className="eyebrow">Features</span>
                        <h2 className="section-title">Everything your company needs for attendance</h2>
                        <p className="section-sub">Powerful attendance tracking that scales with your organization.</p>
                    </div>

                    <div className="grid-12 gap">
                        <div className="col-12 sm-col-6 lg-col-4">
                            <FeatureCard
                                icon={<CalendarLinkIcon />}
                                title="Quick staff onboarding"
                                text="Add employees in seconds. They can start clocking in immediately."
                            />
                        </div>

                        <div className="col-12 sm-col-6 lg-col-4">
                            <FeatureCard
                                icon={<RulesIcon />}
                                title="Smart attendance rules"
                                text="Set overtime limits, break requirements, and location-based check-ins."
                            />
                        </div>

                        <div className="col-12 sm-col-6 lg-col-4">
                            <FeatureCard
                                icon={<TeamIcon />}
                                title="Team management"
                                text="Organize by departments, shifts, and roles. Perfect for any company size."
                            />
                        </div>

                        <div className="col-12 sm-col-6 lg-col-4">
                            <FeatureCard
                                icon={<WorkflowIcon />}
                                title="Automated reports"
                                text="Generate payroll reports, attendance summaries, and compliance docs."
                            />
                        </div>

                        <div className="col-12 sm-col-6 lg-col-4">
                            <FeatureCard
                                icon={<EmbedIcon />}
                                title="Mobile & web access"
                                text="Employees can clock in from anywhere. Managers access dashboards online."
                            />
                        </div>

                        <div className="col-12 sm-col-6 lg-col-4">
                            <FeatureCard
                                icon={<TimeZoneIcon />}
                                title="Multi-location support"
                                text="Perfect for companies with multiple offices or remote workers."
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how" className="section alt">
                <div className="container">
                    <div className="section-head">
                        <span className="eyebrow">How it works</span>
                        <h2 className="section-title">Get started in 3 simple steps</h2>
                    </div>

                    <div className="grid-12 gap">
                        {[
                            { n: "1", t: "Register your company", d: "Create your company account and set up basic info in under 2 minutes." },
                            { n: "2", t: "Add your employees", d: "Invite your team or add them manually. They'll get instant access." },
                            { n: "3", t: "Start tracking", d: "Employees clock in/out. You get real-time attendance data and reports." },
                        ].map((s, i) => (
                            <div key={i} className="col-12 md-col-4">
                                <div className="card step-card">
                                    <div className="step-badge">{s.n}</div>
                                    <h3 className="card-title">{s.t}</h3>
                                    <p className="card-text">{s.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <section id="pricing" className="section">
                <div className="container">
                    <div className="section-head">
                        <span className="eyebrow">Pricing</span>
                        <h2 className="section-title">Simple pricing that scales with you</h2>
                    </div>

                    <div className="grid-12 gap">
                        {[
                            { name: "Starter", price: "Free", features: ["Up to 5 employees", "Basic attendance tracking", "Export reports"] },
                            { name: "Professional", price: "$4/employee/mo", features: ["Unlimited employees", "Advanced reports", "Shift management"] },
                            { name: "Enterprise", price: "Custom", features: ["Multi-location support", "API access", "Dedicated support"] },
                        ].map((p, i) => (
                            <div key={i} className="col-12 md-col-4">
                                <div className="card pricing-card soft">
                                    <h3 className="card-title">{p.name}</h3>
                                    <div className="price">{p.price}</div>
                                    <ul className="bullet-list tight">
                                        {p.features.map((f, j) => <li key={j}>{f}</li>)}
                                    </ul>
                                    <button className="btn btn-primary w-full">Start with {p.name}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="section alt">
                <div className="container">
                    <div className="section-head">
                        <span className="eyebrow">FAQ</span>
                        <h2 className="section-title">Common questions from companies</h2>
                    </div>

                    <div className="grid-12 gap">
                        {[
                            { q: "Can we try Folio for free?", a: "Yes. Start with up to 5 employees free forever. Upgrade anytime as you grow." },
                            { q: "How do employees clock in?", a: "Mobile app, web browser, or even SMS. Works on any device, anywhere." },
                            { q: "Is our data secure?", a: "Absolutely. Bank-level encryption and compliance with data protection regulations." },
                        ].map((item, i) => (
                            <div key={i} className="col-12 md-col-4">
                                <div className="card faq-card soft">
                                    <h3 className="card-title">{item.q}</h3>
                                    <p className="card-text">{item.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CLEAN, MINIMAL CTA */}
            <section className="cta">
                <div className="container grid-12 center-y">
                    <div className="col-12 md-col-8">
                        <h2 className="cta-title">Ready to modernize your attendance tracking?</h2>
                        <p className="cta-sub">Join hundreds of companies already saving time and reducing errors with Folio.</p>
                    </div>
                    <div className="col-12 md-col-4 right-md">
                        <Link to="/company-registration" className="btn btn-primary w-full md-w-auto">
                            Register Your Company
                        </Link>
                    </div>
                </div>
            </section>

            {/* MINIMAL FOOTER */}
            <footer className="footer-min">
                <div className="container grid-12 center-y">
                    <div className="col-12 md-col-6 right-md muted">
                        © {new Date().getFullYear()} Folio
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;