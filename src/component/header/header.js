import React from 'react';
import styles from './header.module.css';
const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.title}>Welcome to Our Platform</h1>
                <p className={styles.subtitle}>
                    Discover amazing features and services that will
                    transform your business
                    and take it to the next level.
                </p>
                <a href="#cta" className={styles.ctaButton}>
                    Get Started
                </a>
            </div>
        </header>
    );
};
export default Header;
