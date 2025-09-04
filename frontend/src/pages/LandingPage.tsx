import React from "react";
import Navbar from "../components/Navbar.tsx";
import FeatureCard from "../components/FeatureCard";
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
                            Easy scheduling <span className="accent">ahead</span>
                        </h1>
                        <p className="hero-sub">
                            Share availability once, let people choose a time, and skip the back-and-forth.
                        </p>

                        <div className="hero-form grid-12">
                            <input type="email" className="input col-12 md-col-7" placeholder="Enter your email" />
                            <button className="btn btn-primary col-12 md-col-5">Create your free account</button>
                            <p className="form-note col-12">No credit card required.</p>
                        </div>
                    </div>

                    {/* Replaced the preview card with a testimonial + metrics panel */}
                    <div className="col-12 md-col-5">
                        <div className="card card-showcase">
                            <div className="quote">
                                <div className="stars" aria-label="5 stars">★★★★★</div>
                                <p>
                                    "Folio cut our scheduling time by <b>70%</b>. Clients book in seconds and our no-shows dropped."
                                </p>
                                <div className="person">
                                    <div className="avatar" />
                                    <div>
                                        <div className="name">Tola A.</div>
                                        <div className="role">Operations Lead, BrightLabs</div>
                                    </div>
                                </div>
                            </div>

                            <div className="metrics">
                                <div className="metric">
                                    <div className="kpi">70%</div>
                                    <div className="label">Less back-and-forth</div>
                                </div>
                                <div className="metric">
                                    <div className="kpi">4 min</div>
                                    <div className="label">Avg. time to book</div>
                                </div>
                                <div className="metric">
                                    <div className="kpi">−38%</div>
                                    <div className="label">No-shows</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Updated brand carousel with SVG images */}
            <section className="marquee">
                <div className="container">
                    <div className="marquee-track">
                        {/* First set of brand images */}
                        {Array.from({ length: 13 }, (_, i) => (
                            <img
                                key={`set1-${i}`}
                                src={`/public/images/brand/brand-${String(i + 1).padStart(2, '0')}.svg`}
                                alt={`Brand ${i + 1}`}
                                className="brand-logo"
                            />
                        ))}
                        {/* Second set for seamless loop */}
                        {Array.from({ length: 13 }, (_, i) => (
                            <img
                                key={`set2-${i}`}
                                src={`/public/images/brand/brand-${String(i + 1).padStart(2, '0')}.svg`}
                                alt={`Brand ${i + 1}`}
                                className="brand-logo"
                            />
                        ))}
                        {/* Third set for extra seamless transition */}
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
                        <h2 className="section-title">Everything you need to book faster</h2>
                        <p className="section-sub">Powerful scheduling that adapts to your workflow.</p>
                    </div>

                    <div className="grid-12 gap">
                        <div className="col-12 sm-col-6 lg-col-4">
                            <FeatureCard
                                icon={<CalendarLinkIcon />}
                                title="Share once, book forever"
                                text="Send a single link. Your live availability stays in sync."
                            />
                        </div>

                        <div className="col-12 sm-col-6 lg-col-4">
                            <FeatureCard
                                icon={<RulesIcon />}
                                title="Control the rules"
                                text="Buffers, daily limits, minimum notice, and custom durations."
                            />
                        </div>

                        <div className="col-12 sm-col-6 lg-col-4">
                            <FeatureCard
                                icon={<TeamIcon />}
                                title="Team scheduling"
                                text="Round-robin, collective, and one-to-one for teams."
                            />
                        </div>

                        <div className="col-12 sm-col-6 lg-col-4">
                            <FeatureCard
                                icon={<WorkflowIcon />}
                                title="Workflows & reminders"
                                text="Automatic confirmations and reminders reduce no-shows."
                            />
                        </div>

                        <div className="col-12 sm-col-6 lg-col-4">
                            <FeatureCard
                                icon={<EmbedIcon />}
                                title="Embeds & integrations"
                                text="Add Folio to your site and connect favorite tools."
                            />
                        </div>

                        <div className="col-12 sm-col-6 lg-col-4">
                            <FeatureCard
                                icon={<TimeZoneIcon />}
                                title="Time-zone smart"
                                text="Guests always see times in their local time zone."
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
                        <h2 className="section-title">Set up in minutes</h2>
                    </div>

                    <div className="grid-12 gap">
                        {[
                            { n: "1", t: "Connect your calendar", d: "Sync Google, Outlook, or iCloud in seconds." },
                            { n: "2", t: "Set your rules", d: "Choose meeting types, buffers, and working hours." },
                            { n: "3", t: "Share your link", d: "Guests pick a time. Events land on everyone's calendar." },
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
                        <h2 className="section-title">Start free, upgrade anytime</h2>
                    </div>

                    <div className="grid-12 gap">
                        {[
                            { name: "Basic", price: "Free", features: ["1 event type", "Email notifications", "Embed link"] },
                            { name: "Pro", price: "$12/mo", features: ["Unlimited event types", "Reminders", "Team scheduling"] },
                            { name: "Business", price: "$20/mo", features: ["Workflows", "SSO", "Advanced integrations"] },
                        ].map((p, i) => (
                            <div key={i} className="col-12 md-col-4">
                                <div className="card pricing-card soft">
                                    <h3 className="card-title">{p.name}</h3>
                                    <div className="price">{p.price}</div>
                                    <ul className="bullet-list tight">
                                        {p.features.map((f, j) => <li key={j}>{f}</li>)}
                                    </ul>
                                    <button className="btn btn-primary w-full">Choose {p.name}</button>
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
                        <h2 className="section-title">Answers to common questions</h2>
                    </div>

                    <div className="grid-12 gap">
                        {[
                            { q: "Can I keep using Folio for free?", a: "Yes. The Basic plan is free forever with core scheduling features." },
                            { q: "Does Folio support teams?", a: "Yes. Round-robin, collective, and group scheduling on paid plans." },
                            { q: "Will Folio handle time zones?", a: "Absolutely. Guests always see times in their local time zone." },
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
                        <h2 className="cta-title">Book meetings the easy way with Folio</h2>
                        <p className="cta-sub">Join thousands of professionals saving hours every week.</p>
                    </div>
                    <div className="col-12 md-col-4 right-md">
                        <button className="btn btn-primary w-full md-w-auto">Get Started Free</button>
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