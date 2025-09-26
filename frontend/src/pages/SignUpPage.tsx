// src/pages/SignUpPage.tsx
import React, { useState } from "react";
import Navbar from "../components/Navbar.tsx";
import { signup } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";

const SignUpPage: React.FC = () => {
  // Company information
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companySize, setCompanySize] = useState("");
  
  // Admin information
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signup({ 
        companyName, 
        companyEmail, 
        companySize,
        name: adminName, 
        email: adminEmail, 
        password: adminPassword 
      });
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-background-gray">
      {/* NAVBAR */}
      <Navbar variant="landing" />

      {/* SIGNUP SECTION */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-gray-900 mb-4">Register Your Company</h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Create your admin account and set up your organization to get started with Folio.
            </p>
          </div>

          {/* Main Form Card with Red Drop Shadow */}
          <div 
            className="bg-white rounded-3xl p-8 md:p-12 border border-border"
            style={{ 
              boxShadow: '0 20px 60px rgba(220, 38, 38, 0.15), 0 8px 24px rgba(220, 38, 38, 0.08)' 
            }}
          >
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Desktop: Horizontal Layout, Mobile: Stacked */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                
                {/* Company Information */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Company Information</h2>
                    <p className="text-text-secondary text-sm">Tell us about your organization</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-semibold text-gray-900 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        className="w-full h-12 border border-border rounded-xl px-4 text-base bg-white focus:border-brand focus:ring-4 focus:ring-brand/25 outline-none transition-all"
                        placeholder="ABC Corporation"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="companyEmail" className="block text-sm font-semibold text-gray-900 mb-2">
                        Company Email *
                      </label>
                      <input
                        type="email"
                        id="companyEmail"
                        className="w-full h-12 border border-border rounded-xl px-4 text-base bg-white focus:border-brand focus:ring-4 focus:ring-brand/25 outline-none transition-all"
                        placeholder="admin@abccorp.com"
                        value={companyEmail}
                        onChange={(e) => setCompanyEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="companyEmail" className="block text-sm font-semibold text-gray-900 mb-2">
                        Industry *
                      </label>
                      <input
                        type="email"
                        id="companyEmail"
                        className="w-full h-12 border border-border rounded-xl px-4 text-base bg-white focus:border-brand focus:ring-4 focus:ring-brand/25 outline-none transition-all"
                        placeholder="admin@abccorp.com"
                        value={companyEmail}
                        onChange={(e) => setCompanyEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Admin Information */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Admin Account</h2>
                    <p className="text-text-secondary text-sm">Create your administrator login</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="adminName" className="block text-sm font-semibold text-gray-900 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="adminName"
                        className="w-full h-12 border border-border rounded-xl px-4 text-base bg-white focus:border-brand focus:ring-4 focus:ring-brand/25 outline-none transition-all"
                        placeholder="John Smith"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="adminEmail" className="block text-sm font-semibold text-gray-900 mb-2">
                        Admin Email *
                      </label>
                      <input
                        type="email"
                        id="adminEmail"
                        className="w-full h-12 border border-border rounded-xl px-4 text-base bg-white focus:border-brand focus:ring-4 focus:ring-brand/25 outline-none transition-all"
                        placeholder="john@abccorp.com"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="adminPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                        Password *
                      </label>
                      <input
                        type="password"
                        id="adminPassword"
                        className="w-full h-12 border border-border rounded-xl px-4 text-base bg-white focus:border-brand focus:ring-4 focus:ring-brand/25 outline-none transition-all"
                        placeholder="Create a strong password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        required
                      />
                      <p className="text-xs text-text-secondary mt-2">
                        Must be at least 8 characters with letters and numbers
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-10 flex flex-col items-center">
                <button 
                  type="submit" 
                  className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-brand hover:bg-brand-hover text-white font-bold px-8 py-4 rounded-xl text-lg hover:shadow-lg hover:shadow-brand/25 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Create Company & Admin Account
                </button>
                
                <p className="text-xs text-text-secondary mt-4 text-center max-w-md">
                  By creating an account, you agree to our Terms of Service and Privacy Policy. 
                  Start your free 30-day trial immediately.
                </p>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-text-secondary">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-brand hover:text-brand-hover transition-colors">
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUpPage;