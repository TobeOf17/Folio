import React, { useState } from "react";
import Navbar from "../components/Navbar.tsx";
import FeatureCard from "../components/FeatureCard";
import {Link, useNavigate} from "react-router-dom";
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
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        // Navigate to signup with email as state
        navigate("/signup", { state: { email } });
    };

    return (
        <div className="min-h-screen bg-white">
            {/* NAVBAR */}
            <Navbar variant="landing" />

            {/* HERO */}
            
<section className="pt-18 pb-16 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <div className="relative grid grid-cols-12 gap-6 items-center">
      {/* TEXT */}
      <div className="col-span-12 md:col-span-6 xl:col-span-7 text-left z-10 md:pr-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-gray-900 tracking-tight">
          {/* allow wrap on md, keep one line on lg+ */}
          <span className="whitespace-normal lg:whitespace-nowrap inline-block">
            Attendance management
          </span>
          <br />
          <span className="text-brand">simplified</span>
        </h1>

        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Register your company, add your team, and start tracking attendance in minutes.
          No more spreadsheets or manual timekeeping.
        </p>

        <div className="mt-6 grid grid-cols-12 gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="col-span-12 md:col-span-7 h-12 border-2 border-border rounded-xl px-4 text-base bg-white focus:border-brand focus:ring-4 focus:ring-brand/25 outline-none transition-all"
            placeholder="Company email address"
          />
          <button
            onClick={handleRegisterClick}
            className="col-span-12 md:col-span-5 inline-flex items-center justify-center h-12 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover active:translate-y-px transition-all"
          >
            Register your company
          </button>
          <p className="col-span-12 text-sm text-text-secondary mt-2">
            Free 30-day trial. No credit card required.
          </p>
        </div>
      </div>

      {/* ILLUSTRATION */}
<div className="col-span-12 md:col-span-5 md:mt-12 flex justify-center md:justify-end items-center">
  <AttendanceHeroIllustration />
</div>

    </div>
  </div>
</section>


            {/* FEATURES */}
            <section id="features" className="py-18 bg-background-gray">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="mb-12">
                        <span className="inline-block text-xs font-black uppercase tracking-wider text-brand bg-brand-light border border-red-200 rounded-full px-3 py-1">
                            Features
                        </span>
                        <h2 className="mt-2 text-3xl font-black text-gray-900">
                            Everything your company needs for attendance
                        </h2>
                        <p className="mt-2 text-text-secondary">
                            Powerful attendance tracking that scales with your organization.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={<CalendarLinkIcon />}
                            title="Quick staff onboarding"
                            text="Add employees in seconds. They can start clocking in immediately."
                        />
                        <FeatureCard
                            icon={<RulesIcon />}
                            title="Smart attendance rules"
                            text="Set overtime limits, break requirements, and location-based check-ins."
                        />
                        <FeatureCard
                            icon={<TeamIcon />}
                            title="Team management"
                            text="Organize by departments, shifts, and roles. Perfect for any company size."
                        />
                        <FeatureCard
                            icon={<WorkflowIcon />}
                            title="Automated reports"
                            text="Generate payroll reports, attendance summaries, and compliance docs."
                        />
                        <FeatureCard
                            icon={<EmbedIcon />}
                            title="Mobile & web access"
                            text="Employees can clock in from anywhere. Managers access dashboards online."
                        />
                        <FeatureCard
                            icon={<TimeZoneIcon />}
                            title="Multi-location support"
                            text="Perfect for companies with multiple offices or remote workers."
                        />
                    </div>
                </div>
            </section>

            {/* HOW */}
            <section id="how" className="py-18 bg-surface-alt">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="mb-12">
                        <span className="inline-block text-xs font-black uppercase tracking-wider text-brand bg-brand-light border border-red-200 rounded-full px-3 py-1">
                            How it works
                        </span>
                        <h2 className="mt-2 text-3xl font-black text-gray-900">
                            Get started in 3 simple steps
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { n: "1", t: "Register your company", d: "Create your company account and set up basic info in under 2 minutes." },
                            { n: "2", t: "Add your employees", d: "Invite your team or add them manually. They'll get instant access." },
                            { n: "3", t: "Start tracking", d: "Employees clock in/out. You get real-time attendance data and reports." },
                        ].map((step, i) => (
                            <div key={i} className="bg-white border border-border rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                                <div className="w-9 h-9 rounded-full bg-brand text-white font-black flex items-center justify-center text-sm shadow-lg shadow-brand/25 mb-4">
                                    {step.n}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.t}</h3>
                                <p className="text-text-secondary">{step.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* FAQ */}
            <section id="faq" className="py-18 bg-gray-60">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="mb-12">
                        <span className="inline-block text-xs font-black uppercase tracking-wider text-brand bg-brand-light border border-red-200 rounded-full px-3 py-1">
                            FAQ
                        </span>
                        <h2 className="mt-2 text-3xl font-black text-gray-900">
                            Common questions from companies
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { q: "Can we try Folio for free?", a: "Yes. Start with up to 5 employees free forever. Upgrade anytime as you grow." },
                            { q: "How do employees clock in?", a: "Mobile app, web browser, or even SMS. Works on any device, anywhere." },
                            { q: "Is our data secure?", a: "Absolutely. Bank-level encryption and compliance with data protection regulations." },
                        ].map((item, i) => (
                            <div key={i} className="bg-white border border-border-light rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-gray-300 transition-all">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.q}</h3>
                                <p className="text-text-secondary">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12 border-t border-border bg-background-gray">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-12 gap-6 items-center">
                        <div className="col-span-12 md:col-span-8">
                            <h2 className="text-2xl font-black text-gray-900">
                                Ready to modernize your attendance tracking?
                            </h2>
                            <p className="mt-2 text-text-secondary">
                                Join hundreds of companies already saving time and reducing errors with Folio.
                            </p>
                        </div>
                        <div className="col-span-12 md:col-span-4 text-left md:text-right">
                            <button
                                onClick={handleRegisterClick}
                                className="inline-flex items-center justify-center w-full md:w-auto h-11 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover active:translate-y-px transition-all px-6"
                            >
                                Register Your Company
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* MINIMAL FOOTER */}
            <footer className="py-6 bg-background-gray border-t border-border">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-12 items-center">
                        <div className="col-span-12 md:col-span-6 text-left md:text-right text-text-secondary">
                            © {new Date().getFullYear()} Folio
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;