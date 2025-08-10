import { useState } from 'react';
import { Link } from 'react-router';

// Reusable Input Component
function FormInput({
                       label,
                       name,
                       type = "text",
                       value,
                       onChange,
                       error,
                       placeholder,
                       required = false,
                       options = null
                   }: {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    error?: string;
    placeholder?: string;
    required?: boolean;
    options?: { id: string | number; name: string }[] | null;
}) {
    if (type === "select") {
        return (
            <div className="form-group">
                <label htmlFor={name} className="form-label">
                    {label} {required && "*"}
                </label>
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`form-input ${error ? 'form-input-error' : ''}`}
                >
                    <option value="">{placeholder}</option>
                    {options?.map(option => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                </select>
                {error && <p className="error-message">{error}</p>}
            </div>
        );
    }

    return (
        <div className="form-group">
            <label htmlFor={name} className="form-label">
                {label} {required && "*"}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                required={required}
                value={value}
                onChange={onChange}
                className={`form-input ${error ? 'form-input-error' : ''}`}
                placeholder={placeholder}
            />
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

// Success Message Component
function SuccessMessage() {
    return (
        <div className="form-container">
            <div className="success-card">
                <div className="success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="success-title">Account Created!</h2>
                <p className="success-text">Your account has been successfully created.</p>
                <Link to="/login" className="btn-base btn-blue">
                    Go to Sign In
                </Link>
            </div>
        </div>
    );
}

// Form Data Type
interface FormData {
    fullName: string;
    email: string;
    employeeId: string;
    password: string;
    confirmPassword: string;
    phone: string;
    dob: string;
    gender: string;
    roleId: string;
    unitId: string;
}

// Main Sign Up Component
function SignUpPage() {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        employeeId: '',
        password: '',
        confirmPassword: '',
        phone: '',
        dob: '',
        gender: 'MALE',
        roleId: '1',
        unitId: '1'
    });

    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const roles = [
        { id: 1, name: 'Employee' },
        { id: 2, name: 'Manager' },
        { id: 3, name: 'Admin' }
    ];

    const units = [
        { id: 1, name: 'IT Department' },
        { id: 2, name: 'HR Department' },
        { id: 3, name: 'Finance Department' }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.dob) newErrors.dob = 'Date of birth is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const handleSubmit = async () => {
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            const payload = {
                fullName: formData.fullName,
                email: formData.email,
                employeeId: formData.employeeId,
                phone: formData.phone,
                dob: formData.dob,
                gender: formData.gender,
                hashedPassword: formData.password,
                role: { roleId: parseInt(formData.roleId) },
                unit: { unitId: parseInt(formData.unitId) }
            };

            const response = await fetch('/api/staff/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setSuccess(true);
            } else {
                const errorData = await response.json();
                setErrors({ general: errorData.message || 'Failed to create account' });
            }
        } catch (error) {
            setErrors({ general: 'Network error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    if (success) return <SuccessMessage />;

    return (
        <div className="form-container">
            <div className="form-wrapper">
                <div className="form-header">
                    <h2 className="form-title">Create Account</h2>
                    <p className="form-subtitle">Join Folio Attendance System</p>
                </div>

                {errors.general && (
                    <div className="error-banner">
                        <p>{errors.general}</p>
                    </div>
                )}

                <div className="form-fields">
                    <FormInput
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                        placeholder="Enter your full name"
                        required
                    />

                    <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        placeholder="Enter your email"
                        required
                    />

                    <FormInput
                        label="Employee ID"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleInputChange}
                        error={errors.employeeId}
                        placeholder="Enter employee ID"
                        required
                    />

                    <FormInput
                        label="Phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        error={errors.phone}
                        placeholder="Enter phone number"
                        required
                    />

                    <FormInput
                        label="Date of Birth"
                        name="dob"
                        type="date"
                        value={formData.dob}
                        onChange={handleInputChange}
                        error={errors.dob}
                        required
                    />

                    <FormInput
                        label="Gender"
                        name="gender"
                        type="select"
                        value={formData.gender}
                        onChange={handleInputChange}
                        placeholder="Select gender"
                        options={[
                            { id: 'MALE', name: 'Male' },
                            { id: 'FEMALE', name: 'Female' },
                            { id: 'OTHER', name: 'Other' }
                        ]}
                        required
                    />

                    <FormInput
                        label="Role"
                        name="roleId"
                        type="select"
                        value={formData.roleId}
                        onChange={handleInputChange}
                        error={errors.roleId}
                        placeholder="Select role"
                        options={roles}
                        required
                    />

                    <FormInput
                        label="Department"
                        name="unitId"
                        type="select"
                        value={formData.unitId}
                        onChange={handleInputChange}
                        error={errors.unitId}
                        placeholder="Select department"
                        options={units}
                        required
                    />

                    <FormInput
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        error={errors.password}
                        placeholder="Create password (min 8 chars)"
                        required
                    />

                    <FormInput
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        error={errors.confirmPassword}
                        placeholder="Confirm password"
                        required
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="btn-base btn-blue btn-full-width"
                    >
                        {loading ? 'Creating...' : 'Sign Up'}
                    </button>
                </div>

                <div className="form-footer">
                    <Link to="/login" className="footer-link">
                        Already have an account? Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;