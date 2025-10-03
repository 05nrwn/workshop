import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';

const Login = () => {
    const [formData, setFormData] = useState({
        emailOrUsername: '',
        password: '',
        rememberMe: false
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [registeredUsers, setRegisteredUsers] = useState([]);

    // Load registered users and check if already logged in
    useEffect(() => {
        const saved = localStorage.getItem('registrations');
        if (saved) {
            setRegisteredUsers(JSON.parse(saved));
        }

        const loggedInUser = localStorage.getItem('currentUser');
        if (loggedInUser) {
            setCurrentUser(JSON.parse(loggedInUser));
            setIsLoggedIn(true);
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

    const validateForm = () => {
        const newErrors = {};

        // Email/Username validation
        if (!formData.emailOrUsername.trim()) {
            newErrors.emailOrUsername = 'Email or username is required';
        } else if (formData.emailOrUsername.trim().length < 3) {
            newErrors.emailOrUsername = 'Email or username must be at least 3 characters';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        return newErrors;
    };

    const authenticateUser = (emailOrUsername, password) => {
        // Check against registered users
        const user = registeredUsers.find(user =>
            user.email.toLowerCase() === emailOrUsername.toLowerCase()
        );

        if (!user) {
            return { success: false, message: 'User not found. Please register first.' };
        }

        // For demo purposes, we'll use a simple password check
        // In real apps, passwords should be hashed and compared securely
        const storedPassword = localStorage.getItem(`password_${user.email}`);

        if (!storedPassword) {
            return { success: false, message: 'Invalid credentials. Please try again.' };
        }

        if (storedPassword !== password) {
            return { success: false, message: 'Invalid password. Please try again.' };
        }

        return { success: true, user: user };
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
        setIsLoggedIn(false);
        setFormData({
            emailOrUsername: '',
            password: '',
            rememberMe: false
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Authenticate user against registered users
            const authResult = authenticateUser(formData.emailOrUsername, formData.password);

            if (authResult.success) {
                // Save current user session
                const userSession = {
                    ...authResult.user,
                    loginTime: new Date().toISOString(),
                    rememberMe: formData.rememberMe
                };

                localStorage.setItem('currentUser', JSON.stringify(userSession));
                setCurrentUser(userSession);
                setIsLoggedIn(true);

                console.log('Login successful:', userSession);

                // Reset form
                setFormData({
                    emailOrUsername: '',
                    password: '',
                    rememberMe: false
                });
                setErrors({});
            } else {
                setErrors({ general: authResult.message });
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrors({ general: 'Login failed. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSocialLogin = (provider) => {
        console.log(`Login with ${provider}`);
        alert(`Login with ${provider} clicked! This would integrate with ${provider} OAuth.`);
    };

    const handleForgotPassword = () => {
        console.log('Forgot password clicked');
        alert('Forgot password feature would redirect to password reset page.');
    };

    const getInputClassName = (fieldName) => {
        let className = styles.input;
        if (errors[fieldName]) {
            className += ` ${styles.inputError}`;
        }
        return className;
    };

    // If user is logged in, show dashboard
    if (isLoggedIn && currentUser) {
        return (
            <div className={styles.container}>
                <div className={styles.loginCard}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Welcome Back, {currentUser.firstName}! 👋</h1>
                        <p className={styles.subtitle}>You are successfully logged in</p>
                    </div>

                    <div style={{
                        background: 'rgba(72, 187, 120, 0.1)',
                        border: '2px solid rgba(72, 187, 120, 0.3)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        marginBottom: '2rem'
                    }}>
                        <h3 style={{ margin: '0 0 1rem 0', color: '#2f855a', fontSize: '1.2rem' }}>
                            ✅ Login Successful
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', color: '#4a5568' }}>
                            <div>
                                <strong>Name:</strong>
                                <p style={{ margin: '0.25rem 0 0 0' }}>{currentUser.firstName} {currentUser.lastName}</p>
                            </div>
                            <div>
                                <strong>Email:</strong>
                                <p style={{ margin: '0.25rem 0 0 0' }}>{currentUser.email}</p>
                            </div>
                            <div>
                                <strong>Phone:</strong>
                                <p style={{ margin: '0.25rem 0 0 0' }}>{currentUser.phone}</p>
                            </div>
                            <div>
                                <strong>Login Time:</strong>
                                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>
                                    {new Date(currentUser.loginTime).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button
                            onClick={handleLogout}
                            className={styles.submitButton}
                            style={{ background: 'linear-gradient(135deg, #e53e3e, #c53030)' }}
                        >
                            Logout
                        </button>
                        <Link to="/register" className={styles.submitButton} style={{ textDecoration: 'none', textAlign: 'center' }}>
                            Register Another User
                        </Link>
                    </div>

                    <div className={styles.registerLink}>
                        Need to manage users? <Link to="/register" className={styles.link}>Go to Registration</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.loginCard}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Welcome Back</h1>
                    <p className={styles.subtitle}>Sign in to your account to continue</p>
                </div>

                {/* General Error Message */}
                {errors.general && (
                    <div className={styles.generalError}>
                        <span className={styles.errorIcon}>⚠️</span>
                        {errors.general}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Email/Username Field */}
                    <div className={styles.fieldGroup}>
                        <label htmlFor="emailOrUsername" className={styles.label}>
                            Email or Username
                        </label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="text"
                                id="emailOrUsername"
                                name="emailOrUsername"
                                value={formData.emailOrUsername}
                                onChange={handleInputChange}
                                className={getInputClassName('emailOrUsername')}
                                placeholder="Enter your email or username"
                                disabled={isSubmitting}
                                autoComplete="username"
                            />
                            <span className={styles.inputIcon}>👤</span>
                        </div>
                        {errors.emailOrUsername && (
                            <span className={styles.errorText}>{errors.emailOrUsername}</span>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className={styles.fieldGroup}>
                        <label htmlFor="password" className={styles.label}>
                            Password
                        </label>
                        <div className={styles.inputWrapper}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={getInputClassName('password')}
                                placeholder="Enter your password"
                                disabled={isSubmitting}
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className={styles.passwordToggle}
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isSubmitting}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                        {errors.password && (
                            <span className={styles.errorText}>{errors.password}</span>
                        )}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className={styles.formOptions}>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleInputChange}
                                className={styles.checkbox}
                                disabled={isSubmitting}
                            />
                            <span className={styles.checkboxText}>Remember me</span>
                        </label>

                        <button
                            type="button"
                            className={styles.forgotPassword}
                            onClick={handleForgotPassword}
                            disabled={isSubmitting}
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className={styles.loadingText}>
                                <span className={styles.spinner}></span>
                                Signing in...
                            </span>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className={styles.divider}>
                    <span className={styles.dividerText}>Or continue with</span>
                </div>

                {/* Social Login Buttons */}
                <div className={styles.socialButtons}>
                    <button
                        type="button"
                        className={`${styles.socialButton} ${styles.googleButton}`}
                        onClick={() => handleSocialLogin('Google')}
                        disabled={isSubmitting}
                    >
                        <span className={styles.socialIcon}>🔍</span>
                        Google
                    </button>

                    <button
                        type="button"
                        className={`${styles.socialButton} ${styles.facebookButton}`}
                        onClick={() => handleSocialLogin('Facebook')}
                        disabled={isSubmitting}
                    >
                        <span className={styles.socialIcon}>📘</span>
                        Facebook
                    </button>

                    <button
                        type="button"
                        className={`${styles.socialButton} ${styles.githubButton}`}
                        onClick={() => handleSocialLogin('GitHub')}
                        disabled={isSubmitting}
                    >
                        <span className={styles.socialIcon}>🐙</span>
                        GitHub
                    </button>
                </div>

                {/* Register Link */}
                <div className={styles.registerLink}>
                    Don't have an account? <Link to="/register" className={styles.link}>Create one here</Link>
                </div>

                {/* Registered Users Info */}
                {registeredUsers.length > 0 ? (
                    <div className={styles.demoCredentials}>
                        <h4 className={styles.demoTitle}>Available Users ({registeredUsers.length})</h4>
                        <p style={{ fontSize: '0.9rem', color: '#718096', marginBottom: '1rem' }}>
                            You can login with any registered user's email and password:
                        </p>
                        <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                            {registeredUsers.slice(0, 3).map((user, index) => (
                                <div key={user.id} className={styles.demoItem} style={{ marginBottom: '0.5rem', padding: '0.5rem', background: 'rgba(102, 126, 234, 0.05)', borderRadius: '6px' }}>
                                    <strong>{user.firstName} {user.lastName}</strong>
                                    <div style={{ fontSize: '0.85rem', color: '#718096' }}>
                                        Email: {user.email}
                                    </div>
                                </div>
                            ))}
                            {registeredUsers.length > 3 && (
                                <div style={{ fontSize: '0.8rem', color: '#718096', textAlign: 'center', marginTop: '0.5rem' }}>
                                    ... and {registeredUsers.length - 3} more users
                                </div>
                            )}
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#e53e3e', marginTop: '1rem', fontStyle: 'italic' }}>
                            Use the password you set during registration
                        </p>
                    </div>
                ) : (
                    <div className={styles.demoCredentials}>
                        <h4 className={styles.demoTitle}>No Users Registered</h4>
                        <p style={{ fontSize: '0.9rem', color: '#718096', margin: '0.5rem 0' }}>
                            You need to register first before you can login.
                        </p>
                        <Link to="/register" className={styles.link} style={{ fontSize: '0.9rem' }}>
                            → Go to Registration Page
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
