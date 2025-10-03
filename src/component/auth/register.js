import React, { useState, useEffect } from 'react';
import styles from './register.module.css';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        dateOfBirth: '',
        phone: '',
        agreeToTerms: false
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [savedRegistrations, setSavedRegistrations] = useState([]);

    // Load saved registrations from localStorage on component mount
    useEffect(() => {
        const saved = localStorage.getItem('registrations');
        if (saved) {
            setSavedRegistrations(JSON.parse(saved));
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            // Save to localStorage
            saveToLocalStorage(formData);
            console.log('Form submitted:', formData);
            setIsSubmitted(true);
            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                gender: '',
                dateOfBirth: '',
                phone: '',
                agreeToTerms: false
            });
        } else {
            setErrors(validationErrors);
        }
    };

    const saveToLocalStorage = (data) => {
        try {
            // Get existing registrations
            const existing = JSON.parse(localStorage.getItem('registrations') || '[]');

            // Create registration object (exclude password confirmation for security)
            const registration = {
                id: Date.now(), // Simple ID generation
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                gender: data.gender,
                dateOfBirth: data.dateOfBirth,
                phone: data.phone,
                registrationDate: new Date().toISOString(),
                // Note: In real apps, never store plain text passwords
                // This is just for demonstration purposes
                hasPassword: !!data.password
            };

            // Save password separately for login authentication
            // WARNING: This is for demo only - never store plain text passwords in production
            if (data.password) {
                localStorage.setItem(`password_${data.email}`, data.password);
            }

            // Add new registration
            existing.push(registration);

            // Save back to localStorage
            localStorage.setItem('registrations', JSON.stringify(existing));

            // Update state
            setSavedRegistrations(existing);

            console.log('Registration saved to localStorage:', registration);
            console.log('Password saved for login authentication');
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    };

    const validateForm = (data) => {
        let errors = {};
        if (!data.firstName.trim()) {
            errors.firstName = 'First name is required';
        }
        if (!data.lastName.trim()) {
            errors.lastName = 'Last name is required';
        }
        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else {
            // Check if email already exists in localStorage
            const existing = JSON.parse(localStorage.getItem('registrations') || '[]');
            const emailExists = existing.some(reg => reg.email.toLowerCase() === data.email.toLowerCase());
            if (emailExists) {
                errors.email = 'This email is already registered';
            }
        }
        if (!data.password) {
            errors.password = 'Password is required';
        }
        if (!data.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        }
        if (data.password !== data.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        if (!data.gender) {
            errors.gender = 'Please select your gender';
        }
        if (!data.dateOfBirth) {
            errors.dateOfBirth = 'Date of birth is required';
        }
        if (!data.phone.trim()) {
            errors.phone = 'Phone number is required';
        }
        if (!data.agreeToTerms) {
            errors.agreeToTerms = 'You must agree to the terms and conditions';
        }
        return errors;
    };

    const clearAllRegistrations = () => {
        if (window.confirm('Are you sure you want to clear all saved registrations?')) {
            // Remove all password entries
            savedRegistrations.forEach(reg => {
                localStorage.removeItem(`password_${reg.email}`);
            });

            // Remove registrations and current user session
            localStorage.removeItem('registrations');
            localStorage.removeItem('currentUser');
            setSavedRegistrations([]);
        }
    };

    const deleteRegistration = (id) => {
        if (window.confirm('Are you sure you want to delete this registration?')) {
            const userToDelete = savedRegistrations.find(reg => reg.id === id);
            if (userToDelete) {
                // Remove password for this user
                localStorage.removeItem(`password_${userToDelete.email}`);

                // Check if this user is currently logged in
                const currentUser = localStorage.getItem('currentUser');
                if (currentUser) {
                    const user = JSON.parse(currentUser);
                    if (user.email === userToDelete.email) {
                        localStorage.removeItem('currentUser');
                    }
                }
            }

            const updated = savedRegistrations.filter(reg => reg.id !== id);
            localStorage.setItem('registrations', JSON.stringify(updated));
            setSavedRegistrations(updated);
        }
    };

    if (isSubmitted) {
        return (
            <div className={styles.container}>
                <div className={styles.successMessage}>
                    <h3>🎉 Registration Successful!</h3>
                    <p>Thank you for registering. Your account has been created and saved locally.</p>
                    <div style={{
                        background: 'rgba(102, 126, 234, 0.1)',
                        border: '1px solid rgba(102, 126, 234, 0.3)',
                        borderRadius: '8px',
                        padding: '1rem',
                        margin: '1rem 0',
                        textAlign: 'left'
                    }}>
                        <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600', color: '#667eea' }}>
                            ✅ You can now login with:
                        </p>
                        <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                            <strong>Email:</strong> {savedRegistrations.length > 0 ? savedRegistrations[savedRegistrations.length - 1].email : 'Your registered email'}
                        </p>
                        <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                            <strong>Password:</strong> The password you just created
                        </p>
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                            Total registrations saved: {savedRegistrations.length}
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            style={{
                                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '0.75rem 1.5rem',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                textDecoration: 'none'
                            }}
                        >
                            Register Another User
                        </button>
                        <a
                            href="/login"
                            style={{
                                background: 'linear-gradient(135deg, #48bb78, #38a169)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '0.75rem 1.5rem',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                textDecoration: 'none',
                                display: 'inline-block'
                            }}
                        >
                            Go to Login
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create Account</h1>
            <p className={styles.subtitle}>Join our community today</p>
            <form className={styles.form} onSubmit={handleSubmit}>
                {/* Name Fields */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>First Name *</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`${styles.input} ${errors.firstName ? styles.error : ''}`}
                            placeholder="Enter your first name"
                        />
                        {errors.firstName && <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errors.firstName}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Last Name *</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={`${styles.input} ${errors.lastName ? styles.error : ''}`}
                            placeholder="Enter your last name"
                        />
                        {errors.lastName && <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errors.lastName}</span>}
                    </div>
                </div>

                {/* Email */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>Email *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.email ? styles.error : ''}`}
                        placeholder="your.email@example.com"
                    />
                    {errors.email && <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errors.email}</span>}
                </div>

                {/* Password Fields */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Password *</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`${styles.input} ${errors.password ? styles.error : ''}`}
                            placeholder="Create a password"
                        />
                        {errors.password && <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errors.password}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Confirm Password *</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={`${styles.input} ${errors.confirmPassword ? styles.error : ''}`}
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errors.confirmPassword}</span>}
                    </div>
                </div>

                {/* Personal Information */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Gender *</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className={`${styles.input} ${errors.gender ? styles.error : ''}`}
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errors.gender}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Date of Birth *</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            className={`${styles.input} ${errors.dateOfBirth ? styles.error : ''}`}
                        />
                        {errors.dateOfBirth && <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errors.dateOfBirth}</span>}
                    </div>
                </div>

                {/* Phone */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>Phone Number *</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.phone ? styles.error : ''}`}
                        placeholder="Enter your phone number"
                    />
                    {errors.phone && <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errors.phone}</span>}
                </div>

                {/* Terms and Conditions */}
                <div className={styles.formGroup}>
                    <label className={styles.checkboxGroup}>
                        <input
                            type="checkbox"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleInputChange}
                            className={styles.checkbox}
                        />
                        <span className={styles.checkboxLabel}>
                            I agree to the Terms and Conditions and Privacy Policy
                        </span>
                    </label>
                    {errors.agreeToTerms && <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errors.agreeToTerms}</span>}
                </div>

                {/* Submit Button */}
                <button type="submit" className={styles.submitButton} disabled={!formData.agreeToTerms}>
                    Create Account
                </button>
            </form>

            {/* Saved Registrations Section */}
            {savedRegistrations.length > 0 && (
                <div style={{
                    marginTop: '2rem',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(15px)',
                    borderRadius: '20px',
                    padding: '2rem',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0, color: '#2d3748', fontSize: '1.5rem' }}>
                            Saved Registrations ({savedRegistrations.length})
                        </h3>
                        <button
                            onClick={clearAllRegistrations}
                            style={{
                                background: 'linear-gradient(135deg, #e53e3e, #c53030)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '0.5rem 1rem',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            Clear All
                        </button>
                    </div>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {savedRegistrations.map((registration) => (
                            <div key={registration.id} style={{
                                background: 'rgba(248, 249, 250, 0.8)',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                padding: '1.25rem',
                                display: 'grid',
                                gridTemplateColumns: '1fr auto',
                                gap: '1rem',
                                alignItems: 'start'
                            }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                    <div>
                                        <strong style={{ color: '#2d3748', fontSize: '0.9rem' }}>Name:</strong>
                                        <p style={{ margin: '0.25rem 0 0 0', color: '#4a5568' }}>
                                            {registration.firstName} {registration.lastName}
                                        </p>
                                    </div>
                                    <div>
                                        <strong style={{ color: '#2d3748', fontSize: '0.9rem' }}>Email:</strong>
                                        <p style={{ margin: '0.25rem 0 0 0', color: '#4a5568' }}>
                                            {registration.email}
                                        </p>
                                    </div>
                                    <div>
                                        <strong style={{ color: '#2d3748', fontSize: '0.9rem' }}>Phone:</strong>
                                        <p style={{ margin: '0.25rem 0 0 0', color: '#4a5568' }}>
                                            {registration.phone}
                                        </p>
                                    </div>
                                    <div>
                                        <strong style={{ color: '#2d3748', fontSize: '0.9rem' }}>Gender:</strong>
                                        <p style={{ margin: '0.25rem 0 0 0', color: '#4a5568' }}>
                                            {registration.gender}
                                        </p>
                                    </div>
                                    <div>
                                        <strong style={{ color: '#2d3748', fontSize: '0.9rem' }}>Date of Birth:</strong>
                                        <p style={{ margin: '0.25rem 0 0 0', color: '#4a5568' }}>
                                            {new Date(registration.dateOfBirth).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <strong style={{ color: '#2d3748', fontSize: '0.9rem' }}>Registered:</strong>
                                        <p style={{ margin: '0.25rem 0 0 0', color: '#4a5568', fontSize: '0.85rem' }}>
                                            {new Date(registration.registrationDate).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteRegistration(registration.id)}
                                    style={{
                                        background: 'linear-gradient(135deg, #e53e3e, #c53030)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        padding: '0.5rem',
                                        fontSize: '0.8rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        width: '60px',
                                        height: '32px'
                                    }}
                                    title="Delete this registration"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegistrationForm;
