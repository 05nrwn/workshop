import React, { useState, useEffect } from 'react';
import styles from './hero.module.css';

const Hero = () => {
    const [currentText, setCurrentText] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const dynamicTexts = [
        "Full Stack Developer",
        "Web Application Developer",
        "IoT Solutions Developer",
        "Problem Solver"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentText((prev) => (prev + 1) % dynamicTexts.length);
                setIsVisible(true);
            }, 500);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const personalInfo = {
        name: "Ferdy Nuriawan",
        location: "Jember, Indonesia",
        email: "true.nrwn4868@gmail.com",
        phone: "+63 111 760 846",
        linkedin: "linkedin.com/in/ferdy-nuriawan",
        github: "github.com/05nrwn",
        resume: "#"
    };

    const quickStats = [
        { label: "Years Experience", value: "2+", icon: "⏱️" },
        { label: "Projects Completed", value: "10+", icon: "🚀" },
        { label: "Happy Clients", value: "5+", icon: "😊" },
        { label: "Technologies", value: "15+", icon: "💻" }
    ];

    const handleDownloadCV = () => {
        // Logic untuk download CV
        alert("CV akan segera didownload!");
    };

    const handleContactMe = () => {
        // Logic untuk scroll ke section contact atau buka email
        window.location.href = `mailto:${personalInfo.email}`;
    };

    return (
        <div className={styles.container}>
            <div className={styles.heroContent}>
                {/* Main Hero Section */}
                <div className={styles.heroMain}>
                    <div className={styles.heroText}>
                        <div className={styles.greeting}>
                            <span className={styles.wave}>👋</span> Hello, I'm
                        </div>

                        <h1 className={styles.name}>{personalInfo.name}</h1>

                        <div className={styles.titleContainer}>
                            <span className={styles.staticText}>I'm a </span>
                            <span className={`${styles.dynamicText} ${isVisible ? styles.visible : styles.hidden}`}>
                                {dynamicTexts[currentText]}
                            </span>
                        </div>

                        <p className={styles.description}>
                            Passionate Full Stack Developer dengan 2+ tahun pengalaman dalam
                            membangun aplikasi web modern dan solusi IoT. Saya mengkhususkan diri
                            dalam mengembangkan aplikasi yang user-friendly dan scalable menggunakan
                            teknologi terkini.
                        </p>

                        <div className={styles.locationInfo}>
                            <span className={styles.locationIcon}>📍</span>
                            <span>{personalInfo.location}</span>
                            <span className={styles.availability}>• Available for freelance</span>
                        </div>

                        <div className={styles.heroButtons}>
                            <button className={styles.primaryButton} onClick={handleContactMe}>
                                Contact Me
                            </button>
                            <button className={styles.secondaryButton} onClick={handleDownloadCV}>
                                Download CV
                            </button>
                        </div>

                        <div className={styles.socialLinks}>
                            <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                💼 LinkedIn
                            </a>
                            <a href={`https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                🔗 GitHub
                            </a>
                            <a href={`mailto:${personalInfo.email}`} className={styles.socialLink}>
                                📧 Email
                            </a>
                            <a href={`tel:${personalInfo.phone}`} className={styles.socialLink}>
                                📱 Phone
                            </a>
                        </div>
                    </div>

                    <div className={styles.heroImage}>
                        <div className={styles.imageContainer}>
                            <img
                                src="/images/hero-profile.jpg"
                                alt="Ferdy Nuriawan"
                                className={styles.profileImage}
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/400x400?text=Profile";
                                }}
                            />
                            <div className={styles.imageOverlay}></div>
                        </div>

                        {/* Floating Elements */}
                        <div className={styles.floatingElement} style={{ top: '10%', right: '10%' }}>
                            <span className={styles.floatingIcon}>⚛️</span>
                            <span className={styles.floatingText}>React</span>
                        </div>

                        <div className={styles.floatingElement} style={{ top: '60%', right: '5%' }}>
                            <span className={styles.floatingIcon}>🐘</span>
                            <span className={styles.floatingText}>PHP</span>
                        </div>

                        <div className={styles.floatingElement} style={{ top: '30%', left: '5%' }}>
                            <span className={styles.floatingIcon}>🗄️</span>
                            <span className={styles.floatingText}>MySQL</span>
                        </div>

                        <div className={styles.floatingElement} style={{ bottom: '15%', left: '10%' }}>
                            <span className={styles.floatingIcon}>📱</span>
                            <span className={styles.floatingText}>IoT</span>
                        </div>
                    </div>
                </div>

                {/* Quick Stats Section */}
                <div className={styles.statsSection}>
                    <h3 className={styles.statsTitle}>Quick Overview</h3>
                    <div className={styles.statsGrid}>
                        {quickStats.map((stat, index) => (
                            <div key={index} className={styles.statCard}>
                                <div className={styles.statIcon}>{stat.icon}</div>
                                <div className={styles.statValue}>{stat.value}</div>
                                <div className={styles.statLabel}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Key Skills Preview */}
                <div className={styles.skillsPreview}>
                    <h3 className={styles.skillsTitle}>Core Technologies</h3>
                    <div className={styles.skillsTags}>
                        {["JavaScript", "React", "PHP", "CodeIgniter", "MySQL", "Arduino", "IoT", "Bootstrap"].map((skill, index) => (
                            <span key={index} className={styles.skillTag}>{skill}</span>
                        ))}
                    </div>
                </div>

                {/* Scroll Down Indicator */}
                <div className={styles.scrollIndicator}>
                    <div className={styles.scrollText}>Scroll untuk melihat lebih</div>
                    <div className={styles.scrollArrow}>↓</div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
