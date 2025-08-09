import { useState } from 'react';
import { Link } from 'react-router';

function SignUpPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        employeeId: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Sign up form submitted:', formData);
        // TODO: Add API call logic here
    };

    return (
        <div className="form-container">
            <div className="form-wrapper">
                {/* Header */}
                <div className="form-header">
                    <h2 className="form-title">
                        Create Your Account
                    </h2>
                    <p className="form-subtitle">
                        Join the Folio Attendance System
                    </p>
                </div>

                {/* Form */}
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-fields">
                        {/* Full Name */}
                        <div className="form-group">
                            <label htmlFor="fullName" className="form-label">
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                required
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="form-input"
                                placeholder="Enter your full name"
                            />
                            {errors.fullName && (
                                <p className="error-message">{errors.fullName}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="form-input"
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="error-message">{errors.email}</p>
                            )}
                        </div>

                        {/* Employee ID */}
                        <div className="form-group">
                            <label htmlFor="employeeId" className="form-label">
                                Employee ID
                            </label>
                            <input
                                id="employeeId"
                                name="employeeId"
                                type="text"
                                required
                                value={formData.employeeId}
                                onChange={handleInputChange}
                                className="form-input"
                                placeholder="Enter your employee ID"
                            />
                            {errors.employeeId && (
                                <p className="error-message">{errors.employeeId}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                                className="form-input"
                                placeholder="Create a password"
                            />
                            {errors.password && (
                                <p className="error-message">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="form-label">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="form-input"
                                placeholder="Confirm your password"
                            />
                            {errors.confirmPassword && (
                                <p className="error-message">{errors.confirmPassword}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="btn-base btn-blue btn-full-width"
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="form-footer">
                        <p className="footer-text">
                            Already have an account?{' '}
                            <Link to="/login" className="footer-link">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUpPage;